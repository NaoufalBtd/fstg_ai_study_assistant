import { create } from "zustand";

//create zustand ui store
const useUiStore = create<UiStore>((set) => ({
  mode: "dark",
  setMode: (mode) => set(() => ({ mode })),
  navbarHeight: 0,
  setNavbarHeight: (navHeight) => set(() => ({ navbarHeight: navHeight })),
}));

interface UiStore {
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
  navbarHeight: number;
  setNavbarHeight: (navHeight: number) => void;
}

export default useUiStore;
