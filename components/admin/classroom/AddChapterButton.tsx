"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type AddChapterFormInputs = {
  name: string;
};

export default function AddChapterButton({ folderId }: { folderId: string }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Modal open={openModal} setIsOpen={setOpenModal} folderId={folderId} />
      <Button
        onClick={() => setOpenModal(true)}
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      >
        Add Chapter
      </Button>
    </>
  );
}

function Modal({
  open,
  setIsOpen,
  folderId: parentFolderId,
}: {
  open: boolean;
  setIsOpen: (newState: boolean) => void;
  folderId: string;
}) {
  const {
    register,
    resetField,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<AddChapterFormInputs>({});

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<AddChapterFormInputs> = async (data) => {
    setIsLoading(true);
    // send request with data to backend and then to gg drive

    try {
      data.name = data.name.trim();

      const response = await fetch("/api/chapter/create", {
        method: "POST",
        body: JSON.stringify({ parentFolderId, ...data }),
      });
      const result = await response.json();

      // on success result.data.id is the id of the newly created file

      if (!response.ok) {
        setError("root.serverError", {
          type: "400",
          message: result ?? "Failed to created new chapter",
        });
      } else {
        setIsOpen(false);
        router.refresh();
        resetField("name");
      }
    } catch (error) {
      setError("root.serverError", {
        type: "400",
        message:
          typeof error === "string" ? error : "Failed to created new chapter",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Chapter</DialogTitle>
          <DialogDescription>
            Enter the details for your new chapter.
          </DialogDescription>
          {errors.root && (
            <span className="text-red-500 text-sm">
              {errors.root["serverError"].message}
            </span>
          )}
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          id="add-chapter-form"
          className="grid gap-4 py-4"
        >
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              className="col-span-3 font-semibold"
              {...register("name", {
                required: true,
                onChange: () => {
                  clearErrors("root");
                },
              })}
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-sm">Chapter name is required</p>
          )}
        </form>
        <DialogFooter>
          <Button type="submit" form="add-chapter-form" disabled={isLoading}>
            {isLoading ? "Loading..." : "Create Chapter"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
