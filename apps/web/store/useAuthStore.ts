import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  tenantId: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  tenantId: string | null;
  setAuth: (user: User, token: string, tenantId: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      tenantId: null,
      setAuth: (user, token, tenantId) => {
        localStorage.setItem('token', token);
        localStorage.setItem('tenantId', tenantId);
        set({ user, token, tenantId });
      },
      logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('tenantId');
        set({ user: null, token: null, tenantId: null });
      },
    }),
    {
      name: 'medqr-auth',
    }
  )
);
