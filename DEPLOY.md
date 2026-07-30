# Deploying keonlee.ca

Status as of the last update: steps 1, 2 and 4 are **done**. Pick up at step 3.

## 1. Get the project running locally — DONE
The project lives at `~/projects/keon-portfolio`. Dependencies are installed.
```
npm run dev
```
Visit http://localhost:3000. `npm run build` also passes clean, so nothing
here will break the Vercel build.

## 2. Push to GitHub — DONE
Repo: https://github.com/Keonleebv/keon-portfolio (public, branch `main`).
Future changes are just:
```
git add -A
git commit -m "Your message"
git push
```

## 3. Deploy on Vercel
Go to vercel.com/new, sign in with GitHub, select `Keonleebv/keon-portfolio`.
Vercel auto-detects Next.js, no config needed. Click Deploy. You'll get a
live URL like `keon-portfolio.vercel.app` within about a minute.

Every later push to `main` redeploys automatically.

## 4. Buy the domain — DONE
`keonlee.ca` is purchased. Nothing to do here.

## 5. Point the domain at Vercel
In your Vercel project: Settings → Domains → add `keonlee.ca`.
Vercel will show you either:
- an A record to add pointing to `76.76.21.21`, or
- nameservers to switch to Vercel's

Add that record in your registrar's DNS settings. The record types are the
same for `.ca` as for `.com` — only the registrar's settings UI differs.
Propagation usually takes a few minutes to a few hours. Vercel issues HTTPS
automatically once the domain resolves.

**Also add `www.keonlee.ca` on the same Domains screen** and set it to
redirect to `keonlee.ca`. Vercel offers this as a one-click option when you
add the second domain. Easy to skip, and mildly annoying if someone types
`www.` out of habit and gets nothing.

## 6. Double check before sharing the link
- Click every CTA pill (Resume, LinkedIn, GitHub, Email) on the deployed site
- Open each case study route directly by URL to confirm routing works
  (`/case/weekflow`, `/case/coddle`, `/case/hootsuite`, `/case/ea`)
- Check the live embeds (Weekflow, Coddle) actually render and aren't blocked —
  either site could send `X-Frame-Options` and leave the frames blank
- Confirm both `keonlee.ca` and `www.keonlee.ca` load
- Test on an actual phone, not just resizing a desktop browser

## Ongoing edits
All case study text lives in `lib/cases.js`, plain data, no JSX. Ask Claude
Code to update specific facts/numbers there directly rather than hunting
through page files.

The canonical URL is set in `app/layout.js` (`metadataBase` and
`openGraph.url`). If the domain ever changes, update it in both places.
