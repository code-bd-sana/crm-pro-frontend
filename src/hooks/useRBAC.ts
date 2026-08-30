import { useAuthStore } from '@/store/useAuthStore';
import { useMemo } from 'react';
import { SystemRoles } from '@/types/auth.types';

export const useRBAC = () => {
  const user = useAuthStore((state) => state.user);

  const hasRole = useMemo(() => {
    return (roleName: SystemRoles | string) => {
      if (!user || !user.roles) return false;
      return user.roles.some((role) => role.name === roleName);
    };
  }, [user]);

  const hasAnyRole = useMemo(() => {
    return (roleNames: (SystemRoles | string)[]) => {
      if (!user || !user.roles) return false;
      return user.roles.some((role) => roleNames.includes(role.name));
    };
  }, [user]);

  // Derived common permissions based on SystemRoles enum
  const canManageUsers = hasRole(SystemRoles.SUPER_ADMIN);

  return {
    hasRole,
    hasAnyRole,
    canManageUsers,
  };
};
