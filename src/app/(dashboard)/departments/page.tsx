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

      {/* Table Content */}
      <div className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-[8px] overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#E5E5E5] text-[12px] font-semibold text-[#737373] tracking-wider uppercase">
                <th className="px-6 py-4 w-[50px]">
                  <input type="checkbox" className="rounded-[4px] border-[#D4D4D8] text-[#0891B2] focus:ring-[#0891B2]" />
                </th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4 hidden md:table-cell">Description</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 hidden sm:table-cell">Created</th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="text-[14px] text-[#111111]">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-[#E5E5E5]">
                    <td className="px-6 py-4"><Skeleton className="h-4 w-4" /></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-[36px] w-[36px] rounded-full" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell"><Skeleton className="h-4 w-48" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-6 w-16 rounded-full" /></td>
                    <td className="px-6 py-4 hidden sm:table-cell"><Skeleton className="h-4 w-24" /></td>
                    <td className="px-6 py-4 text-right"><Skeleton className="h-8 w-8 ml-auto" /></td>
                  </tr>
                ))
              ) : filteredDepartments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-[#737373]">
                    No departments found matching "{searchQuery}"
                  </td>
                </tr>
              ) : (
                filteredDepartments.map((dept) => {
                  // Generate an acronym for the avatar (e.g. "Human Resources" -> "HR")
                  const initials = dept.name
                    .split(' ')
                    .map(word => word[0])
                    .join('')
                    .substring(0, 2)
                    .toUpperCase();

                  return (
                    <tr 
                      key={dept.id} 
                      className="border-b border-[#E5E5E5] hover:bg-[#F9FAFB] transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <input type="checkbox" className="rounded-[4px] border-[#D4D4D8] text-[#0891B2] focus:ring-[#0891B2]" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-[36px] h-[36px] rounded-full bg-[#F0F9FF] border border-[#BAE6FD] text-[#0284C7] flex items-center justify-center font-medium text-[13px]">
                            {initials}
                          </div>
                          <span className="font-semibold text-[#111111]">{dept.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell text-[#525252] max-w-[300px] truncate">
                        {dept.description || "-"}
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant="outline"
                          className={`font-medium px-2.5 py-0.5 rounded-[4px] text-[12px] border ${
                            dept.isActive
                              ? "bg-[#F0FDF4] text-[#166534] border-[#BBF7D0]"
                              : "bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]"
                          }`}
                        >
                          {dept.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 hidden sm:table-cell text-[#525252]">
                        {new Date(dept.createdAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger className="text-[#A3A3A3] hover:text-[#111111] transition-colors focus:outline-none rounded-[4px] p-1.5 opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100">
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
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination (Visual Only) */}
        {!isLoading && filteredDepartments.length > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-[#E5E5E5] bg-white">
            <div className="text-[13px] text-[#737373]">
              Showing 1 to {filteredDepartments.length} of {departments.length} entries
            </div>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" className="h-8 px-3 text-[13px] border-[#E5E5E5] bg-white text-[#525252] hover:bg-[#F9FAFB] hover:text-[#111111]">Previous</Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-[13px] border-[#0891B2] bg-[#0891B2] text-white hover:bg-[#0E7490] hover:text-white">1</Button>
              <Button variant="outline" size="sm" className="h-8 px-3 text-[13px] border-[#E5E5E5] bg-white text-[#525252] hover:bg-[#F9FAFB] hover:text-[#111111]">Next</Button>
            </div>
          </div>
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
