"use client";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <Toaster position="top-center" />
      {children}
    </SessionProvider>
  );
}
