"use client";

import { useEffect, useState } from "react";
import { BLOG_POSTS, PROJECTS } from "@/lib/data";
import type { BlogPost, Project } from "@/types";

const PROJECTS_DATA_URL = process.env.NEXT_PUBLIC_PROJECTS_DATA_URL || "/content/projects.json";
const BLOGS_DATA_URL = process.env.NEXT_PUBLIC_BLOGS_DATA_URL || "/content/blogs.json";

function toBool(value: unknown): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value.toLowerCase() === "true";
  return false;
}

function toNumber(value: unknown): number | undefined {
  if (typeof value === "number") return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
}

function normalizeProject(item: any): Project {
  const category = item.category === "Mobile" || item.category === "Full Stack" ? item.category : "Web";
  const tech =
    Array.isArray(item.tech)
      ? item.tech.map((t: unknown) => String(t).trim()).filter(Boolean)
      : String(item.tech || "")
          .split(",")
          .map((t: string) => t.trim())
          .filter(Boolean);

  return {
    id: String(item.id || ""),
    title: String(item.title || ""),
    description: String(item.description || ""),
    image: String(item.image || ""),
    category,
    tech,
    liveUrl: item.liveUrl ? String(item.liveUrl) : undefined,
    githubUrl: item.githubUrl ? String(item.githubUrl) : undefined,
    featured: toBool(item.featured),
    lighthouseScore: toNumber(item.lighthouseScore),
    loadTime: item.loadTime ? String(item.loadTime) : undefined,
    mobileResponsive: item.mobileResponsive === undefined ? undefined : toBool(item.mobileResponsive),
  };
}

function normalizeBlog(item: any): BlogPost {
  return {
    id: String(item.id || ""),
    slug: String(item.slug || ""),
    title: String(item.title || ""),
    excerpt: String(item.excerpt || ""),
    date: String(item.date || ""),
    readingTime: String(item.readingTime || ""),
    category: String(item.category || ""),
    image: String(item.image || ""),
    content: item.content ? String(item.content) : undefined,
  };
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  return response.json();
}

export function useProjectsData() {
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetchJson<any[]>(PROJECTS_DATA_URL)
      .then((rows) => {
        if (!active || !Array.isArray(rows)) return;
        const normalized = rows.map(normalizeProject).filter((p) => p.id && p.title);
        if (normalized.length > 0) setProjects(normalized);
      })
      .catch(() => {
        // Fallback to local static data if remote data is unavailable.
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { projects, loading };
}

export function useBlogPostsData() {
  const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetchJson<any[]>(BLOGS_DATA_URL)
      .then((rows) => {
        if (!active || !Array.isArray(rows)) return;
        const normalized = rows.map(normalizeBlog).filter((p) => p.id && p.slug && p.title);
        if (normalized.length > 0) setPosts(normalized);
      })
      .catch(() => {
        // Fallback to local static data if remote data is unavailable.
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { posts, loading };
}
