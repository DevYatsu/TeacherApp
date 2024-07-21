import authOptions from "@/lib/authOptions";
import { deleteFolder } from "@/lib/google-drive/folder";
import { getServerSession } from "next-auth";
import { revalidatePath, revalidateTag } from "next/cache";

export const POST = async (request: Request) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 403 });
  }

  try {
    const { id, parentFolderId } = await request.json();

    if (typeof id !== "string" || typeof parentFolderId !== "string") {
      return new Response("Invalid Body!", { status: 400 });
    }

    revalidatePath(`/admin/classroom/${parentFolderId}`);
    revalidatePath(`/classroom/${parentFolderId}`);
    await deleteFolder(id);

    return new Response(`Chapter '${id}' deleted successfully!`, {
      status: 200,
    });
  } catch (error: any) {
    console.error("Error deleting chapter:", error.message);
    return new Response("Internal Server Error", { status: 500 });
  }
};
