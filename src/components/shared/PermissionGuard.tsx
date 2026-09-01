import React from 'react';
import { useRBAC } from '@/hooks/useRBAC';
import { useAuthStore } from '@/store/useAuthStore';

interface Props {
  permission: string | string[]; // Single slug or array of required slugs
  requireAll?: boolean; // If true, requires all permissions. If false, requires at least one.
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const PermissionGuard = ({ 
  permission, 
  requireAll = false, 
  children, 
  fallback = null 
}: Props) => {
  const { hasPermission } = useRBAC();
  const _hasHydrated = useAuthStore((state) => state._hasHydrated);
  
  // Do not render anything until hydration is complete to prevent SSR mismatch
  if (!_hasHydrated) return null;

  const perms = Array.isArray(permission) ? permission : [permission];
  const hasAccess = requireAll 
    ? perms.every(p => hasPermission(p))
    : perms.some(p => hasPermission(p));

  return hasAccess ? <>{children}</> : <>{fallback}</>;
};
