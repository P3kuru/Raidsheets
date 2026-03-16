import { useState, useEffect, useRef } from "react";
import { JOB_OPTIONS, HEADER_COLS } from "../data/abilityDb";

function jobIcon(key) {
  const baseUrl = import.meta.env.BASE_URL;
  return `${baseUrl}images/icons/${key.toLowerCase()}.png`;
}

export default function JobDropdown({ slot, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const colType = HEADER_COLS.find((c) => c.slot === slot)?.type;
  const options = JOB_OPTIONS[colType]?.jobs ?? [];
  const selected = options.find(([v]) => v === value);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="jd-wrap" ref={ref}>
      <button
        className={`jd-trigger ${open ? "open" : ""}`}
        onClick={() => setOpen((o) => !o)}
      >
        {selected ? (
          <>
            <img src={jobIcon(selected[2])} alt={selected[1]} />
            <span className="jd-label">{selected[1]}</span>
          </>
        ) : (
          <span className="jd-placeholder">{slot}</span>
        )}
        <span className="jd-arrow">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="jd-dropdown">
          <div
            className="jd-option jd-clear"
            onClick={() => {
              onChange(slot, null);
              setOpen(false);
            }}
          >
            Clear
          </div>
          {options.map(([val, label, icon]) => (
            <div
              key={val}
              className={`jd-option ${value === val ? "selected" : ""}`}
              onClick={() => {
                onChange(slot, val);
                setOpen(false);
              }}
            >
              <img src={jobIcon(icon)} alt={label} />
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
