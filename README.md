# COIN CRAFT

COIN CRAFT is a community meme coin and gateway to open-source creative tools for artists. The site showcases 16 open-source ArtCraft apps (PhotoCraft, VectorCraft, FilmCraft, …) and the project roadmap, from genesis to CEX listings and holder-driven bounties.

Built with **Astro**, **Tailwind CSS v4**, **GSAP**, and **Lenis**. Static output, no backend.

## Quick start

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview  # preview the build
```

> The repo also contains a `pnpm-lock.yaml`; either npm or pnpm works.

## Project structure

```
src/
├─ layouts/Base.astro       # HTML shell, fonts, nav, footer, motion
├─ pages/                   # index, gateway, ownership, roadmap, listings
├─ components/              # Nav, Footer, Terminal, Icon, Stats, Marquee,
│                           # PageHead, Cta, Faq, CodeField
├─ data/site.ts             # All copy/data (socials, apps, phases, stats, faqs)
├─ scripts/motion.ts        # GSAP animations, Lenis, interactions
└─ styles/global.css        # Tailwind v4 theme + custom CSS
public/                     # favicon, og.png, robots.txt
```

## Editing content

All marketing copy lives in `src/data/site.ts` — apps, phases, stats, FAQs, social links, etc. Motion/animation logic lives in `src/scripts/motion.ts`. Global styles and theme tokens are in `src/styles/global.css`.

## Configuration

- Site URL: `astro.config.mjs` (`site: "https://coincraft.cc"`)
- Astro integrations: `@astrojs/sitemap`
- Vite plugin: `@tailwindcss/vite`

## Build

Output is written to `dist/` as static HTML. Deploy the `dist/` folder to any static host.

## Notes

- The site is a meme coin landing page; listings shown (Binance, OKX, Bybit) are targets, not confirmations.
- Nothing here is financial advice. Always do your own research.