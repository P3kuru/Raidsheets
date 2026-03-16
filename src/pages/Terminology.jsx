import { useState, useMemo } from "react";
import AppBar from "../components/AppBar";
import Footer from "../components/Footer";
import { SLANG } from "../data/terminology";
import { useEffect } from "react";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function Glossary() {
  const [search, setSearch] = useState("");
  const [activeLetters, setActiveLetters] = useState([]);

  const sorted = useMemo(
    () => [...SLANG].sort((a, b) => a.term.localeCompare(b.term)),
    [],
  );

  useEffect(() => {
    document.title = "Raidsheets - Terminology";
  }, []);

  const filtered = useMemo(() => {
    let results = sorted;
    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(
        (t) =>
          t.term.toLowerCase().includes(q) || t.def.toLowerCase().includes(q),
      );
    }
    if (activeLetters.length) {
      results = results.filter((t) =>
        activeLetters.includes(t.term[0].toUpperCase()),
      );
    }
    return results;
  }, [sorted, search, activeLetters]);

  const grouped = useMemo(() => {
    return ALPHABET.reduce((acc, letter) => {
      const terms = filtered.filter((t) => t.term[0].toUpperCase() === letter);
      if (terms.length) acc[letter] = terms;
      return acc;
    }, {});
  }, [filtered]);

  const availableLetters = [...SLANG].map((t) => t.term[0].toUpperCase());

  function toggleLetter(letter) {
    setActiveLetters((prev) =>
      prev.includes(letter)
        ? prev.filter((l) => l !== letter)
        : [...prev, letter],
    );
  }

  return (
    <div className="app">
      <AppBar />
      <div className="main-content">
        <div className="slang-header">
          <div className="slang-header-left">
            <div className="slang-eyebrow">Updated: 16-03-2026</div>
            <h1 className="slang-title">Terminology</h1>
            <p className="slang-desc">A field guide to terminology.</p>
          </div>
          <div className="slang-search-wrap">
            <input
              className="slang-search"
              type="text"
              placeholder="Search terms or definitions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                className="slang-search-clear"
                onClick={() => setSearch("")}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {!search && (
          <div className="slang-index">
            {ALPHABET.map((letter) => (
              <button
                key={letter}
                className={`index-btn ${!availableLetters.includes(letter) ? "disabled" : ""} ${activeLetters.includes(letter) ? "active" : ""}`}
                onClick={() =>
                  availableLetters.includes(letter) && toggleLetter(letter)
                }
              >
                {letter}
              </button>
            ))}
            {activeLetters.length > 0 && (
              <button
                className="index-btn index-clear"
                onClick={() => setActiveLetters([])}
              >
                Clear
              </button>
            )}
          </div>
        )}

        {Object.keys(grouped).length === 0 ? (
          <div className="slang-empty">No results for "{search}"</div>
        ) : (
          <div className="slang-sections">
            {Object.entries(grouped).map(([letter, terms]) => (
              <div key={letter} className="slang-section">
                {!search && (
                  <div className="slang-section-letter">{letter}</div>
                )}
                <div className="slang-list">
                  {terms.map((item, i) => (
                    <div key={i} className="slang-row">
                      <div className="slang-term">{item.term}</div>
                      <div className="slang-body">
                        <div className="slang-def">{item.def}</div>
                        {item.related?.length > 0 && (
                          <div className="slang-related">
                            <span className="slang-related-label">
                              See also:
                            </span>
                            {item.related.map((r, j) => (
                              <span
                                key={j}
                                className="slang-related-tag"
                                onClick={() => setSearch(r)}
                              >
                                {r}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
