"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function InvoiceDetailsPage({ params }: { params: { id: string } }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="flex flex-col flex-1 px-6 pt-6 pb-6 gap-6 h-full w-full bg-[#FAFAFA] overflow-y-auto">
      {/* Back Link */}
      <div>
        <Link
          href="/invoices"
          className="inline-flex items-center gap-2 text-[#737373] hover:text-[#111111] text-[14px] font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Invoices
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-[24px] font-semibold text-[#111111]">INV-2024-0047</h1>
          <p className="text-[14px] text-[#737373] mt-1">Meridian Logistics</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[14px] font-medium text-[#111111] mr-2">Unpaid</span>
          <Button variant="outline" className="border-[#E5E5E5] bg-white text-[#111111] font-medium h-9 px-4 hover:bg-[#F8FAFC] rounded-xs">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
          <Button variant="outline" className="border-[#E5E5E5] bg-white text-[#111111] font-medium h-9 px-4 hover:bg-[#F8FAFC] rounded-xs">
            <Send className="w-4 h-4 mr-2" />
            Send Reminder
          </Button>
          <Button className="bg-[#0B91B2] hover:bg-[#366083] text-white font-medium h-9 px-4 rounded-xs border-0">
            <Check className="w-4 h-4 mr-2" />
            Mark as Paid
          </Button>
        </div>
      </div>

      {/* Invoice Document */}
      <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-8 md:p-12 shadow-sm max-w-6xl w-full mx-auto">

        {/* Doc Header */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12">
          {/* Company Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[4px] bg-[#0B91B2] flex items-center justify-center text-white font-bold text-[16px]">
                CR
              </div>
              <span className="text-[20px] font-bold text-[#111111]">CRM Pro</span>
            </div>
            <div className="text-[14px] text-[#737373] leading-relaxed">
              456 Business Avenue<br />
              New York, NY 10001<br />
              contact@crmpro.com
            </div>
          </div>

          {/* Invoice Meta */}
          <div className="flex flex-col items-end gap-2 mt-6 md:mt-0 text-right">
            <h2 className="text-[28px] font-bold text-[#111111] tracking-wide mb-2">INVOICE</h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[14px]">
              <span className="text-[#111111] font-medium">Invoice #:</span>
              <span className="text-[#737373]">INV-2024-0047</span>
              <span className="text-[#111111] font-medium">Issue Date:</span>
              <span className="text-[#737373]">April 1, 2026</span>
              <span className="text-[#111111] font-medium">Due Date:</span>
              <span className="text-[#737373]">April 15, 2026</span>
            </div>
          </div>
        </div>

        <div className="border-t border-[#E5E5E5] mb-8"></div>

        {/* Bill To */}
        <div className="mb-12">
          <h3 className="text-[16px] font-bold text-[#111111] mb-2">Bill To:</h3>
          <div className="text-[14px] leading-relaxed">
            <p className="font-bold text-[#111111]">Meridian Logistics</p>
            <p className="text-[#737373]">
              123 Commerce Street<br />
              San Francisco, CA 94102<br />
              billing@meridian.com
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="mb-8">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-[#E5E5E5] hover:bg-transparent">
                <TableHead className="py-3 h-auto px-0 text-[14px] font-medium text-[#111111] w-1/2">Description</TableHead>
                <TableHead className="py-3 h-auto px-0 text-[14px] font-medium text-[#111111] text-right">Qty</TableHead>
                <TableHead className="py-3 h-auto px-0 text-[14px] font-medium text-[#111111] text-right">Unit Price</TableHead>
                <TableHead className="py-3 h-auto px-0 text-[14px] font-medium text-[#111111] text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-[14px]">
              <TableRow className="border-0 hover:bg-transparent">
                <TableCell className="pt-6 pb-2 px-0 text-[#737373]">Website Redesign - Phase 1</TableCell>
                <TableCell className="pt-6 pb-2 px-0 text-[#737373] text-right">1</TableCell>
                <TableCell className="pt-6 pb-2 px-0 text-[#737373] text-right">$8500.00</TableCell>
                <TableCell className="pt-6 pb-2 px-0 text-[#111111] font-medium text-right">$8500.00</TableCell>
              </TableRow>
              <TableRow className="border-0 hover:bg-transparent">
                <TableCell className="py-2 px-0 text-[#737373]">Mobile Optimization</TableCell>
                <TableCell className="py-2 px-0 text-[#737373] text-right">1</TableCell>
                <TableCell className="py-2 px-0 text-[#737373] text-right">$3200.00</TableCell>
                <TableCell className="py-2 px-0 text-[#111111] font-medium text-right">$3200.00</TableCell>
              </TableRow>
              <TableRow className="border-0 hover:bg-transparent">
                <TableCell className="py-2 px-0 text-[#737373]">Content Migration</TableCell>
                <TableCell className="py-2 px-0 text-[#737373] text-right">8</TableCell>
                <TableCell className="py-2 px-0 text-[#737373] text-right">$150.00</TableCell>
                <TableCell className="py-2 px-0 text-[#111111] font-medium text-right">$1200.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="border-t border-[#E5E5E5] mb-6"></div>

        {/* Totals */}
        <div className="flex justify-end mb-12">
          <div className="w-[300px]">
            <div className="flex justify-between items-center py-2 text-[14px]">
              <span className="text-[#737373]">Subtotal:</span>
              <span className="text-[#111111] font-bold">$12900.00</span>
            </div>
            <div className="flex justify-between items-center py-2 text-[14px]">
              <span className="text-[#737373]">Tax (10%):</span>
              <span className="text-[#111111] font-bold">$1290.00</span>
            </div>
            <div className="flex justify-between items-center mt-2 pt-4 border-t border-[#E5E5E5]">
              <span className="text-[16px] font-bold text-[#111111]">Total:</span>
              <span className="text-[18px] font-bold text-[#111111]">$14190.00</span>
            </div>
          </div>
        </div>

        <div className="border-t border-[#E5E5E5] mb-6"></div>

        {/* Footer Info */}
        <div>
          <h3 className="text-[16px] font-bold text-[#111111] mb-3">Payment Instructions</h3>
          <div className="text-[14px] text-[#737373] leading-relaxed">
            Bank: First National Bank<br />
            Account: 1234567890<br />
            Routing: 987654321<br />
            <br />
            Please include invoice number in payment reference.
          </div>
        </div>

      </div>
    </div>
  );
}
