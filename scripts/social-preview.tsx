export const dynamic = "force-static";
import { ImageResponse } from "next/og";
export const alt = "Risang Ganie Salam — Mobile & Frontend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "70px",
        background: "#101017",
        color: "#eee8f5",
      }}
    >
      <div style={{ display: "flex", fontSize: 24, color: "#b8a1d1" }}>
        RISANG / MARKET SYSTEMS
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 64 }}>Risang Ganie Salam</div>
        <div style={{ fontSize: 36, color: "#c3aed8" }}>
          Mobile & Frontend Engineer
        </div>
      </div>
      <div style={{ fontSize: 24, color: "#a599b4" }}>
        React Native · TypeScript · Realtime financial interfaces
      </div>
    </div>,
    size,
  );
}
