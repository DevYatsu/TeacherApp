import Link from "next/link";

export function ErrorPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <div className="relative">
          <h1 className="text-9xl font-bold tracking-tighter text-primary">
            Oops!
          </h1>
          <div className="absolute inset-0 animate-glitch text-9xl font-bold tracking-tighter text-primary">
            Oops!
          </div>
        </div>
        <p className="mt-4 text-2xl font-medium text-muted-foreground">
          Something went wrong.
        </p>
        <div className="mt-6">
          <Link
            href="#"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            prefetch={false}
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
