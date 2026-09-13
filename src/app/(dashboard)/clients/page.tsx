"use client";

import Link from "next/link";
import { Search, Filter, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { NewClientButton } from "@/components/dashboard/NewClientButton";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getClients } from "@/services/client.service";
import { useState } from "react";
import { ClientFormModal } from "@/components/dashboard/ClientFormModal";
import { DeleteClientModal } from "@/components/dashboard/DeleteClientModal";
import { Client } from "@/types/models.types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ClientsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientToEdit, setClientToEdit] = useState<Client | null>(null);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);

  const handleOpenAdd = () => {
    setClientToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (client: Client) => {
    setClientToEdit(client);
    setIsModalOpen(true);
  };

  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: response, isLoading, isError } = useQuery({
    queryKey: ['clients', page, limit],
    queryFn: () => getClients({ page, limit }),
  });

  const clients = response?.data || [];
  const meta = response?.meta;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <p className="text-[#737373]">Loading clients...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <p className="text-red-500">Failed to load clients.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 px-6 pt-6 pb-6 gap-6 h-full w-full">

      {/* Header */}
      <div className="flex items-center justify-between h10">
        <h1 className="text-[#111111] font-semibold text-[24px] leading-[32px]">Clients</h1>
        <NewClientButton onClick={handleOpenAdd} />
      </div>

      {/* Controls Container (Search & Filter) */}
      <div className="flex items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
          <Input
            placeholder="Search clients..."
            className="w-full pl-9 h-9 border-[#E5E5E5] focus-visible:ring-[#0891B2] bg-[#FFFFFF] text-[#111111] placeholder:text-[#737373]"
          />
        </div>

        {/* Filter Button */}
        <button className="flex items-center justify-center bg-[#FFFFFF] border border-[#E5E5E5] hover:bg-gray-50 text-[#111111] rounded-[4px] h-[36px] px-4 transition-colors shrink-0">
          <Filter className="w-4 h-4 text-[#737373]" />
          <span className="font-medium text-[14px]">Filter</span>
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[10px] border border-[#E5E5E5] overflow-hidden flex flex-col">
        <Table className="w-full text-left min-w-[1000px]">
          <TableHeader>
            <TableRow className="bg-[#F5F5F5] border-b border-[#E5E5E5] hover:bg-[#F5F5F5]">
              <TableHead className="w-12 px-6 py-3">
                <input type="checkbox" className="w-4 h-4 rounded border-[#E5E5E5] text-[#0891B2] focus:ring-[#0891B2]" />
              </TableHead>
              <TableHead className="px-6 py-3 text-[12px] font-medium text-[#737373] uppercase tracking-wider">Client</TableHead>
              <TableHead className="px-6 py-3 text-[12px] font-medium text-[#737373] uppercase tracking-wider">Industry</TableHead>
              <TableHead className="px-6 py-3 text-[12px] font-medium text-[#737373] uppercase tracking-wider">Contact</TableHead>
              <TableHead className="px-6 py-3 text-[12px] font-medium text-[#737373] uppercase tracking-wider">Last Active</TableHead>
              <TableHead className="px-6 py-3 text-[12px] font-medium text-[#737373] uppercase tracking-wider">Status</TableHead>
              <TableHead className="px-6 py-3 text-[12px] font-medium text-[#737373] uppercase tracking-wider text-right">LTV</TableHead>
              <TableHead className="w-12 px-6 py-3"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-6 text-[#737373]">
                  No clients found.
                </TableCell>
              </TableRow>
            ) : (
              clients.map((client, idx) => (
                <TableRow key={client.id} className={`hover:bg-gray-50 transition-colors ${idx !== clients.length - 1 ? 'border-b border-[#E5E5E5]' : 'border-0'}`}>
                  <TableCell className="px-6 py-4">
                    <input type="checkbox" className="w-4 h-4 rounded border-[#E5E5E5] text-[#0891B2] focus:ring-[#0891B2]" />
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <Link href={`/clients/${client.id}`} className="flex items-center gap-3 group">
                      <div className="w-8 h-8 rounded-full bg-[#0891B2]/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-[#0891B2] font-medium text-[12px]">
                          {client.companyName ? client.companyName.substring(0, 2).toUpperCase() : 'CL'}
                        </span>
                      </div>
                      <span className="text-[#111111] font-medium text-[14px] group-hover:text-[#0891B2] transition-colors">{client.companyName}</span>
                    </Link>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <span className="text-[#737373] font-normal text-[14px]">{client.industry || '-'}</span>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <span className="text-[#737373] font-normal text-[14px]">{client.contactPerson || '-'}</span>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <span className="text-[#737373] font-normal text-[14px]">
                      {new Date(client.updatedAt).toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    {client.status === "ACTIVE" ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-[4px] bg-[#DCFCE7] text-[#166534] font-medium text-[12px]">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-[4px] border border-[#E5E5E5] bg-[#FFFFFF] text-[#737373] font-medium text-[12px]">
                        {client.status.charAt(0).toUpperCase() + client.status.slice(1).toLowerCase()}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <span className="text-[#111111] font-medium text-[14px]">-</span>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="text-[#737373] hover:text-[#111111] transition-colors p-1 outline-none rounded hover:bg-gray-100">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuItem onClick={() => handleOpenEdit(client)} className="cursor-pointer">
                          Edit Client
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setClientToDelete(client)} className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50">
                          Delete Client
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer */}
      {meta && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-2">
          <p className="text-[14px] text-[#737373]">
            Showing {((meta.page - 1) * meta.limit) + 1} to {Math.min(meta.page * meta.limit, meta.total)} of {meta.total} entries
          </p>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              className="border-[#E5E5E5] bg-white text-[#111111] font-medium h-9 px-4 hover:bg-[#F8FAFC] rounded-[3px]"
              disabled={meta.page <= 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
            >
              Previous
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map((p) => (
                <Button 
                  key={p}
                  variant={p === meta.page ? "default" : "outline"}
                  className={p === meta.page 
                    ? "w-9 h-9 p-0 bg-[#0891B2] text-white hover:bg-[#0891B2]/90 hover:text-white border-[#0891B2] rounded-[3px]"
                    : "w-9 h-9 p-0 bg-white border-[#E5E5E5] text-[#111111] hover:bg-[#F8FAFC] rounded-[3px]"
                  }
                  onClick={() => setPage(p)}
                >
                  {p}
                </Button>
              ))}
            </div>

            <Button 
              variant="outline" 
              className="border-[#E5E5E5] bg-white text-[#111111] font-medium h-9 px-4 hover:bg-[#F8FAFC] rounded-[3px]"
              disabled={meta.page >= meta.totalPages}
              onClick={() => setPage(p => Math.min(meta.totalPages, p + 1))}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Form Modal (Add/Edit) */}
      <ClientFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        client={clientToEdit} 
      />

      {/* Delete Confirmation Modal */}
      <DeleteClientModal 
        isOpen={!!clientToDelete}
        onClose={() => setClientToDelete(null)}
        client={clientToDelete}
      />
    </div>

  );
}
