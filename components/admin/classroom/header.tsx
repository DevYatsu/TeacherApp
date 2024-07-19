export default function AdminClassRoomHeader({
  classroomName,
}: {
  classroomName: string;
}) {
  return (
    <section className="flex bg-primary pt-4 pb-8 md:py-12 lg:py-16 justify-center">
      <div className="container flex flex-col items-center justify-center space-y-4 text-center">
        <h1 className="text-2xl font-bold tracking-tighter text-primary-foreground sm:text-3xl md:text-4xl lg:text-5xl">
          {classroomName} Files
        </h1>
        <p className="max-w-[600px] text-primary-foreground md:text-lg">
          Update available files for {classroomName}!
        </p>
      </div>
    </section>
  );
}
