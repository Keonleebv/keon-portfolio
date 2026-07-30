# Deploying keonlee.com

## 1. Get the project into Claude Code
Unzip this project, open the folder in Claude Code (or Cursor), and run:
```
npm install
npm run dev
```
Visit http://localhost:3000 to confirm it looks right before doing anything else.

## 2. Push to GitHub
```
git init
git add .
git commit -m "Initial portfolio"
```
Create a new repo on github.com (keep it public or private, your call), then:
```
git remote add origin https://github.com/Keonleebv/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## 3. Deploy on Vercel
Go to vercel.com/new, sign in with GitHub, select the repo you just pushed.
Vercel auto-detects Next.js, no config needed. Click Deploy. You'll get a
live URL like `keon-portfolio.vercel.app` within about a minute.

## 4. Buy the domain
Buy `keonlee.com` (or whatever you land on) from Namecheap, Cloudflare
Registrar, or Porkbun. Cloudflare is often cheapest since they sell at cost.

## 5. Point the domain at Vercel
In your Vercel project: Settings → Domains → add `keonlee.com`.
Vercel will show you either:
- an A record to add pointing to `76.76.21.21`, or
- nameservers to switch to Vercel's

Add that record in your domain registrar's DNS settings. Propagation usually
takes a few minutes to a few hours. Vercel issues HTTPS automatically once
the domain resolves.

## 6. Double check before sharing the link
- Click every CTA pill (Resume, LinkedIn, GitHub, Email) on the deployed site
- Open each case study route directly by URL to confirm routing works
- Check the live embeds (Weekflow, Coddle) actually render and aren't blocked
- Test on an actual phone, not just resizing a desktop browser

## Ongoing edits
All case study text lives in `lib/cases.js`, plain data, no JSX. Ask Claude
Code to update specific facts/numbers there directly rather than hunting
through page files.
