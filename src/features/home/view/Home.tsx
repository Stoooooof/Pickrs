const logoUrl = `${import.meta.env.BASE_URL}Logo.png`;

const Home = () => {
  return (
    <div className="flex h-full w-full flex-col items-center px-6 text-center">
      <img
        src={logoUrl}
        alt="Pickr Logo"
        width="200"
        height="200"
        className="mb-6 animate-pulse"
      />
      <h1 className="max-w-xl text-center text-4xl font-bold text-white">
        Group decisions, minus the back-and-forth.
      </h1>
      <p className="mt-4 max-w-lg text-base leading-7 text-white/70 md:text-lg">
        Pickr gives you fast ways to settle simple choices together.
      </p>
    </div>
  );
};

export default Home;
