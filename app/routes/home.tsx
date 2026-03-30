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
  const [{ data: posts }, { data: statsRows }] = await Promise.all([
    supabaseServer
      .from("posts")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(6),
    supabaseServer.from("stats").select("key, value"),
  ]);

  const statsMap = Object.fromEntries(
    (statsRows ?? []).map(({ key, value }: { key: string; value: number }) => [key, value]),
  );

  return { posts: posts ?? [], stats: statsMap };
}

export default function Home() {
  const { posts, stats } = useLoaderData<typeof loader>();
  return <Welcome posts={posts} stats={stats} />;
}
