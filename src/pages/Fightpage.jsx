import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import AppBar from "../components/AppBar";
import Sidebar from "../components/Sidebar";
import InfoBar from "../components/InfoBar";
import JobSelector from "../components/JobSelector";
import PhaseBlock from "../components/PhaseBlock";
import Footer from "../components/Footer";
import usePartyComp from "../hooks/usePartyComp";
import m12s from "../data/fights/m12s";

const FIGHT_MAP = { m12s };

export default function FightPage() {
  const { fightId } = useParams();
  const config = FIGHT_MAP[fightId];
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { partyComp, setJob, clearComp } = usePartyComp();

  useEffect(() => {
    if (config) {
      document.title = `Raidsheets - ${config.name}`;
    }
    return () => {
      document.title = "Raidsheets - Fights";
    };
  }, [config]);

  if (!config) {
    return (
      <div className="app">
        <AppBar />
        <div
          className="main-content"
          style={{
            textAlign: "center",
            paddingTop: "4rem",
            color: "var(--overlay0)",
          }}
        >
          Fight not found.{" "}
          <Link to="/" style={{ color: "var(--accent)" }}>
            Go back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <AppBar />
      <div className="app-body">
        <Sidebar
          collapsed={!sidebarOpen}
          onToggle={() => setSidebarOpen((o) => !o)}
        />
        <div className="main-content">
          <div className="fight-title-bar">
            <div className="fight-title">{config.name}</div>
            <div className="fight-subtitle">
              {config.subtitle} · Patch {config.patch} · Updated{" "}
              {config.lastUpdated}
            </div>
          </div>

          <InfoBar links={config.links} credits={config.credits} />
          <JobSelector
            partyComp={partyComp}
            onJobChange={setJob}
            onClear={clearComp}
          />

          {config.phases.map((phase) => (
            <PhaseBlock key={phase.id} phase={phase} partyComp={partyComp} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
