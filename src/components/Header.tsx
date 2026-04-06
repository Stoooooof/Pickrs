import { useState } from "react";
import { NavLink } from "react-router-dom";
import DropdownMenu from "./DropdownMenu.tsx";
import MobileDrawer from "./MobileDrawer.tsx";

const pickerLinks = [
  { label: "Finger Color Picker", to: "/fingerpicker" },
  { label: "Picker Wheel (TBD)", to: "/" },
];

const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block text-lg transition-colors ${
    isActive
      ? "text-white"
      : "text-white/70 hover:text-white active:text-white/55"
  }`;

const desktopNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block px-3 py-2 text-sm transition-colors ${
    isActive
      ? "text-white"
      : "text-white/70 hover:text-white active:text-white/55"
  }`;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-30 shadow-md">
      <nav aria-label="Primary navigation">
        <div className="relative flex h-16 items-center justify-center border-b border-white/10 bg-neutral-950 px-4 text-white sm:px-6 md:justify-start md:gap-6">
          {/* Mobile menu button */}
          <button
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="absolute left-4 px-1 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white active:text-white/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:hidden"
            type="button"
          >
            <span aria-hidden="true">☰</span>
          </button>

          <NavLink
            to="/"
            onClick={closeMobile}
            className="text-sm font-semibold uppercase tracking-[0.3em] text-white"
          >
            Pickr
          </NavLink>

          {/* Desktop nav */}
          <div className="hidden h-full items-center gap-1 md:flex">
            <DropdownMenu label="Pickers" id="pickers-dropdown">
              <ul>
                {pickerLinks.map((link) => (
                  <li key={link.to}>
                    <NavLink to={link.to} className={desktopNavLinkClass}>
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </DropdownMenu>
          </div>
        </div>

        <MobileDrawer open={mobileOpen} onClose={closeMobile}>
          <ul className="flex flex-col gap-3 p-6">
            <li>
              <p className="text-2xl font-semibold">Pickers</p>
              <ul className="mt-3 flex flex-col gap-3">
                {pickerLinks.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      onClick={closeMobile}
                      className={mobileNavLinkClass}
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </MobileDrawer>
      </nav>
    </header>
  );
}
