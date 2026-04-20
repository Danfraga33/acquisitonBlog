import { useEffect, useState } from "react";
import { Link } from "react-router";
import { supabase, type Post } from "../../lib/supabase";

type StatsMap = Record<string, number>;

const STAT_KEYS: { key: string; label: string }[] = [
  { key: "deals_reviewed", label: "Deals Reviewed" },
  { key: "lois_submitted", label: "LOIs Submitted" },
  { key: "businesses_under_review", label: "Businesses Under Review" },
  { key: "acquisitions", label: "No. Acquisitions" },
];

function StatsEditor() {
  const [stats, setStats] = useState<StatsMap>({});
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("stats")
      .select("key, value")
      .then(({ data }) => {
        if (data) {
          setStats(Object.fromEntries(data.map(({ key, value }: { key: string; value: number }) => [key, value])));
        }
      });
  }, []);

  const update = async (key: string, delta: number) => {
    const next = Math.max(0, (stats[key] ?? 0) + delta);
    setStats((prev) => ({ ...prev, [key]: next }));
    setSaving(key);
    await supabase.from("stats").upsert({ key, value: next });
    setSaving(null);
  };

  return (
    <div className="bg-card border-border mb-10 rounded-lg border p-6">
      <h2 className="font-serif text-xl mb-5">Stats</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {STAT_KEYS.map(({ key, label }) => (
          <div key={key} className="flex flex-col items-center gap-2">
            <p className="text-muted-foreground text-xs tracking-wide uppercase text-center">{label}</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => update(key, -1)}
                className="border-border hover:bg-accent flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border text-sm transition-colors"
              >
                −
              </button>
              <span className="font-serif text-2xl w-8 text-center">
                {saving === key ? "…" : (stats[key] ?? 0)}
              </span>
              <button
                onClick={() => update(key, 1)}
                className="border-border hover:bg-accent flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border text-sm transition-colors"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string;

function PasswordGate({ onAuth }: { onAuth: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_auth", "true");
      onAuth();
    } else {
      setError(true);
    }
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="font-serif text-3xl">Admin</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Enter password to continue
          </p>
        </div>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
          className="border-border bg-card text-foreground placeholder:text-muted-foreground focus:border-primary w-full rounded-lg border px-4 py-3 text-sm transition-colors focus:outline-none"
          placeholder="Password"
          autoFocus
        />
        {error && <p className="text-sm text-red-400">Incorrect password.</p>}
        <button
          type="submit"
          className="bg-primary text-primary-foreground w-full rounded-full py-3 text-sm tracking-wide transition-opacity hover:opacity-90"
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("admin_auth") === "true";
  });
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authed) return;
    supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setPosts(data);
        setLoading(false);
      });
  }, [authed]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    await supabase.from("posts").delete().eq("id", id);
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />;

  return (
    <div className="bg-background min-h-screen px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 flex items-center justify-between">
          <div className="cursor-default">
            <p className="text-muted-foreground mb-2 text-sm tracking-[0.3em] uppercase">
              Admin
            </p>
            <h1 className="font-serif text-3xl md:text-4xl">Posts</h1>
          </div>
          <div className="flex gap-3">
            <Link
              to="/"
              className="border-border hover:bg-accent rounded-full border px-6 py-2.5 text-sm tracking-wide transition-colors"
            >
              View Site
            </Link>
            <Link
              to="/admin-new"
              className="bg-primary text-primary-foreground rounded-full px-6 py-2.5 text-sm tracking-wide transition-opacity hover:opacity-90"
            >
              New Post
            </Link>
          </div>
        </div>

        <StatsEditor />

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-card border-border animate-pulse rounded-lg border p-6"
              >
                <div className="bg-muted h-4 w-1/3 rounded" />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-muted-foreground text-lg">No posts yet.</p>
            <Link
              to="/admin-new"
              className="text-primary mt-4 inline-block text-sm underline-offset-4 hover:underline"
            >
              Create your first post
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-card border-border flex items-center justify-between rounded-lg border p-5"
              >
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-3">
                    <h3 className="cursor-default truncate font-serif text-lg">
                      {post.title}
                    </h3>
                    <span
                      className={`shrink-0 cursor-default rounded-full px-2.5 py-0.5 text-xs ${
                        post.published
                          ? "bg-green-900/30 text-green-400"
                          : "bg-yellow-900/30 text-yellow-400"
                      }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <div className="text-muted-foreground flex cursor-default gap-4 text-xs">
                    <span>{post.category}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
                <div className="ml-4 flex shrink-0 gap-2">
                  {post.published ? (
                    <a
                      href={`https://closingnotes.co/posts/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-border hover:bg-accent rounded-full border px-4 py-1.5 text-xs tracking-wide transition-colors"
                    >
                      Preview
                    </a>
                  ) : (
                    <span className="border-border text-muted-foreground cursor-not-allowed rounded-full border px-4 py-1.5 text-xs tracking-wide opacity-40">
                      Preview
                    </span>
                  )}
                  <Link
                    to={`/admin-edit/${post.id}`}
                    className="border-border hover:bg-accent rounded-full border px-4 py-1.5 text-xs tracking-wide transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    className="cursor-pointer rounded-full border border-red-800 px-4 py-1.5 text-xs tracking-wide text-red-400 transition-colors hover:bg-red-900/30"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
