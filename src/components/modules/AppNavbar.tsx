import useUiStore from "@/stores/uiStore";
import React, { useRef } from "react";
import Navbar from "../core/Navbar";

interface AppNavbarProps {}

const AppNavbar: React.FC<AppNavbarProps> = () => {
  const navbarRef = useRef<HTMLDivElement>(null);
  const { setNavbarHeight } = useUiStore();
  React.useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.clientHeight);
    }
  }, [setNavbarHeight]);
  return <Navbar ref={navbarRef} />;
};

export default AppNavbar;
