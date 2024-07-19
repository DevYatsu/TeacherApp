import CustomClassPage from "@/components/classroom/custom-class-page";

export default function Page({ params }: { params: { id: string } }) {
  console.log(params.id);
  console.log("test");

  return <CustomClassPage classroomId={params.id} />;
}
