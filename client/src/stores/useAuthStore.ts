import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStoreProps {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
}

const useAuthStore = create<AuthStoreProps>()(
  persist(
    (set) => ({
      isDark: false,
      setIsDark: (isDark) => set({ isDark }),
    }),
    {
      name: "auth-store", // unique name for localStorage
      partialize: (state) => ({ isDark: state.isDark }), // only persist isDark
    }
  )
);

export default useAuthStore;
