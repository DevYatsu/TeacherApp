import authOptions from "@/lib/authOptions";
import { deleteFile } from "@/lib/google-drive/files";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const POST = async (request: Request) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 403 });
  }

  try {
    const { id } = await request.json();

    if (typeof id !== "string") {
      return new Response("Invalid Body!", { status: 400 });
    }

    await deleteFile(id);
    revalidatePath(`/classroom/${id}`);
    revalidatePath(`/admin/classroom/${id}`);

    return new Response(`Classroom '${id}' deleted successfully!`, {
      status: 200,
    });
  } catch (error: any) {
    console.error("Error deleting classroom:", error.message);
    return new Response("Internal Server Error", { status: 500 });
  }
};
