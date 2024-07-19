"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { revalidatePath } from "next/cache";

type ClassroomFormInputs = {
  name: string;
  studentsNumber?: number;
};

export default function CreateClassroomButton() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <CreateClassModal open={openModal} setIsOpen={setOpenModal} />
      <Button onClick={() => setOpenModal(true)}>Create New Classroom</Button>
    </>
  );
}

function CreateClassModal({
  open,
  setIsOpen,
}: {
  open: boolean;
  setIsOpen: (newState: boolean) => void;
}) {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ClassroomFormInputs>({});

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<ClassroomFormInputs> = async (data) => {
    setIsLoading(true);
    // send request with data to backend and then to gg drive

    try {
      data.name = data.name.trim();

      const response = await fetch("/api/classes", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const result = await response.text();

      if (!response.ok) {
        setError("root.serverError", {
          type: "400",
          message: result ?? "Failed to created new class",
        });
      } else {
        setIsOpen(false);
        revalidatePath("/admin/dashboard");
      }
    } catch (error) {
      setError("root.serverError", {
        type: "400",
        message:
          error instanceof Error
            ? error.message
            : typeof error === "string"
            ? error
            : "Failed to created new class",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Classroom</DialogTitle>
          <DialogDescription>
            Enter the details for your new classroom.
          </DialogDescription>
          {errors.root && (
            <span className="text-red-500 text-sm">
              {errors.root["serverError"].message}
            </span>
          )}
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          id="modal-form"
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
            <p className="text-red-500 text-sm">Classroom name is required</p>
          )}
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="studentsNumber">Students&apos;s number</Label>
            <Input
              id="studentsNumber"
              type="number"
              className="col-span-3 font-semibold"
              {...register("studentsNumber", {
                required: false,
                onChange: () => {
                  clearErrors("root");
                },
              })}
            />
          </div>
        </form>
        <DialogFooter>
          <Button type="submit" form="modal-form" disabled={isLoading}>
            {isLoading ? "Loading..." : "Create Classroom"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
