import { useState, useEffect } from "react";

export default function useMitOnly() {
  const [mitOnly, setMitOnly] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("raidsheets_mit_only")) ?? false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem("raidsheets_mit_only", JSON.stringify(mitOnly));
  }, [mitOnly]);

  return [mitOnly, setMitOnly];
}
