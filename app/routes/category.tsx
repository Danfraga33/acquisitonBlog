import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { supabase, type Post } from "../../lib/supabase";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";

const CATEGORY_MAP: Record<string, string> = {
  "deal-journal": "Deal Journal",
  "frameworks": "Frameworks",
  "structured-notes": "Structured Notes",
  "learnings": "Learnings",
  "operator-lens": "Operator Lens",
  "behind-the-scenes": "Behind the Scenes",
};

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const categoryName = category ? CATEGORY_MAP[category] ?? category : "";

  useEffect(() => {
    if (!categoryName) return;
    supabase
      .from("posts")
      .select("*")
      .eq("published", true)
      .eq("category", categoryName)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setPosts(data);
        setLoading(false);
      });
  }, [categoryName]);

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

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="p-6 bg-card border border-border rounded-lg animate-pulse">
                  <div className="h-3 bg-muted rounded w-1/4 mb-4" />
                  <div className="h-5 bg-muted rounded w-3/4 mb-3" />
                  <div className="h-3 bg-muted rounded w-full mb-2" />
                  <div className="h-3 bg-muted rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
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
