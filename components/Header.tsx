export default function Header() {
  return (
    <header className="mt-20 overflow-x-clip overflow-y-visible text-center">
      <div className="animate-header-tracking px-3 [animation-range:0_250px] [animation-timeline:scroll()]">
        <h1 className="mb-3 text-4xl font-thin">Weather Forecast</h1>
        <h2 className="text-xl font-light">
          An assignment by{" "}
          <a href="https:/bfanger.nl" target="_blank">
            Bob&nbsp;Fanger
          </a>{" "}
          for{" "}
          <a href="https://www.soprasteria.com" target="_blank">
            Sopra&nbsp;Steria
          </a>
        </h2>
        <p className="text-sm font-light opacity-60">
          Weather information is provided by{" "}
          <a href="https://www.tomorrow.io" target="_blank">
            tomorrow.io
          </a>
        </p>
      </div>
    </header>
  );
}
