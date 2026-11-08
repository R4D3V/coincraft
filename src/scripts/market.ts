import register from "../data/register.json";

const rec = (id: string) => (register.records as any)[id] || { state: "absent" };
const isStated = (r: any) => r && r.state === "stated";

const src = rec("market-source");
const chain = rec("chain");
const ca = rec("ca");
const OWN_CA = isStated(ca) && ca.value ? String(ca.value) : "";

// ---------- formatting ----------
const nf = (o: any) => new Intl.NumberFormat("en-US", o);
function fmtPrice(n: number) {
  if (!Number.isFinite(n)) return "—";
  if (n === 0) return "$0.00";
  if (n >= 1) return "$" + nf({ maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(n);
  if (n >= 0.01) return "$" + nf({ maximumFractionDigits: 4, minimumFractionDigits: 4 }).format(n);
  const d = Math.min(10, Math.max(4, 2 - Math.floor(Math.log10(n))));
  return "$" + n.toFixed(d + 2).replace(/0+$/, "");
}
function fmtCompact(n: number) {
  if (!Number.isFinite(n)) return "—";
  return "$" + nf({ notation: "compact", maximumFractionDigits: 2 }).format(n);
}
function fmtChange(n: number) {
  if (!Number.isFinite(n)) return "—";
  return (n > 0 ? "+" : n < 0 ? "−" : "") + Math.abs(n).toFixed(2) + "%";
}
function fmtInt(n: number) {
  return Number.isFinite(n) ? nf({}).format(n) : "—";
}

const $ = (id: string) => document.getElementById(id);
const set = (id: string, t: string) => { const e = $(id); if (e) e.textContent = t; };

async function getJSON(url: string, init?: RequestInit) {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error("http " + res.status);
  return res.json();
}

async function loadOwn() {
  if (!OWN_CA || !isStated(src)) return null;
  const [dex, pump] = await Promise.all([
    getJSON(src.ownPairs + OWN_CA).catch(() => null),
    getJSON(src.ownImage + OWN_CA).catch(() => null),
  ]);
  const pairs = (dex && dex.pairs) || [];
  const list = pairs.filter((p: any) => p && p.baseToken && p.baseToken.address === OWN_CA);
  list.sort((a: any, b: any) => (parseFloat(b?.volume?.h24) || 0) - (parseFloat(a?.volume?.h24) || 0));
  const pair = list[0] || null;
  const price = parseFloat(pair?.priceUsd);
  const change = parseFloat(pair?.priceChange?.h24);
  const volume = parseFloat(pair?.volume?.h24);
  const liqUsd = parseFloat(pair?.liquidity?.usd);
  const cap = parseFloat(pair?.marketCap);
  const liq = liqUsd > 0 ? liqUsd : cap > 0 ? cap : NaN;
  if (!pair && !pump) return null;
  return { price, change, volume, liq };
}

async function loadSlot() {
  if (!isStated(chain) || !chain.rpc) return null;
  const body = JSON.stringify({ jsonrpc: "2.0", id: 1, method: "getSlot", params: [{ commitment: "confirmed" }] });
  const j = await getJSON(chain.rpc, { method: "POST", headers: { "content-type": "application/json" }, body }).catch(() => null);
  return j && typeof j.result === "number" ? j.result : null;
}

// ---------- polling ----------
let timer = 0;
let inFlight = false;

async function tick() {
  if (inFlight) return;
  inFlight = true;
  const [own, slot] = await Promise.all([loadOwn().catch(() => null), loadSlot().catch(() => null)]);
  if (own) {
    set("live-price", fmtPrice(own.price));
    set("live-change", fmtChange(own.change));
    set("live-volume", fmtCompact(own.volume));
    set("live-liq", fmtCompact(own.liq));
    const ch = $("live-change");
    if (ch) {
      ch.classList.toggle("up", own.change > 0);
      ch.classList.toggle("dn", !(own.change > 0));
    }
  }
  set("live-slot", slot == null ? "—" : fmtInt(slot));
  inFlight = false;
  schedule();
}

function schedule() {
  clearTimeout(timer);
  if (document.hidden) return;
  timer = window.setTimeout(tick, 60000);
}

if ($("live-stats")) {
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) { clearTimeout(timer); return; }
    tick();
  });
  if (!document.hidden) tick(); else set("live-note", "Waiting for tab to be visible.");
}