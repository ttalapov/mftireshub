# GEO / AEO CHECKLIST — mftireshub.pp.ua

**Last updated:** 2026-07-06
**Purpose:** Re-runnable verification checklist for the GEO/AEO layer. Re-check after any content or schema edit.

---

## 1. Structured data (JSON-LD)

| Schema type | Present | Notes |
|---|:---:|---|
| `AutoPartsStore` (LocalBusiness) | ✅ | Full NAP, geo, openingHours, areaServed, `department`(AutoRepair), sameAs. `@id #business`. |
| `Organization` | ✅ | Brand identity + sameAs. `@id #organization`. |
| `WebSite` | ✅ | `publisher`→Organization, `inLanguage uk-UA`. `@id #website`. |
| `WebPage` | ✅ | `about`→#business, `isPartOf`→#website, **`dateModified`**. `@id #webpage`. |
| `Service` (×6) | ✅ | Mirrors the 6 visible service cards. `provider`→#business. **No price** (by owner choice). |
| `FAQPage` | ✅ | 11 Q&A, exact mirror of visible accordion. `@id #faq`. |
| `Product` / `Offer` | ⬜ N/A | Intentionally omitted — no visible per-product price/SKU entries to mirror. Revisit if a priced catalog is added. |
| `BreadcrumbList` | ⬜ N/A | Single-page site, no catalog depth. |

- **All JSON-LD blocks parse as valid JSON:** ✅ (3 blocks)
- **`@id` cross-references resolve:** ✅ (#business, #organization, #website)
- **Currency for any priced offer:** UAH (none priced currently)
- **Validate externally:** run Google Rich Results Test + schema.org validator on the live URL.

## 2. Product / catalog machine-readable

| Item | Status |
|---|:---:|
| Tire sizes visible & crawlable (R15–R25, 315/80 R22.5, …) | ✅ (flip-cards + FAQ answer) |
| Brands visible & crawlable (28 brands) | ✅ (flip-cards + FAQ answer) |
| Axle position explained (рульова / ведуча / причіпна) | ✅ (FAQ Q3) |
| Size-reading guide (width/profile/diameter) | ✅ (FAQ Q4) |
| Prices | ⬜ Owner opted out (public prices not shown) |
| Load / speed index per product | ⬜ Not published |
| Dedicated spec **table** | ⬜ Skipped — catalog surfaced via FAQ instead |

## 3. FAQ

- **Visible accessible accordion:** ✅ (`js/faq.js`, `aria-expanded` + `aria-controls`, keyboard-native, `role="region"`)
- **Question count:** ✅ **11** (target 8–15)
- **FAQPage schema mirrors visible text exactly:** ✅ (0 mismatches, no hidden extras)
- **Covers sizes, brands, axles, delivery, pickup, used quality, price-approach, repair, pre-order, location/hours:** ✅

## 4. Answer-first content

- **One clear H1 (entity + geo + intent):** ✅ "Вантажні шини в Києві — продаж, ремонт, доставка"
- **40–60 word answer summary directly below hero:** ✅ (`#intro`, ~55 words: що / для кого / що є / як купити)
- **Self-contained, quotable paragraph:** ✅
- **Question-style H2/H3:** ✅ (intro H2 + 11 FAQ questions)

## 5. Headings valid

- **Exactly one H1:** ✅
- **No skipped levels (H1→H2→H3):** ✅
- **Section titles as H2, card/FAQ titles as H3:** ✅

## 6. Semantic HTML

- `<header> <nav> <main> <section> <article> <footer>` + skip-link: ✅
- Sections use `aria-labelledby`: ✅
- Flip triggers ↔ panels linked (`aria-controls`/`id`): ✅
- Descriptive `alt` on hero/logo: ✅

## 7. Technical / meta / freshness

| Check | Status |
|---|:---:|
| `<title>` ≤ 60 chars | ✅ (54) |
| `<meta description>` ~150 chars, keyword-relevant | ✅ (137) |
| Canonical URL (`.pp.ua`) | ✅ |
| Open Graph + Twitter Card | ✅ |
| `<html lang="uk">` + `inLanguage uk-UA` | ✅ |
| Absolute URLs use `https://mftireshub.pp.ua/` | ✅ |
| `sitemap.xml` present & fresh `lastmod` | ✅ (2026-07-06) |
| `dateModified` in schema | ✅ (2026-07-06) |

## 8. AI crawlers allowed

- **robots.txt explicitly allows:** ✅ GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, anthropic-ai, Claude-Web, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended
- **No AI crawler blocked:** ✅
- **Sitemap referenced in robots.txt:** ✅
- `/audit/` and `*.md` excluded from indexing: ✅

---

## Entity-consistency guardrails (keep intact on future edits)
- Always **"MF Tires Hub"** (never rename the entity).
- Always **"вантажні шини"** / commercial-truck framing (steer/drive/trailer — рульова/ведуча/причіпна) so AI categorizes as *commercial truck tires*, not car tires.
- **Never put an answer only in schema** — every FAQ/Service answer must exist in visible HTML first.
- If prices are ever added: mirror them in visible cards/table **and** in `Offer` (price + `priceCurrency: "UAH"` + `availability`), and flip the `Product/Offer` rows above to ✅.
- On any content edit: bump `sitemap.xml <lastmod>` and `WebPage.dateModified` to the real edit date.

## How to re-verify
1. `python -m http.server 8000` → open `http://localhost:8000`.
2. Google **Rich Results Test** + **schema.org validator** on the live URL (checks FAQPage / LocalBusiness / Organization eligibility).
3. Confirm FAQ answers on screen == `FAQPage` schema text (no drift).
4. `robots.txt` → confirm no `Disallow: /` for any AI agent.
