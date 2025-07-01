import { create } from "zustand";

interface AuthStoreProps {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
}

const useAuthStore = create<AuthStoreProps>((set) => ({
  isDark: false,
  setIsDark: (isDark) => set({ isDark }),
}));

export default useAuthStore;
