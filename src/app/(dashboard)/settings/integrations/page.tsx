"use client";

import React from "react";
import { 
  Search, 
  MessageSquare, 
  Calendar, 
  GitBranch, 
  CreditCard, 
  Zap, 
  Box, 
  Video, 
  Mail 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const integrations = [
  {
    name: "Slack",
    icon: MessageSquare,
    category: "Communication",
    status: "Connected",
    description: "Get notifications and updates in your Slack workspace",
    features: ["Real-time notifications", "Task updates", "Team mentions"],
  },
  {
    name: "Google Calendar",
    icon: Calendar,
    category: "Productivity",
    status: "Connected",
    description: "Sync deadlines and meetings with Google Calendar",
    features: ["Automatic sync", "Meeting reminders", "Deadline tracking"],
  },
  {
    name: "GitHub",
    icon: GitBranch,
    category: "Development",
    status: "Available",
    description: "Link commits and pull requests to tasks and projects",
    features: ["Commit tracking", "PR integration", "Issue sync"],
  },
  {
    name: "Stripe",
    icon: CreditCard,
    category: "Payment",
    status: "Available",
    description: "Process payments and sync invoice data",
    features: ["Payment processing", "Invoice sync", "Subscription management"],
  },
  {
    name: "Zapier",
    icon: Zap,
    category: "Automation",
    status: "Available",
    description: "Connect with 5000+ apps using Zapier workflows",
    features: ["Unlimited workflows", "Custom triggers", "Multi-app connections"],
  },
  {
    name: "Dropbox",
    icon: Box,
    category: "Storage",
    status: "Connected",
    description: "Store and share files with your team",
    features: ["File storage", "Team sharing", "Version control"],
  },
  {
    name: "Zoom",
    icon: Video,
    category: "Communication",
    status: "Available",
    description: "Schedule and join meetings directly from CRM Pro",
    features: ["One-click meetings", "Recording integration", "Calendar sync"],
  },
  {
    name: "Mailchimp",
    icon: Mail,
    category: "Marketing",
    status: "Available",
    description: "Sync contacts and manage email campaigns",
    features: ["Contact sync", "Campaign tracking", "Audience segmentation"],
  }
];

export default function IntegrationsSettingsPage() {
  return (
    <div className="flex flex-col gap-6 h-full pb-20">
      
      {/* API Access */}
      <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-6 shadow-sm flex flex-col gap-6">
        <h2 className="text-[14px] font-bold text-[#111111]">API Access</h2>
        
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-medium text-[#111111]">API Key</label>
          <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
            <Input 
              value="crm_live_************************" 
              readOnly
              className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-[40px] rounded-[4px] px-3 font-mono text-[13px] flex-1 max-w-[600px]"
            />
            <div className="flex items-center gap-2">
              <Button variant="outline" className="bg-[#FAFAFA] border-[#E5E5E5] text-[#111111] hover:bg-[#F5F5F5] h-[40px] px-4 rounded-[4px]">
                Reveal
              </Button>
              <Button variant="outline" className="bg-[#FAFAFA] border-[#E5E5E5] text-[#111111] hover:bg-[#F5F5F5] h-[40px] px-4 rounded-[4px]">
                Copy
              </Button>
            </div>
          </div>
          <p className="text-[12px] text-[#737373] mt-1">Keep your API key secret. Don't share it in public repositories.</p>
        </div>

        <div className="border border-[#E5E5E5] rounded-[8px] p-4 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[14px] font-medium text-[#111111]">API Access</span>
            <span className="text-[13px] text-[#737373]">Allow external applications to access your data</span>
          </div>
          <Switch defaultChecked className="data-checked:bg-[#0891B2] data-unchecked:bg-[#E5E5E5]" />
        </div>

        <Button variant="outline" className="bg-[#FAFAFA] border-[#E5E5E5] text-[#111111] hover:bg-[#F5F5F5] h-[36px] px-4 rounded-[4px] w-fit">
          Generate New API Key
        </Button>
      </div>

      {/* Webhooks */}
      <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-6 shadow-sm flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-[14px] font-bold text-[#111111]">Webhooks</h2>
          <Button variant="outline" className="bg-[#FAFAFA] border-[#E5E5E5] text-[#111111] hover:bg-[#F5F5F5] h-[32px] px-3 rounded-[4px] text-[13px]">
            Add Webhook
          </Button>
        </div>

        <div className="border border-[#E5E5E5] rounded-[8px] p-4 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[14px] font-medium text-[#111111]">https://api.example.com/webhooks</span>
            <span className="text-[13px] text-[#737373]">Events: task.created, project.updated</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[13px] font-medium text-[#111111]">Active</span>
            <Button variant="ghost" className="text-[#111111] font-medium text-[13px] hover:bg-[#F5F5F5] h-[32px] px-3 rounded-[4px]">
              Edit
            </Button>
          </div>
        </div>
      </div>

      {/* Search Integrations */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#737373] absolute left-3 top-1/2 -translate-y-1/2" />
        <Input 
          placeholder="Search Integrations..."
          className="bg-white border-[#E5E5E5] pl-9 h-[40px] rounded-[6px] text-[14px] text-[#111111] placeholder:text-[#737373]"
        />
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((integration, idx) => {
          const Icon = integration.icon;
          const isConnected = integration.status === "Connected";

          return (
            <div key={idx} className="bg-white border border-[#E5E5E5] rounded-[10px] p-6 shadow-sm flex flex-col h-full">
              
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[8px] bg-[#F5F5F5] flex items-center justify-center border border-[#E5E5E5]">
                    <Icon className="w-5 h-5 text-[#4477A1]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[16px] font-bold text-[#111111]">{integration.name}</span>
                    <span className="text-[12px] font-medium text-[#4477A1] bg-[#E0F2FE] px-2 py-0.5 rounded-[4px] w-fit mt-1">
                      {integration.category}
                    </span>
                  </div>
                </div>
                <span className={`text-[12px] font-medium ${isConnected ? "text-[#111111]" : "text-[#737373] bg-[#FAFAFA] border border-[#E5E5E5] px-2 py-0.5 rounded-[4px]"}`}>
                  {isConnected ? "Connected" : "Available"}
                </span>
              </div>

              <p className="text-[14px] text-[#737373] mb-4">
                {integration.description}
              </p>

              <ul className="flex flex-col gap-2 mb-6 flex-1">
                {integration.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2 text-[13px] text-[#737373]">
                    <div className="w-1 h-1 rounded-full bg-[#A3A3A3]" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex items-center gap-3 w-full">
                {isConnected ? (
                  <>
                    <Button variant="outline" className="flex-1 bg-[#FAFAFA] border-[#E5E5E5] text-[#111111] hover:bg-[#F5F5F5] h-[36px] rounded-[4px]">
                      Disconnect
                    </Button>
                    <Button variant="outline" className="flex-1 bg-[#FAFAFA] border-[#E5E5E5] text-[#111111] hover:bg-[#F5F5F5] h-[36px] rounded-[4px]">
                      Configure
                    </Button>
                  </>
                ) : (
                  <Button className="w-full bg-[#0891B2] hover:bg-[#0E7490] text-white h-[36px] rounded-[4px] font-medium">
                    Connect
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
