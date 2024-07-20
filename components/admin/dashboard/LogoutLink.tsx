import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOutIcon } from "lucide-react";

export default function LogoutLink() {
  return (
    <Button variant="ghost" size="icon" className="ml-auto">
      <Link href="/admin/logout" className="w-5 h-5">
        <LogOutIcon className="w-5 h-5" aria-label="logout link" />
      </Link>
      <span className="sr-only">Logout</span>
    </Button>
  );
}
