type HeaderProps = {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
};

const Header = ({ isMenuOpen, onToggleMenu }: HeaderProps) => {
  return (
    <nav className="pointer-events-none absolute inset-x-0 top-0 z-30 flex h-16 items-center bg-neutral-900/80 px-4 backdrop-blur-md sm:px-6">
      <button
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="pointer-events-auto px-1 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white active:text-white/55"
        onClick={onToggleMenu}
        type="button"
      >
        {isMenuOpen ? "Close" : "Menu"}
      </button>

      <p className="pointer-events-auto absolute left-1/2 -translate-x-1/2 text-sm font-semibold uppercase tracking-[0.3em] text-white">
        Pickr
      </p>
    </nav>
  );
};

export default Header;
