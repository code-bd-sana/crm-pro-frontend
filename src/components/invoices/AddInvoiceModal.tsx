"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { toast } from "sonner";
import { createInvoice, formatInvoiceAmount } from "@/services/invoice.service";
import { getClients } from "@/services/client.service";
import { getProjects } from "@/services/project.service";
import { getErrorMessage } from "@/lib/utils";
import { Currency } from "@/types/models.types";

interface LineItem {
  id: string;
  description: string;
  qty: string;
  unitPrice: string;
  taxPercent: string;
}

interface AddInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const emptyItem = (): LineItem => ({
  id: Math.random().toString(36).slice(2, 11),
  description: "",
  qty: "1",
  unitPrice: "",
  taxPercent: "0",
});

export function AddInvoiceModal({ isOpen, onClose }: AddInvoiceModalProps) {
  const queryClient = useQueryClient();

  const [clientId, setClientId] = useState("");
  const [projectId, setProjectId] = useState("");
  const [currency, setCurrency] = useState<Currency>(Currency.BDT);
  const [issueDate, setIssueDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [discount, setDiscount] = useState("");
  const [notes, setNotes] = useState("");
  const [terms, setTerms] = useState("");
  const [lineItems, setLineItems] = useState<LineItem[]>([emptyItem()]);

  const { data: clientsData } = useQuery({
    queryKey: ["clients", "options"],
    queryFn: () => getClients({ page: 1, limit: 100 }),
    enabled: isOpen,
  });

  const { data: projectsData } = useQuery({
    queryKey: ["projects", "options"],
    queryFn: () => getProjects({ page: 1, limit: 100 }),
    enabled: isOpen,
  });

  const resetForm = () => {
    setClientId("");
    setProjectId("");
    setCurrency(Currency.BDT);
    setIssueDate("");
    setDueDate("");
    setDiscount("");
    setNotes("");
    setTerms("");
    setLineItems([emptyItem()]);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetForm();
      onClose();
    }
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: string) => {
    setLineItems((items) => items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const subtotal = lineItems.reduce(
    (acc, item) => acc + (Number(item.qty) || 0) * (Number(item.unitPrice) || 0),
    0
  );
  // Per-item tax is a UI convenience; the backend stores a single invoice-level tax amount
  const totalTax = lineItems.reduce(
    (acc, item) =>
      acc + (Number(item.qty) || 0) * (Number(item.unitPrice) || 0) * ((Number(item.taxPercent) || 0) / 100),
    0
  );
  const discountAmount = Number(discount) || 0;
  const total = subtotal + totalTax - discountAmount;

  const validItems = lineItems.filter(
    (item) => item.description.trim() && Number(item.qty) > 0 && Number(item.unitPrice) >= 0
  );

  const isFormValid =
    !!clientId && !!issueDate && !!dueDate && validItems.length > 0 && validItems.length === lineItems.length;

  const { mutate: submitInvoice, isPending } = useMutation({
    mutationFn: () =>
      createInvoice({
        clientId,
        projectId: projectId && projectId !== "none" ? projectId : undefined,
        issueDate,
        dueDate,
        currency,
        taxAmount: totalTax > 0 ? Number(totalTax.toFixed(2)) : undefined,
        discountAmount: discountAmount > 0 ? discountAmount : undefined,
        notes: notes || undefined,
        termsAndConditions: terms || undefined,
        items: validItems.map((item) => ({
          description: item.description.trim(),
          quantity: Number(item.qty),
          unitPrice: Number(item.unitPrice),
        })),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      toast.success("Invoice created successfully");
      resetForm();
      onClose();
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to create invoice"));
    },
  });

  const clients = clientsData?.data ?? [];
  const projects = projectsData?.data ?? [];

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[703px] sm:max-w-[703px] p-0 overflow-hidden bg-[#FAFAFA] border-[#E5E5E5] shadow-md rounded-[6px]">
        <div className="px-4 pt-4 pb-4">
          <DialogHeader>
            <DialogTitle className="text-[#111111] font-semibold text-[18px]">
              Create New Invoice
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="px-6 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
          {/* Row 1: Invoice Number, Issue Date, Due Date */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-medium text-[#111111]">Invoice Number</label>
              <Input
                value="Auto-generated"
                readOnly
                className="bg-[#FAFAFA] border-[#E5E5E5] text-[#737373] h-9 rounded-xs"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-medium text-[#111111]">Issue Date <span className="text-red-500">*</span></label>
              <Input
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-9 rounded-xs w-full block [color-scheme:light]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-medium text-[#111111]">Due Date <span className="text-red-500">*</span></label>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-9 rounded-xs w-full block [color-scheme:light]"
              />
            </div>
          </div>

          {/* Row 2: Client & Project */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-medium text-[#111111]">Client <span className="text-red-500">*</span></label>
              <Select
                value={clientId}
                onValueChange={(value) => setClientId(value ?? "")}
                items={clients.map((client) => ({ value: client.id, label: client.companyName }))}
              >
                <SelectTrigger className="w-full bg-[#FFFFFF] border-[#E5E5E5] h-9 rounded-xs text-[#111111]">
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.companyName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-medium text-[#111111]">Project (Optional)</label>
              <Select
                value={projectId}
                onValueChange={(value) => setProjectId(value ?? "")}
                items={[
                  { value: "none", label: "No project" },
                  ...projects.map((project) => ({ value: project.id, label: project.title })),
                ]}
              >
                <SelectTrigger className="w-full bg-[#FFFFFF] border-[#E5E5E5] h-9 rounded-xs text-[#111111]">
                  <SelectValue placeholder="No project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No project</SelectItem>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 3: Line Items */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-[14px] font-medium text-[#111111]">Line Items</label>
              <button
                onClick={() => setLineItems((items) => [...items, emptyItem()])}
                className="flex items-center gap-2 bg-[#FAFAFA] border border-[#E5E5E5] hover:bg-[#F5F5F5] rounded-[4px] px-3 py-1.5 transition-colors"
              >
                <Plus className="w-4 h-4 text-[#111111]" />
                <span className="text-[14px] font-medium text-[#111111]">Add Item</span>
              </button>
            </div>

            <div className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-[6px] p-3 flex flex-col gap-3">
              {lineItems.map((item, index) => (
                <div key={item.id} className="flex gap-3 items-end">
                  <div className="flex flex-col gap-2 flex-1">
                    {index === 0 && (
                      <label className="text-[12px] font-medium text-[#111111]">Description</label>
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
                      <label className="text-[12px] font-medium text-[#111111]">Qty</label>
                    )}
                    <Input
                      type="number"
                      min="0.01"
                      step="1"
                      value={item.qty}
                      onChange={(e) => updateLineItem(item.id, "qty", e.target.value)}
                      className="bg-[#FFFFFF] border-[#E5E5E5] h-9 rounded-xs text-[#111111]"
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-[100px]">
                    {index === 0 && (
                      <label className="text-[12px] font-medium text-[#111111]">Unit Price</label>
                    )}
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.unitPrice}
                      onChange={(e) => updateLineItem(item.id, "unitPrice", e.target.value)}
                      className="bg-[#FFFFFF] border-[#E5E5E5] h-9 rounded-xs text-[#111111]"
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-[80px]">
                    {index === 0 && (
                      <label className="text-[12px] font-medium text-[#111111]">Tax %</label>
                    )}
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      step="0.5"
                      value={item.taxPercent}
                      onChange={(e) => updateLineItem(item.id, "taxPercent", e.target.value)}
                      className="bg-[#FFFFFF] border-[#E5E5E5] h-9 rounded-xs text-[#111111]"
                    />
                  </div>
                  <div className="flex items-center justify-center w-[40px] h-9">
                    <button
                      onClick={() => setLineItems((items) => items.filter((i) => i.id !== item.id))}
                      disabled={lineItems.length === 1}
                      className={`text-[#737373] hover:text-[#EF4444] transition-colors p-2 rounded-xs ${lineItems.length === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 4: Currency & Discount */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-medium text-[#111111]">Currency</label>
              <Select
                value={currency}
                onValueChange={(value) => setCurrency((value as Currency) ?? Currency.BDT)}
                items={[
                  { value: Currency.BDT, label: "BDT (৳)" },
                  { value: Currency.USD, label: "USD ($)" },
                  { value: Currency.EUR, label: "EUR (€)" },
                ]}
              >
                <SelectTrigger className="w-full bg-[#FFFFFF] border-[#E5E5E5] h-9 rounded-xs text-[#111111]">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Currency.BDT}>BDT (৳)</SelectItem>
                  <SelectItem value={Currency.USD}>USD ($)</SelectItem>
                  <SelectItem value={Currency.EUR}>EUR (€)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-medium text-[#111111]">Discount (Optional)</label>
              <Input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="bg-[#FFFFFF] border-[#E5E5E5] h-9 rounded-xs text-[#111111]"
              />
            </div>
          </div>

          {/* Row 5: Totals */}
          <div className="flex justify-end">
            <div className="bg-[#F5F5F5] rounded-[6px] w-[320px] p-4 flex flex-col gap-2">
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-[#737373]">Subtotal:</span>
                <span className="text-[#111111] font-medium">
                  {formatInvoiceAmount(subtotal, currency)}
                </span>
              </div>
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-[#737373]">Tax:</span>
                <span className="text-[#111111] font-medium">
                  {formatInvoiceAmount(totalTax, currency)}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between items-center text-[14px]">
                  <span className="text-[#737373]">Discount:</span>
                  <span className="text-[#111111] font-medium">
                    -{formatInvoiceAmount(discountAmount, currency)}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-[#E5E5E5]">
                <span className="text-[16px] font-semibold text-[#111111]">Total:</span>
                <span className="text-[18px] font-bold text-[#111111]">
                  {formatInvoiceAmount(total, currency)}
                </span>
              </div>
            </div>
          </div>

          {/* Row 6: Notes */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-medium text-[#111111]">Notes (Optional)</label>
            <Textarea
              placeholder="Additional notes or payment instructions..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] min-h-[64px] rounded-xs resize-none"
            />
          </div>

          {/* Row 7: Terms */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-medium text-[#111111]">Terms & Conditions (Optional)</label>
            <Textarea
              placeholder="Payment is due within 30 days..."
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
              className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] min-h-[64px] rounded-xs resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-4 bg-[#FAFAFA] border-t border-[#E5E5E5] flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            className="bg-[#FAFAFA] hover:bg-[#F5F5F5] border-[#E5E5E5] text-[#111111] rounded-xs h-9"
          >
            Cancel
          </Button>
          <Button
            onClick={() => submitInvoice()}
            disabled={!isFormValid || isPending}
            className="bg-[#0891B2] hover:bg-[#0E7490] text-white rounded-xs h-9 px-4"
          >
            {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Create Invoice
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
