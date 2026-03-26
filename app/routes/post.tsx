import { data, useLoaderData } from "react-router";
import type { Route } from "./+types/post";
import { supabaseServer } from "../../lib/supabase.server";
import { PostLayout } from "../../components/post-layout";

export async function loader({ params }: Route.LoaderArgs) {
  const { slug } = params;

  const { data: post, error } = await supabaseServer
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !post) {
    throw data("Post not found", { status: 404 });
  }

  const [prevPost, nextPost] = await Promise.all([
    post.prev_post_slug
      ? supabaseServer
          .from("posts")
          .select("title, slug")
          .eq("slug", post.prev_post_slug)
          .single()
          .then(({ data: p }) =>
            p ? { title: p.title, href: `/posts/${p.slug}` } : undefined,
          )
      : Promise.resolve(undefined),
    post.next_post_slug
      ? supabaseServer
          .from("posts")
          .select("title, slug")
          .eq("slug", post.next_post_slug)
          .single()
          .then(({ data: n }) =>
            n ? { title: n.title, href: `/posts/${n.slug}` } : undefined,
          )
      : Promise.resolve(undefined),
  ]);

  return { post, prevPost, nextPost };
}

export default function PostPage() {
  const { post, prevPost, nextPost } = useLoaderData<typeof loader>();

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
