import { useAuthStore } from '@/store/useAuthStore';
import { useMemo } from 'react';

export const useRBAC = () => {
  const user = useAuthStore((state) => state.user);

  const hasRole = useMemo(() => {
    return (roleName: string) => {
      if (!user || !user.roles) return false;
      return user.roles.some((role) => role.name === roleName);
    };
  }, [user]);

  const hasAnyRole = useMemo(() => {
    return (roleNames: string[]) => {
      if (!user || !user.roles) return false;
      return user.roles.some((role) => roleNames.includes(role.name));
    };
  }, [user]);

  // Derived common permissions based on user's answer: SUPER_ADMIN can add/edit users
  const canManageUsers = hasRole('SUPER_ADMIN');

  return {
    hasRole,
    hasAnyRole,
    canManageUsers,
  };
};
