"use client";

import { useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Upload, FileText, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getAttachments, uploadAttachment, deleteAttachment, type Attachment } from "@/services/attachment.service";
import { getErrorMessage } from "@/lib/utils";
import { PermissionGuard } from "@/components/shared/PermissionGuard";
import { PermissionEnum } from "@/types/auth.types";

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function ProjectFiles({ projectId }: { projectId: string }) {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: attachments, isLoading } = useQuery({
    queryKey: ["attachments", "PROJECT", projectId],
    queryFn: () => getAttachments("PROJECT", projectId),
  });

  const { mutate: uploadFile, isPending: isUploading } = useMutation({
    mutationFn: (file: File) => uploadAttachment(file, "PROJECT", projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attachments", "PROJECT", projectId] });
      toast.success("File uploaded successfully");
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to upload file"));
    },
  });

  const { mutate: removeFile } = useMutation({
    mutationFn: (id: string) => deleteAttachment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attachments", "PROJECT", projectId] });
      toast.success("File deleted");
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Failed to delete file"));
    },
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
    event.target.value = "";
  };

  return (
    <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-[16px] font-semibold text-[#111111]">Files</h3>
        <PermissionGuard permission={PermissionEnum.PROJECTS_UPDATE}>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/jpeg,image/png,image/webp,application/pdf"
            onChange={handleFileSelect}
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="h-8 px-3 bg-[#0891B2] hover:bg-[#0891B2]/90 text-white rounded-[4px] text-[13px] font-medium"
          >
            {isUploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
            Upload File
          </Button>
        </PermissionGuard>
      </div>
      <p className="text-[12px] text-[#737373] -mt-2">JPEG, PNG, WEBP or PDF. Max size 5MB.</p>

      {isLoading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : !attachments || attachments.length === 0 ? (
        <p className="text-[14px] text-[#737373] py-4 text-center">No files uploaded yet.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {attachments.map((attachment: Attachment) => (
            <div
              key={attachment.id}
              className="flex items-center gap-3 border border-[#E5E5E5] rounded-[6px] px-4 py-2.5 hover:bg-[#F8FAFC] transition-colors"
            >
              <div className="w-9 h-9 rounded-[6px] bg-[#0891B2]/10 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-[#0891B2]" />
              </div>
              <a
                href={attachment.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-0 flex flex-col"
              >
                <span className="text-[14px] font-medium text-[#111111] truncate hover:text-[#0891B2]">
                  {attachment.fileName ?? "Unnamed file"}
                </span>
                <span className="text-[12px] text-[#737373]">
                  {formatFileSize(attachment.fileSize ?? 0)}
                  {attachment.createdAt ? ` • ${format(new Date(attachment.createdAt), "MMM d, yyyy")}` : ""}
                </span>
              </a>
              <PermissionGuard permission={PermissionEnum.PROJECTS_UPDATE}>
                <button
                  onClick={() => removeFile(attachment.id)}
                  className="text-[#737373] hover:text-[#EF4444] transition-colors p-1"
                  aria-label="Delete file"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </PermissionGuard>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
