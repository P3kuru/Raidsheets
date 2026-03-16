import AbilityPill from "./AbilityPill";
import { HEADER_COLS } from "../data/abilityDb";

const COL_SLOTS = ["T1", "T2", "H1", "H2", "M1", "M2", "R1", "R2"];

export default function PhaseBlock({ phase, partyComp }) {
  return (
    <div className="phase-block">
      <div className="phase-header">
        <div className="phase-title">{phase.name}</div>
      </div>

      {phase.notes?.length > 0 && (
        <div className="notes">
          <div className="notes-label">Notes</div>
          <ul>
            {phase.notes.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th className="col-time">Time</th>
              <th className="col-mech">Mechanic</th>
              {HEADER_COLS.map((col) => {
                const job = partyComp[col.slot];
                const isCaster =
                  job && ["BLM", "SMN", "RDM", "PCT"].includes(job);
                return (
                  <th
                    key={col.slot}
                    className={`col-${col.type[0]}`}
                    style={{
                      "--col-color": isCaster ? "var(--role-caster)" : "",
                    }}
                  >
                    {col.slot}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {phase.data.map((row, i) => {
              const [time, mech, ...cells] = row;
              return (
                <tr key={i}>
                  <td className="td-time">{time}</td>
                  <td className="td-mech">{mech}</td>
                  {COL_SLOTS.map((slot, j) => {
                    const raw = cells[j];
                    const job = partyComp[slot];
                    return (
                      <td key={slot}>
                        {raw && job && (
                          <div className="pills">
                            {raw.split("+").map((uID, k) => (
                              <AbilityPill
                                key={k}
                                uID={uID}
                                job={job}
                                slot={slot}
                              />
                            ))}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
