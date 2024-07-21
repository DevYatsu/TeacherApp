import CustomClassPage from "@/components/classroom/custom-class-page";

export default function Page({ params }: { params: { id: string } }) {
  return <CustomClassPage classroomId={params.id} />;
}
