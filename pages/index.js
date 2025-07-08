// pages/index.js

export default function Home() {
  // replicate your old JS search logic
  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.elements['genre-search'].value.trim();
    if (!query) return;
    console.log('Searching for:', query);
    // e.g. router.push(`/shop?genre=${encodeURIComponent(query)}`)
  };

  return (
    <main>
      <section className="hero">
        {/* blurred, dimmed background image */}
        <img
          src="/img/DanielDialsRT.png"
          alt="Daniel Dials RT"
          className="hero-bg"
        />
        <div className="hero-content">
          <h1>Dial into Your Sound</h1>

          <form
            id="search-form"
            className="search-wrapper"
            onSubmit={handleSearch}
          >
            <button
              type="submit"
              className="search-btn"
              aria-label="Search"
            >
              {/* Elegant SVG magnifier */}
              <svg
                className="icon-search"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <line
                  x1="16"
                  y1="16"
                  x2="22"
                  y2="22"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <input
              type="text"
              id="genre-search"
              name="genre-search"
              placeholder="Search a Genre or style..."
            />
          </form>
        </div>
      </section>

      <section className="aSlot">
        <div className="aSlot-image">
          <div className="aSlot-text">
            <h2>
              Your engaging filler statement goes here – replace this later.
            </h2>
          </div>
        </div>
        <div className="aSlot-empty" />
      </section>

      <p>Browse beats by genre or check out the shop.</p>
    </main>
  );
}