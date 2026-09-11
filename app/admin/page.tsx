import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";

export default async function AdminRootPage() {
  const session = await getAuthSession();
  if (session) {
    redirect("/admin/dashboard");
  } else {
    redirect("/admin/login");
  }
}
