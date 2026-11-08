export const socials = {
  x: "https://x.com/coincraftcc",
  github: "https://github.com/storytold",
  discord: "https://discord.gg/artcraft",
};
export const apps = ["PhotoCraft","VectorCraft","FilmCraft","LightCraft","PdfCraft","EffectCraft","DesignCraft","FigCraft","TextureCraft","MaterialCraft","WordCraft","SoundCraft","DeckCraft","CADCraft","GridCraft","Craft Anything"];
export const appMeta: Record<string, { icon: string; cat: string; blurb: string }> = {
  PhotoCraft:    { icon: "image",    cat: "Photo",    blurb: "RAW developing, retouch and batch export." },
  VectorCraft:   { icon: "vector",   cat: "Vector",   blurb: "Precision illustration with real Bézier control." },
  FilmCraft:     { icon: "film",     cat: "Video",    blurb: "Timeline editing built for solo creators." },
  LightCraft:    { icon: "sun",      cat: "Color",    blurb: "Relight and grade scenes in real time." },
  PdfCraft:      { icon: "file",     cat: "Docs",     blurb: "Merge, sign and compress documents offline." },
  EffectCraft:   { icon: "sparkles", cat: "VFX",      blurb: "Compositing, masks and motion effects." },
  DesignCraft:   { icon: "layout",   cat: "Design",   blurb: "Layouts, grids and brand systems in one place." },
  FigCraft:      { icon: "frame",    cat: "UI",       blurb: "Interface design and click-through prototypes." },
  TextureCraft:  { icon: "grid",     cat: "Texture",  blurb: "Seamless PBR textures, generated on device." },
  MaterialCraft: { icon: "cube",     cat: "3D",       blurb: "Shading and material authoring for artists." },
  WordCraft:     { icon: "type",     cat: "Writing",  blurb: "Long-form writing with serious typography." },
  SoundCraft:    { icon: "wave",     cat: "Audio",    blurb: "Audio editing and sound design, no dongle." },
  DeckCraft:     { icon: "present",  cat: "Slides",   blurb: "Presentations that look designed, not default." },
  CADCraft:      { icon: "globe",    cat: "CAD",      blurb: "Parametric modelling for hardware people." },
  GridCraft:     { icon: "table",    cat: "Data",     blurb: "Fast, local-first data grids and sheets." },
  "Craft Anything": { icon: "infinity", cat: "Open",  blurb: "Bring your own workflow. Fork it and go." },
};
export const nav = [
  { href: "/gateway", label: "Gateway" },
  { href: "/ownership", label: "Ownership" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/listings", label: "Listings" },
];
export const phases = [
  { tag: "Phase 01 · Spark", title: "Genesis", status: "Live", items: ["Website and brand live", "Community on Discord, X and Telegram", "GitHub gateway page for all Craft apps"] },
  { tag: "Phase 02 · Forge", title: "Fair launch", status: "In progress", items: ["Token launch and liquidity lock", "Holder dashboard and contract verification", "First community art and meme contests"] },
  { tag: "Phase 03 · Scale", title: "CEX listings", status: "Next", items: ["Applications to OKX, Binance and Bybit", "Listing announcements as each is confirmed", "Marketing push with creators"] },
  { tag: "Phase 04 · Create", title: "Holder perks and bounties", status: "Vision", items: ["Bounties for open-source contributions", "Holder votes on the next Craft app", "Community gallery of work made with Craft apps"] },
];
export const exchanges = [
  { name: "Binance", w: "35%" }, { name: "OKX", w: "45%" }, { name: "Bybit", w: "40%" },
];
export const stats = [
  { n: 16, s: "", label: "Open-source apps" },
  { n: 3, s: "", label: "OS platforms" },
  { n: 0, s: "", label: "Subscriptions" },
  { n: 100, s: "%", label: "Community-owned vibes" },
];
export const steps = [
  { icon: "grid", k: "01", t: "Pick your craft", p: "Open any app from the Gateway. Every one runs natively on macOS, Windows and Linux." },
  { icon: "fork", k: "02", t: "Fork the code", p: "Each app is public on GitHub. Read it, extend it, or ship your own version." },
  { icon: "lock", k: "03", t: "Own the result", p: "No subscriptions, no lock-in. Your tools and everything you make stay yours." },
];
export const compare = [
  { rent: "Pay every month", own: "Pay once, build forever" },
  { rent: "Files locked in someone's cloud", own: "Files live on your disk" },
  { rent: "Export limits and watermarks", own: "Unlimited exports" },
  { rent: "Roadmap decided by shareholders", own: "Roadmap decided by the community" },
  { rent: "Account, email, tracking", own: "No account, no tracking" },
];
export const faqs = [
  { q: "Is COIN CRAFT a real coin?", a: "COIN CRAFT is a community meme coin made for fun. The contract launches in Phase 02 and will be announced on this site first. Nothing here is financial advice." },
  { q: "Do I need to hold COIN CRAFT to use the apps?", a: "No. Every Craft app is open source and free to use, fork and modify. Holding the coin backs the project and unlocks community perks as phases ship." },
  { q: "Where does the code actually live?", a: "On GitHub at github.com/storytold. Every Craft app is public — you can audit the code, file issues, or fork it into your own project." },
  { q: "When do the exchange listings happen?", a: "Binance, OKX and Bybit are targets, not confirmations. Each real listing is announced on this site and our socials the moment it is official." },
];
