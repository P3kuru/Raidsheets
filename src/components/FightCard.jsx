import { Link } from "react-router-dom";

export default function FightCard({ fight }) {
  const { id, name, subtitle, type, hasSheet } = fight;

  const inner = (
    <>
      <div className="fight-card-strip" />
      <div className="fight-card-body">
        <div className="fight-card-name">
          {name}
          <span className="fight-card-badge">{type}</span>
        </div>
        <div className="fight-card-subtitle">{subtitle}</div>
      </div>
      <div className={`fight-card-footer ${hasSheet ? "available" : "soon"}`}>
        {hasSheet ? "View sheet →" : "Coming soon"}
      </div>
    </>
  );

  if (!hasSheet) {
    return <div className={`fight-card ${type} disabled`}>{inner}</div>;
  }

  return (
    <Link to={`/fight/${id}`} className={`fight-card ${type} clickable`}>
      {inner}
    </Link>
  );
}
