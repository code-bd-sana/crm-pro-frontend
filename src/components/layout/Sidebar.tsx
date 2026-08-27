"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  FolderKanban, 
  CheckSquare, 
  FileText, 
  UsersRound, 
  BarChart2, 
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Clients", href: "/clients", icon: Users },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Invoices", href: "/invoices", icon: FileText },
  { name: "Team", href: "/team", icon: UsersRound },
  { name: "Reports", href: "/reports", icon: BarChart2 },
  { name: "Settings", href: "/settings", icon: Settings },
];

const LogoutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H6" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.6667 11.3332L14 7.99984L10.6667 4.6665" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 8H6" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Sidebar() {
  const pathname = usePathname();
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="w-[240px] h-screen bg-[#FFFFFF] border-r border-[#E5E5E5] flex flex-col flex-shrink-0">
      
      {/* Header */}
      <div className="h-16 px-6 flex items-center border-b border-[#E5E5E5]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#0891B2] rounded flex items-center justify-center">
            <span className="text-white font-semibold text-sm">CR</span>
          </div>
          <span className="text-[#111111] font-semibold text-base">CRM Pro</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto pt-4 px-3 space-y-1">
        {navigation.map((item) => {
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                isActive 
                  ? "bg-[#0891B2] text-white" 
                  : "text-[#111111] hover:bg-gray-100"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-[#737373]")} />
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* User Profile */}
      <div className="pt-[13px] px-3 pb-4 border-t border-[#E5E5E5]">
        <div className="flex items-center h-[62px] w-full relative px-3 -mx-3">
          
          <div className="w-10 h-10 rounded-full bg-[#0891B2] flex items-center justify-center flex-shrink-0">
            <span className="text-white font-normal text-base leading-6">SC</span>
          </div>

          <div className="ml-3 flex flex-col items-start flex-1 min-w-0">
            <p className="text-[#111111] font-medium text-sm leading-5 truncate">
              Sarah Chen
            </p>
            <div className="mt-1 bg-[#F5F5F5] rounded flex justify-center items-center px-2 py-[2px]">
              <span className="text-[#111111] font-medium text-xs leading-4">
                Manager
              </span>
            </div>
          </div>

          <button 
            onClick={handleLogout}
            className="flex-shrink-0 ml-2 text-[#737373] hover:text-[#111111] transition-colors p-1 rounded hover:bg-gray-100"
            title="Log out"
          >
            <LogoutIcon />
          </button>
        </div>
      </div>

    </div>
  );
}
