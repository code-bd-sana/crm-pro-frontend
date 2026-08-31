import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '@/types/auth.types';

interface AuthState {
  user: User | null;
  permissions: string[];
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  _hasHydrated: boolean;
  // Actions
  setAuth: (user: User, accessToken: string, refreshToken: string) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  updateUser: (user: User) => void;
  logout: () => void;
  setHasHydrated: (state: boolean) => void;
  // RBAC Helpers
  hasPermission: (slug: string) => boolean;
  hasRole: (roleName: string) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      permissions: [],
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      _hasHydrated: false,

      setAuth: (user, accessToken, refreshToken) => {
        const perms = new Set<string>();
        user.roles?.forEach(role => {
          role.permissions?.forEach(p => perms.add(p.slug));
        });
        
        set({ 
          user, 
          permissions: Array.from(perms),
          accessToken, 
          refreshToken, 
          isAuthenticated: true 
        });
      },

      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),

      updateUser: (user) => {
        const perms = new Set<string>();
        user.roles?.forEach(role => {
          role.permissions?.forEach(p => perms.add(p.slug));
        });
        set({ user, permissions: Array.from(perms) });
      },

      logout: () =>
        set({
          user: null,
          permissions: [],
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        }),

      setHasHydrated: (state) => set({ _hasHydrated: state }),

      hasPermission: (slug: string) => {
        const { permissions } = get();
        return permissions.includes(slug);
      },

      hasRole: (roleName: string) => {
        const { user } = get();
        return user?.roles?.some(r => r.name === roleName) || false;
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      // Only persist the token fields and basic state, not derived state
      partialize: (state) => ({
        user: state.user,
        permissions: state.permissions,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
