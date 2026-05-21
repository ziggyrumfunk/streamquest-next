import { redirect } from "next/navigation";

/**
 * /admin/news used to be a separate list page. Now the news list lives
 * on /admin alongside the quests, so this route just forwards back.
 */
export default function AdminNewsRedirect() {
  redirect("/admin");
}
