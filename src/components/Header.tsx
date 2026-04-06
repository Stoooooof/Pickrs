import { useRef, useState } from "react";
import PickerIcon from "../../public/PLogo3.png";
import { NavLink } from "react-router-dom";
import { useClickOutside } from "../hooks/useClickOutside";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const getNavLinkClassName = ({ isActive }: { isActive: boolean }) =>
    `block text-lg transition-colors ${
      isActive
        ? "text-white"
        : "text-white/70 hover:text-white active:text-white/55"
    }`;

  useClickOutside(menuRef, () => {
    if (open) {
      setOpen(false);
    }
  });

  return (
    <header className="sticky top-0 z-30 shadow-md">
      <nav aria-label="Primary navigation">
        <div className="relative flex h-16  items-center justify-center bg-neutral-900 text-white">
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="primary-menu"
            onClick={() => setOpen(!open)}
            className="absolute left-4 px-1 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white active:text-white/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            type="button"
          >
            <span aria-hidden="true">{open ? "X" : "☰"}</span>
          </button>

          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className="text-sm font-semibold uppercase tracking-[0.3em] text-white"
          >
            Pickr
          </NavLink>
        </div>

        <div
          className={`fixed inset-x-0 bottom-0 top-0 bg-black/40 transition-opacity duration-300 ${
            open
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
          aria-hidden={!open}
        >
          <div
            id="primary-menu"
            className={`absolute left-0 top-0 bottom-0 z-10 w-full md:rounded-r-2xl border-r-indigo-500  bg-neutral-800 p-6 text-white shadow-lg transition-transform duration-300 ease-out sm:w-96 ${
              open ? "translate-x-0" : "-translate-x-full"
            }`}
            ref={menuRef}
          >
            <section className="flex justify-between pb-6">
              <img src={PickerIcon} alt="Picker Logo" width="42" height="42" />
              <button type="button" onClick={() => setOpen(false)}>
                x
              </button>
            </section>
            <ul className="flex flex-col gap-3">
              <li>
                <NavLink
                  to="/"
                  onClick={() => setOpen(false)}
                  className={getNavLinkClassName}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/fingerpicker"
                  onClick={() => setOpen(false)}
                  className={getNavLinkClassName}
                >
                  Finger Color Picker
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
