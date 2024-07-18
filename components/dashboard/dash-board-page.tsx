import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import LogoutLink from "./LogoutLink";
import ClassesSection from "./ClassesSection";

export function DashBoardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-center h-16 border-b bg-card shadow-sm sm:px-6">
        <div className="flex items-center container">
          <div className="flex items-center gap-2 sm:gap-4 px-4 sm:px-0">
            <Avatar className="border">
              <AvatarImage src="/placeholder-user.jpg" alt="AvatarImage" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="grid gap-0.5">
              <div className="font-medium text-sm sm:text-lg">John Doe</div>
              <div className="text-sm text-muted-foreground">Teacher</div>
            </div>
          </div>
          <nav className="ml-auto flex items-center gap-4">
            <Link
              href="#"
              className="text-muted-foreground text-md sm:text-lg hover:text-foreground"
              prefetch={false}
            >
              Classes
            </Link>
            <Link
              href="#"
              className="text-muted-foreground text-md sm:text-lg hover:text-foreground"
              prefetch={false}
            >
              Shared
            </Link>
            <LogoutLink />
          </nav>
        </div>
      </header>
      <main className="flex-1 flex justify-center p-4 sm:pt-8 sm:p-6 bg-background">
        <ClassesSection />
      </main>
    </div>
  );
}
