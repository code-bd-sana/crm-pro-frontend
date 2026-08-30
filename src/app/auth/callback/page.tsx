import { Suspense } from 'react';
import AuthCallbackClient from './AuthCallbackClient';

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAFAFA]">
        <div className="w-8 h-8 border-4 border-[#0891B2] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-[#737373] text-sm font-medium animate-pulse">
          Loading authentication details...
        </p>
      </div>
    }>
      <AuthCallbackClient />
    </Suspense>
  );
}
