import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { supabase } from "../../lib/supabase";
import { PostForm, type PostFormData } from "../../components/admin/post-form";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string;

export default function AdminEditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [authed] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("admin_auth") === "true";
  });
  const [initial, setInitial] = useState<Partial<PostFormData> | null>(
    id ? null : {},
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || !authed) return;
    supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          setError("Post not found.");
          return;
        }
        setInitial({
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt ?? "",
          content: data.content ?? "",
          category: data.category ?? "Deal Journal",
          date: data.date ?? "",
          read_time: data.read_time ?? "",
          published: data.published,
        });
      });
  }, [id, authed]);

  if (!authed) {
    navigate("/admin");
    return null;
  }

  const handleSubmit = async (data: PostFormData) => {
    setSubmitting(true);
    setError(null);

    if (id) {
      const { error, status } = await supabase
        .from("posts")
        .update(data)
        .eq("id", id);
      console.log("Update response:", { error, status });
      if (error) {
        setError(error.message);
        setSubmitting(false);
        return;
      }
    } else {
      const { error, status } = await supabase.from("posts").insert(data);
      console.log("Insert response:", { error, status });
      if (error) {
        setError(error.message);
        setSubmitting(false);
        return;
      }
    }

    navigate("/admin");
  };

  return (
    <div className="bg-background min-h-screen px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12">
          <Link
            to="/admin"
            className="text-muted-foreground mb-6 inline-block text-sm underline-offset-4 hover:underline"
          >
            ← Back to posts
          </Link>
          <h1 className="font-serif text-3xl md:text-4xl">
            {id ? "Edit Post" : "New Post"}
          </h1>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-800 bg-red-900/20 p-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {initial === null ? (
          <div className="flex items-center justify-center py-20">
            <div className="border-primary h-6 w-6 animate-spin rounded-full border-2 border-t-transparent" />
          </div>
        ) : (
          <PostForm
            initial={initial}
            onSubmit={handleSubmit}
            submitting={submitting}
          />
        )}
      </div>
    </div>
  );
}
