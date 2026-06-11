# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**MF Tires Hub** is a single-page landing for a truck tire business in Kyiv, Ukraine.

- **Language:** Ukrainian (content, UI, SEO)
- **Primary conversion goal:** Phone call (`+38 (063) 171-51-11`)
- **Type:** Static HTML/CSS/JavaScript site (no framework, no build step)
- **Services:** Tire sales (new & used), repairs, mounting, wheel delivery across Ukraine

**Live URL:** https://mftireshub.pp.ua/

## Tech Stack

- **HTML5** — semantic markup with SEO optimization
- **CSS3** (Tailwind CSS) — utility-first styling with custom components
- **JavaScript (Vanilla)** — no frameworks, pure DOM manipulation
- **Google Fonts** — Oswald (display) and Nunito (body)

## File Structure

```
mftireshub/
├── index.html              # Main page (798 lines)
├── css/
│   ├── main.css            # Tailwind build + custom styles
│   └── tailwind.css        # Compiled Tailwind utilities
├── js/
│   ├── ui.js               # Header scroll, burger menu, smooth scroll
│   ├── animations.js       # Scroll reveal, staggered reveals, count-up
│   └── flip.js             # Flip card universal handler
├── img/
│   ├── hero.jpg            # Hero section background
│   ├── logo.jpg            # Header logo
│   └── og-image.jpg        # Open Graph social share image
├── favicon.png             # Browser tab icon
└── CNAME                   # DNS config (mftireshub.pp.ua)
```

## Key Features & Architecture

### Header & Navigation
- **Fixed header** with scroll effect (adds blur and shadow at 60px threshold)
- **Responsive burger menu** that closes after navigation
- **Active nav link detection** using Intersection Observer API
- **Smooth scroll anchors** to sections with header offset compensation

### Hero Section
- Full-screen background image with gradient overlay
- Staggered fade-in-up animations (delays: 0.1s, 0.25s, 0.4s, 0.55s)
- **Stat badges** with animated count-up effect (data-target attribute)
- Animated bounce indicator at bottom

### Service Cards (3-Column Grid)
- Two types:
  1. **Flip cards** — display content on front, flip to show detailed list on back
  2. **Regular cards** — static display
- Flip triggered by clicking `.flip-trigger` button
- 3D perspective transform on flip (`rotateY(180deg)`)
- Smooth scroll support in flipped back side

### Why Us & Delivery Sections
- Grid layouts with scroll-reveal animations
- **Staggered reveal timing** — each child gets `transitionDelay: (index * 0.08)s`
- Cards gain `.visible` class when they enter viewport (12% threshold)

### Color Scheme
- **Primary red:** `#c9181e` (brand-red)
- **Dark background:** `#0a0a0a` (brand-dark)
- **Card background:** `#131313` (brand-card)
- **Text:** `#ffffff` (white), `#c8c8c8` (muted), `#888888` (lighter muted)
- **Border:** `#222222`

## Development Commands

### No build step required
This is a static site. Simply open `index.html` in a browser or serve with any HTTP server:

```bash
# Simple Python 3 server
python -m http.server 8000

# Or with Node's http-server (if installed)
npx http-server -p 8000
```

Then visit `http://localhost:8000`

### Linting & Validation

```bash
# CSS — run through Tailwind validation or CSS lint tool
# JavaScript — ensure no console errors (check browser DevTools)
# HTML — validate at https://validator.w3.org/
```

## Common Development Tasks

### Adding a New Service Card
1. Copy the structure from existing flip-card in `index.html` (around line 202)
2. Update heading, description, and icon SVG
3. For flip cards: add `.flip-card` class, include `.flip-trigger` button, and back content
4. CSS is already handled by `.service-card`, `.flip-card`, `.flip-card-inner`, etc.
5. JavaScript auto-initializes flip behavior via `flip.js`

### Updating Colors or Branding
- Edit CSS custom properties and Tailwind classes in `css/main.css`
- Brand colors are referenced as:
  - `--tw-bg-opacity: #c9181e` (red)
  - `background: #0a0a0a` (dark)
  - `background: #131313` (card)
- Search for `#c9181e` to find all red accent uses

### Modifying Animations
- **Fade-in-up timing:** `.animate-fade-in-up` duration (0.65s, `css/main.css` line 423)
- **Stagger delays:** `.anim-delay-1` through `.anim-delay-4` (lines 426–429)
- **Scroll reveal threshold:** `.08s` stagger in `js/animations.js` line 42
- **Intersection Observer thresholds:** see `js/animations.js` and `js/ui.js`

### Adding a New Section
1. Add `<section id="new-section">` in `index.html`
2. Style with `.pt-7`, `.pb-20` (padding), grid layout, etc.
3. Add elements with `.reveal` class if you want scroll reveal (auto-picked up by `animations.js`)
4. For nav link, add to both desktop nav and mobile menu (`#header` and `#mobile-menu`)

## Testing Checklist

Before deploying:
1. **Mobile responsiveness** — test on actual phone or DevTools (sm, md, lg breakpoints)
2. **Scroll performance** — check that animations don't stutter (60 FPS)
3. **Flip cards** — click brands/sizes buttons to verify 3D flip works
4. **Links** — verify all phone/mailto/anchor links work
5. **Images** — check hero, logo, and OG image load
6. **SEO tags** — verify meta description, keywords, Open Graph tags in `<head>`
7. **Accessibility** — keyboard navigation (Tab through links), burger menu `aria-expanded` state

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS: Flexbox, Grid, 3D transforms, gradients
- JS: ES6 (arrow functions, const/let, spread operator)
- IE11 not supported

## Deployment & Hosting

**Critical:** This site is hosted on GitHub Pages with a custom domain via CNAME file. **Do not modify or delete the CNAME file.**

- **Hosting:** GitHub Pages (`main` branch)
- **Domain:** mftireshub.pp.ua (configured in CNAME)
- **Deployment:** Push to `main` → immediate live update (no build step)
- **CNAME file:** Do not touch — contains domain configuration

Every commit to `main` is automatically deployed within seconds.

## Key Insights

1. **No external dependencies** — this simplicity makes it fast and maintainable
2. **Intersection Observer** — efficiently detects when elements enter viewport (used in animations and nav)
3. **CSS custom properties** — variables set via Tailwind utilities (e.g., `--tw-text-opacity`)
4. **3D Flip cards** — uses `perspective`, `transform-style: preserve-3d`, and `backface-visibility`
5. **Staggered animations** — subtle timing (`delay = index * 80ms`) creates polished UX
6. **Aria attributes** — semantic HTML with `aria-expanded`, `aria-label` for accessibility

## Contact & Support

- **Business:** +38 (063) 171-51-11
- **Email:** mftireshub@gmail.com
- **Location:** вул. Родини Бунґе, 7, Київ, Україна
- **Social:** Facebook, Instagram, Telegram, TikTok (links in footer/site)
