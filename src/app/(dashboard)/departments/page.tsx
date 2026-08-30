"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Search, Plus, MoreHorizontal, Building2, Pencil, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { PermissionGuard } from "@/components/shared/PermissionGuard";
import { PermissionEnum } from "@/types/auth.types";
import { getDepartments, deleteDepartment } from "@/services/department.service";
import { DepartmentModal } from "@/components/departments/DepartmentModal";
import type { Department } from "@/types/models.types";

export default function DepartmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [departmentToEdit, setDepartmentToEdit] = useState<Department | null>(null);
  
  const queryClient = useQueryClient();

  const { data: departments = [], isLoading } = useQuery({
    queryKey: ["departments"],
    queryFn: getDepartments,
  });

  const { mutate: removeDepartment } = useMutation({
    mutationFn: deleteDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      toast.success("Department deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete department");
    }
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      removeDepartment(id);
    }
  };

  const handleEdit = (department: Department) => {
    setDepartmentToEdit(department);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setDepartmentToEdit(null);
    setIsModalOpen(true);
  };

  const filteredDepartments = departments.filter((dept) =>
    dept.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-[#FAFAFA] p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-[#111111] font-semibold text-[24px] leading-[32px]">
            Departments
          </h1>
          <p className="text-[#737373] text-[14px]">
            Manage organizational departments and functional groups
          </p>
        </div>

        <PermissionGuard permission={PermissionEnum.DEPARTMENTS_CREATE}>
          <Button 
            onClick={handleCreate}
            className="bg-[#0891B2] hover:bg-[#0E7490] text-white rounded-[6px] px-4 py-2 font-medium h-[40px] shadow-sm transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Department
          </Button>
        </PermissionGuard>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="relative w-full sm:w-[320px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#A3A3A3]" />
          <Input
            placeholder="Search departments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-[40px] bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] placeholder:text-[#A3A3A3] focus-visible:ring-[#0891B2] rounded-[6px]"
          />
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 pb-10">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-[180px] w-full rounded-[10px]" />
          ))
        ) : filteredDepartments.length === 0 ? (
          <div className="col-span-full py-16 text-center text-[#737373]">
            No departments found matching "{searchQuery}"
          </div>
        ) : (
          filteredDepartments.map((dept) => (
            <div
              key={dept.id}
              className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-[10px] p-6 flex flex-col shadow-sm hover:border-[#0891B2] transition-colors group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-[42px] h-[42px] rounded-[8px] bg-[#E0F2FE] text-[#0369A1] flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-bold text-[#111111] group-hover:text-[#0891B2] transition-colors">
                      {dept.name}
                    </h3>
                    <Badge
                      variant="outline"
                      className={`font-medium px-2 py-0.5 rounded-[4px] text-[11px] border mt-1 inline-block ${
                        dept.isActive
                          ? "bg-[#F0FDF4] text-[#166534] border-[#BBF7D0]"
                          : "bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]"
                      }`}
                    >
                      {dept.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-[#A3A3A3] hover:text-[#111111] transition-colors focus:outline-none focus:ring-1 focus:ring-[#0891B2] rounded-[3px] p-0.5 inline-flex items-center justify-center">
                      <MoreHorizontal className="w-[18px] h-[18px]" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px]">
                      <PermissionGuard permission={PermissionEnum.DEPARTMENTS_UPDATE}>
                        <DropdownMenuItem 
                          className="cursor-pointer"
                          onClick={() => handleEdit(dept)}
                        >
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit Department
                        </DropdownMenuItem>
                      </PermissionGuard>
                      <PermissionGuard permission={PermissionEnum.DEPARTMENTS_DELETE}>
                        <DropdownMenuItem 
                          className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                          onClick={() => handleDelete(dept.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </PermissionGuard>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="flex-1 mt-2">
                <p className="text-[#525252] text-[14px] line-clamp-3 leading-relaxed">
                  {dept.description || "No description provided."}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#FAFAFA] flex items-center justify-between text-[12px] text-[#A3A3A3]">
                <span>Created: {new Date(dept.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        )}
      </div>

      <DepartmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        departmentToEdit={departmentToEdit}
      />
    </div>
  );
}
