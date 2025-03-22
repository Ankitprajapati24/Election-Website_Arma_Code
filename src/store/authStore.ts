import { create } from 'zustand';

interface Profile {
  id: string;
  email: string;
  role: 'student' | 'admin';
  student_id?: string;
}

interface AuthState {
  user: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: Profile | null) => void;
}

// Simple mock authentication
const MOCK_USERS = {
  student: {
    id: '1',
    email: 'username',
    role: 'student' as const,
    student_id: 'STU001'
  },
  admin: {
    id: '2',
    email: 'username',
    role: 'admin' as const
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  signIn: async (email: string, password: string) => {
    // Simple authentication check
    if (email === 'username' && password === 'password') {
      // Determine if it's an admin or student login based on the current form
      const userType = document.activeElement?.closest('form')?.getAttribute('data-type') || 'student';
      const user = MOCK_USERS[userType as keyof typeof MOCK_USERS];
      set({ user });
      return;
    }
    throw new Error('Invalid credentials');
  },
  signOut: async () => {
    set({ user: null });
  },
  setUser: (user) => set({ user, loading: false }),
}));