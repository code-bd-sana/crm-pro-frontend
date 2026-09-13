import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteClient } from "@/services/client.service";
import { Client } from "@/types/models.types";

interface DeleteClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: Client | null;
}

export function DeleteClientModal({ isOpen, onClose, client }: DeleteClientModalProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      if (!client?.id) throw new Error("Client ID is missing");
      return deleteClient(client.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast.success("Client deleted successfully");
      onClose();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete client");
    },
  });

  if (!client) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] !bg-[#FFFFFF] border-[#E5E5E5] rounded-[6px] shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-[#111111] font-semibold text-[18px]">Delete Client</DialogTitle>
          <DialogDescription className="text-[#737373] text-[14px]">
            Are you sure you want to delete <strong>{client.companyName}</strong>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 flex gap-2 sm:justify-end">
          <DialogClose asChild>
            <Button 
              type="button" 
              variant="outline" 
              className="bg-[#FAFAFA] border-[#E5E5E5] text-[#111111] hover:bg-gray-50 h-[36px]"
              disabled={mutation.isPending}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button 
            type="button" 
            variant="destructive"
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
            className="bg-red-600 hover:bg-red-700 text-white h-[36px]"
          >
            {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
