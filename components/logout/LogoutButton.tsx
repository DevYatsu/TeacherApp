"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

export default function LogoutButton({ text }: { text?: string }) {
  

  return (
    <Button
      className="w-full"
      onClick={() => signOut({ redirect: true, callbackUrl: "/admin/login" })}
    >
      {text ?? "Confirm Logout"}
    </Button>
  );
}
