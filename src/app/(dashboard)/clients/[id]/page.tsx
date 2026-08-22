import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ClientProfileHeader } from "@/components/clients/ClientProfileHeader";
import { ClientProfileTabs } from "@/components/clients/ClientProfileTabs";

export default function ClientProfilePage() {
  return (
    <div className="flex flex-col flex-1 px-6 pt-6 pb-6 gap-6 h-full mx-auto w-full max-w-[1320px]">
      
      {/* Back Button */}
      <div>
        <Link 
          href="/clients" 
          className="inline-flex items-center gap-2 text-[#737373] hover:text-[#111111] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium text-[14px]">Back to Clients</span>
        </Link>
      </div>

      {/* Client Header Info */}
      <ClientProfileHeader />

      {/* Tabs & Content */}
      <ClientProfileTabs />

    </div>
  );
}
