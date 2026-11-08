import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);
const root = document.documentElement;
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduce) {
  root.classList.remove("js");
} else {
  const lenis = new Lenis({ lerp: 0.09 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  const nav = document.getElementById("nav");

  const word = (child: Node | string) => {
    const w = document.createElement("span"); w.className = "w";
    const i = document.createElement("span"); i.className = "i";
    typeof child === "string" ? (i.textContent = child) : i.append(child);
    w.append(i); return w;
  };
  document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
    const nodes = [...el.childNodes]; el.innerHTML = "";
    nodes.forEach((n) => {
      if (n.nodeType === 3) (n.textContent ?? "").split(/(\s+)/).forEach((p) => (p.trim() ? el.append(word(p)) : el.append(p)));
      else if (n.nodeName === "BR") el.append(n);
      else el.append(word(n));
    });
    gsap.set(el, { visibility: "visible" });
    const inHero = !!el.closest(".hero");
    gsap.from(el.querySelectorAll(".i"), {
      yPercent: 110, duration: 1.1, ease: "expo.out", stagger: 0.08, delay: inHero ? 0.2 : 0,
      scrollTrigger: inHero ? undefined : { trigger: el, start: "top 88%", once: true },
    });
  });

  gsap.fromTo(".hero-fade", { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, ease: "expo.out", stagger: 0.12, delay: 0.9 });
  gsap.set(".rv", { y: 40 });
  ScrollTrigger.batch(".rv", {
    start: "top 90%",
    once: true,
    onEnter: (b) => gsap.to(b, { y: 0, autoAlpha: 1, duration: 1, ease: "expo.out", stagger: 0.08, overwrite: true }),
  });

  document.querySelectorAll<HTMLElement>("[data-n]").forEach((el) => {
    const o = { v: 0 };
    gsap.to(o, { v: +(el.dataset.n ?? 0), duration: 1.6, ease: "power3.out",
      onUpdate: () => (el.textContent = Math.round(o.v) + (el.dataset.s ?? "")),
      scrollTrigger: { trigger: el, start: "top 92%", once: true } });
  });

  gsap.utils.toArray<HTMLElement>(".bar i").forEach((b) =>
    gsap.to(b, { width: b.dataset.w, duration: 1.6, ease: "expo.out", scrollTrigger: { trigger: b, start: "top 92%", once: true } }));

  const road = document.querySelector(".road");
  if (road) {
    gsap.fromTo(".road .fill", { scaleY: 0 }, { scaleY: 1, ease: "none",
      scrollTrigger: { trigger: road, start: "top 60%", end: "bottom 60%", scrub: true } });
    road.querySelectorAll(".ph").forEach((p) =>
      ScrollTrigger.create({ trigger: p, start: "top 60%", toggleClass: { targets: p, className: "on" } }));
  }

  const glow = document.querySelector<HTMLElement>(".glow");
  if (glow) {
    gsap.set(glow, { xPercent: -50, yPercent: -50, x: innerWidth / 2, y: innerHeight / 3 });
    const qx = gsap.quickTo(glow, "x", { duration: 0.8, ease: "power3" });
    const qy = gsap.quickTo(glow, "y", { duration: 0.8, ease: "power3" });
    addEventListener("pointermove", (e) => { qx(e.clientX); qy(e.clientY); });
  }

  document.querySelectorAll<HTMLElement>("[data-mag]").forEach((b) => {
    const x = gsap.quickTo(b, "x", { duration: 0.4, ease: "power3" });
    const y = gsap.quickTo(b, "y", { duration: 0.4, ease: "power3" });
    b.addEventListener("pointermove", (e) => {
      const r = b.getBoundingClientRect();
      x((e.clientX - r.left - r.width / 2) * 0.25); y((e.clientY - r.top - r.height / 2) * 0.25);
    });
    b.addEventListener("pointerleave", () => { x(0); y(0); });
  });

  document.querySelectorAll<HTMLElement>(".card").forEach((c) => {
    c.addEventListener("pointermove", (e) => {
      const r = c.getBoundingClientRect();
      c.style.setProperty("--mx", `${e.clientX - r.left}px`);
      c.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });
}

const bar = document.getElementById("progress");
if (bar) {
  let raf = 0;
  const paint = () => {
    raf = 0;
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(scrollY / max, 1) : 0})`;
  };
  addEventListener("scroll", () => { if (!raf) raf = requestAnimationFrame(paint); }, { passive: true });
  paint();
}
