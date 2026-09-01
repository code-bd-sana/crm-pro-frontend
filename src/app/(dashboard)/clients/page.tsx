"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus, Search, MoreHorizontal, Edit, Trash, Eye, Building2 } from "lucide-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { getClients, deleteClient } from "@/services/client.service";
import { Client, ClientStatus } from "@/types/models.types";
import { PermissionGuard } from "@/components/shared/PermissionGuard";
import { PermissionEnum } from "@/types/auth.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/useDebounce";
import { ClientModal } from "@/components/clients/ClientModal";

export default function ClientsPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientToEdit, setClientToEdit] = useState<Client | null>(null);
  
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data: clientsData, isLoading, refetch } = useQuery({
    queryKey: ["clients", page, limit, debouncedSearch],
    queryFn: () => getClients({ page, limit, search: debouncedSearch }),
  });

  // Reset page to 1 when search changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const handleEdit = (client: Client) => {
    setClientToEdit(client);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setClientToEdit(null);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!clientToDelete) return;
    try {
      await deleteClient(clientToDelete.id);
      toast.success("Client deleted successfully");
      refetch();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete client");
    } finally {
      setIsDeleteDialogOpen(false);
      setClientToDelete(null);
    }
  };

  const renderStatus = (status: ClientStatus) => {
    switch (status) {
      case ClientStatus.ACTIVE:
        return (
          <div className="inline-flex items-center px-2 py-1 rounded bg-[#ECFDF5] text-[#059669]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] mr-1.5"></div>
            <span className="text-xs font-medium">Active</span>
          </div>
        );
      case ClientStatus.INACTIVE:
        return (
          <div className="inline-flex items-center px-2 py-1 rounded bg-[#FEF2F2] text-[#DC2626]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#EF4444] mr-1.5"></div>
            <span className="text-xs font-medium">Inactive</span>
          </div>
        );
      case ClientStatus.LEAD:
        return (
          <div className="inline-flex items-center px-2 py-1 rounded bg-[#FFFBEB] text-[#D97706]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mr-1.5"></div>
            <span className="text-xs font-medium">Lead</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col flex-1 px-6 pt-6 pb-6 gap-6 h-full w-full bg-[#FAFAFA]">
      <div className="flex items-center justify-between h10">
        <div>
          <h1 className="text-[24px] font-semibold text-[#111111] leading-[32px]">Clients</h1>
          <p className="text-[14px] text-[#737373] mt-1">Manage and track your client relationships</p>
        </div>
        
        <PermissionGuard permission={PermissionEnum.CLIENTS_CREATE}>
          <Button 
            onClick={handleCreate}
            className="bg-[#0891B2] hover:bg-[#0E7490] text-white rounded-[6px] px-4 py-2 font-medium transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Client
          </Button>
        </PermissionGuard>
      </div>

      <div className="bg-white border border-[#E5E5E5] rounded-[10px] flex-1 flex flex-col min-h-0 overflow-hidden shadow-sm">
        {/* Table Header Controls */}
        <div className="px-6 py-4 border-b border-[#E5E5E5] flex items-center justify-between gap-4">
          <div className="relative w-full max-w-[320px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A3A3A3] w-4 h-4" />
            <Input 
              placeholder="Search clients..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-[36px] bg-[#FFFFFF] border-[#E5E5E5] text-[14px] rounded-[4px] focus-visible:ring-1 focus-visible:ring-[#0891B2] w-full"
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-[#F5F5F5] sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 border-b border-[#E5E5E5] text-[12px] font-medium text-[#737373] uppercase tracking-wider w-[40px]">
                  <input type="checkbox" className="rounded border-gray-300 text-[#0891B2] focus:ring-[#0891B2]" />
                </th>
                <th className="px-6 py-3 border-b border-[#E5E5E5] text-[12px] font-medium text-[#737373] uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 border-b border-[#E5E5E5] text-[12px] font-medium text-[#737373] uppercase tracking-wider">Industry</th>
                <th className="px-6 py-3 border-b border-[#E5E5E5] text-[12px] font-medium text-[#737373] uppercase tracking-wider">Contact Person</th>
                <th className="px-6 py-3 border-b border-[#E5E5E5] text-[12px] font-medium text-[#737373] uppercase tracking-wider">Last Active</th>
                <th className="px-6 py-3 border-b border-[#E5E5E5] text-[12px] font-medium text-[#737373] uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 border-b border-[#E5E5E5] text-[12px] font-medium text-[#737373] uppercase tracking-wider w-[60px]"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5] bg-white">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="w-4 h-4 bg-gray-200 rounded"></div></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-[120px]"></div>
                          <div className="h-3 bg-gray-200 rounded w-[80px]"></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-[80px]"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-[100px]"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-[90px]"></div></td>
                    <td className="px-6 py-4"><div className="h-6 bg-gray-200 rounded-full w-[60px]"></div></td>
                    <td className="px-6 py-4"><div className="h-8 bg-gray-200 rounded w-8"></div></td>
                  </tr>
                ))
              ) : clientsData?.data?.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-[#737373]">
                    No clients found.
                  </td>
                </tr>
              ) : (
                clientsData?.data?.map((client: Client) => (
                  <tr 
                    key={client.id} 
                    className="hover:bg-[#F8FAFC] transition-colors group cursor-pointer"
                    onClick={() => router.push(`/clients/${client.id}`)}
                  >
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <input type="checkbox" className="rounded border-gray-300 text-[#0891B2] focus:ring-[#0891B2]" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#0891B2]/10 text-[#0891B2] flex items-center justify-center flex-shrink-0 font-medium text-xs">
                          {client.companyName.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[14px] font-medium text-[#111111] truncate group-hover:text-[#0891B2] transition-colors">{client.companyName}</span>
                          <span className="text-[12px] text-[#737373] truncate mt-0.5">{client.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-[#737373]">
                        <Building2 className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                        <span className="text-[14px] truncate">{client.industry || '-'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-[#737373]">
                        <span className="text-[14px] truncate">{client.contactPerson || '-'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[14px] text-[#737373]">
                        {client.updatedAt ? format(new Date(client.updatedAt), 'MMM d, yyyy') : '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {renderStatus(client.status)}
                    </td>
                    <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <div role="button" className="inline-flex items-center justify-center h-8 w-8 p-0 text-[#737373] hover:text-[#111111]">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                          <DropdownMenuItem onClick={() => router.push(`/clients/${client.id}`)} className="text-[13px] text-[#404040] cursor-pointer">
                            <Eye className="mr-2 h-4 w-4 text-[#737373]" />
                            View Profile
                          </DropdownMenuItem>
                          
                          <PermissionGuard permission={PermissionEnum.CLIENTS_UPDATE}>
                            <DropdownMenuItem onClick={() => handleEdit(client)} className="text-[13px] text-[#404040] cursor-pointer">
                              <Edit className="mr-2 h-4 w-4 text-[#737373]" />
                              Edit details
                            </DropdownMenuItem>
                          </PermissionGuard>
                          
                          <PermissionGuard permission={PermissionEnum.CLIENTS_DELETE}>
                            <DropdownMenuItem 
                              onClick={() => {
                                setClientToDelete(client);
                                setIsDeleteDialogOpen(true);
                              }}
                              className="text-[13px] text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Delete client
                            </DropdownMenuItem>
                          </PermissionGuard>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {clientsData && clientsData.meta && (
          <div className="px-6 py-4 border-t border-[#E5E5E5] flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#FFFFFF]">
            <p className="text-[14px] text-[#737373]">
              Showing <span className="font-medium text-[#111111]">{(page - 1) * limit + 1}</span> to <span className="font-medium text-[#111111]">{Math.min(page * limit, clientsData.meta.total)}</span> of <span className="font-medium text-[#111111]">{clientsData.meta.total}</span> entries
            </p>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="h-8 text-[13px] text-[#111111] border-[#E5E5E5] hover:bg-[#F8FAFC]"
              >
                Previous
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setPage(p => p + 1)}
                disabled={page >= clientsData.meta.totalPages}
                className="h-8 text-[13px] text-[#111111] border-[#E5E5E5] hover:bg-[#F8FAFC]"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      <ClientModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        clientToEdit={clientToEdit}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the client <span className="font-semibold text-black">{clientToDelete?.companyName}</span>. 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete Client
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
