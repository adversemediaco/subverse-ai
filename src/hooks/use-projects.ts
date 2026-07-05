"use client";

import { useQuery } from "@tanstack/react-query";

/**
 * React Query hook for fetching the user's projects from /api/projects.
 * Works in both demo and live modes (the API decides which data to return).
 */

export interface ProjectSummary {
  id: string;
  name: string;
  duration: number;
  languages: number;
  status: string;
  createdAt: string;
  fileSize: number;
}

async function fetchProjects(): Promise<ProjectSummary[]> {
  const res = await fetch("/api/projects");
  if (!res.ok) throw new Error("Failed to load projects");
  const data = await res.json();
  return data.projects as ProjectSummary[];
}

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
}
