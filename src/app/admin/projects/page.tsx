import ProjectForm from '@/modules/admin/components/ProjectForm';
import { ProjectList } from '@/modules/admin/components/ProjectList';

export default function AdminProjectsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Quản lý Dự án</h1>
      <ProjectForm />
      <div className="border-t border-gray-200 my-6" />
      <ProjectList />
    </div>
  );
}