import { useState, useEffect } from "react";
import { HEADER_COLS } from "../data/abilityDb";

const STORAGE_KEY = "raidsheets_party_comp";

const defaultComp = () =>
  Object.fromEntries(HEADER_COLS.map((c) => [c.slot, null]));

export default function usePartyComp() {
  const [partyComp, setPartyComp] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...defaultComp(), ...JSON.parse(saved) } : defaultComp();
    } catch {
      return defaultComp();
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(partyComp));
  }, [partyComp]);

  const setJob = (slot, job) =>
    setPartyComp((prev) => ({ ...prev, [slot]: job }));

  const clearComp = () => {
    setPartyComp(defaultComp());
    localStorage.removeItem(STORAGE_KEY);
  };

  return { partyComp, setJob, clearComp };
}
