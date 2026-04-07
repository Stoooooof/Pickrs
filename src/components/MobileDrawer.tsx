import { useRef } from "react";
import { Link } from "react-router-dom";
import { useClickOutside } from "../hooks/useClickOutside";

type MobileDrawerProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const logoUrl = `${import.meta.env.BASE_URL}Logo.png`;

export default function MobileDrawer({
  open,
  onClose,
  children,
}: MobileDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useClickOutside(panelRef, () => {
    if (open) onClose();
  });

  return (
    <div
      className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden ${
        open
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!open}
    >
      <div
        id="mobile-menu"
        ref={panelRef}
        className={`absolute left-0 top-0 bottom-0 z-10 w-full border-r border-white/10 bg-neutral-950 text-white shadow-lg transition-transform duration-300 ease-out sm:w-96 sm:rounded-r-2xl ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <section className="flex justify-between p-6 border-b border-white/10">
          <Link to="/" onClick={onClose}>
            <img src={logoUrl} alt="Picker Logo" width="42" height="42" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="px-1 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white active:text-white/55"
          >
            X
          </button>
        </section>

        {children}
      </div>
    </div>
  );
}
