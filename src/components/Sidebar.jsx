import { Link, useParams } from "react-router-dom";
import { FIGHTS } from "../data/fights/index";

export default function Sidebar({ collapsed, onToggle }) {
  const { fightId } = useParams();

  return (
    <>
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-inner">
          {FIGHTS.map((group) => {
            const available = group.fights.filter((f) => f.hasSheet);
            if (!available.length) return null;
            return (
              <div key={group.patch} className="sidebar-group">
                <div className="sidebar-group-label">{group.label}</div>
                {available.map((f) => (
                  <Link
                    key={f.id}
                    to={`/fight/${f.id}`}
                    className={`sidebar-link ${fightId === f.id ? "active" : ""}`}
                  >
                    {f.name}
                    <span className="sidebar-link-sub">{f.subtitle}</span>
                  </Link>
                ))}
              </div>
            );
          })}
        </div>
      </aside>

      <button
        className="sidebar-toggle"
        style={{ left: collapsed ? 0 : "220px" }}
        onClick={onToggle}
        title={collapsed ? "Open sidebar" : "Close sidebar"}
      >
        {collapsed ? "›" : "‹"}
      </button>
    </>
  );
}
