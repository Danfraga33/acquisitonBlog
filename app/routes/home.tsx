import type { Route } from "./+types/home";
import { useLoaderData } from "react-router";
import { Welcome } from "../welcome/welcome";
import { supabaseServer } from "../../lib/supabase.server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Closing Notes | The Acquisition Journey" },
    { name: "description", content: "Documenting every step of the path to business ownership — from deal sourcing to closing." },
  ];
}

export async function loader(_: Route.LoaderArgs) {
  const { data: posts } = await supabaseServer
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(6);

  return { posts: posts ?? [] };
}

export default function Home() {
  const { posts } = useLoaderData<typeof loader>();
  return <Welcome posts={posts} />;
}
