"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, downloadBlob, type ContentKind, type Segment } from "@/lib/api-client";
import { useToast } from "@/components/ui/toast";

/**
 * Mutation hooks for all write/action operations, wired to toasts for feedback.
 * Each hook works in both demo and live modes (the API decides behaviour).
 */

/** Full upload flow: presign → PUT to storage → create project. */
export function useUpload() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const { uploadUrl, projectId } = await api.createUpload({
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
      });
      await api.putToPresigned(uploadUrl, file);
      return { projectId };
    },
    onSuccess: () => {
      toast({ title: "Upload complete", variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (err: Error) =>
      toast({ title: "Upload failed", description: err.message, variant: "error" }),
  });
}

/** Kick off the AI processing pipeline. */
export function useProcess() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: {
      projectId: string;
      translate?: string[];
      generateContent?: ContentKind[];
      tone?: string;
    }) =>
      api.process({
        projectId: vars.projectId,
        options: {
          translate: vars.translate,
          generateContent: vars.generateContent,
          tone: vars.tone,
        },
      }),
    onSuccess: (_data, vars) => {
      toast({ title: "Processing started", variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["project", vars.projectId] });
    },
    onError: (err: Error) =>
      toast({ title: "Processing failed", description: err.message, variant: "error" }),
  });
}

/** Generate a single piece of AI content. */
export function useGenerateContent() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (vars: { projectId?: string; kind: ContentKind; tone?: string; transcript?: string }) =>
      api.generateContent(vars),
    onError: (err: Error) =>
      toast({ title: "Generation failed", description: err.message, variant: "error" }),
  });
}

/** Trigger a translation for a target language. */
export function useTranslate() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars: { projectId?: string; language: string; segments?: Segment[] }) =>
      api.translate(vars),
    onSuccess: (_d, vars) => {
      toast({ title: `Translated to ${vars.language}`, variant: "success" });
      if (vars.projectId) queryClient.invalidateQueries({ queryKey: ["project", vars.projectId] });
    },
    onError: (err: Error) =>
      toast({ title: "Translation failed", description: err.message, variant: "error" }),
  });
}

/** Save edited subtitle segments. */
export function useSaveSubtitles() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (vars: { projectId: string; language?: string; segments: Segment[] }) =>
      api.saveSubtitles(vars),
    onSuccess: () => toast({ title: "Subtitles saved", variant: "success" }),
    onError: (err: Error) =>
      toast({ title: "Save failed", description: err.message, variant: "error" }),
  });
}

/** Export subtitles in a chosen format (downloads the file). */
export function useExport() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (vars: { projectId: string; format: string; language?: string }) =>
      api.exportSubtitles(vars),
    onSuccess: (res, vars) => {
      if ("blob" in res && res.blob) {
        downloadBlob(res.blob, res.filename);
        toast({ title: `Exported ${vars.format.toUpperCase()}`, variant: "success" });
      } else {
        toast({ title: "Export queued", description: "Burned video is rendering.", variant: "info" });
      }
    },
    onError: (err: Error) =>
      toast({ title: "Export failed", description: err.message, variant: "error" }),
  });
}

/** Delete a project. */
export function useDeleteProject() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.deleteProject(id),
    onSuccess: () => {
      toast({ title: "Project deleted", variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (err: Error) =>
      toast({ title: "Delete failed", description: err.message, variant: "error" }),
  });
}

/**
 * Direct transcribe — the fastest real-AI path. Uploads the file straight to
 * Whisper (only needs OPENAI_API_KEY) and returns transcript + translations +
 * content in one call. Works in demo mode with sample data too.
 */
export function useTranscribeDirect() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: (vars: {
      file: File;
      language?: string;
      translate?: string[];
      content?: ContentKind[];
      tone?: string;
    }) => api.transcribeDirect(vars.file, vars),
    onSuccess: (res) =>
      toast({
        title: res.demo ? "Demo transcript ready" : "Transcription complete",
        description: res.demo ? "Add OPENAI_API_KEY for real results." : undefined,
        variant: "success",
      }),
    onError: (err: Error) =>
      toast({ title: "Transcription failed", description: err.message, variant: "error" }),
  });
}

/** Start a Stripe checkout / billing-portal session and redirect. */
export function useBilling() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (vars: { action: string; priceId?: string; customerId?: string; customerEmail?: string }) =>
      api.billing(vars),
    onSuccess: ({ url }) => {
      if (url) window.location.href = url;
    },
    onError: (err: Error) =>
      toast({ title: "Billing error", description: err.message, variant: "error" }),
  });
}
