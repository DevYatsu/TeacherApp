"use client";
import { Card, CardContent } from "@/components/ui/card";
import { SVGProps } from "react";
import LogoutButton from "./LogoutButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function LogoutPage() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    router.push("/admin/login");
  }

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 bg-gradient-to-t from-[#aac9eb] to-[#e795d1]">
      <Card className="mx-auto max-w-sm">
        <CardContent className="flex flex-col items-center justify-center gap-6 p-8">
          <LogOutIcon className="h-12 w-12 text-primary" />
          <div className="space-y-1 text-center">
            <h3 className="text-2xl font-bold">Logout</h3>
            <p className="text-muted-foreground">
              Are you sure you want to logout?
            </p>
          </div>
          <LogoutButton />
        </CardContent>
      </Card>
    </div>
  );
}

function LogOutIcon(props?: SVGProps<SVGSVGElement>) {
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
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}
