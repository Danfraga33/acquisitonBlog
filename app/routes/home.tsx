import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Closing Notes | The Acquisition Journey" },
    { name: "description", content: "Documenting every step of the path to business ownership — from deal sourcing to closing." },
  ];
}

export default function Home() {
  return <Welcome />;
}
