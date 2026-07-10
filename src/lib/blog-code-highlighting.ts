import type { BlogPostLocale } from "$lib/blog-post-core";

export type BlogPostCodeHighlights = Partial<Record<BlogPostLocale, Record<number, string>>>;
