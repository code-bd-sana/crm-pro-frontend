"use client";

import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const rolesData = [
  {
    name: "Admin",
    members: 2,
    description: "Full system access",
    lastModified: "Apr 1, 2026",
  },
  {
    name: "Manager",
    members: 5,
    description: "Can manage projects and teams",
    lastModified: "Mar 28, 2026",
  },
  {
    name: "Staff",
    members: 12,
    description: "Can view and edit assigned tasks",
    lastModified: "Mar 25, 2026",
  },
  {
    name: "Custom Role",
    members: 3,
    description: "Custom permissions",
    lastModified: "Mar 20, 2026",
  },
];

export default function SecuritySettingsPage() {
  return (
    <div className="flex flex-col gap-6 h-full pb-20">
      
      {/* Roles & Permissions Section */}
      <div className="bg-white border border-[#E5E5E5] rounded-[10px] shadow-sm overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 pb-6">
          <h2 className="text-[16px] font-medium text-[#111111]">Roles & Permissions</h2>
          <Button className="bg-[#0891B2] hover:bg-[#0E7490] text-white h-[36px] px-4 rounded-[4px] font-medium">
            <Plus className="w-4 h-4 mr-2" />
            Create Role
          </Button>
        </div>
        
        <div className="px-6 pb-6">
          <div className="border border-[#E5E5E5] rounded-[8px] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#FAFAFA] hover:bg-[#FAFAFA]">
                  <TableHead className="text-[14px] font-medium text-[#111111] h-[40px] pl-4">Role Name</TableHead>
                  <TableHead className="text-[14px] font-medium text-[#111111] h-[40px]">Members</TableHead>
                  <TableHead className="text-[14px] font-medium text-[#111111] h-[40px]">Description</TableHead>
                  <TableHead className="text-[14px] font-medium text-[#111111] h-[40px]">Last Modified</TableHead>
                  <TableHead className="text-[14px] font-medium text-[#111111] h-[40px] text-right pr-4">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rolesData.map((role) => (
                  <TableRow key={role.name} className="hover:bg-[#F8FAFC]">
                    <TableCell className="font-medium text-[14px] text-[#111111] pl-4">
                      {role.name}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-[#F5F5F5] text-[#111111] hover:bg-[#F5F5F5] rounded-[4px] font-medium px-2 py-0.5">
                        {role.members}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-[14px] text-[#737373]">
                      {role.description}
                    </TableCell>
                    <TableCell className="text-[14px] text-[#737373]">
                      {role.lastModified}
                    </TableCell>
                    <TableCell className="text-right pr-4">
                      <Button variant="ghost" className="text-[#111111] font-medium text-[14px] hover:bg-[#F5F5F5] h-8 px-3 rounded-[4px]">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

    </div>
  );
}
