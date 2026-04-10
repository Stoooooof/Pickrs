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
        Why take decisions by yourself when you can leave it to chance?
      </h1>
      <p className="mt-4 max-w-lg text-base leading-7 text-white/70 md:text-lg">
        Pickr gives you a collection of randomizers to help you make decisions,
        big or small.
      </p>
    </div>
  );
};

export default Home;
