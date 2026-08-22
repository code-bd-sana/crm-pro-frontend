import { Card, CardContent } from "@/components/ui/card";

export function ClientSummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-[#FFFFFF] border-[#E5E5E5] shadow-none rounded-[10px] h-[110px]">
        <CardContent className="p-6 flex flex-col gap-1 justify-center h-full">
          <p className="text-[#737373] font-normal text-[14px]">Total Revenue</p>
          <h3 className="text-[#111111] font-semibold text-[32px] leading-[32px]">$48,500</h3>
        </CardContent>
      </Card>
      
      <Card className="bg-[#FFFFFF] border-[#E5E5E5] shadow-none rounded-[10px] h-[110px]">
        <CardContent className="p-6 flex flex-col gap-1 justify-center h-full">
          <p className="text-[#737373] font-normal text-[14px]">Active Projects</p>
          <h3 className="text-[#111111] font-semibold text-[32px] leading-[32px]">3</h3>
        </CardContent>
      </Card>

      <Card className="bg-[#FFFFFF] border-[#E5E5E5] shadow-none rounded-[10px] h-[110px]">
        <CardContent className="p-6 flex flex-col gap-1 justify-center h-full">
          <p className="text-[#737373] font-normal text-[14px]">Open Tasks</p>
          <h3 className="text-[#111111] font-semibold text-[32px] leading-[32px]">8</h3>
        </CardContent>
      </Card>
    </div>
  );
}
