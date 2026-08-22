"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { useState } from "react";
import { api } from "@/lib/axios";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

// Google SVG Icon for exact Figma matching
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.6 10.2273C19.6 9.51818 19.5364 8.83636 19.4182 8.18182H10V12.0545H15.3818C15.1545 13.3091 14.4455 14.3727 13.3818 15.0818V17.5818H16.6091C18.5 15.8455 19.6 13.2818 19.6 10.2273Z" fill="#4285F4"/>
    <path d="M10 20C12.7 20 15 19.1 16.6091 17.5818L13.3818 15.0818C12.4909 15.6818 11.3455 16.0364 10 16.0364C7.39091 16.0364 5.18182 14.2727 4.39091 11.9091H1.05455V14.5C2.7 17.7636 6.09091 20 10 20Z" fill="#34A853"/>
    <path d="M4.39091 11.9091C4.19091 11.3091 4.07273 10.6727 4.07273 10C4.07273 9.32727 4.19091 8.69091 4.39091 8.09091V5.5H1.05455C0.381818 6.83636 0 8.37273 0 10C0 11.6273 0.381818 13.1636 1.05455 14.5L4.39091 11.9091Z" fill="#FBBC05"/>
    <path d="M10 3.96364C11.4636 3.96364 12.7818 4.46364 13.8182 5.44545L16.6909 2.57273C15 1 12.7 0 10 0C6.09091 0 2.7 2.23636 1.05455 5.5L4.39091 8.09091C5.18182 5.72727 7.39091 3.96364 10 3.96364Z" fill="#EA4335"/>
  </svg>
);

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", values);
      setAuth(response.data.user, response.data.accessToken);
      toast.success("Successfully logged in!");
      router.push("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[448px] bg-[#FFFFFF] border border-[#E5E5E5] rounded-md shadow-sm p-8">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-[#0891B2] rounded flex items-center justify-center mb-4">
            <span className="text-white font-bold text-xl leading-7">CR</span>
          </div>
          <h1 className="text-[#111111] font-semibold text-2xl leading-8 mb-1">CRM Pro</h1>
          <p className="text-[#737373] text-sm leading-5">Sign in to your account</p>
        </div>

        {/* Form Section */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#111111] font-medium text-sm">Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="you@company.com" 
                      className="border-[#E5E5E5] focus-visible:ring-[#0891B2] h-9"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-[#111111] font-medium text-sm">Password</FormLabel>
                    <Link href="/forgot-password" className="text-[#0891B2] hover:underline text-xs">
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input 
                      type="password"
                      placeholder="••••••••" 
                      className="border-[#E5E5E5] focus-visible:ring-[#0891B2] h-9"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full bg-[#0891B2] hover:bg-[#0891B2]/90 text-white font-medium text-sm h-9"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign in
            </Button>
          </form>
        </Form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E5E5E5]"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#FFFFFF] text-[#737373] text-xs">or</span>
          </div>
        </div>

        {/* Social Login */}
        <Button 
          type="button" 
          variant="outline" 
          className="w-full border-[#E5E5E5] bg-[#FAFAFA] hover:bg-gray-100 text-[#111111] font-medium text-sm h-9"
        >
          <GoogleIcon />
          <span className="ml-2">Continue with Google</span>
        </Button>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-[#737373]">
          Don't have an account? <Link href="/register" className="text-[#111111] font-medium hover:underline">Create Account</Link>
        </p>

      </div>
    </div>
  );
}
