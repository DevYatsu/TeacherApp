"use client";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function DeleteClassButton({ id }: { id: string }) {
  const router = useRouter();

  const handleClick = async () => {
    await toast.promise(requestHandler(), {
      loading: "Loading...",
      success: <b>Classroom deleted!</b>,
      error: <b>Uh Oh, an error occured.</b>,
    });

    router.refresh();
  };

  const requestHandler = async () => {
    try {
      const resp = await fetch("/api/classroom/delete", {
        method: "POST",
        body: JSON.stringify({ id }),
      });

      if (!resp.ok) {
        throw new Error(await resp.text());
      }
    } catch (error) {
      console.error("Error deleting chapter:", error);
      throw error; // Re-throw the error after logging it
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="absolute top-3 right-3"
      onClick={handleClick}
    >
      <TrashIcon className="h-4 w-4" />
      <div className="sr-only">Delete Classroom</div>
    </Button>
  );
}
