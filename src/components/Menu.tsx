const Menu = () => {
  return (
    <div className="flex h-full flex-col gap-6 p-6 text-white">
      <h2 className="text-2xl font-semibold">Pickers</h2>
      <ul className="space-y-3">
        <li className="text-lg text-white">
          <button className="w-full px-1 py-2 text-left text-white/70 transition-colors hover:text-white active:text-white/55">
            Finger color picker
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
