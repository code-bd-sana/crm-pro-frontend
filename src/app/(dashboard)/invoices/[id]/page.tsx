"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Download, Send, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PermissionGuard } from "@/components/shared/PermissionGuard";
import { useRBAC } from "@/hooks/useRBAC";
import { PermissionEnum } from "@/types/auth.types";
import {
  InvoiceStatus,
  PaymentMethod,
} from "@/types/models.types";
import {
  getInvoiceById,
  updateInvoice,
  addInvoicePayment,
  formatInvoiceAmount,
} from "@/services/invoice.service";
import { getErrorMessage } from "@/lib/utils";
import { format } from "date-fns";

const statusConfig: Record<InvoiceStatus, { label: string; className: string }> = {
  [InvoiceStatus.DRAFT]: { label: "Draft", className: "bg-[#F5F5F5] text-[#737373]" },
  [InvoiceStatus.SENT]: { label: "Sent", className: "bg-[#DBEAFE] text-[#3B82F6]" },
  [InvoiceStatus.PARTIALLY_PAID]: { label: "Partially Paid", className: "bg-[#FEF9C3] text-[#A16207]" },
  [InvoiceStatus.PAID]: { label: "Paid", className: "bg-[#D1FAE5] text-[#22C55E]" },
  [InvoiceStatus.OVERDUE]: { label: "Overdue", className: "bg-[#FEE2E2] text-[#EF4444]" },
  [InvoiceStatus.CANCELLED]: { label: "Cancelled", className: "bg-[#F5F5F5] text-[#737373]" },
};

const paymentMethodLabels: Record<PaymentMethod, string> = {
  [PaymentMethod.CASH]: "Cash",
  [PaymentMethod.BANK_TRANSFER]: "Bank Transfer",
  [PaymentMethod.MOBILE_BANKING]: "Mobile Banking",
  [PaymentMethod.CARD]: "Card",
  [PaymentMethod.OTHER]: "Other",
};

function formatDate(dateString?: string | null) {
  if (!dateString) return "—";
  try {
    return format(new Date(dateString), "MMMM d, yyyy");
  } catch {
    return "—";
  }
}

export default function InvoiceDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const { hasPermission } = useRBAC();
  const canUpdate = hasPermission(PermissionEnum.INVOICES_UPDATE);

  const [paymentOpen, setPaymentOpen] = useState(false);
  const [payAmount, setPayAmount] = useState("");
  const [payDate, setPayDate] = useState(() => format(new Date(), "yyyy-MM-dd"));
  const [payMethod, setPayMethod] = useState<PaymentMethod>(PaymentMethod.BANK_TRANSFER);
  const [payTransactionId, setPayTransactionId] = useState("");

  const { data: invoice, isLoading, isError } = useQuery({
    queryKey: ["invoice", id],
    queryFn: () => getInvoiceById(id),
    enabled: !!id,
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["invoice", id] });
    queryClient.invalidateQueries({ queryKey: ["invoices"] });
  };

  const { mutate: changeStatus, isPending: isStatusPending } = useMutation({
    mutationFn: (status: InvoiceStatus) => updateInvoice(id, { status }),
    onSuccess: () => {
      invalidate();
      toast.success("Invoice status updated");
    },
    onError: (error: unknown) => toast.error(getErrorMessage(error, "Failed to update status")),
  });

  const { mutate: recordPayment, isPending: isPaying } = useMutation({
    mutationFn: () =>
      addInvoicePayment(id, {
        amount: Number(payAmount),
        paymentDate: payDate,
        paymentMethod: payMethod,
        transactionId: payTransactionId || undefined,
      }),
    onSuccess: () => {
      invalidate();
      toast.success("Payment recorded");
      setPaymentOpen(false);
      setPayAmount("");
      setPayTransactionId("");
    },
    onError: (error: unknown) => toast.error(getErrorMessage(error, "Failed to record payment")),
  });

  if (isLoading) {
    return (
      <div className="flex flex-col flex-1 px-6 pt-6 pb-6 gap-6 h-full w-full bg-[#FAFAFA]">
        <Skeleton className="h-6 w-40 bg-[#F5F5F5]" />
        <Skeleton className="h-12 w-full bg-[#F5F5F5]" />
        <Skeleton className="h-[600px] w-full max-w-6xl mx-auto bg-[#F5F5F5]" />
      </div>
    );
  }

  if (isError || !invoice) {
    return (
      <div className="flex flex-col flex-1 px-6 pt-6 pb-6 gap-6 h-full w-full bg-[#FAFAFA]">
        <Link
          href="/invoices"
          className="inline-flex items-center gap-2 text-[#737373] hover:text-[#111111] text-[14px] font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Invoices
        </Link>
        <div className="flex items-center justify-center h-64 text-[#737373]">
          Invoice not found or failed to load.
        </div>
      </div>
    );
  }

  const status = statusConfig[invoice.status] ?? statusConfig[InvoiceStatus.DRAFT];
  const balanceDue = Number(invoice.balanceDue);
  const canPay = balanceDue > 0 && invoice.status !== InvoiceStatus.CANCELLED && invoice.status !== InvoiceStatus.DRAFT;

  const openPaymentDialog = () => {
    setPayAmount(balanceDue > 0 ? String(balanceDue) : "");
    setPayDate(format(new Date(), "yyyy-MM-dd"));
    setPaymentOpen(true);
  };

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
          <h1 className="text-[24px] font-semibold text-[#111111]">{invoice.invoiceNumber}</h1>
          <p className="text-[14px] text-[#737373] mt-1">
            {invoice.client?.companyName ?? "—"}
            {invoice.project?.title ? ` · ${invoice.project.title}` : ""}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <Badge
            variant="secondary"
            className={`${status.className} rounded-[4px] px-2.5 py-1 text-[13px] font-medium border-0 mr-1`}
          >
            {status.label}
          </Badge>
          {canUpdate && (
            <Select
              value={invoice.status}
              onValueChange={(value) => changeStatus(value as InvoiceStatus)}
              disabled={isStatusPending}
              items={Object.values(InvoiceStatus).map((s) => ({
                value: s,
                label: statusConfig[s].label,
              }))}
            >
              <SelectTrigger className="w-[150px] bg-white border-[#E5E5E5] h-9 rounded-xs text-[#111111]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(InvoiceStatus).map((s) => (
                  <SelectItem key={s} value={s}>
                    {statusConfig[s].label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Button
            variant="outline"
            disabled
            title="Requires backend endpoint (GET /invoices/:id/download)"
            className="border-[#E5E5E5] bg-white text-[#737373] font-medium h-9 px-4 rounded-xs disabled:opacity-50"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
          <Button
            variant="outline"
            disabled
            title="Requires backend endpoint (POST /invoices/:id/reminders)"
            className="border-[#E5E5E5] bg-white text-[#737373] font-medium h-9 px-4 rounded-xs disabled:opacity-50"
          >
            <Send className="w-4 h-4 mr-2" />
            Send Reminder
          </Button>
          <PermissionGuard permission={PermissionEnum.INVOICES_UPDATE}>
            <Button
              onClick={openPaymentDialog}
              disabled={!canPay}
              className="bg-[#0891B2] hover:bg-[#0E7490] text-white font-medium h-9 px-4 rounded-xs border-0 disabled:opacity-50"
            >
              <Check className="w-4 h-4 mr-2" />
              Record Payment
            </Button>
          </PermissionGuard>
        </div>
      </div>

      {/* Invoice Document */}
      <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-8 md:p-12 shadow-sm max-w-6xl w-full mx-auto">
        {/* Doc Header */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12">
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

          <div className="flex flex-col items-end gap-2 mt-6 md:mt-0 text-right">
            <h2 className="text-[28px] font-bold text-[#111111] tracking-wide mb-2">INVOICE</h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[14px]">
              <span className="text-[#111111] font-medium">Invoice #:</span>
              <span className="text-[#737373]">{invoice.invoiceNumber}</span>
              <span className="text-[#111111] font-medium">Issue Date:</span>
              <span className="text-[#737373]">{formatDate(invoice.issueDate)}</span>
              <span className="text-[#111111] font-medium">Due Date:</span>
              <span className="text-[#737373]">{formatDate(invoice.dueDate)}</span>
              <span className="text-[#111111] font-medium">Currency:</span>
              <span className="text-[#737373]">{invoice.currency}</span>
            </div>
          </div>
        </div>

        <div className="border-t border-[#E5E5E5] mb-8"></div>

        {/* Bill To */}
        <div className="mb-12">
          <h3 className="text-[16px] font-bold text-[#111111] mb-2">Bill To:</h3>
          <div className="text-[14px] leading-relaxed">
            <p className="font-bold text-[#111111]">{invoice.client?.companyName ?? "—"}</p>
            <p className="text-[#737373]">
              {invoice.client?.contactPerson && <>{invoice.client.contactPerson}<br /></>}
              {invoice.client?.address && <>{invoice.client.address}<br /></>}
              {invoice.client?.email}
            </p>
          </div>
        </div>

        {/* Line Items */}
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
              {(invoice.items ?? []).map((item, index) => (
                <TableRow key={item.id} className="border-0 hover:bg-transparent">
                  <TableCell className={`${index === 0 ? "pt-6" : ""} pb-2 px-0 text-[#737373]`}>
                    {item.description}
                  </TableCell>
                  <TableCell className={`${index === 0 ? "pt-6" : ""} pb-2 px-0 text-[#737373] text-right`}>
                    {item.quantity}
                  </TableCell>
                  <TableCell className={`${index === 0 ? "pt-6" : ""} pb-2 px-0 text-[#737373] text-right`}>
                    {formatInvoiceAmount(item.unitPrice, invoice.currency)}
                  </TableCell>
                  <TableCell className={`${index === 0 ? "pt-6" : ""} pb-2 px-0 text-[#111111] font-medium text-right`}>
                    {formatInvoiceAmount(item.totalPrice, invoice.currency)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="border-t border-[#E5E5E5] mb-6"></div>

        {/* Totals */}
        <div className="flex justify-end mb-12">
          <div className="w-[300px]">
            <div className="flex justify-between items-center py-2 text-[14px]">
              <span className="text-[#737373]">Subtotal:</span>
              <span className="text-[#111111] font-bold">
                {formatInvoiceAmount(invoice.subTotal, invoice.currency)}
              </span>
            </div>
            {Number(invoice.taxAmount) > 0 && (
              <div className="flex justify-between items-center py-2 text-[14px]">
                <span className="text-[#737373]">Tax:</span>
                <span className="text-[#111111] font-bold">
                  {formatInvoiceAmount(invoice.taxAmount, invoice.currency)}
                </span>
              </div>
            )}
            {Number(invoice.discountAmount) > 0 && (
              <div className="flex justify-between items-center py-2 text-[14px]">
                <span className="text-[#737373]">Discount:</span>
                <span className="text-[#111111] font-bold">
                  -{formatInvoiceAmount(invoice.discountAmount, invoice.currency)}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center mt-2 pt-4 border-t border-[#E5E5E5]">
              <span className="text-[16px] font-bold text-[#111111]">Total:</span>
              <span className="text-[18px] font-bold text-[#111111]">
                {formatInvoiceAmount(invoice.totalAmount, invoice.currency)}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 text-[14px]">
              <span className="text-[#737373]">Amount Paid:</span>
              <span className="text-[#22C55E] font-bold">
                {formatInvoiceAmount(invoice.amountPaid, invoice.currency)}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 text-[14px]">
              <span className="text-[#737373]">Balance Due:</span>
              <span className={`font-bold ${balanceDue > 0 ? "text-[#EF4444]" : "text-[#22C55E]"}`}>
                {formatInvoiceAmount(invoice.balanceDue, invoice.currency)}
              </span>
            </div>
          </div>
        </div>

        {/* Payment History */}
        {(invoice.payments ?? []).length > 0 && (
          <>
            <div className="border-t border-[#E5E5E5] mb-6"></div>
            <div className="mb-12">
              <h3 className="text-[16px] font-bold text-[#111111] mb-4">Payment History</h3>
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-[#E5E5E5] hover:bg-transparent">
                    <TableHead className="py-2 h-auto px-0 text-[13px] font-medium text-[#737373]">Date</TableHead>
                    <TableHead className="py-2 h-auto px-0 text-[13px] font-medium text-[#737373]">Method</TableHead>
                    <TableHead className="py-2 h-auto px-0 text-[13px] font-medium text-[#737373]">Transaction ID</TableHead>
                    <TableHead className="py-2 h-auto px-0 text-[13px] font-medium text-[#737373] text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-[14px]">
                  {(invoice.payments ?? []).map((payment) => (
                    <TableRow key={payment.id} className="border-b border-[#F5F5F5] hover:bg-transparent">
                      <TableCell className="py-3 px-0 text-[#111111]">{formatDate(payment.paymentDate)}</TableCell>
                      <TableCell className="py-3 px-0 text-[#737373]">
                        {paymentMethodLabels[payment.paymentMethod] ?? payment.paymentMethod}
                      </TableCell>
                      <TableCell className="py-3 px-0 text-[#737373]">{payment.transactionId ?? "—"}</TableCell>
                      <TableCell className="py-3 px-0 text-[#111111] font-medium text-right">
                        {formatInvoiceAmount(payment.amount, invoice.currency)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}

        {/* Notes & Terms */}
        {(invoice.notes || invoice.termsAndConditions) && (
          <>
            <div className="border-t border-[#E5E5E5] mb-6"></div>
            <div className="flex flex-col gap-6">
              {invoice.notes && (
                <div>
                  <h3 className="text-[16px] font-bold text-[#111111] mb-2">Notes</h3>
                  <p className="text-[14px] text-[#737373] leading-relaxed whitespace-pre-wrap">
                    {invoice.notes}
                  </p>
                </div>
              )}
              {invoice.termsAndConditions && (
                <div>
                  <h3 className="text-[16px] font-bold text-[#111111] mb-2">Terms & Conditions</h3>
                  <p className="text-[14px] text-[#737373] leading-relaxed whitespace-pre-wrap">
                    {invoice.termsAndConditions}
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Record Payment Dialog */}
      <Dialog open={paymentOpen} onOpenChange={setPaymentOpen}>
        <DialogContent className="max-w-[440px] bg-[#FAFAFA] border-[#E5E5E5] rounded-[6px]">
          <DialogHeader>
            <DialogTitle className="text-[#111111] font-semibold text-[18px]">
              Record Payment
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 pt-2">
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-medium text-[#111111]">Amount</label>
              <Input
                type="number"
                min="0.01"
                step="0.01"
                value={payAmount}
                onChange={(e) => setPayAmount(e.target.value)}
                placeholder={`Balance due: ${formatInvoiceAmount(invoice.balanceDue, invoice.currency)}`}
                className="bg-white border-[#E5E5E5] text-[#111111] h-9 rounded-xs"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-medium text-[#111111]">Payment Date</label>
              <Input
                type="date"
                value={payDate}
                onChange={(e) => setPayDate(e.target.value)}
                className="bg-white border-[#E5E5E5] text-[#111111] h-9 rounded-xs [color-scheme:light]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-medium text-[#111111]">Payment Method</label>
              <Select
                value={payMethod}
                onValueChange={(value) => setPayMethod(value as PaymentMethod)}
                items={Object.values(PaymentMethod).map((m) => ({
                  value: m,
                  label: paymentMethodLabels[m],
                }))}
              >
                <SelectTrigger className="w-full bg-white border-[#E5E5E5] h-9 rounded-xs text-[#111111]">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(PaymentMethod).map((m) => (
                    <SelectItem key={m} value={m}>
                      {paymentMethodLabels[m]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-medium text-[#111111]">Transaction ID (Optional)</label>
              <Input
                value={payTransactionId}
                onChange={(e) => setPayTransactionId(e.target.value)}
                placeholder="e.g. TXN-123456"
                className="bg-white border-[#E5E5E5] text-[#111111] h-9 rounded-xs"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setPaymentOpen(false)}
                className="bg-[#FAFAFA] hover:bg-[#F5F5F5] border-[#E5E5E5] text-[#111111] rounded-xs h-9"
              >
                Cancel
              </Button>
              <Button
                onClick={() => recordPayment()}
                disabled={isPaying || !payAmount || Number(payAmount) <= 0 || !payDate}
                className="bg-[#0891B2] hover:bg-[#0E7490] text-white rounded-xs h-9 px-4"
              >
                {isPaying && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Record Payment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
