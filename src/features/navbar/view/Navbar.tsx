import { NavLink } from "react-router-dom";
import DropdownMenu from "../components/DropdownMenu.tsx";
import MobileDrawer from "../components/MobileDrawer.tsx";

const Navbar = () => {
  return (
    <nav
      aria-label="Primary navigation"
      className="sticky top-0 z-30 shadow-md"
    >
      <div className="relative flex h-16 items-center justify-center border-b border-white/10 bg-neutral-950 px-4 text-white sm:px-6 md:justify-start md:gap-6">
        <div className="contents md:hidden">
          <MobileDrawer />
        </div>

        <NavLink
          to="/"
          className="text-sm font-semibold uppercase tracking-[0.3em] text-white"
        >
          Pickr
        </NavLink>

        <div className="hidden h-full items-center gap-1 md:flex">
          <DropdownMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
