"use client";

import React, { useEffect } from "react";
import { Camera, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "@/services/auth.service";
import { updateUser } from "@/services/user.service";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useRBAC } from "@/hooks/useRBAC";

const profileSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  jobTitle: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfileSettingsPage() {
  const queryClient = useQueryClient();
  const setAuth = useAuthStore((state) => state.setAuth);
  const authState = useAuthStore((state) => state);
  const _hasHydrated = useAuthStore((state) => state._hasHydrated);
  const router = useRouter();
  const { hasRole } = useRBAC();

  useEffect(() => {
    // Basic settings are usually open to all, but since specifically requested:
    // Only allowing Super Admins to access settings for now.
    if (_hasHydrated && !hasRole('Super Admin')) {
      router.push("/unauthorized");
    }
  }, [hasRole, _hasHydrated, router]);

  const { data: user, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
  });

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      jobTitle: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        firstName: user.profile?.firstName || "",
        lastName: user.profile?.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        jobTitle: user.jobTitle || "",
      });
    }
  }, [user, form]);

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: (data: ProfileFormValues) => {
      if (!user) throw new Error("No user found");
      return updateUser(user.id, data);
    },
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      // Update local Zustand store
      if (authState.accessToken && authState.refreshToken) {
        setAuth(updatedUser, authState.accessToken, authState.refreshToken);
      }
      toast.success("Profile updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    },
  });

  const onSubmit = (values: ProfileFormValues) => {
    updateProfile(values);
  };

  const initials = `${user?.profile?.firstName?.charAt(0) || ''}${user?.profile?.lastName?.charAt(0) || ''}`.toUpperCase() || 'U';

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 text-[#0891B2] animate-spin" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 h-full pb-20">
        {/* Profile Picture Section */}
        <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-6 shadow-sm">
          <h2 className="text-[14px] font-bold text-[#111111] mb-6">Profile Picture</h2>
          <div className="flex items-center gap-6">
            <div className="w-[80px] h-[80px] rounded-full bg-[#E0F2FE] text-[#0369A1] flex items-center justify-center text-[24px] font-semibold shrink-0">
              {initials}
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-[12px] text-[#737373]">JPG, GIF or PNG. Max size of 2MB.</p>
              <Button type="button" variant="outline" className="bg-[#FAFAFA] border-[#E5E5E5] text-[#111111] hover:bg-[#F5F5F5] h-[36px] px-4 rounded-[4px] w-fit">
                <Camera className="w-4 h-4 mr-2" />
                Upload Photo
              </Button>
            </div>
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-6 shadow-sm flex flex-col gap-6">
          <h2 className="text-[14px] font-bold text-[#111111]">Personal Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[13px] font-medium text-[#111111]">First Name</FormLabel>
                  <FormControl>
                    <Input className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-[40px] rounded-[4px] px-3 placeholder:text-[#737373]" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[13px] font-medium text-[#111111]">Last Name</FormLabel>
                  <FormControl>
                    <Input className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-[40px] rounded-[4px] px-3 placeholder:text-[#737373]" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[13px] font-medium text-[#111111]">Email</FormLabel>
                  <FormControl>
                    <Input disabled className="bg-[#F5F5F5] border-[#E5E5E5] text-[#737373] h-[40px] rounded-[4px] px-3" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[13px] font-medium text-[#111111]">Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-[40px] rounded-[4px] px-3 placeholder:text-[#737373]" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[13px] font-medium text-[#111111]">Job Title</FormLabel>
                  <FormControl>
                    <Input className="bg-[#FFFFFF] border-[#E5E5E5] text-[#111111] h-[40px] rounded-[4px] px-3 placeholder:text-[#737373]" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            
            <FormItem>
              <FormLabel className="text-[13px] font-medium text-[#111111]">Department (Read Only)</FormLabel>
              <Input
                disabled
                value={user?.department?.name || 'No Department'}
                className="bg-[#F5F5F5] border-[#E5E5E5] text-[#737373] h-[40px] rounded-[4px] px-3"
              />
            </FormItem>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#FAFAFA] mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              className="bg-[#FAFAFA] hover:bg-[#F5F5F5] border-[#E5E5E5] text-[#111111] h-[36px] px-4 rounded-[4px] transition-colors"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending || !form.formState.isDirty}
              className="bg-[#0891B2] hover:bg-[#0E7490] text-white h-[36px] px-4 rounded-[4px] font-medium transition-colors"
            >
              {isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save Changes
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
