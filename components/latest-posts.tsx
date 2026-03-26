import { useEffect, useState } from "react";
import { Link } from "react-router";
import { supabase, type Post } from "../lib/supabase";
import { useScrollFadeUp } from "../lib/useScrollFadeUp";

export function LatestPosts() {
  const ref = useScrollFadeUp<HTMLElement>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("posts")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(6)
      .then(({ data }) => {
        if (data) setPosts(data);
        setLoading(false);
      });
  }, []);

  return (
    <section ref={ref} id="posts" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between">
          <div>
            <p data-animate className="text-muted-foreground mb-4 text-sm tracking-[0.3em] uppercase">
              From the Blog
            </p>
            <h2 data-animate className="font-serif text-3xl md:text-5xl">Latest Updates</h2>
          </div>
          <Link
            to="/blog"
            className="text-primary mt-4 text-sm underline-offset-4 hover:underline md:mt-0"
          >
            View all posts →
          </Link>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-card border-border animate-pulse rounded-lg border p-6"
              >
                <div className="bg-muted mb-4 h-3 w-1/4 rounded" />
                <div className="bg-muted mb-3 h-5 w-3/4 rounded" />
                <div className="bg-muted mb-2 h-3 w-full rounded" />
                <div className="bg-muted h-3 w-2/3 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/posts/${post.slug}`}
                className="group bg-card border-border hover:border-primary/50 block rounded-lg border p-6 transition-colors"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-primary text-xs tracking-wide uppercase">
                    {post.category}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {post.date}
                  </span>
                </div>
                <h3 className="group-hover:text-primary mb-3 font-serif text-xl transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="text-primary flex items-center gap-1 text-sm">
                  Read more
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 17L17 7M7 7h10v10"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
