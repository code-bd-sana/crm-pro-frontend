import { Card, CardContent } from "@/components/ui/card";

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    client: string;
    statusColor: string;
    progress: number;
    status: "Active" | "On Hold" | "Completed";
    dueDate: string;
    team: string[];
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="bg-[#FFFFFF] border-[#E5E5E5] shadow-none rounded-[10px]">
      <CardContent className="p-6 pt-6 flex flex-col gap-4">

        {/* Title, Client & Status Dot */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="text-[#111111] font-semibold text-[18px] leading-[27px]">
              {project.title}
            </h3>
            <p className="text-[#737373] font-normal text-[14px] leading-[20px]">
              {project.client}
            </p>
          </div>
          <div
            className="w-2 h-2 rounded-full mt-2.5 flex-shrink-0"
            style={{ backgroundColor: project.statusColor }}
          />
        </div>

        {/* Progress */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[#737373] font-normal text-[14px] leading-[20px]">Progress</span>
            <span className="text-[#111111] font-medium text-[14px] leading-[20px]">
              {project.progress}%
            </span>
          </div>
          <div className="w-full h-2 bg-[#0891B2]/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0891B2] rounded-full transition-all duration-300"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        {/* Status Badge & Due Date */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center px-2 py-0.5 rounded-[4px] border border-transparent text-[#111111] font-medium text-[12px] leading-[16px]">
            {project.status}
          </span>
          <span className="text-[#737373] font-normal text-[12px] leading-[16px]">
            {project.dueDate}
          </span>
        </div>

        {/* Team Avatars */}
        <div className="flex items-center">
          {project.team.map((initials, index) => (
            <div
              key={index}
              className="w-7 h-7 rounded-full bg-[#0891B2]/10 flex items-center justify-center border-2 border-white"
              style={{ marginLeft: index > 0 ? "-8px" : "0" }}
            >
              <span className="text-[#0891B2] font-normal text-[10px] leading-[15px]">
                {initials}
              </span>
            </div>
          ))}
        </div>

      </CardContent>
    </Card>
  );
}
