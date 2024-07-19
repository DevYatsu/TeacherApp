import Link from "next/link";

export function PageNotFound({
  redirectUrl,
  redirectMessage,
}: {
  redirectUrl?: string;
  redirectMessage?: string;
}) {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <div className="relative">
          <h1 className="text-7xl font-bold tracking-tighter text-foreground sm:text-8xl">
            404
          </h1>
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-50 blur-[100px] animate-glitch" />
        </div>
        <p className="mt-4 text-muted-foreground">
          Oops, the page you&apos;re looking for doesn&apos;t exist.
        </p>
        <div className="mt-6">
          <Link
            href={redirectUrl ?? "/"}
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            prefetch={true}
          >
            {redirectMessage ?? "Go to Homepage"}
          </Link>
        </div>
      </div>
    </div>
  );
}
