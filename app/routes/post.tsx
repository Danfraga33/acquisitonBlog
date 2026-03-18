import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { supabase, type Post } from "../../lib/supabase";
import { PostLayout } from "../../components/post-layout";

interface PostWithNav extends Post {
  next_post_slug: string | null;
  prev_post_slug: string | null;
}

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<PostWithNav | null>(null);
  const [prevPost, setPrevPost] = useState<{ title: string; href: string } | undefined>();
  const [nextPost, setNextPost] = useState<{ title: string; href: string } | undefined>();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setNotFound(false);

    supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single()
      .then(async ({ data, error }) => {
        if (error || !data) {
          setNotFound(true);
          setLoading(false);
          return;
        }
        setPost(data as PostWithNav);

        const navFetches = [];
        if (data.prev_post_slug) {
          navFetches.push(
            supabase.from("posts").select("title, slug").eq("slug", data.prev_post_slug).single()
              .then(({ data: p }) => { if (p) setPrevPost({ title: p.title, href: `/posts/${p.slug}` }); })
          );
        }
        if (data.next_post_slug) {
          navFetches.push(
            supabase.from("posts").select("title, slug").eq("slug", data.next_post_slug).single()
              .then(({ data: n }) => { if (n) setNextPost({ title: n.title, href: `/posts/${n.slug}` }); })
          );
        }
        await Promise.all(navFetches);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Post not found.</p>
      </div>
    );
  }

  return (
    <PostLayout
      title={post.title}
      category={post.category ?? ""}
      date={post.date ?? ""}
      readTime={post.read_time ?? ""}
      prevPost={prevPost}
      nextPost={nextPost}
    >
      {post.content ? (
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      ) : (
        <p className="text-muted-foreground">Content coming soon.</p>
      )}
    </PostLayout>
  );
}
