"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Building2, Mail, Phone, Globe, MapPin, Tag, FileText, Send, MessageSquare, Calendar } from "lucide-react";
import { format } from "date-fns";
import { getClientById, getClientCommunications, addClientCommunication } from "@/services/client.service";
import { ClientStatus } from "@/types/models.types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function ClientDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const clientId = params.id as string;
  
  const [commType, setCommType] = useState("NOTE");
  const [commContent, setCommContent] = useState("");

  const { data: client, isLoading } = useQuery({
    queryKey: ["client", clientId],
    queryFn: () => getClientById(clientId),
  });

  const { data: communications, isLoading: isCommsLoading } = useQuery({
    queryKey: ["client", clientId, "communications"],
    queryFn: () => getClientCommunications(clientId),
  });

  const { mutate: submitCommunication, isPending } = useMutation({
    mutationFn: () => addClientCommunication(clientId, { type: commType, content: commContent }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client", clientId, "communications"] });
      setCommContent("");
      toast.success("Communication logged successfully");
    },
    onError: () => {
      toast.error("Failed to log communication");
    },
  });

  const renderStatus = (status?: ClientStatus) => {
    switch (status) {
      case ClientStatus.ACTIVE:
        return (
          <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#ECFDF5] text-[#059669]">
            <div className="w-2 h-2 rounded-full bg-[#10B981] mr-2"></div>
            <span className="text-sm font-medium">Active</span>
          </div>
        );
      case ClientStatus.INACTIVE:
        return (
          <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#FEF2F2] text-[#DC2626]">
            <div className="w-2 h-2 rounded-full bg-[#EF4444] mr-2"></div>
            <span className="text-sm font-medium">Inactive</span>
          </div>
        );
      case ClientStatus.LEAD:
        return (
          <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#FFFBEB] text-[#D97706]">
            <div className="w-2 h-2 rounded-full bg-[#F59E0B] mr-2"></div>
            <span className="text-sm font-medium">Lead</span>
          </div>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-[#FAFAFA]">
        <Loader2 className="w-8 h-8 text-[#0891B2] animate-spin" />
      </div>
    );
  }

  if (!client) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-[#FAFAFA]">
        <h2 className="text-xl font-semibold text-[#111111]">Client Not Found</h2>
        <Button variant="link" onClick={() => router.push('/clients')} className="mt-4 text-[#0891B2]">
          Back to Directory
        </Button>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-[#FAFAFA]">
      {/* Header section */}
      <div className="bg-white border-b border-[#E5E5E5] px-8 py-6">
        <Button 
          variant="ghost" 
          onClick={() => router.push('/clients')} 
          className="mb-6 -ml-3 text-[#737373] hover:text-[#111111]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Clients
        </Button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-[12px] bg-[#0891B2]/10 text-[#0891B2] flex items-center justify-center text-3xl font-semibold border border-[#0891B2]/20 shadow-sm">
              {client.companyName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-3xl font-bold text-[#111111]">{client.companyName}</h1>
                {renderStatus(client.status)}
              </div>
              <div className="flex items-center gap-4 text-[#737373]">
                {client.contactPerson && (
                  <span className="flex items-center text-sm">
                    <span className="font-medium mr-1 text-[#404040]">Contact:</span> {client.contactPerson}
                  </span>
                )}
                <span className="flex items-center text-sm">
                  <Building2 className="w-4 h-4 mr-1.5" />
                  {client.industry || 'No industry'}
                </span>
                <span className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 mr-1.5" />
                  Added {format(new Date(client.createdAt), 'MMM d, yyyy')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 max-w-7xl mx-auto">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6 bg-transparent border-b border-[#E5E5E5] w-full justify-start h-auto p-0 rounded-none">
            <TabsTrigger 
              value="overview" 
              className="px-6 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-[#0891B2] data-[state=active]:bg-transparent data-[state=active]:text-[#0891B2] text-[#737373] font-medium"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="communications" 
              className="px-6 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-[#0891B2] data-[state=active]:bg-transparent data-[state=active]:text-[#0891B2] text-[#737373] font-medium"
            >
              Communications
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column: Contact & Details */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-[10px] border border-[#E5E5E5] p-6">
                  <h3 className="text-lg font-semibold text-[#111111] mb-6">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 p-2 bg-[#F5F5F5] rounded-full text-[#737373]">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#737373] mb-1">Email Address</p>
                        <p className="text-[#111111]">{client.email || '—'}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 p-2 bg-[#F5F5F5] rounded-full text-[#737373]">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#737373] mb-1">Phone Number</p>
                        <p className="text-[#111111]">{client.phone || '—'}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 p-2 bg-[#F5F5F5] rounded-full text-[#737373]">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#737373] mb-1">Website</p>
                        {client.website ? (
                          <a href={client.website.startsWith('http') ? client.website : `https://${client.website}`} target="_blank" rel="noopener noreferrer" className="text-[#0891B2] hover:underline">
                            {client.website}
                          </a>
                        ) : (
                          <p className="text-[#111111]">—</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 p-2 bg-[#F5F5F5] rounded-full text-[#737373]">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#737373] mb-1">Address</p>
                        <p className="text-[#111111] whitespace-pre-wrap">{client.address || '—'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-[10px] border border-[#E5E5E5] p-6">
                  <h3 className="text-lg font-semibold text-[#111111] mb-6">Internal Notes</h3>
                  {client.notes ? (
                    <div className="text-[#404040] whitespace-pre-wrap leading-relaxed bg-[#FAFAFA] p-4 rounded-[6px] border border-[#E5E5E5]">
                      {client.notes}
                    </div>
                  ) : (
                    <p className="text-[#737373] italic">No notes added for this client.</p>
                  )}
                </div>
              </div>

              {/* Right Column: Tags & Metadata */}
              <div className="space-y-6">
                <div className="bg-white rounded-[10px] border border-[#E5E5E5] p-6">
                  <div className="flex items-center mb-4">
                    <Tag className="w-5 h-5 text-[#737373] mr-2" />
                    <h3 className="text-lg font-semibold text-[#111111]">Tags</h3>
                  </div>
                  {client.tags && client.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {client.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-[#F5F5F5] text-[#404040] text-sm font-medium rounded-full border border-[#E5E5E5]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[#737373] text-sm">No tags specified.</p>
                  )}
                </div>
                
                {/* Could add a Recent Projects or similar section here later */}
              </div>

            </div>
          </TabsContent>
          
          <TabsContent value="communications" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-[10px] border border-[#E5E5E5] flex flex-col h-[600px]">
                  
                  {/* Communications History */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {isCommsLoading ? (
                      <div className="flex justify-center py-10">
                        <Loader2 className="w-6 h-6 text-[#0891B2] animate-spin" />
                      </div>
                    ) : communications?.length === 0 ? (
                      <div className="text-center py-10">
                        <MessageSquare className="w-12 h-12 text-[#E5E5E5] mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-[#111111]">No communications yet</h3>
                        <p className="text-[#737373] mt-1">Log an email, call, or meeting below.</p>
                      </div>
                    ) : (
                      communications?.map((comm) => (
                        <div key={comm.id} className="flex gap-4">
                          <div className="mt-1 flex-shrink-0">
                            {comm.type === 'EMAIL' ? (
                              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"><Mail className="w-4 h-4" /></div>
                            ) : comm.type === 'CALL' ? (
                              <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><Phone className="w-4 h-4" /></div>
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center"><FileText className="w-4 h-4" /></div>
                            )}
                          </div>
                          <div className="flex-1 bg-[#FAFAFA] border border-[#E5E5E5] rounded-[8px] p-4">
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-semibold text-[#111111] text-sm">
                                {comm.type === 'EMAIL' ? 'Email sent' : comm.type === 'CALL' ? 'Phone call' : 'Note/Meeting'}
                              </span>
                              <span className="text-xs text-[#737373]">
                                {format(new Date(comm.date || comm.createdAt), "MMM d, yyyy 'at' h:mm a")}
                              </span>
                            </div>
                            <p className="text-[#404040] text-sm whitespace-pre-wrap">{comm.content}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Add New Communication Form */}
                  <div className="p-4 border-t border-[#E5E5E5] bg-[#FAFAFA] rounded-b-[10px]">
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-3">
                        <Select value={commType} onValueChange={(val) => setCommType(val || "NOTE")}>
                          <SelectTrigger className="w-[140px] bg-white border-[#E5E5E5]">
                            <SelectValue placeholder="Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="NOTE">Note</SelectItem>
                            <SelectItem value="EMAIL">Email</SelectItem>
                            <SelectItem value="CALL">Call</SelectItem>
                            <SelectItem value="MEETING">Meeting</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Textarea 
                        placeholder="Log a new communication..."
                        value={commContent}
                        onChange={(e) => setCommContent(e.target.value)}
                        className="min-h-[80px] bg-white border-[#E5E5E5] resize-y"
                      />
                      <div className="flex justify-end">
                        <Button 
                          onClick={() => submitCommunication()}
                          disabled={!commContent.trim() || isPending}
                          className="bg-[#0891B2] hover:bg-[#0E7490] text-white rounded-[6px]"
                        >
                          {isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                          Log Communication
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
