"use client";

import { useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { useAuthStore } from "@/store/useAuthStore";
import { socketService } from "@/lib/socket";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const _hasHydrated = useAuthStore((state) => state._hasHydrated);

  // Connect socket once when the authenticated dashboard mounts
  useEffect(() => {
    if (isAuthenticated) {
      socketService.connect();
    }
    return () => {
      socketService.disconnect();
    };
  }, [isAuthenticated]);

  // Global Hydration Guard: Prevents ALL hydration mismatches in the dashboard
  if (!_hasHydrated) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#FAFAFA]">
        <div className="w-8 h-8 border-4 border-[#0891B2] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#FAFAFA] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
