import JobDropdown from "./JobDropdown";
import { HEADER_COLS } from "../data/abilityDb";

export default function JobSelector({ partyComp, onJobChange, onClear }) {
  return (
    <div className="job-selector">
      <div className="job-selector-grid">
        {HEADER_COLS.map((col) => (
          <JobDropdown
            key={col.slot}
            slot={col.slot}
            value={partyComp[col.slot]}
            onChange={onJobChange}
          />
        ))}
      </div>
      <div className="job-selector-footer">
        <button className="job-selector-clear-btn" onClick={onClear}>
          Clear all
        </button>
      </div>
    </div>
  );
}
