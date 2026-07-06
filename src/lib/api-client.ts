/**
 * Typed browser API client for SubVerse AI.
 * Thin wrappers around fetch() with consistent error handling. Used by the
 * React Query hooks in src/hooks/.
 */

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    ...init,
  });
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      if (data?.error) message = data.error;
    } catch {
      /* ignore non-JSON error bodies */
    }
    throw new Error(message);
  }
  return res.json() as Promise<T>;
}

export interface ProjectSummary {
  id: string;
  name: string;
  duration: number;
  languages: number;
  status: string;
  createdAt: string;
  fileSize: number;
}

export interface Segment {
  index?: number;
  startTime: number;
  endTime: number;
  text: string;
  speaker?: string | null;
}

export type ContentKind =
  | "instagram" | "linkedin" | "twitter" | "blog"
  | "newsletter" | "seo" | "hashtags" | "youtube-title";

export const api = {
  // ---- Upload ----
  createUpload: (body: { fileName: string; fileSize: number; fileType: string }) =>
    request<{ uploadUrl: string; projectId: string; key: string; demo?: boolean }>(
      "/api/upload",
      { method: "POST", body: JSON.stringify(body) }
    ),

  // Upload the file bytes to the presigned URL (R2/S3 PUT).
  putToPresigned: async (uploadUrl: string, file: File) => {
    // Skip the actual PUT in demo mode (placeholder URL).
    if (uploadUrl.includes("demo-presigned-url")) return;
    const res = await fetch(uploadUrl, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type },
    });
    if (!res.ok) throw new Error("Upload to storage failed");
  },

  // ---- Processing ----
  process: (body: {
    projectId: string;
    options?: {
      translate?: string[];
      generateContent?: ContentKind[];
      tone?: string;
    };
  }) => request<{ success: boolean; result?: unknown; demo?: boolean }>("/api/process", {
    method: "POST",
    body: JSON.stringify(body),
  }),

  getStatus: (projectId: string) =>
    request<{ projectId: string; status: string; progress?: number }>(
      `/api/process?projectId=${encodeURIComponent(projectId)}`
    ),

  // ---- Projects ----
  listProjects: () => request<{ projects: ProjectSummary[]; demo?: boolean }>("/api/projects"),
  getProject: (id: string) => request<{ project: unknown }>(`/api/projects/${id}`),
  deleteProject: (id: string) =>
    request<{ success: boolean }>(`/api/projects/${id}`, { method: "DELETE" }),

  // ---- Subtitles ----
  getSubtitles: (projectId: string, language = "en") =>
    request<{ language: string; segments: Segment[]; demo?: boolean }>(
      `/api/subtitles?projectId=${encodeURIComponent(projectId)}&language=${language}`
    ),
  saveSubtitles: (body: { projectId: string; language?: string; segments: Segment[] }) =>
    request<{ success: boolean; count: number }>("/api/subtitles", {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  // ---- Translation ----
  translate: (body: { projectId?: string; language: string; segments?: Segment[] }) =>
    request<{ language: string; status: string; segments: Segment[] }>("/api/translate", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  // ---- AI Content ----
  generateContent: (body: {
    projectId?: string;
    kind: ContentKind;
    tone?: string;
    transcript?: string;
  }) => request<{ content: string; demo?: boolean }>("/api/content", {
    method: "POST",
    body: JSON.stringify(body),
  }),

  // ---- Export ----
  exportSubtitles: async (body: { projectId: string; format: string; language?: string }) => {
    const res = await fetch("/api/export", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error("Export failed");
    // Burned video returns JSON job info; text formats return a file blob.
    const contentType = res.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      return { json: await res.json() };
    }
    return { blob: await res.blob(), filename: `${body.projectId}.${body.format}` };
  },

  // ---- Billing ----
  billing: (body: { action: string; priceId?: string; customerId?: string; customerEmail?: string }) =>
    request<{ url: string; demo?: boolean }>("/api/billing", {
      method: "POST",
      body: JSON.stringify(body),
    }),
};

/** Trigger a browser download from a Blob. */
export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
