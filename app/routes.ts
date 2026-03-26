import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("posts/:slug", "routes/post.tsx"),
  route("category/:category", "routes/category.tsx"),
  route("admin", "routes/admin.tsx"),
  route("admin-new", "routes/admin-editor.tsx", { id: "admin-new" }),
  route("admin-edit/:id", "routes/admin-editor.tsx", { id: "admin-edit" }),
] satisfies RouteConfig;
