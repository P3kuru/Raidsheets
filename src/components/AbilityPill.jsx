import { AbilityEngine } from "../data/abilityDb";

export default function AbilityPill({ uID, job, slot }) {
  if (!job) return null;
  const a = AbilityEngine.resolve(uID.trim(), job, slot);
  if (!a) return null;

  return (
    <span
      className={`pill ${a.p ? "is-p" : "is-g"}`}
      style={{ "--c": `var(${a.col})` }}
    >
      {a.name}
    </span>
  );
}
