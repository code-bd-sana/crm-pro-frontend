'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { getCurrentUser } from '@/services/auth.service';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function AuthCallbackClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    let isMounted = true;

    const handleAuth = async () => {
      const accessToken = searchParams.get('accessToken');
      const refreshToken = searchParams.get('refreshToken');

      if (!accessToken || !refreshToken) {
        if (isMounted) {
          toast.error('Google authentication failed. Missing tokens.');
          router.replace('/login');
        }
        return;
      }

      try {
        // Set cookies first so the backend /auth/me call succeeds 
        // (Assuming the axios interceptor reads from Zustand, we need to set tokens in Zustand first)
        useAuthStore.getState().setTokens(accessToken, refreshToken);
        document.cookie = `access_token=${accessToken}; path=/; SameSite=Lax; max-age=86400`;

        // Fetch user profile
        const user = await getCurrentUser();
        
        if (isMounted) {
          // Save everything to Zustand
          useAuthStore.getState().setAuth(user, accessToken, refreshToken);

          toast.success(`Welcome back, ${user.profile?.firstName || 'User'}!`);
          router.replace('/');
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        if (isMounted) {
          toast.error('Authentication completed but failed to fetch user profile.');
          useAuthStore.getState().logout();
          router.replace('/login');
        }
      }
    };

    handleAuth();

    return () => {
      isMounted = false;
    };
  }, [router, searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAFAFA]">
      <Loader2 className="w-8 h-8 text-[#0891B2] animate-spin mb-4" />
      <p className="text-[#737373] text-sm font-medium animate-pulse">
        Signing you in...
      </p>
    </div>
  );
}
