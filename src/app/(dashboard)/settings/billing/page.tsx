"use client";

import React from "react";
import { Check, CreditCard, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const features = [
  "Up to 50 team members",
  "Unlimited projects and tasks",
  "Advanced analytics and reporting",
  "Priority support",
  "Custom integrations",
];

const paymentHistory = [
  { id: "INV-2024-0047", date: "Apr 1, 2024", plan: "Professional Plan", amount: "$299.00", status: "Paid" },
  { id: "INV-2024-0046", date: "Mar 1, 2024", plan: "Professional Plan", amount: "$299.00", status: "Paid" },
  { id: "INV-2024-0045", date: "Feb 1, 2024", plan: "Professional Plan", amount: "$299.00", status: "Paid" },
  { id: "INV-2024-0044", date: "Jan 1, 2024", plan: "Professional Plan", amount: "$299.00", status: "Paid" },
];

export default function BillingSettingsPage() {
  return (
    <div className="flex flex-col gap-6 h-full pb-20">
      
      {/* Current Plan */}
      <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-6 shadow-sm flex flex-col gap-6">
        <h2 className="text-[14px] font-bold text-[#111111]">Current Plan</h2>
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-[20px] font-bold text-[#111111]">Professional Plan</h3>
              <p className="text-[14px] text-[#737373] mt-1">$299/month • Billed monthly</p>
            </div>
            
            <ul className="flex flex-col gap-2 mt-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-[14px] text-[#111111]">
                  <Check className="w-4 h-4 text-[#111111]" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex flex-col gap-3 min-w-[140px]">
            <Button className="w-full bg-[#0891B2] hover:bg-[#0E7490] text-white h-[36px] px-4 rounded-[4px] font-medium">
              Upgrade Plan
            </Button>
            <Button variant="outline" className="w-full bg-[#FAFAFA] border-[#E5E5E5] text-[#111111] hover:bg-[#F5F5F5] h-[36px] px-4 rounded-[4px]">
              Change Plan
            </Button>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-6 shadow-sm flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-[14px] font-bold text-[#111111]">Payment Method</h2>
          <Button variant="outline" className="bg-[#FAFAFA] border-[#E5E5E5] text-[#111111] hover:bg-[#F5F5F5] h-[32px] px-3 rounded-[4px] text-[13px]">
            Add Payment Method
          </Button>
        </div>
        
        <div className="border border-[#E5E5E5] rounded-[8px] p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-[48px] h-[32px] bg-[#E0F2FE] rounded-[4px] flex items-center justify-center border border-[#BAE6FD]">
              <CreditCard className="w-5 h-5 text-[#0891B2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-medium text-[#111111]">Visa ending in 4242</span>
              <span className="text-[13px] text-[#737373]">Expires 12/2025</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-[#F5F5F5] text-[#111111] hover:bg-[#F5F5F5] font-medium text-[12px] px-2 py-0.5 rounded-[4px]">
              Default
            </Badge>
            <Button variant="ghost" className="text-[#111111] font-medium text-[13px] hover:bg-[#F5F5F5] h-[32px] px-3 rounded-[4px]">
              Edit
            </Button>
          </div>
        </div>
      </div>

      {/* Billing Information */}
      <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-6 shadow-sm flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-[14px] font-bold text-[#111111]">Billing Information</h2>
          <Button variant="outline" className="bg-[#FAFAFA] border-[#E5E5E5] text-[#111111] hover:bg-[#F5F5F5] h-[32px] px-3 rounded-[4px] text-[13px]">
            Edit
          </Button>
        </div>
        
        <div className="grid grid-cols-[140px_1fr] md:grid-cols-[180px_1fr] gap-y-4 text-[14px]">
          <span className="text-[#737373]">Billing Name:</span>
          <span className="text-[#111111] font-medium">CRM Pro Inc.</span>
          
          <span className="text-[#737373]">Email:</span>
          <span className="text-[#111111] font-medium">billing@crmpro.com</span>
          
          <span className="text-[#737373]">Address:</span>
          <span className="text-[#111111] font-medium">456 Business Avenue</span>
          
          <span className="text-[#737373]">City, State:</span>
          <span className="text-[#111111] font-medium">San Francisco, CA 94102</span>
          
          <span className="text-[#737373]">Country:</span>
          <span className="text-[#111111] font-medium">United States</span>
          
          <span className="text-[#737373]">Tax ID:</span>
          <span className="text-[#111111] font-medium">12-3456789</span>
        </div>
      </div>

      {/* Current Usage */}
      <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-6 shadow-sm flex flex-col gap-6">
        <h2 className="text-[14px] font-bold text-[#111111]">Current Usage</h2>
        
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-[#111111] font-medium">Team Members</span>
              <span className="text-[#111111] font-medium">9 of 50</span>
            </div>
            <Progress value={18} className="h-2 bg-[#F5F5F5] [&>div]:bg-[#0891B2]" />
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-[#111111] font-medium">Storage Used</span>
              <span className="text-[#111111] font-medium">24.5 GB of 100 GB</span>
            </div>
            <Progress value={24.5} className="h-2 bg-[#F5F5F5] [&>div]:bg-[#0891B2]" />
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-[#111111] font-medium">API Calls (Monthly)</span>
              <span className="text-[#111111] font-medium">125,430 of 1,000,000</span>
            </div>
            <Progress value={12.5} className="h-2 bg-[#F5F5F5] [&>div]:bg-[#0891B2]" />
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white border border-[#E5E5E5] rounded-[10px] shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 pb-4">
          <h2 className="text-[14px] font-bold text-[#111111]">Payment History</h2>
        </div>
        
        <div className="px-6 pb-6">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-[#E5E5E5] hover:bg-transparent">
                <TableHead className="text-[13px] font-medium text-[#111111] h-[40px] pl-0">Invoice</TableHead>
                <TableHead className="text-[13px] font-medium text-[#111111] h-[40px]">Date</TableHead>
                <TableHead className="text-[13px] font-medium text-[#111111] h-[40px]">Plan</TableHead>
                <TableHead className="text-[13px] font-medium text-[#111111] h-[40px]">Amount</TableHead>
                <TableHead className="text-[13px] font-medium text-[#111111] h-[40px]">Status</TableHead>
                <TableHead className="text-[13px] font-medium text-[#111111] h-[40px] text-right pr-0"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentHistory.map((invoice, idx) => (
                <TableRow key={idx} className="border-b border-[#E5E5E5] hover:bg-[#FAFAFA] last:border-0">
                  <TableCell className="font-medium text-[13px] text-[#111111] pl-0">
                    {invoice.id}
                  </TableCell>
                  <TableCell className="text-[13px] text-[#737373]">
                    {invoice.date}
                  </TableCell>
                  <TableCell className="text-[13px] text-[#737373]">
                    {invoice.plan}
                  </TableCell>
                  <TableCell className="text-[13px] text-[#111111] font-medium">
                    {invoice.amount}
                  </TableCell>
                  <TableCell className="text-[13px] text-[#111111]">
                    {invoice.status}
                  </TableCell>
                  <TableCell className="text-right pr-0">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-[#737373] hover:text-[#111111] hover:bg-[#F5F5F5] rounded-[4px]">
                      <Download className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white border border-[#FCA5A5] rounded-[10px] p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-[14px] font-bold text-[#DC2626]">Danger Zone</h2>
          <h3 className="text-[14px] font-medium text-[#111111] mt-2">Cancel Subscription</h3>
          <p className="text-[13px] text-[#737373]">Once you cancel, you'll lose access to all features at the end of your billing period.</p>
        </div>
        
        <Button variant="destructive" className="bg-[#EF4444] hover:bg-[#DC2626] text-white h-[36px] px-4 rounded-[4px] font-medium shrink-0">
          Cancel Subscription
        </Button>
      </div>

    </div>
  );
}
