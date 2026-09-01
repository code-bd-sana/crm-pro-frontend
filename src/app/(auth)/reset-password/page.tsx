"use client";

import { Suspense } from "react";
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
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff, CheckCircle2, ShieldCheck } from "lucide-react";
import { resetPassword } from "@/services/auth.service";
import { AxiosError } from "axios";

// ─── Zod Schema ─────────────────────────────────────────────────────────────
const formSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string().min(1, { message: "Please confirm your password." }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

// ─── Password strength helper ─────────────────────────────────────────────────
function getStrength(password: string): { score: number; label: string; color: string } {
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: "Weak", color: "bg-red-400" };
  if (score <= 3) return { score, label: "Fair", color: "bg-yellow-400" };
  return { score, label: "Strong", color: "bg-green-400" };
}

// ─── Component ────────────────────────────────────────────────────────────────
function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { newPassword: "", confirmPassword: "" },
    mode: "all",
  });

  const watchedPassword = form.watch("newPassword");
  const strength = getStrength(watchedPassword);

  const watchedConfirmPassword = form.watch("confirmPassword");

  // Re-validate confirmPassword whenever newPassword changes
  useEffect(() => {
    if (watchedConfirmPassword) {
      form.trigger("confirmPassword");
    }
  }, [watchedPassword, watchedConfirmPassword, form]);

  async function onSubmit(values: FormValues) {
    if (!token) {
      toast.error("Reset token is missing. Please use the link from your email.");
      return;
    }

    setIsLoading(true);
    try {
      const data = await resetPassword({ token, newPassword: values.newPassword });
      setIsSuccess(true);
      toast.success(data.message ?? "Password reset successfully!");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(
        axiosError.response?.data?.message ??
        "Failed to reset password. The link may have expired.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  // ── Success State ──────────────────────────────────────────────────────────
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-[448px] bg-[#FFFFFF] border border-[#E5E5E5] rounded-md shadow-sm p-8 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-green-50 border border-green-100 flex items-center justify-center mb-5">
            <CheckCircle2 className="w-7 h-7 text-green-500" />
          </div>
          <h1 className="text-[#111111] font-semibold text-xl mb-2">
            Password Reset Successful
          </h1>
          <p className="text-[#737373] text-sm mb-6">
            Your password has been updated. You can now sign in with your new
            password.
          </p>
          <Button
            className="w-full bg-[#0891B2] hover:bg-[#0891B2]/90 text-white font-medium text-sm h-9"
            onClick={() => router.push("/login")}
          >
            Back to Sign In
          </Button>
        </div>
      </div>
    );
  }

  // ── No token guard ─────────────────────────────────────────────────────────
  if (!token) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-[448px] bg-[#FFFFFF] border border-[#E5E5E5] rounded-md shadow-sm p-8 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mb-5">
            <ShieldCheck className="w-7 h-7 text-red-400" />
          </div>
          <h1 className="text-[#111111] font-semibold text-xl mb-2">
            Invalid Reset Link
          </h1>
          <p className="text-[#737373] text-sm mb-6">
            This password reset link is invalid or has expired. Please request a
            new one.
          </p>
          <Link href="/forgot-password" className="w-full">
            <Button className="w-full bg-[#0891B2] hover:bg-[#0891B2]/90 text-white font-medium text-sm h-9">
              Request New Link
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // ── Main Form ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[448px] bg-[#FFFFFF] border border-[#E5E5E5] rounded-md shadow-sm p-8">

        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-[#0891B2] rounded flex items-center justify-center mb-4">
            <span className="text-white font-bold text-xl leading-7">CR</span>
          </div>
          <h1 className="text-[#111111] font-semibold text-2xl leading-8 mb-1">
            Set New Password
          </h1>
          <p className="text-[#737373] text-sm leading-5 text-center">
            Enter and confirm your new password below.
          </p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            {/* New Password */}
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#111111] font-medium text-sm">
                    New Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showNew ? "text" : "password"}
                        placeholder="••••••••"
                        className="border-[#E5E5E5] focus-visible:ring-[#0891B2] h-9 pr-10"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNew((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A3A3A3] hover:text-[#737373] transition-colors"
                        tabIndex={-1}
                        aria-label={showNew ? "Hide password" : "Show password"}
                      >
                        {showNew ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>

                  {/* Password strength indicator */}
                  {watchedPassword.length > 0 && (
                    <div className="mt-2 space-y-1.5">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-colors ${i <= strength.score
                              ? strength.color
                              : "bg-[#E5E5E5]"
                              }`}
                          />
                        ))}
                      </div>
                      <p className="text-[11px] text-[#737373]">
                        Strength:{" "}
                        <span
                          className={`font-medium ${strength.label === "Weak"
                            ? "text-red-500"
                            : strength.label === "Fair"
                              ? "text-yellow-600"
                              : "text-green-600"
                            }`}
                        >
                          {strength.label}
                        </span>
                      </p>
                    </div>
                  )}

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#111111] font-medium text-sm">
                    Confirm New Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirm ? "text" : "password"}
                        placeholder="••••••••"
                        className="border-[#E5E5E5] focus-visible:ring-[#0891B2] h-9 pr-10"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A3A3A3] hover:text-[#737373] transition-colors"
                        tabIndex={-1}
                        aria-label={showConfirm ? "Hide password" : "Show password"}
                      >
                        {showConfirm ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                  {/* Fallback instant validation message if Zod/RHF cross-field validation is delayed */}
                  {watchedConfirmPassword && watchedPassword !== watchedConfirmPassword && (
                    <p className="text-[0.8rem] font-medium text-red-500 mt-2">
                      Passwords do not match.
                    </p>
                  )}
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-[#0891B2] hover:bg-[#0891B2]/90 text-white font-medium text-sm h-9 mt-2"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Reset Password
            </Button>
          </form>
        </Form>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-[#737373]">
          Remember your password?{" "}
          <Link href="/login" className="text-[#111111] font-medium hover:underline">
            Back to Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

// Wrap with Suspense — required because useSearchParams() opts into dynamic rendering
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordContent />
    </Suspense>
  );
}
