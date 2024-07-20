"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SVGProps, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { LockIcon, MailIcon } from "lucide-react";

interface IFormInput {
  username: string;
  password: string;
}

export default function Form() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/admin/dashboard");
  }

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<IFormInput>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const urlParams = useSearchParams();
  const isErrorUrl = urlParams.has("error");

  const [invalidError, saveInvalidError] = useLocalStorage(
    "showInputInvalidError",
    true
  );

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    setIsLoading(true);

    try {
      await signIn("credentials", {
        ...formData,
        redirect: true,
        callbackUrl: "/admin/dashboard",
      });
    } catch (error) {
      setError("root.serverError", {
        type: "400",
        message: "Invalid Credentials",
      });
    } finally {
      setIsLoading(false);
      saveInvalidError(true);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="text-muted-foreground">Teacher, enter your credentials</p>
        <p className="text-red-500">
          {isErrorUrl && invalidError && <span>Invalid Credentials</span>}
          {errors.root && <span>{errors.root["serverError"].message}</span>}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <div className="relative">
            <Input
              id="username"
              autoComplete=""
              type="text"
              placeholder="Username"
              className="pr-12"
              {...register("username", {
                required: true,
                onChange: () => {
                  clearErrors("root");
                  saveInvalidError(false);
                },
              })}
            />

            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <MailIcon className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="absolute inset-0 -z-10 animate-bubbles">
              <div className="absolute top-1/2 left-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00b8ff]/20" />
              <div className="absolute top-1/3 left-1/4 h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00b8ff]/20" />
              <div className="absolute top-2/3 left-3/4 h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00b8ff]/20" />
            </div>
          </div>
          {errors.username && (
            <p className="text-red-500 pl-4 pt-2">Username is required</p>
          )}
        </div>
        <div>
          <div className="relative">
            <Input
              id="password"
              type="password"
              placeholder="Password"
              className="pr-12"
              {...register("password", {
                required: true,
                onChange: () => {
                  clearErrors("root");
                  saveInvalidError(false);
                },
              })}
            />

            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <LockIcon className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="absolute inset-0 -z-10 animate-bubbles">
              <div className="absolute top-1/2 left-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00b8ff]/20" />
              <div className="absolute top-1/3 left-1/4 h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00b8ff]/20" />
              <div className="absolute top-2/3 left-3/4 h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00b8ff]/20" />
            </div>
          </div>
          {errors.password && (
            <p className="text-red-500 pl-4 pt-2">Password is required</p>
          )}
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Loading..." : "Sign In"}
      </Button>
    </form>
  );
}
