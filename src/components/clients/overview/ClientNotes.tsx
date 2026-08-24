import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ClientNotes() {
  return (
    <Card className="bg-[#FFFFFF] border-[#E5E5E5] shadow-none rounded-[10px] min-h-[116px]">
      <CardHeader className="p-6 pb-0">
        <CardTitle className="text-[16px] leading-[16px] font-medium text-[#111111]">Notes</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pt-[31px] pb-6">
        <p className="text-[#737373] font-normal text-[14px] leading-[20px] max-w-[950px]">
          Key account requiring premium support. Annual contract renewed in April. Primary contact prefers email communication for non-urgent matters.
        </p>
      </CardContent>
    </Card>
  );
}
