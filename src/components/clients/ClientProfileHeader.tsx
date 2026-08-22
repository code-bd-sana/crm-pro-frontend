import { Edit3 } from "lucide-react";

export function ClientProfileHeader() {
  return (
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-[#0891B2]/10 flex items-center justify-center flex-shrink-0">
          <span className="text-[#0891B2] font-semibold text-[24px]">AC</span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <h1 className="text-[#111111] font-semibold text-[32px] leading-[32px]">Acme Corp</h1>
            <span className="text-[#737373] font-normal text-[16px]">Technology</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-[4px] bg-purple-100 text-purple-700 font-medium text-[12px]">
              Enterprise
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-[4px] bg-[#DCFCE7] text-[#166534] font-medium text-[12px]">
              Premium Support
            </span>
          </div>
        </div>
      </div>
      
      <button className="flex items-center justify-center gap-2 bg-[#0891B2] hover:bg-[#0891B2]/90 text-white rounded-[4px] h-[36px] px-4 transition-colors">
        <Edit3 className="w-4 h-4" />
        <span className="font-medium text-[14px]">Edit Client</span>
      </button>
    </div>
  );
}
