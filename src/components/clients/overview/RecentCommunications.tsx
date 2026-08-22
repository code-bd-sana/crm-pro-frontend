import { Calendar, Phone, Users, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RecentCommunications() {
  return (
    <Card className="bg-[#FFFFFF] border-[#E5E5E5] shadow-none rounded-[10px]">
      <CardHeader className="h-[46px] p-6 pb-0 flex justify-center">
        <CardTitle className="text-[16px] leading-[16px] font-medium text-[#111111]">Recent Communications</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pt-[25px] pb-6">
        <div className="flex flex-col gap-4">
          
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-[#111111] font-medium text-[14px]">Quarterly Review</p>
              <p className="text-[#737373] font-normal text-[14px]">Apr 10, 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-[#111111] font-medium text-[14px]">Project Kickoff Call</p>
              <p className="text-[#737373] font-normal text-[14px]">Apr 8, 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-[#111111] font-medium text-[14px]">Strategy Meeting</p>
              <p className="text-[#737373] font-normal text-[14px]">Apr 5, 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-[#111111] font-medium text-[14px]">Contract Renewal</p>
              <p className="text-[#737373] font-normal text-[14px]">Apr 2, 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-[#111111] font-medium text-[14px]">Follow-up Discussion</p>
              <p className="text-[#737373] font-normal text-[14px]">Mar 28, 2026</p>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}
