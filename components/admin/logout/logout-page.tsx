"use client";
import { Card, CardContent } from "@/components/ui/card";
import LogoutButton from "./LogoutButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOutIcon } from "lucide-react";

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
          <Link
            href="/admin/dashboard"
            className="text-center text-sm underline"
            prefetch={true}
          >
            Go back to dashboard
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
