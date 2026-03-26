import { useLoaderData, Link } from "react-router";
import type { Route } from "./+types/blog";
import { supabaseServer } from "../../lib/supabase.server";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";

export async function loader(_: Route.LoaderArgs) {
  const { data: posts } = await supabaseServer
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return { posts: posts ?? [] };
}

export default function BlogPage() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main className="px-6 pt-32 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16">
            <p className="text-muted-foreground mb-4 text-sm tracking-[0.3em] uppercase">
              All Posts
            </p>
            <h1 className="font-serif text-4xl md:text-6xl">The Blog</h1>
          </div>

          {posts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-muted-foreground text-lg">No posts yet.</p>
              <Link
                to="/"
                className="text-primary mt-4 inline-block text-sm underline-offset-4 hover:underline"
              >
                ← Back home
              </Link>
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
      </main>
      <Footer />
    </div>
  );
}
