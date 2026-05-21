# StreamQuest (Next.js 14)

Rebuild of streamquest.io on Next.js 14 App Router + TypeScript + Tailwind. Marketing site only, no admin, no database.

## Local dev

```powershell
cd "$HOME\Desktop\StreamQuest Project\streamquest-next"
npm install
npm run dev
```

Open http://localhost:3000

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Jost via `next/font/google`
- No Supabase (marketing only)
- Deploys to Vercel

## Branding tokens

CSS variables live in `app/globals.css` and are mirrored in `tailwind.config.ts`.

| Token | Value |
| --- | --- |
| `--lime` | `#B2F048` |
| `--lime-2` | `#D5FF78` |
| `--twitch` | `#9146FF` |
| `--navy` | `#081F34` |
| `--ink` | `#0B1723` |
| `--deep` | `#050D15` |
| `--offwhite` | `#E1DFD9` |

## Structure

```
app/
  layout.tsx          # root layout, fonts, header, footer
  page.tsx            # homepage
  globals.css         # CSS variables + tailwind directives
  components/
    Header.tsx
    Footer.tsx
public/                # static assets (logo, favicon, OG images)
```

## Phased plan

1. Scaffold (this commit) - boots locally with branded header/footer.
2. Port pages from `../streamquest website/Pages/*.html` into App Router routes.
3. Wire GTM with consent gate, JSON-LD structured data, sitemap, robots.txt.
4. New Vercel project, GitHub push, DNS cutover at Wix, 301 the 17 legacy Squarespace URLs.
