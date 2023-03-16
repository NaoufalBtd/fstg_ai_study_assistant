import { Session } from "next-auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: undefined,
      setUser: (user) => set(() => ({ user })),
      clearUser: () => set(() => ({ user: undefined })),
    }),
    {
      name: "user-storage",
    }
  )
);

interface UserStore {
  user: Session["user"] | undefined;
  setUser: (user: Session["user"]) => void;
  clearUser: () => void;
}

export default useUserStore;
