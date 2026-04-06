import { useRef, useState } from "react";

type DropdownMenuProps = {
  label: string;
  id: string;
  children: React.ReactNode;
};

export default function DropdownMenu({
  label,
  id,
  children,
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setOpen(true);
  };

  const closeMenu = () => {
    closeTimeout.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div
      className="relative flex h-full items-center"
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
    >
      <button
        aria-expanded={open}
        aria-controls={id}
        className={`inline-flex items-center gap-1 px-3 py-2 text-sm transition-colors ${
          open
            ? "text-white"
            : "text-white/70 hover:text-white active:text-white/55"
        }`}
        type="button"
      >
        {label}
        <span
          aria-hidden="true"
          className={`text-[10px] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>

      <section
        id={id}
        className={`absolute left-24 top-full w-56 -translate-x-1/2 rounded-b-xl border border-white/10 bg-neutral-950 py-2 shadow-xl transition-all duration-200 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        {children}
      </section>
    </div>
  );
}
