import { useLoaderData, Link } from "react-router";
import type { Route } from "./+types/category";
import { supabaseServer } from "../../lib/supabase.server";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";

const CATEGORY_MAP: Record<string, string> = {
  "deal-journal": "Deal Journal",
  "frameworks": "Frameworks",
  "vertical-research": "Vertical Research",
  "learnings": "Learnings",
  "the-playbook": "The Playbook",
  "behind-the-scenes": "Behind the Scenes",
};

export async function loader({ params }: Route.LoaderArgs) {
  const { category } = params;
  const categoryName = category ? (CATEGORY_MAP[category] ?? category) : "";

  const { data: posts } = await supabaseServer
    .from("posts")
    .select("*")
    .eq("published", true)
    .eq("category", categoryName)
    .order("created_at", { ascending: false });

  return { posts: posts ?? [], categoryName };
}

export default function CategoryPage() {
  const { posts, categoryName } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4">
              Category
            </p>
            <h1 className="text-4xl md:text-6xl font-serif">{categoryName}</h1>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No posts yet in this category.</p>
              <Link to="/" className="mt-4 inline-block text-sm text-primary hover:underline underline-offset-4">
                ← Back home
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/posts/${post.slug}`}
                  className="group block p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-primary tracking-wide uppercase">{post.category}</span>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-serif mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-1 text-sm text-primary">
                    Read more
                    <svg
                      className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M7 7h10v10" />
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
