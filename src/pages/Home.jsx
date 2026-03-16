import { Link } from "react-router-dom";
import AppBar from "../components/AppBar";
import FightCard from "../components/FightCard";
import Footer from "../components/Footer";
import { FIGHTS, ALL_FIGHTS } from "../data/fights/index";
import { useEffect } from "react";

export default function Home() {
  const totalSheets = ALL_FIGHTS.filter((f) => f.hasSheet).length;
  const savageSheets = ALL_FIGHTS.filter(
    (f) => f.hasSheet && f.type === "savage",
  ).length;
  const ultimateSheets = ALL_FIGHTS.filter(
    (f) => f.hasSheet && f.type === "ultimate",
  ).length;

  // inside the component:
  useEffect(() => {
    document.title = "Raidsheets - Home";
  }, []);

  return (
    <div className="app">
      <AppBar />
      <div className="home-hero">
        <div className="home-hero-inner">
          <div className="home-hero-left">
            <div className="home-hero-eyebrow">FFXIV Raid Reference</div>
            <h1 className="home-hero-title">
              Raid<em>Sheets</em>
            </h1>
            <p className="home-hero-desc">
              Community mitigation plans for Savage and Ultimate raids. Select
              your party composition and ability names resolve automatically to
              your jobs.
            </p>
            <div className="home-hero-stats">
              <div className="home-stat">
                <span className="home-stat-num home-stat-savage">
                  {savageSheets}
                </span>
                <span className="home-stat-label">Savage</span>
              </div>
              <div className="home-stat-divider" />
              <div className="home-stat">
                <span className="home-stat-num home-stat-ultimate">
                  {ultimateSheets}
                </span>
                <span className="home-stat-label">Ultimate</span>
              </div>
              <div className="home-stat-divider" />
              <div className="home-stat">
                <span className="home-stat-num">{totalSheets}</span>
                <span className="home-stat-label">Total Sheets</span>
              </div>
            </div>
          </div>
          <div className="home-hero-feature">
            <div className="home-feature-card">
              <div className="home-feature-title">How it works</div>
              <div className="home-feature-steps">
                <div className="home-feature-step">
                  <span className="home-feature-step-num">1</span>
                  <span>Select a fight sheet</span>
                </div>
                <div className="home-feature-step">
                  <span className="home-feature-step-num">2</span>
                  <span>Set your party composition</span>
                </div>
                <div className="home-feature-step">
                  <span className="home-feature-step-num">3</span>
                  <span>Ability names resolve to your jobs automatically</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="main-content">
        {FIGHTS.map((group) => (
          <div key={group.patch} className="home-section">
            <div className="home-section-title">{group.label}</div>
            <div className="fight-grid">
              {group.fights.map((f) => (
                <FightCard key={f.id} fight={f} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
