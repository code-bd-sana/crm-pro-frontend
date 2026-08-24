import Link from "next/link";
import { Search, Filter, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { NewClientButton } from "@/components/dashboard/NewClientButton";

const clientsData = [
  { id: 1, initials: "AC", name: "Acme Corp", industry: "Technology", contact: "Sarah Chen", lastActive: "2 hours ago", status: "Active", ltv: "$45,000" },
  { id: 2, initials: "GI", name: "Global Industries", industry: "Manufacturing", contact: "Marcus Rodriguez", lastActive: "1 day ago", status: "Active", ltv: "$128,500" },
  { id: 3, initials: "NS", name: "Nexus Solutions", industry: "Consulting", contact: "David Kim", lastActive: "3 days ago", status: "Active", ltv: "$24,000" },
  { id: 4, initials: "CS", name: "CloudNine Systems", industry: "Technology", contact: "Ryan Cooper", lastActive: "2 weeks ago", status: "Inactive", ltv: "$15,600" },
  { id: 5, initials: "PM", name: "Pinnacle Marketing", industry: "Marketing", contact: "Jessica Walsh", lastActive: "1 month ago", status: "Active", ltv: "$41,200" },
  { id: 6, initials: "SC", name: "Silverstone Corp", industry: "Manufacturing", contact: "Michael Torres", lastActive: "4 days ago", status: "Inactive", ltv: "$55,800" },
];

export default function ClientsPage() {
  return (
    <div className="flex flex-col flex-1 px-6 pt-6 pb-6 gap-6 h-full w-full">

      {/* Header */}
      <div className="flex items-center justify-between h10">
        <h1 className="text-[#111111] font-semibold text-[24px] leading-[32px]">Clients</h1>
        <NewClientButton />
      </div>

      {/* Controls Container (Search & Filter) */}
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="relative w-[320px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
          <Input
            placeholder="Search clients..."
            className="w-full pl-9 h-9 border-[#E5E5E5] focus-visible:ring-[#0891B2] bg-[#FFFFFF] text-[#111111] placeholder:text-[#737373]"
          />
        </div>

        {/* Filter Button */}
        <button className="flex items-center justify-center gap-2 bg-[#FFFFFF] border border-[#E5E5E5] hover:bg-gray-50 text-[#111111] rounded-[4px] h-[36px] px-4 transition-colors">
          <Filter className="w-4 h-4 text-[#737373]" />
          <span className="font-medium text-[14px]">Filter</span>
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-[10px] flex-1 flex flex-col overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="w-full text-left min-w-[1000px]">
            <TableHeader>
              <TableRow className="bg-[#F5F5F5] border-b border-[#E5E5E5] hover:bg-[#F5F5F5]">
                <TableHead className="w-12 px-6 py-3">
                  <input type="checkbox" className="w-4 h-4 rounded border-[#E5E5E5] text-[#0891B2] focus:ring-[#0891B2]" />
                </TableHead>
                <TableHead className="px-6 py-3 text-[12px] font-medium text-[#737373] uppercase tracking-wider">Client</TableHead>
                <TableHead className="px-6 py-3 text-[12px] font-medium text-[#737373] uppercase tracking-wider">Industry</TableHead>
                <TableHead className="px-6 py-3 text-[12px] font-medium text-[#737373] uppercase tracking-wider">Contact</TableHead>
                <TableHead className="px-6 py-3 text-[12px] font-medium text-[#737373] uppercase tracking-wider">Last Active</TableHead>
                <TableHead className="px-6 py-3 text-[12px] font-medium text-[#737373] uppercase tracking-wider">Status</TableHead>
                <TableHead className="px-6 py-3 text-[12px] font-medium text-[#737373] uppercase tracking-wider text-right">LTV</TableHead>
                <TableHead className="w-12 px-6 py-3"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientsData.map((client, idx) => (
                <TableRow key={client.id} className={`hover:bg-gray-50 transition-colors ${idx !== clientsData.length - 1 ? 'border-b border-[#E5E5E5]' : 'border-0'}`}>
                  <TableCell className="px-6 py-4">
                    <input type="checkbox" className="w-4 h-4 rounded border-[#E5E5E5] text-[#0891B2] focus:ring-[#0891B2]" />
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <Link href={`/clients/${client.id}`} className="flex items-center gap-3 group">
                      <div className="w-8 h-8 rounded-full bg-[#0891B2]/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-[#0891B2] font-medium text-[12px]">{client.initials}</span>
                      </div>
                      <span className="text-[#111111] font-medium text-[14px] group-hover:text-[#0891B2] transition-colors">{client.name}</span>
                    </Link>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <span className="text-[#737373] font-normal text-[14px]">{client.industry}</span>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <span className="text-[#737373] font-normal text-[14px]">{client.contact}</span>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <span className="text-[#737373] font-normal text-[14px]">{client.lastActive}</span>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    {client.status === "Active" ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-[4px] bg-[#DCFCE7] text-[#166534] font-medium text-[12px]">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-[4px] border border-[#E5E5E5] bg-[#FFFFFF] text-[#737373] font-medium text-[12px]">
                        Inactive
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <span className="text-[#111111] font-medium text-[14px]">{client.ltv}</span>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <button className="text-[#737373] hover:text-[#111111] transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#E5E5E5] mt-auto">
          <span className="text-[#737373] text-[14px] font-normal">1 of 31 pages</span>
          <div className="flex items-center gap-2">
            <button className="flex items-center justify-center px-3 h-[32px] bg-[#FFFFFF] border border-[#E5E5E5] rounded-[4px] text-[#A3A3A3] font-medium text-[14px] cursor-not-allowed">
              Previous
            </button>
            <button className="flex items-center justify-center px-3 h-[32px] bg-[#FFFFFF] border border-[#E5E5E5] hover:bg-gray-50 rounded-[4px] text-[#111111] font-medium text-[14px] transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
