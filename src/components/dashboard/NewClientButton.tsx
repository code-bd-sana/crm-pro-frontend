"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { AddClientModal } from "./AddClientModal";

export function NewClientButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="flex items-center justify-center gap-2 bg-[#0891B2] hover:bg-[#0891B2]/90 text-white rounded-[4px] h-[36px] px-4 transition-colors"
      >
        <Plus className="w-4 h-4" />
        <span className="font-medium text-[14px]">New Client</span>
      </button>

      <AddClientModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
