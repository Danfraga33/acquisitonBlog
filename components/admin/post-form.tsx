import { useState, useEffect } from "react";
import { RichEditor } from "./rich-editor";

const CATEGORIES = [
  "Deal Journal",
  "Frameworks",
  "Structured Notes",
  "Learnings",
  "Operator Lens",
  "Behind the Scenes",
];

export interface PostFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  read_time: string;
  published: boolean;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function PostForm({
  initial,
  onSubmit,
  submitting,
}: {
  initial?: Partial<PostFormData>;
  onSubmit: (data: PostFormData) => void;
  submitting: boolean;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(false);
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [category, setCategory] = useState(initial?.category ?? CATEGORIES[0]);
  const [date, setDate] = useState(
    initial?.date ??
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
  );
  const [readTime, setReadTime] = useState(initial?.read_time ?? "");
  const [published, setPublished] = useState(initial?.published ?? false);

  useEffect(() => {
    if (!slugTouched) {
      setSlug(slugify(title));
    }
  }, [title, slugTouched]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      slug,
      excerpt,
      content,
      category,
      date,
      read_time: readTime,
      published,
    });
  };

  const inputClass =
    "w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="text-muted-foreground mb-2 block text-xs tracking-[0.2em] uppercase">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={inputClass}
          placeholder="Post title"
          required
        />
      </div>

      <div>
        <label className="text-muted-foreground mb-2 block text-xs tracking-[0.2em] uppercase">
          Slug
        </label>
        <input
          type="text"
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value);
            setSlugTouched(true);
          }}
          className={inputClass}
          placeholder="post-url-slug"
          required
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <label className="text-muted-foreground mb-2 block text-xs tracking-[0.2em] uppercase">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputClass}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-muted-foreground mb-2 block text-xs tracking-[0.2em] uppercase">
            Date
          </label>
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputClass}
            placeholder="March 26, 2026"
          />
        </div>
        <div>
          <label className="text-muted-foreground mb-2 block text-xs tracking-[0.2em] uppercase">
            Read Time
          </label>
          <input
            type="text"
            value={readTime}
            onChange={(e) => setReadTime(e.target.value)}
            className={inputClass}
            placeholder="5 min read"
          />
        </div>
      </div>

      <div>
        <label className="text-muted-foreground mb-2 block text-xs tracking-[0.2em] uppercase">
          Excerpt
        </label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className={`${inputClass} resize-none`}
          rows={3}
          placeholder="Short summary for post cards..."
        />
      </div>

      <div>
        <label className="text-muted-foreground mb-2 block text-xs tracking-[0.2em] uppercase">
          Content
        </label>
        <RichEditor content={content} onChange={setContent} />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setPublished(!published)}
          className={`relative h-6 w-11 rounded-full transition-colors ${
            published ? "bg-primary" : "bg-border"
          }`}
        >
          <span
            className={`bg-foreground absolute top-0.5 left-0.5 h-5 w-5 rounded-full transition-transform ${
              published ? "translate-x-5" : ""
            }`}
          />
        </button>
        <span className="text-foreground text-sm">
          {published ? "Published" : "Draft"}
        </span>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={submitting}
          className="bg-primary text-primary-foreground cursor-pointer rounded-full px-8 py-3 text-sm tracking-wide transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {submitting ? "Saving..." : "Save Post"}
        </button>
      </div>
    </form>
  );
}
