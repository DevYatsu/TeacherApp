import AdminClassPage from "@/components/admin/classroom/admin-class-page";

export default function Page({ params }: { params: { id: string } }) {
  return <AdminClassPage classroomId={params.id} />;
}
