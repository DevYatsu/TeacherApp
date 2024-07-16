"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SVGProps, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

interface IFormInput {
  username: string;
  password: string;
}

export default function Form() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IFormInput>({});

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError("root.serverError", {
          type: "400",
          message: data.message ?? "Data submission failed.",
        });
      }

      router.push("/admin/dashboard");
    } catch (error) {
      setError("root.serverError", {
        type: "400",
        message: "Data submission failed.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="text-muted-foreground">Teacher, enter your credentials</p>
        <p className="text-red-500">
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
              {...register("username", { required: true })}
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
              {...register("password", { required: true })}
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

function LockIcon(props?: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function MailIcon(props?: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
