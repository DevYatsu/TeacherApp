"use client";

import { Button } from "@/components/ui/button";
import { CloudUploadIcon, XIcon } from "lucide-react";
import { ChangeEvent, PropsWithChildren, useState } from "react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";

export default function AdminChapter({
  name,
  children,
  id,
  parentFolderId,
}: PropsWithChildren<{ name: string; id: string; parentFolderId: string }>) {
  const router = useRouter();
  const [deleteClickable, setDeleteClickable] = useState(true);
  const [uploadClickable, setUploadClickable] = useState(true);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setUploadClickable(false);

    const files = Array.from(e.target.files || []);

    const formData = new FormData();
    formData.append("parentFolderId", parentFolderId);
    formData.append("id", id);

    files.forEach((file) => {
      formData.append("files", file);
    });

    const requestHandler = async () => {
      try {
        const resp = await fetch(`/api/file/upload`, {
          method: "POST",
          body: formData,
        });

        if (!resp.ok) {
          throw new Error(await resp.text());
        }

        return resp;
      } catch (error) {
        console.error("Error uploading file:", error);
        throw error; // Re-throw the error after logging it
      }
    };

    try {
      await toast.promise(requestHandler(), {
        loading: "Uploading...",
        success: <b>File(s) uploaded!</b>,
        error: <b>Uh Oh, an error occurred.</b>,
      });

      router.refresh();
    } finally {
      setUploadClickable(true);
    }
  };

  const handleUploadClick = () => {
    const uploadInput = document.getElementById(
      `upload-input-${id}`
    ) as HTMLInputElement;
    if (uploadInput) {
      uploadInput.click();
    }
  };

  const handleDeleteClick = async () => {
    setDeleteClickable(false);

    const requestHandler = async () => {
      try {
        const resp = await fetch(`/api/chapter/delete`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, parentFolderId }),
        });

        if (!resp.ok) {
          throw new Error(await resp.text());
        }

        return resp;
      } catch (error) {
        console.error("Error deleting chapter:", error);
        throw error; // Re-throw the error after logging it
      }
    };

    try {
      await toast.promise(requestHandler(), {
        loading: "Loading...",
        success: <b>Chapter deleted!</b>,
        error: <b>Uh Oh, an error occured.</b>,
      });

      router.refresh();
    } finally {
      setDeleteClickable(true);
    }
  };

  return (
    <div className="bg-card rounded-md p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">{name}</h3>
        <div className="flex items-center gap-2">
          <Input
            type="file"
            id={`upload-input-${id}`}
            className="hidden"
            onChange={handleFileChange}
          />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  disabled={!uploadClickable}
                  variant="ghost"
                  className="hover:bg-muted/50 text-muted-foreground"
                  onClick={handleUploadClick}
                >
                  <CloudUploadIcon className="h-5 w-5" />
                  <span className="sr-only">Upload Chapter</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Upload Files</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  disabled={!deleteClickable}
                  variant="ghost"
                  className="hover:bg-muted/50 text-muted-foreground"
                  onClick={handleDeleteClick}
                >
                  <XIcon className="h-5 w-5" />
                  <span className="sr-only">Delete Chapter</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete Chapter</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="space-y-2">
        {children ?? "No file to display for the moment"}
      </div>
    </div>
  );
}
