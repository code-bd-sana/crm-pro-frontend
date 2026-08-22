import { X, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddClientModal({ isOpen, onClose }: AddClientModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[#FFFFFF] rounded-[6px] w-[576px] max-w-[95vw] shadow-lg border border-[#E5E5E5] flex flex-col relative overflow-hidden">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-[25px] right-[25px] text-[#A3A3A3] hover:text-[#111111] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="px-[25px] pt-[25px] pb-4">
          <h2 className="text-[#111111] font-semibold text-[18px] leading-[18px]">Add New Client</h2>
        </div>

        {/* Form Body */}
        <div className="px-[25px] py-4 flex flex-col gap-4 overflow-y-auto max-h-[70vh]">
          
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Company Name</label>
              <Input placeholder="Acme Corp" className="h-[36px] border-[#E5E5E5] bg-[#FFFFFF] text-[#111111] focus-visible:ring-[#0891B2]" />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Industry</label>
              <div className="relative">
                <select className="w-full h-[36px] px-3 border border-[#E5E5E5] rounded-[4px] bg-[#FFFFFF] text-[#737373] text-[14px] appearance-none focus:outline-none focus:ring-1 focus:ring-[#0891B2]">
                  <option value="">Select industry</option>
                  <option value="tech">Technology</option>
                  <option value="finance">Finance</option>
                  <option value="marketing">Marketing</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3A3A3] pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Contact Name</label>
              <Input placeholder="John Doe" className="h-[36px] border-[#E5E5E5] bg-[#FFFFFF] text-[#111111] focus-visible:ring-[#0891B2]" />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Email</label>
              <Input type="email" placeholder="john@acme.com" className="h-[36px] border-[#E5E5E5] bg-[#FFFFFF] text-[#111111] focus-visible:ring-[#0891B2]" />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Phone</label>
              <Input placeholder="+1 (555) 123-4567" className="h-[36px] border-[#E5E5E5] bg-[#FFFFFF] text-[#111111] focus-visible:ring-[#0891B2]" />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Website</label>
              <Input placeholder="https://acme.com" className="h-[36px] border-[#E5E5E5] bg-[#FFFFFF] text-[#111111] focus-visible:ring-[#0891B2]" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Status</label>
            <div className="relative">
              <select className="w-full h-[36px] px-3 border border-[#E5E5E5] rounded-[4px] bg-[#FFFFFF] text-[#111111] text-[14px] appearance-none focus:outline-none focus:ring-1 focus:ring-[#0891B2]">
                <option value="lead">Lead</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3A3A3] pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#111111] font-medium text-[14px] leading-[14px]">Notes</label>
            <textarea 
              placeholder="Additional information about the client..."
              className="w-full h-[64px] px-3 py-2 border border-[#E5E5E5] rounded-[4px] bg-[#FFFFFF] text-[#737373] text-[14px] resize-none focus:outline-none focus:ring-1 focus:ring-[#0891B2]"
            ></textarea>
          </div>

        </div>

        {/* Footer */}
        <div className="px-[25px] py-4 flex items-center justify-end gap-2 border-t border-[#E5E5E5] mt-2">
          <button 
            onClick={onClose}
            className="h-[36px] px-4 bg-[#FAFAFA] border border-[#E5E5E5] hover:bg-gray-50 rounded-[4px] text-[#111111] font-medium text-[14px] transition-colors"
          >
            Cancel
          </button>
          <button 
            className="h-[36px] px-4 bg-[#0891B2] hover:bg-[#0891B2]/90 rounded-[4px] text-white font-medium text-[14px] transition-colors"
          >
            Save Client
          </button>
        </div>

      </div>
    </div>
  );
}
