"use client";
import { ArrowRight, Play, X } from "lucide-react";
import { useNavigation } from "@/stores/navigation-store";
import { marketEngine } from "@/engine/market-engine";
export function PacketInspector({ onTrace }: { onTrace: () => void }) {
  const packet = useNavigation((s) => s.packet);
  if (!packet) return null;
  function resume() {
    marketEngine.setPaused(false);
    useNavigation.getState().inspectPacket(null);
  }
  return (
    <section className="packet-inspector" aria-label="Packet inspector">
      <div className="packet-title">
        <span className="eyebrow">PACKET INSPECTOR</span>
        <button aria-label="Close packet inspector and resume" onClick={resume}>
          <X size={16} />
        </button>
      </div>
      <h3>
        {packet.symbol}
        <span>#{packet.sequence}</span>
      </h3>
      <dl>
        <div>
          <dt>Price</dt>
          <dd>{packet.price.toLocaleString("en-US")}</dd>
        </div>
        <div>
          <dt>Volume</dt>
          <dd>{packet.volume.toLocaleString("en-US")} shares</dd>
        </div>
        <div>
          <dt>Timestamp</dt>
          <dd>{packet.timestamp.slice(11, 23)} UTC</dd>
        </div>
        <div>
          <dt>Type</dt>
          <dd>{packet.type}</dd>
        </div>
      </dl>
      <p>Captured from the same feed as the trading tape.</p>
      <div className="packet-actions">
        <button className="primary" onClick={onTrace}>
          Trace packet <ArrowRight size={15} />
        </button>
        <button className="secondary" onClick={resume}>
          <Play size={13} /> Resume stream
        </button>
      </div>
    </section>
  );
}
