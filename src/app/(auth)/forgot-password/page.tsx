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
import { toast } from "sonner";
import { Loader2, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { forgotPassword } from "@/services/auth.service";
import { AxiosError } from "axios";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setApiError("");
    try {
      const data = await forgotPassword({ email: values.email });
      setIsSuccess(true);
      toast.success(data.message ?? "Password reset link sent.");
    } catch (error: any) {
      let errorMessage = "Something went wrong. Please try again.";
      const responseMessage = error.response?.data?.message;

      if (typeof responseMessage === "string") {
        errorMessage = responseMessage;
      } else if (Array.isArray(responseMessage) && responseMessage.length > 0) {
        errorMessage = responseMessage[0];
      } else if (error.message) {
        errorMessage = error.message;
      }

      setApiError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-[448px] bg-[#FFFFFF] border border-[#E5E5E5] rounded-md shadow-sm p-8 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-green-50 border border-green-100 flex items-center justify-center mb-5">
            <CheckCircle2 className="w-7 h-7 text-green-500" />
          </div>
          <h1 className="text-[#111111] font-semibold text-xl mb-2">
            Check Your Email
          </h1>
          <p className="text-[#737373] text-sm mb-6">
            If an account with that email exists, we have sent a password reset link. Please check your inbox and follow the instructions.
          </p>
          <Link href="/login" className="w-full">
            <Button className="w-full bg-[#0891B2] hover:bg-[#0891B2]/90 text-white font-medium text-sm h-9">
              Back to Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[448px] bg-[#FFFFFF] border border-[#E5E5E5] rounded-md shadow-sm p-8">

        {/* Header Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-[#0891B2] rounded flex items-center justify-center mb-4">
            <span className="text-white font-bold text-xl leading-7">CR</span>
          </div>
          <h1 className="text-[#111111] font-semibold text-2xl leading-8 mb-1">Forgot Password</h1>
          <p className="text-[#737373] text-sm leading-5">Enter your email and we&apos;ll send you a reset link</p>
        </div>

        {/* Form Section */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Root Error Message */}
            {apiError && (
              <div className="p-3 rounded-md bg-red-50 border border-red-200">
                <p className="text-sm text-red-600 font-medium text-center">
                  {apiError}
                </p>
              </div>
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#111111] font-medium text-sm">Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3A3A3]" />
                      <Input
                        type="email"
                        placeholder="you@company.com"
                        className="border-[#E5E5E5] focus-visible:ring-[#0891B2] h-9 pl-9"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-[#0891B2] hover:bg-[#0891B2]/90 text-white font-medium text-sm h-9 mt-4"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Send Reset Link
            </Button>
          </form>
        </Form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-1 text-xs text-[#737373] hover:text-[#111111] transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
