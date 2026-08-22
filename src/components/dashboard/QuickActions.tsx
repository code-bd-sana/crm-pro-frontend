import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, FolderPlus, PlusSquare, FilePlus } from "lucide-react";

const quickActionsData = [
  { title: "Add Client", description: "Create a new client", icon: UserPlus, color: "text-[#3B82F6]", bgColor: "bg-[#EFF6FF]" },
  { title: "Create Project", description: "Start a new project", icon: FolderPlus, color: "text-[#8B5CF6]", bgColor: "bg-[#F5F3FF]" },
  { title: "Create Task", description: "Add a new task", icon: PlusSquare, color: "text-[#22C55E]", bgColor: "bg-[#DCFCE7]" },
  { title: "New Invoice", description: "Generate an invoice", icon: FilePlus, color: "text-[#F97316]", bgColor: "bg-[#FFEDD4]" },
];

export function QuickActions() {
  return (
    <Card className="bg-[#FFFFFF] border-[#E5E5E5] shadow-none rounded-[10px] h-[416px] xl:col-span-1">
      <CardHeader className="h-[46px] p-6 pb-0 flex justify-center">
        <CardTitle className="text-[16px] leading-[16px] font-medium text-[#111111]">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pt-[25px]">
        <div className="grid grid-cols-2 gap-4 h-[320px]">
          {quickActionsData.map((action, index) => {
            const ActionIcon = action.icon;
            return (
              <button 
                key={index}
                className="flex flex-col items-start justify-center p-4 border border-[#E5E5E5] rounded-md hover:bg-gray-50 transition-colors text-left"
              >
                <div className={`w-8 h-8 rounded-md flex items-center justify-center mb-4 ${action.bgColor}`}>
                  <ActionIcon className={`w-4 h-4 ${action.color}`} />
                </div>
                <span className="text-[#111111] font-medium text-[14px] leading-[20px]">{action.title}</span>
                <span className="text-[#737373] font-normal text-[12px] leading-[16px] mt-1">{action.description}</span>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
