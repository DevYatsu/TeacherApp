import { PropsWithChildren } from "react";

export default function Chapter({
  title,
  children,
  className,
}: PropsWithChildren<{ title: string; className?: string }>) {
  return (
    <section className={className}>
      <h2 className="mb-8 text-2xl font-bold">{title}</h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {children}{" "}
      </div>
    </section>
  );
}
