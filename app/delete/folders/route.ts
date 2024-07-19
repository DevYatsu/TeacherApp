import { deleteAllFolders } from "@/lib/google-drive/folder";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// PROTECTED BY AUTH MIDDLEWARE

export const GET = async (_request: Request) => {
  revalidatePath("/admin/dashboard");
  await deleteAllFolders();
  await new Promise((resolve) => setTimeout(() => resolve(null), 1000));
  redirect("/admin/dashboard");
};
