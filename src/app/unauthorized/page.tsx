"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[5%] w-[40%] h-[40%] rounded-full bg-[#0891B2]/5 blur-[120px]" />
        <div className="absolute -bottom-[10%] -left-[5%] w-[40%] h-[40%] rounded-full bg-[#EF4444]/5 blur-[120px]" />
      </div>

      <div className="w-full max-w-[480px] bg-white rounded-[16px] shadow-sm border border-[#E5E5E5] p-8 md:p-10 text-center relative z-10">
        <div className="w-20 h-20 bg-[#FEF2F2] rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-[#FEE2E2]">
          <ShieldAlert className="w-10 h-10 text-[#EF4444]" />
        </div>

        <h1 className="text-[24px] font-bold text-[#111111] mb-2 tracking-tight">
          Access Denied
        </h1>

        <p className="text-[14px] text-[#737373] mb-8 leading-relaxed">
          You don't have the required permissions to view this page. If you believe this is a mistake, please contact your administrator.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2">
          <Button
            variant="outline"
            className="w-full sm:w-[180px] bg-[#FAFAFA] border-[#E5E5E5] text-[#111111] hover:bg-[#F5F5F5] h-[44px] rounded-[6px] font-medium"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>

          <Link 
            href="/" 
            className="flex items-center justify-center whitespace-nowrap w-full sm:w-[180px] bg-[#0891B2] hover:bg-[#0E7490] text-white h-[44px] rounded-[6px] font-medium transition-colors shadow-sm"
          >
            <Home className="w-4 h-4 mr-2 shrink-0" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
