import { Edit3, Mail, Phone, Link as LinkIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function ClientProfileHeader() {
  return (
    <Card className="bg-[#FFFFFF] border-[#E5E5E5] shadow-none rounded-[10px] w-full">
      <CardContent className="p-6 flex flex-col gap-6">

        {/* Top Section: Avatar & Basic Info */}
        <div className="flex flex-col items-center gap-2 pt-2">
          <div className="w-[80px] h-[80px] rounded-full bg-[#0891B2]/10 flex items-center justify-center mb-2">
            <span className="text-[#0891B2] font-normal text-[24px]">ML</span>
          </div>
          <h1 className="text-[#111111] font-semibold text-[20px] leading-[28px]">Meridian Logistics</h1>
          <span className="text-[#737373] font-normal text-[14px]">Transportation</span>
          <span className="mt-1 inline-flex items-center px-2 py-0.5 rounded-[4px] border border-[#E5E5E5] text-[#111111] font-medium text-[12px]">
            Active
          </span>
        </div>

        <div className="h-[1px] bg-[#E5E5E5] w-full" />

        {/* Contact Info Section */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-[#737373]" />
            <span className="text-[#737373] text-[14px]">sarah@meridian.com</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-[#737373]" />
            <span className="text-[#737373] text-[14px]">+1 (555) 234-5678</span>
          </div>
          <div className="flex items-center gap-3">
            <LinkIcon className="w-4 h-4 text-[#737373]" />
            <a href="https://meridian.com" className="text-[#0891B2] text-[14px] hover:underline">
              https://meridian.com
            </a>
          </div>
        </div>

        <div className="h-[1px] bg-[#E5E5E5] w-full" />

        {/* Tags Section */}
        <div className="flex flex-col gap-2">
          <span className="text-[#111111] font-medium text-[14px]">Tags</span>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-[4px] bg-[#F5F5F5] text-[#111111] font-medium text-[12px]">
              Enterprise
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-[4px] bg-[#F5F5F5] text-[#111111] font-medium text-[12px]">
              Premium Support
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full flex items-center justify-center gap-2 bg-[#0891B2] hover:bg-[#0891B2]/90 text-white rounded-[4px] h-[36px] transition-colors mt-2">
          <Edit3 className="w-4 h-4" />
          <span className="font-medium text-[14px]">Edit Client</span>
        </button>

      </CardContent>
    </Card>
  );
}
