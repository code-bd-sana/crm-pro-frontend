"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus, Shield, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getRoles } from "@/services/role.service";
import { useRBAC } from "@/hooks/useRBAC";
import { PermissionEnum } from "@/types/auth.types";
import { PermissionGuard } from "@/components/shared/PermissionGuard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RoleModal } from "@/components/settings/RoleModal";

export default function RolesManagementPage() {
  const { hasPermission } = useRBAC();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<any>(null);

  const { data: roles, isLoading } = useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
  });

  return (
    <div className="flex flex-col h-full bg-white border border-[#E5E5E5] rounded-[10px] p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[#111111] font-semibold text-[20px]">Roles & Permissions</h2>
          <p className="text-[#737373] text-[14px] mt-1">Manage system roles and their access levels.</p>
        </div>
        
        <PermissionGuard permission={PermissionEnum.ROLES_CREATE}>
          <Button 
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-[#0891B2] hover:bg-[#0E7490] text-white rounded-[4px] h-[36px]"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Role
          </Button>
        </PermissionGuard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-[140px] w-full rounded-[8px]" />
          ))
        ) : (
          roles?.map((role) => (
            <div 
              key={role.id} 
              className="flex flex-col border border-[#E5E5E5] rounded-[8px] p-5 hover:border-[#0891B2] transition-colors bg-[#FAFAFA]"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E0F2FE] flex items-center justify-center text-[#0891B2]">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[#111111] font-semibold text-[16px]">{role.name}</h3>
                    {role.isSystem && (
                      <span className="inline-block px-2 py-0.5 mt-1 bg-[#F3F4F6] text-[#4B5563] text-[10px] font-medium rounded-[4px]">
                        SYSTEM
                      </span>
                    )}
                  </div>
                </div>

                {hasPermission(PermissionEnum.ROLES_UPDATE) && (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md text-[#737373] hover:text-[#111111] hover:bg-slate-100 transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px]">
                      <DropdownMenuItem 
                        className="cursor-pointer"
                        onClick={() => setEditingRole(role)}
                      >
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit Role
                      </DropdownMenuItem>
                      {!role.isSystem && (
                        <PermissionGuard permission={PermissionEnum.ROLES_DELETE}>
                          <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Role
                          </DropdownMenuItem>
                        </PermissionGuard>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>

              <p className="text-[#737373] text-[13px] line-clamp-2 mt-auto">
                {role.description || "No description provided."}
              </p>
            </div>
          ))
        )}
      </div>

      <RoleModal 
        isOpen={isCreateModalOpen || !!editingRole} 
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingRole(null);
        }} 
        roleToEdit={editingRole} 
      />
    </div>
  );
}
