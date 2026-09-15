"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Search, Plus, Receipt } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AddInvoiceModal } from "@/components/invoices/AddInvoiceModal";
import { PermissionGuard } from "@/components/shared/PermissionGuard";
import { getInvoices, formatInvoiceAmount } from "@/services/invoice.service";
import { getClients } from "@/services/client.service";
import { PermissionEnum } from "@/types/auth.types";
import { InvoiceStatus } from "@/types/models.types";
import { format } from "date-fns";

const PAGE_SIZE = 10;

const statusTabs = [
  { label: "All", value: "all" },
  { label: "Draft", value: InvoiceStatus.DRAFT },
  { label: "Sent", value: InvoiceStatus.SENT },
  { label: "Partially Paid", value: InvoiceStatus.PARTIALLY_PAID },
  { label: "Paid", value: InvoiceStatus.PAID },
  { label: "Overdue", value: InvoiceStatus.OVERDUE },
  { label: "Cancelled", value: InvoiceStatus.CANCELLED },
];

const statusConfig: Record<InvoiceStatus, { label: string; className: string }> = {
  [InvoiceStatus.DRAFT]: { label: "Draft", className: "bg-[#F5F5F5] text-[#737373] border-[#E5E5E5]" },
  [InvoiceStatus.SENT]: { label: "Sent", className: "bg-[#DBEAFE] text-[#3B82F6] border-[#DBEAFE]" },
  [InvoiceStatus.PARTIALLY_PAID]: {
    label: "Partially Paid",
    className: "bg-[#FEF9C3] text-[#A16207] border-[#FEF9C3]",
  },
  [InvoiceStatus.PAID]: { label: "Paid", className: "bg-[#D1FAE5] text-[#22C55E] border-[#D1FAE5]" },
  [InvoiceStatus.OVERDUE]: {
    label: "Overdue",
    className: "bg-[#FEE2E2] text-[#EF4444] border-[#FEE2E2]",
  },
  [InvoiceStatus.CANCELLED]: {
    label: "Cancelled",
    className: "bg-[#F5F5F5] text-[#737373] border-[#E5E5E5]",
  },
};

function formatDate(dateString?: string) {
  if (!dateString) return "—";
  try {
    return format(new Date(dateString), "MMM dd, yyyy");
  } catch {
    return "—";
  }
}

export default function InvoicesPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusTab, setStatusTab] = useState("all");
  const [clientFilter, setClientFilter] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["invoices", statusTab, clientFilter, page],
    queryFn: () =>
      getInvoices({
        page,
        limit: PAGE_SIZE,
        status: statusTab === "all" ? undefined : statusTab,
        clientId: clientFilter || undefined,
      }),
  });

  // Separate broad query for summary metrics (no summary endpoint exists yet)
  const { data: metricsData } = useQuery({
    queryKey: ["invoices", "metrics"],
    queryFn: () => getInvoices({ page: 1, limit: 100 }),
  });

  const { data: clientsData } = useQuery({
    queryKey: ["clients", "options"],
    queryFn: () => getClients({ page: 1, limit: 100 }),
  });

  const allInvoices = metricsData?.data ?? [];
  const outstanding = allInvoices
    .filter((inv) =>
      [InvoiceStatus.SENT, InvoiceStatus.PARTIALLY_PAID, InvoiceStatus.OVERDUE].includes(inv.status)
    )
    .reduce((acc, inv) => acc + Number(inv.balanceDue), 0);
  const paidThisMonth = allInvoices
    .filter((inv) => {
      if (inv.status !== InvoiceStatus.PAID) return false;
      const updated = new Date(inv.updatedAt);
      const now = new Date();
      return updated.getMonth() === now.getMonth() && updated.getFullYear() === now.getFullYear();
    })
    .reduce((acc, inv) => acc + Number(inv.totalAmount), 0);
  const overdueCount = allInvoices.filter((inv) => inv.status === InvoiceStatus.OVERDUE).length;

  // Backend has no search param — filter current page client-side by number/client
  const pageInvoices = data?.data ?? [];
  const search = searchTerm.trim().toLowerCase();
  const filteredInvoices = search
    ? pageInvoices.filter(
        (inv) =>
          inv.invoiceNumber.toLowerCase().includes(search) ||
          inv.client?.companyName?.toLowerCase().includes(search) ||
          inv.client?.contactPerson?.toLowerCase().includes(search)
      )
    : pageInvoices;

  const meta = data?.meta;
  const totalPages = meta?.totalPages ?? 1;
  const totalItems = meta?.total ?? 0;

  return (
    <div className="p-6 flex flex-col gap-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-semibold text-[#111111]">Invoices</h1>
          <p className="text-[#737373] text-[14px]">Manage billing and invoices</p>
        </div>
        <PermissionGuard permission={PermissionEnum.INVOICES_CREATE}>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#0891B2] hover:bg-[#0E7490] text-white h-9 gap-2 px-4 rounded-xs shadow-xs"
          >
            <Plus className="w-4 h-4" />
            New Invoice
          </Button>
        </PermissionGuard>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-[6px] p-6 flex items-center justify-between">
          <div>
            <h3 className="text-[#737373] text-[14px] mb-2">Total Outstanding</h3>
            <p className="text-[30px] font-semibold text-[#111111] leading-none">
              {formatInvoiceAmount(outstanding)}
            </p>
          </div>
          <div className="w-12 h-12 bg-[#ECFEFF] rounded-[6px] flex items-center justify-center">
            <Receipt className="w-6 h-6 text-[#0891B2]" />
          </div>
        </div>
        <div className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-[6px] p-6 flex items-center justify-between">
          <div>
            <h3 className="text-[#737373] text-[14px] mb-2">Paid This Month</h3>
            <p className="text-[30px] font-semibold text-[#111111] leading-none">
              {formatInvoiceAmount(paidThisMonth)}
            </p>
          </div>
          <div className="w-12 h-12 bg-[#ECFEFF] rounded-[6px] flex items-center justify-center">
            <Receipt className="w-6 h-6 text-[#0891B2]" />
          </div>
        </div>
        <div className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-[6px] p-6 flex items-center justify-between">
          <div>
            <h3 className="text-[#737373] text-[14px] mb-2">Overdue</h3>
            <p className="text-[30px] font-semibold text-[#111111] leading-none">{overdueCount}</p>
          </div>
          <div className="w-12 h-12 bg-[#FEE2E2] rounded-[6px] flex items-center justify-center">
            <Receipt className="w-6 h-6 text-[#EF4444]" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative w-[420px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
              <Input
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] placeholder:text-[#737373] h-10 rounded-xs shadow-xs"
              />
            </div>
            <select
              value={clientFilter}
              onChange={(e) => {
                setClientFilter(e.target.value);
                setPage(1);
              }}
              className="h-10 rounded-xs border border-[#E5E5E5] bg-[#FFFFFF] px-3 text-[14px] text-[#111111] shadow-xs"
            >
              <option value="">All Clients</option>
              {(clientsData?.data ?? []).map((client) => (
                <option key={client.id} value={client.id}>
                  {client.companyName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center bg-[#F5F5F5] p-1 rounded-xs overflow-x-auto">
            {statusTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => {
                  setStatusTab(tab.value);
                  setPage(1);
                }}
                className={`px-3 py-1.5 text-[14px] font-medium rounded-[4px] transition-all whitespace-nowrap ${
                  statusTab === tab.value
                    ? "bg-[#FFFFFF] text-[#111111] shadow-sm"
                    : "text-[#737373] hover:text-[#111111]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="border border-[#E5E5E5] rounded-[6px] bg-[#FFFFFF] overflow-hidden">
          <Table>
            <TableHeader className="bg-[#F5F5F5] border-b border-[#E5E5E5]">
              <TableRow className="hover:bg-transparent border-none h-[48px]">
                <TableHead className="text-[#737373] font-medium pl-6 w-[200px]">
                  Invoice Number
                </TableHead>
                <TableHead className="text-[#737373] font-medium w-[220px]">Client</TableHead>
                <TableHead className="text-[#737373] font-medium w-[140px]">Issue Date</TableHead>
                <TableHead className="text-[#737373] font-medium w-[140px]">Due Date</TableHead>
                <TableHead className="text-[#737373] font-medium w-[160px]">Amount</TableHead>
                <TableHead className="text-[#737373] font-medium">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index} className="h-[64px]">
                    <TableCell className="pl-6" colSpan={6}>
                      <Skeleton className="h-6 w-full bg-[#F5F5F5]" />
                    </TableCell>
                  </TableRow>
                ))
              ) : filteredInvoices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-[#737373]">
                    No invoices found
                  </TableCell>
                </TableRow>
              ) : (
                filteredInvoices.map((invoice) => (
                  <TableRow
                    key={invoice.id}
                    onClick={() => router.push(`/invoices/${invoice.id}`)}
                    className="border-b border-[#E5E5E5] hover:bg-[#FAFAFA] transition-colors h-[64px] cursor-pointer"
                  >
                    <TableCell className="pl-6 font-medium text-[#111111] text-[14px]">
                      {invoice.invoiceNumber}
                    </TableCell>
                    <TableCell className="text-[#111111] text-[14px]">
                      {invoice.client?.companyName ?? "—"}
                    </TableCell>
                    <TableCell className="text-[#111111] text-[14px]">
                      {formatDate(invoice.issueDate)}
                    </TableCell>
                    <TableCell className="text-[#111111] text-[14px]">
                      {formatDate(invoice.dueDate)}
                    </TableCell>
                    <TableCell className="text-[#111111] text-[14px] font-medium">
                      {formatInvoiceAmount(invoice.totalAmount, invoice.currency)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={`${statusConfig[invoice.status]?.className ?? "bg-[#F5F5F5] text-[#737373] border-[#E5E5E5]"} rounded-[4px] px-2.5 py-0.5 text-[12px] font-medium border-0`}
                      >
                        {statusConfig[invoice.status]?.label ?? invoice.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-2">
        <p className="text-[14px] text-[#737373]">
          Showing {filteredInvoices.length} of {totalItems} invoices
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="bg-[#FFFFFF] hover:bg-[#F5F5F5] border-[#E5E5E5] text-[#737373] disabled:opacity-50 h-9 px-3 rounded-xs"
          >
            Previous
          </Button>
          <span className="px-3 text-[14px] text-[#737373]">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="bg-[#FFFFFF] hover:bg-[#F5F5F5] border-[#E5E5E5] text-[#737373] disabled:opacity-50 h-9 px-3 rounded-xs"
          >
            Next
          </Button>
        </div>
      </div>

      <AddInvoiceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
