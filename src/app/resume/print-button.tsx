"use client";
export function PrintButton() {
  return (
    <button className="primary" onClick={() => window.print()}>
      Print / Save PDF
    </button>
  );
}
