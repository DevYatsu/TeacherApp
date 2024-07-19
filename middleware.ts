export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/admin/dashboard", "/delete/folders", "/admin/classroom/:path"],
};
