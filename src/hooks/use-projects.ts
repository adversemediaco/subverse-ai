"use client";

import { useQuery } from "@tanstack/react-query";
import { api, type ProjectSummary } from "@/lib/api-client";

export type { ProjectSummary };

/**
 * Fetch the current user's projects (live data when DB+auth configured,
 * sample data otherwise). Powers the dashboard and projects list.
 */
export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { projects } = await api.listProjects();
      return projects;
    },
  });
}

/** Fetch a single project's full detail. */
export function useProject(id: string | undefined) {
  return useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      const { project } = await api.getProject(id as string);
      return project;
    },
    enabled: !!id,
  });
}
