"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Filter, Plus, MoreHorizontal } from "lucide-react";
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
import { AddInvoiceModal } from "@/components/invoices/AddInvoiceModal";
import { Button } from "@/components/ui/button";

const invoicesData = [
  {
    id: "INV-2024-0047",
    client: "Meridian Logistics",
    issueDate: "Apr 1, 2026",
    dueDate: "Apr 15, 2026",
    amount: "$12,500.00",
    status: "Unpaid",
  },
  {
    id: "INV-2024-0046",
    client: "Tectonic Studio",
    issueDate: "Mar 28, 2026",
    dueDate: "Apr 11, 2026",
    amount: "$8,200.00",
    status: "Paid",
  },
  {
    id: "INV-2024-0045",
    client: "Vaultline Finance",
    issueDate: "Mar 25, 2026",
    dueDate: "Apr 8, 2026",
    amount: "$15,600.00",
    status: "Paid",
  },
  {
    id: "INV-2024-0044",
    client: "Pinnacle Marketing",
    issueDate: "Mar 20, 2026",
    dueDate: "Apr 3, 2026",
    amount: "$9,400.00",
    status: "Overdue",
  },
  {
    id: "INV-2024-0043",
    client: "Silverstone Corp",
    issueDate: "Mar 15, 2026",
    dueDate: "Mar 29, 2026",
    amount: "$22,100.00",
    status: "Paid",
  },
  {
    id: "INV-2024-0042",
    client: "CloudNine Systems",
    issueDate: "Mar 10, 2026",
    dueDate: "Mar 24, 2026",
    amount: "$6,800.00",
    status: "Paid",
  },
  {
    id: "INV-2024-0041",
    client: "Horizon Retail",
    issueDate: "Mar 5, 2026",
    dueDate: "Mar 19, 2026",
    amount: "$11,300.00",
    status: "Overdue",
  },
];

export default function InvoicesPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isAddInvoiceOpen, setIsAddInvoiceOpen] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return (
          <Badge className="bg-[#E0F2FE] text-[#0369A1] hover:bg-[#E0F2FE] border-transparent font-medium rounded-xs shadow-none">
            Paid
          </Badge>
        );
      case "Overdue":
        return (
          <Badge className="bg-[#FEF2F2] text-[#B91C1C] hover:bg-[#FEF2F2] border-transparent font-medium rounded-xs shadow-none">
            Overdue
          </Badge>
        );
      case "Unpaid":
      default:
        return (
          <Badge className="bg-[#F1F5F9] text-[#475569] hover:bg-[#F1F5F9] border-transparent font-medium rounded-xs shadow-none">
            Unpaid
          </Badge>
        );
    }
  };

  return (
    <div className="flex flex-col flex-1 px-6 pt-6 pb-6 gap-6 h-full w-full">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-[#111111] font-semibold text-[24px] leading-[32px]">Invoices</h1>
          <p className="text-[#737373] text-[14px]">7 invoices</p>
        </div>
        <button
          onClick={() => setIsAddInvoiceOpen(true)}
          className="flex items-center justify-center gap-2 bg-[#0891B2] hover:bg-[#0E7490] text-white rounded-xs h-[36px] px-4 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="font-medium text-[14px]">New Invoice</span>
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-[10px] p-6 flex flex-col gap-2 shadow-sm">
          <p className="text-[#737373] text-[14px]">Total Outstanding</p>
          <p className="text-[#111111] text-[30px] font-semibold leading-[36px]">$42,300.00</p>
        </div>
        <div className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-[10px] p-6 flex flex-col gap-2 shadow-sm">
          <p className="text-[#737373] text-[14px]">Paid This Month</p>
          <p className="text-[#111111] text-[30px] font-semibold leading-[36px]">$18,600.00</p>
        </div>
        <div className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-[10px] p-6 flex flex-col gap-2 shadow-sm">
          <p className="text-[#737373] text-[14px]">Overdue</p>
          <p className="text-[#EF4444] text-[30px] font-semibold leading-[36px]">3</p>
        </div>
      </div>

      {/* Controls Container (Search & Filter) */}
      <div className="flex items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
          <Input
            placeholder="Search invoices..."
            className="w-full pl-9 h-9 border-[#E5E5E5] focus-visible:ring-[#0891B2] bg-[#FFFFFF] text-[#111111] placeholder:text-[#737373]"
          />
        </div>

        {/* Filter Button */}
        <button className="flex items-center justify-center gap-2 bg-[#FAFAFA] border border-[#E5E5E5] hover:bg-[#F5F5F5] text-[#111111] rounded-xs h-[36px] px-4 transition-colors shrink-0">
          <Filter className="w-4 h-4 text-[#737373]" />
          <span className="font-medium text-[14px]">Filter</span>
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[10px] border border-[#E5E5E5] overflow-hidden flex flex-col">

        <Table>
          <TableHeader>
            <TableRow className="border-b border-[#E5E5E5] hover:bg-transparent">
              <TableHead className="px-6 py-3 h-10 text-[14px] font-medium text-[#111111]">Invoice ID</TableHead>
              <TableHead className="px-6 py-3 h-10 text-[14px] font-medium text-[#111111]">Client</TableHead>
              <TableHead className="px-6 py-3 h-10 text-[14px] font-medium text-[#111111]">Issue Date</TableHead>
              <TableHead className="px-6 py-3 h-10 text-[14px] font-medium text-[#111111]">Due Date</TableHead>
              <TableHead className="px-6 py-3 h-10 text-[14px] font-medium text-[#111111] text-right">Amount</TableHead>
              <TableHead className="px-6 py-3 h-10 text-[14px] font-medium text-[#111111]">Status</TableHead>
              <TableHead className="w-12 px-6 py-3 h-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoicesData.map((invoice) => (
              <TableRow key={invoice.id} className="border-b border-[#E5E5E5] hover:bg-[#F8FAFC]">
                <TableCell className="px-6 py-3 h-[49px] text-[14px] font-medium text-[#111111] whitespace-nowrap">
                  <Link href={`/invoices/${invoice.id}`} className="hover:text-[#0891B2] hover:underline transition-colors">
                    {invoice.id}
                  </Link>
                </TableCell>
                <TableCell className="px-6 py-3 h-[49px] text-[14px] text-[#737373] whitespace-nowrap">
                  {invoice.client}
                </TableCell>
                <TableCell className="px-6 py-3 h-[49px] text-[14px] text-[#737373] whitespace-nowrap">
                  {invoice.issueDate}
                </TableCell>
                <TableCell className="px-6 py-3 h-[49px] text-[14px] text-[#737373] whitespace-nowrap">
                  {invoice.dueDate}
                </TableCell>
                <TableCell className="px-6 py-3 h-[49px] text-[14px] font-medium text-[#111111] text-right whitespace-nowrap">
                  {invoice.amount}
                </TableCell>
                <TableCell className="px-6 py-3 h-[49px] whitespace-nowrap">
                  {getStatusBadge(invoice.status)}
                </TableCell>
                <TableCell className="px-6 py-3 h-[49px] text-right">
                  <button className="text-[#A3A3A3] hover:text-[#111111] transition-colors rounded-sm focus:outline-none focus:ring-2 focus:ring-[#0891B2] focus:ring-offset-2">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-2">
        <p className="text-[14px] text-[#737373]">
          Showing 1 to 5 of 24 entries
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-[#E5E5E5] bg-white text-[#111111] font-medium h-9 px-4 hover:bg-[#F8FAFC] rounded-[3px]">
            Previous
          </Button>

          <div className="flex items-center gap-1">
            <Button variant="outline" className="w-9 h-9 p-0 bg-[#0891B2] text-white hover:bg-[#0891B2]/90 hover:text-white border-[#0891B2] rounded-[3px]">
              1
            </Button>
            <Button variant="outline" className="w-9 h-9 p-0 bg-white border-[#E5E5E5] text-[#111111] hover:bg-[#F8FAFC] rounded-[3px]">
              2
            </Button>
            <Button variant="outline" className="w-9 h-9 p-0 bg-white border-[#E5E5E5] text-[#111111] hover:bg-[#F8FAFC] rounded-[3px]">
              3
            </Button>
            <span className="text-[#A3A3A3] px-1">...</span>
            <Button variant="outline" className="w-9 h-9 p-0 bg-white border-[#E5E5E5] text-[#111111] hover:bg-[#F8FAFC] rounded-[3px]">
              5
            </Button>
          </div>

          <Button variant="outline" className="border-[#E5E5E5] bg-white text-[#111111] font-medium h-9 px-4 hover:bg-[#F8FAFC] rounded-[3px]">
            Next
          </Button>
        </div>
      </div>


      <AddInvoiceModal isOpen={isAddInvoiceOpen} onClose={() => setIsAddInvoiceOpen(false)} />
    </div>
  );
}
