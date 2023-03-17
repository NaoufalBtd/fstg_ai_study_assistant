import { create } from "zustand";

//create zustand ui store
const useUiStore = create<UiStore>((set) => ({
  mode: "dark",
  setMode: (mode) => set(() => ({ mode })),
  navbarHeight: 0,
  setNavbarHeight: (navHeight) => set(() => ({ navbarHeight: navHeight })),
  isAddingChat: false,
  setIsAddingChat: (isAddingChat) => set(() => ({ isAddingChat })),
}));

interface UiStore {
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
  navbarHeight: number;
  setNavbarHeight: (navHeight: number) => void;
  isAddingChat: boolean;
  setIsAddingChat: (isAddingChat: boolean) => void;
}

export default useUiStore;
