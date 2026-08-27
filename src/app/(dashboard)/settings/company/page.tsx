"use client";

import React from "react";
import { Save, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CompanySettingsPage() {
  return (
    <div className="flex flex-col gap-6 h-full pb-20">
      
      {/* Company Logo Section */}
      <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-6 shadow-sm">
        <h2 className="text-[14px] font-bold text-[#111111] mb-6">Company Logo</h2>
        <div className="flex items-center gap-6">
          <div className="w-[80px] h-[80px] rounded-[10px] bg-[#4477A1] text-white flex items-center justify-center shrink-0">
            <Building2 className="w-8 h-8" />
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-[12px] text-[#737373]">PNG or SVG. Recommended size: 400x400px.</p>
            <Button variant="outline" className="bg-[#FAFAFA] border-[#E5E5E5] text-[#111111] hover:bg-[#F5F5F5] h-[36px] px-4 rounded-[4px] w-fit">
              Upload Logo
            </Button>
          </div>
        </div>
      </div>

      {/* Basic Information Section */}
      <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-6 shadow-sm flex flex-col gap-6">
        <h2 className="text-[14px] font-bold text-[#111111]">Basic Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-medium text-[#111111]">Company Name</label>
            <Input 
              defaultValue="CRM Pro Inc."
              className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-[40px] rounded-[4px] px-3 placeholder:text-[#737373]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-medium text-[#111111]">Legal Name</label>
            <Input 
              defaultValue="CRM Pro Incorporated"
              className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-[40px] rounded-[4px] px-3 placeholder:text-[#737373]"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-medium text-[#111111]">Website</label>
            <Input 
              defaultValue="https://crmpro.com"
              className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-[40px] rounded-[4px] px-3 placeholder:text-[#737373]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-medium text-[#111111]">Industry</label>
            <Input 
              defaultValue="Software & Technology"
              className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-[40px] rounded-[4px] px-3 placeholder:text-[#737373]"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-medium text-[#111111]">Company Size</label>
            <Input 
              defaultValue="11-50 employees"
              className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-[40px] rounded-[4px] px-3 placeholder:text-[#737373]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-medium text-[#111111]">Founded Year</label>
            <Input 
              defaultValue="2020"
              className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-[40px] rounded-[4px] px-3 placeholder:text-[#737373]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <label className="text-[13px] font-medium text-[#111111]">Tax ID / EIN</label>
          <Input 
            defaultValue="12-3456789"
            className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-[40px] rounded-[4px] px-3 w-full"
          />
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <label className="text-[13px] font-medium text-[#111111]">Company Description</label>
          <textarea 
            className="w-full bg-[#FFFFFF] border border-[#E5E5E5] text-[#111111] min-h-[100px] rounded-[4px] p-3 focus:outline-none focus:ring-1 focus:ring-[#0891B2] resize-y placeholder:text-[#737373] text-sm"
          ></textarea>
        </div>
      </div>

      {/* Company Address Section */}
      <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-6 shadow-sm flex flex-col gap-6">
        <h2 className="text-[14px] font-bold text-[#111111]">Company Address</h2>
        
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-medium text-[#111111]">Street Address</label>
          <Input 
            defaultValue="456 Business Avenue"
            className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-[40px] rounded-[4px] px-3 w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-2">
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-medium text-[#111111]">City</label>
            <Input 
              defaultValue="San Francisco"
              className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-[40px] rounded-[4px] px-3 placeholder:text-[#737373]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-medium text-[#111111]">State / Province</label>
            <Input 
              defaultValue="California"
              className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-[40px] rounded-[4px] px-3 placeholder:text-[#737373]"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-medium text-[#111111]">ZIP / Postal Code</label>
            <Input 
              defaultValue="94102"
              className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-[40px] rounded-[4px] px-3 placeholder:text-[#737373]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-medium text-[#111111]">Country</label>
            <Input 
              defaultValue="United States"
              className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-[40px] rounded-[4px] px-3 placeholder:text-[#737373]"
            />
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-6 shadow-sm flex flex-col gap-6">
        <h2 className="text-[14px] font-bold text-[#111111]">Contact Information</h2>
        
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-medium text-[#111111]">Company Phone</label>
          <Input 
            defaultValue="+1 (555) 987-6543"
            className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-[40px] rounded-[4px] px-3 w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-2">
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-medium text-[#111111]">Support Email</label>
            <Input 
              defaultValue="support@crmpro.com"
              className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-[40px] rounded-[4px] px-3 placeholder:text-[#737373]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-medium text-[#111111]">Sales Email</label>
            <Input 
              defaultValue="sales@crmpro.com"
              className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-[40px] rounded-[4px] px-3 placeholder:text-[#737373]"
            />
          </div>
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 right-0 left-0 lg:left-[240px] bg-[#FAFAFA] border-t border-[#E5E5E5] p-4 flex justify-end gap-3 z-10 px-6">
        <Button variant="outline" className="bg-white border-[#E5E5E5] text-[#111111] hover:bg-[#F5F5F5] h-[40px] px-6 rounded-[4px]">
          Cancel
        </Button>
        <Button className="bg-[#4477A1] hover:bg-[#366083] text-white h-[40px] px-6 rounded-[4px] font-medium">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

    </div>
  );
}
