import { create } from "zustand";
import { persist } from "zustand/middleware";
interface User {
  id: string;
  name: string;
  email: string;
  courses?: {
    id: string;
    name: string;
  }[];
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
}

const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: "user-storage",
    }
  )
);

export default useUserStore;
