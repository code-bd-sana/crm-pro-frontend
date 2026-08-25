"use client";

import React, { useState } from "react";
import { Plus, Trash2, CalendarIcon, ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface LineItem {
  id: string;
  description: string;
  qty: number;
  unitPrice: number;
  taxPercent: number;
}

interface AddInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddInvoiceModal({ isOpen, onClose }: AddInvoiceModalProps) {
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: "1", description: "", qty: 1, unitPrice: 0, taxPercent: 10 },
  ]);

  const addLineItem = () => {
    setLineItems([
      ...lineItems,
      {
        id: Math.random().toString(36).substr(2, 9),
        description: "",
        qty: 1,
        unitPrice: 0,
        taxPercent: 10,
      },
    ]);
  };

  const removeLineItem = (id: string) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter((item) => item.id !== id));
    }
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: any) => {
    setLineItems(
      lineItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // Calculations
  const subtotal = lineItems.reduce((acc, item) => acc + item.qty * item.unitPrice, 0);
  const totalTax = lineItems.reduce(
    (acc, item) => acc + item.qty * item.unitPrice * (item.taxPercent / 100),
    0
  );
  const total = subtotal + totalTax;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[703px] sm:max-w-[703px] p-0 overflow-hidden bg-[#FAFAFA] border-[#E5E5E5] shadow-md rounded-[6px]">
        <div className="px-4 pt-4 pb-4">
          <DialogHeader>
            <DialogTitle className="text-[#111111] font-semibold text-[18px]">
              Create New Invoice
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="px-6  flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
          {/* Row 1: Invoice Number, Issue Date, Due Date */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-medium text-[#111111]">
                Invoice Number
              </label>
              <Input
                defaultValue="INV-2024-0048"
                className="bg-[#FFFFFF] border-[#E5E5E5] text-[#737373] h-9 rounded-xs"
                readOnly
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-medium text-[#111111]">
                Issue Date
              </label>
              <div className="relative">
                <Input
                  type="date"
                  className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-9 rounded-xs w-full block [color-scheme:light]"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-medium text-[#111111]">
                Due Date
              </label>
              <div className="relative">
                <Input
                  type="date"
                  className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-9 rounded-xs w-full block [color-scheme:light]"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Client */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-medium text-[#111111]">Client</label>
            <Select>
              <SelectTrigger className="w-full bg-[#FFFFFF] border-[#E5E5E5] h-9 rounded-xs text-[#737373]">
                <SelectValue placeholder="Select client" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="client1">Meridian Logistics</SelectItem>
                <SelectItem value="client2">Tectonic Studio</SelectItem>
                <SelectItem value="client3">Vaultline Finance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Row 3: Line Items */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-[14px] font-medium text-[#111111]">
                Line Items
              </label>
              <button
                onClick={addLineItem}
                className="flex items-center gap-2 bg-[#FAFAFA] border border-[#E5E5E5] hover:bg-[#F5F5F5] rounded-[4px] px-3 py-1.5 transition-colors"
              >
                <Plus className="w-4 h-4 text-[#111111]" />
                <span className="text-[14px] font-medium text-[#111111]">
                  Add Item
                </span>
              </button>
            </div>

            <div className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-[6px] p-3 flex flex-col gap-3">
              {lineItems.map((item, index) => (
                <div key={item.id} className="flex gap-3 items-end">
                  <div className="flex flex-col gap-2 flex-1">
                    {index === 0 && (
                      <label className="text-[12px] font-medium text-[#111111]">
                        Description
                      </label>
                    )}
                    <Input
                      placeholder="Service or product description"
                      value={item.description}
                      onChange={(e) => updateLineItem(item.id, "description", e.target.value)}
                      className="bg-[#FFFFFF] border-[#E5E5E5] h-9 rounded-xs text-[#111111]"
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-[80px]">
                    {index === 0 && (
                      <label className="text-[12px] font-medium text-[#111111]">
                        Qty
                      </label>
                    )}
                    <Input
                      type="number"
                      value={item.qty}
                      onChange={(e) => updateLineItem(item.id, "qty", Number(e.target.value))}
                      className="bg-[#FFFFFF] border-[#E5E5E5] h-9 rounded-xs text-[#111111]"
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-[100px]">
                    {index === 0 && (
                      <label className="text-[12px] font-medium text-[#111111]">
                        Unit Price
                      </label>
                    )}
                    <Input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) => updateLineItem(item.id, "unitPrice", Number(e.target.value))}
                      className="bg-[#FFFFFF] border-[#E5E5E5] h-9 rounded-xs text-[#111111]"
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-[80px]">
                    {index === 0 && (
                      <label className="text-[12px] font-medium text-[#111111]">
                        Tax %
                      </label>
                    )}
                    <Input
                      type="number"
                      value={item.taxPercent}
                      onChange={(e) => updateLineItem(item.id, "taxPercent", Number(e.target.value))}
                      className="bg-[#FFFFFF] border-[#E5E5E5] h-9 rounded-xs text-[#111111]"
                    />
                  </div>
                  <div className="flex items-center justify-center w-[40px] h-9">
                    <button
                      onClick={() => removeLineItem(item.id)}
                      disabled={lineItems.length === 1}
                      className={`text-[#737373] hover:text-[#EF4444] transition-colors p-2 rounded-xs ${lineItems.length === 1 ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 4: Totals */}
          <div className="flex justify-end">
            <div className="bg-[#F5F5F5] rounded-[6px] w-[320px] p-4 flex flex-col gap-2">
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-[#737373]">Subtotal:</span>
                <span className="text-[#111111] font-medium">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-[#737373]">Tax:</span>
                <span className="text-[#111111] font-medium">
                  ${totalTax.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-[#E5E5E5]">
                <span className="text-[16px] font-semibold text-[#111111]">
                  Total:
                </span>
                <span className="text-[18px] font-bold text-[#111111]">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Row 5: Notes */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-medium text-[#111111]">
              Notes (Optional)
            </label>
            <Textarea
              placeholder="Additional notes or payment instructions..."
              className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] min-h-[64px] rounded-xs"
            />
          </div>

          {/* Row 6: Status */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-medium text-[#111111]">
              Status
            </label>
            <Select defaultValue="unpaid">
              <SelectTrigger className="w-full bg-[#FFFFFF] border-[#E5E5E5] h-9 rounded-xs text-[#111111]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unpaid">Unpaid</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-4 bg-[#FAFAFA] border-t border-[#E5E5E5] flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-[#FAFAFA] hover:bg-[#F5F5F5] border-[#E5E5E5] text-[#111111] rounded-xs h-9"
          >
            Cancel
          </Button>
          <Button
            variant="outline"
            className="bg-[#FAFAFA] hover:bg-[#F5F5F5] border-[#E5E5E5] text-[#111111] rounded-xs h-9"
          >
            Save as Draft
          </Button>
          <Button className="bg-[#0891B2] hover:bg-[#0E7490] text-white rounded-xs h-9 px-4">
            Create Invoice
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
