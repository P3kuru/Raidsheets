import { useState } from "react";

export default function InfoBar({ links, credits }) {
  const [open, setOpen] = useState(false);

  const hasContent = links?.length > 0 || credits?.length > 0;
  if (!hasContent) return null;

  return (
    <div className={`info-bar ${open ? "open" : ""}`}>
      <button className="info-bar-toggle" onClick={() => setOpen((o) => !o)}>
        <span>Resources & Credits</span>
        <span className="info-bar-arrow">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="info-bar-content">
          {links?.length > 0 && (
            <div className="info-bar-group">
              <div className="info-bar-label">Resources</div>
              <div className="info-bar-links">
                {links.map((l, i) => (
                  <a
                    key={i}
                    href={l.url}
                    className="info-bar-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {l.label} ↗
                  </a>
                ))}
              </div>
            </div>
          )}
          {credits?.length > 0 && (
            <div className="info-bar-group">
              <div className="info-bar-label">Credits</div>
              <div className="info-bar-links">
                {credits.map((c, i) => (
                  <a
                    key={i}
                    href={c.url}
                    className="info-bar-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {c.label} ↗
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
