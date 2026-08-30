import { useAuthStore } from '@/store/useAuthStore';
import { PermissionEnum } from '@/types/auth.types';

export const useRBAC = () => {
  const hasPermission = useAuthStore((state) => state.hasPermission);
  const hasRole = useAuthStore((state) => state.hasRole);

  // Derived common permissions based on standard slugs
  const canManageUsers = hasPermission(PermissionEnum.TEAM_CREATE) || hasPermission(PermissionEnum.TEAM_READ); // Update if needed
  const canManageRoles = hasPermission(PermissionEnum.ROLES_CREATE) || hasPermission(PermissionEnum.ROLES_UPDATE);

  return {
    hasPermission,
    hasRole,
    canManageUsers,
    canManageRoles,
  };
};
