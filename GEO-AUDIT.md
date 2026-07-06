# GEO / AEO AUDIT — mftireshub.pp.ua

**Date:** 2026-07-06
**Scope:** Single-page static site (`index.html`) + `404.html`, `robots.txt`, `sitemap.xml`
**Entity target:** MF Tires Hub — commercial / truck tires (вантажні шини), LocalBusiness + Product/Service, Kyiv + Україна.

> **Overall verdict:** The site already has a *strong SEO/technical base* (clean semantics, valid LocalBusiness schema, OG/Twitter, canonical, `lang="uk"`). The gaps are almost entirely **GEO-specific**: no answer-first summary, no FAQ, catalog data buried behind JS flip-cards, and only 1 of 6 recommended schema types present. These are exactly the layers AI answer engines reward.

---

## Per-page report — `index.html`

### 1. Heading hierarchy
| Level | Content | Status |
|---|---|---|
| H1 | "Вантажні шини високої якості" | ✅ Exactly one H1 |
| H2 | Наші послуги · Наші переваги · Способи доставки · Контакти · Потрібна консультація? | ✅ No skipped levels |
| H3 | Service card titles, why-us cards, footer column titles | ✅ Correct nesting |

- **No missing/duplicate H1, no skipped levels.** ✅
- ⚠️ **Weakness (GEO):** H1 "Вантажні шини **високої якості**" is a *slogan*, not an *entity+intent* statement. AI engines prefer an H1 that names the offer + geo/availability, e.g. *"Вантажні шини в Києві — продаж, ремонт, доставка по Україні"*. Slogan can move to the sub-line.
- ⚠️ No question-style H2/H3 anywhere (e.g. "Як підібрати шину за розміром?"). These are high-value AEO anchors.

### 2. `<title>` & `<meta description>`
- **Title:** `Вантажні шини Київ — MF Tires Hub | Продаж, Ремонт, Шиномонтаж` — **62 chars**, keyword-rich. ⚠️ Slightly over the 60-char guideline (risk of SERP truncation). Otherwise good.
- **Meta description:** present, ~150 chars, includes "вантажні шини", "Київ", "доставка", "5000+". ✅ Good.
- No per-page variation needed (single page). ✅

### 3. Answer-first summary (core answer in first 40–60 words below hero)
- ❌ **MISSING.** Directly below the hero the next block is the Services grid. There is **no self-contained 40–60 word paragraph** answering *"що це, для кого, як купити"*.
- The hero tagline ("Ми не просто продаємо шини — ми допомагаємо людям! Нові та вживані шини, диски, ремонт і шиномонтаж") is a slogan, not a quotable factual answer. **This is the single highest-impact GEO gap.**

### 4. Existing structured data
| Type | Present | Valid | Notes |
|---|---|---|---|
| `AutoPartsStore` (LocalBusiness) | ✅ | ✅ Looks valid | Full NAP, geo coords, openingHours, areaServed, sameAs, department(AutoRepair). **Strong.** |
| `Organization` | ❌ | — | Brand identity/sameAs currently only inside the store node. |
| `Product` / `Offer` | ❌ | — | No machine-readable tire products at all. |
| `Service` | ❌ | — | Repair / mounting / delivery / pre-order not modeled. |
| `FAQPage` | ❌ | — | No FAQ exists. |
| `BreadcrumbList` | ❌ | — | — |
| `WebSite` / `WebPage` (+ `dateModified`) | ❌ | — | No freshness signal in JSON-LD. |

- ✅ No broken/invalid schema detected. The one type present is high quality.
- The `@id` `#business` is set — good, lets other nodes reference it.

### 5. Semantic landmarks
- ✅ `<header role="banner">`, `<nav aria-label>` (×2), `<main id="main-content">`, `<section aria-labelledby>` per block, `<article>` for service cards, `<footer role="contentinfo">`, skip-link.
- **This is already excellent** — better than most static sites. Only addition needed: `<section>` wrappers for the new *Answer-first*, *Catalog/spec-table*, and *FAQ* blocks.

### 6. Product / catalog structure AI can parse
- ⚠️ **Partial, and effectively hidden.** Tire **sizes** (R15–R25, 315/80 R22.5, etc.), **disk sizes**, and **28 brands** exist — but only inside `.flip-card-back` elements that are `inert aria-hidden="true"` until the user clicks. `flip.js` keeps them hidden from the accessibility tree by default.
  - Raw-HTML crawlers *can* read the text, but: it's aria-hidden (weaker signal), it's unlabeled as specs (no size/axle/load structure), and there are **no prices, no axle position (рульова/ведуча/причіпна), no load/speed index**.
- ❌ **No pricing/spec table** (agentic AI strongly favors tables).
- ❌ **No Product JSON-LD** mirroring any of it.

### 7. FAQ section
- ❌ **MISSING entirely.** No visible FAQ, no `FAQPage` schema. This is the **highest-signal AEO element** and is absent.

### 8. Freshness signals
- ✅ `sitemap.xml` exists — but `lastmod` = **2026-06-11** (stale; today is 2026-07-06). Only lists the homepage.
- ✅ `robots.txt` exists, `Allow: /`, references sitemap, disallows `/audit/`.
  - ⚠️ AI crawlers are *implicitly* allowed via `User-agent: *` but **not explicitly named** (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, OAI-SearchBot). Task requires explicit allow.
- ❌ No `dateModified` in any JSON-LD node.

---

## `404.html` / `robots.txt` / `sitemap.xml` (supporting)
- `404.html` exists (GitHub Pages custom 404). Not a GEO concern — leave as-is.
- `robots.txt` / `sitemap.xml` covered above.

---

## Priority matrix

### 🟢 Quick wins (low effort, high GEO impact)
1. **Add answer-first 40–60 word summary** block directly under the hero (Phase 1). ← biggest single win
2. **Add FAQ section** (8–15 Q&A) + `FAQPage` JSON-LD (Phase 4). ← highest-signal element
3. **Explicitly allow AI crawlers** in `robots.txt` (Phase 6).
4. **Refresh sitemap** `lastmod` to real edit date + add `dateModified` to schema (Phase 6).
5. **Trim `<title>` to ≤60 chars** (Phase 6).
6. Add **`Organization`** + **`WebSite`/`WebPage`** JSON-LD nodes (Phase 5).

### 🟠 Structural (higher effort, compounding value)
7. **Surface the catalog** — move tire sizes/brands out of hidden flip-backs into a machine-readable, always-visible **spec table + card grid** (sizes × axle position; brand list) (Phase 3).
8. **Add `Product`/`Offer` + `Service` JSON-LD** mirroring the visible catalog (Phase 3 & 5). ← *needs price data (see below)*.
9. **Rework H1** to entity+intent; add question-style H2/H3 headings (Phase 1).
10. `BreadcrumbList` (low value on a true one-pager — optional).

---

## ⚠️ Data I need from you before Phases 3 & 5 (I will NOT fabricate)

The existing **NAP is already in the code and I will reuse it verbatim** (phone `+380631715111`, вул. Родини Бунґе 7, Київ 03134, geo 50.4168 / 30.4093, Mon–Fri 09:00–18:00, email, socials). No invention needed there. ✅

But `Product`/`Offer` schema and the pricing table require values that are **not in the codebase**:

1. **Prices** — Do you have a "from" price per category (e.g. *«вживані вантажні шини — від X грн»*, *«нові — від Y грн»*, *«шиномонтаж — від Z грн»*)? If you don't want public prices, I'll model offers **without `price`** using `priceSpecification`/`"availability"` only, or omit `Offer` and use `Product` + `Service` without price. Never fabricated.
2. **Delivery cost** — flag says "Нова пошта / Delivery / самовивіз". Any "від X грн" or "за тарифом перевізника"? (affects Service/shippingDetails wording)
3. **Wholesale / fleet pricing** — is there an optові-ціни offer for autoparks to reference in FAQ + Service? (yes/no + any detail)
4. **Warranty terms** — schema/FAQ can state "гарантія на кожне колесо"; is there a concrete period (e.g. X днів/місяців) or keep it qualitative?

---

## Proposed folder structure after implementation
```
mftireshub/
├── index.html            # + answer-first, catalog table, FAQ; expanded JSON-LD
├── robots.txt            # + explicit AI-crawler allow rules
├── sitemap.xml           # refreshed lastmod
├── css/
│   ├── main.css          # + .faq, .spec-table, .answer-lead styles
│   └── tailwind.css
├── js/
│   ├── ui.js
│   ├── animations.js
│   ├── flip.js
│   └── faq.js            # NEW — accessible accordion (vanilla, aria-expanded, keyboard)
├── schema/               # NEW (optional) — reference copies of JSON-LD blocks
│   ├── localbusiness.json
│   ├── faqpage.json
│   └── products.json
└── GEO-AUDIT.md / GEO-CHECKLIST.md
```
*(JSON-LD ships inline in `index.html`; the `schema/` folder is optional reusable reference copies — no build step either way.)*
