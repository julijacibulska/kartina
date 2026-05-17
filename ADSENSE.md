# Google AdSense setup for kartina

Your site: **https://julijacibulska.github.io/kartina/**

Ads load **only after** visitors click **Accept all** on the cookie banner (GDPR).

---

## Step 1 — Apply for AdSense (do this first)

1. Go to [https://adsense.google.com](https://adsense.google.com) and sign in with Google.
2. Add your site: `julijacibulska.github.io` (or your custom domain if you add one later).
3. Enter your details (name, address, payment info when asked).
4. Wait for Google to review (often a few days to 2 weeks). You will get email when approved or if more info is needed.

**Tips for approval**

- Site must be **public** and reachable (GitHub Pages enabled).
- You already have: privacy policy, cookie policy, contact email.
- Content is minimal; approval is not guaranteed. If rejected, add a bit more text on the home page or a short “About” page and reapply.

---

## Step 2 — After approval: create an ad unit

1. AdSense → **Ads** → **By ad unit** → **Display ads**.
2. Name it e.g. `kartina-mobile-footer`.
3. Choose **Responsive** (works well on mobile).
4. Copy:
   - **Publisher ID** → `ca-pub-XXXXXXXXXXXXXXXX`
   - **Ad unit ID** (data-ad-slot) → numeric ID like `1234567890`

---

## Step 3 — Connect the site (5 minutes)

On your computer, in the project folder:

```bash
cd /Users/julija/barcode-ad-site
cp adsense-config.example.js adsense-config.js
```

Edit `adsense-config.js` and replace the placeholder IDs with yours.

Update **ads.txt** (required by Google). Open `ads.txt` and replace with one line (use your real publisher number without `ca-pub-` prefix in the middle part):

```
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

Example: if your ID is `ca-pub-1234567890123456`, the line is:

```
google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0
```

Commit and push:

```bash
git add ads.txt index.html
git commit -m "Enable AdSense with publisher ID"
git push origin main
```

`adsense-config.js` is gitignored so you can keep IDs only on your machine — but for GitHub Pages you **must** either:

- **Option A:** Remove `adsense-config.js` from `.gitignore` and commit it (simplest for static hosting), or  
- **Option B:** Paste the config directly into `index.html` instead (see below).

### Option B — Paste into index.html (easiest for GitHub Pages)

In `index.html`, uncomment and edit:

```html
<script>
  window.kartinaAdConfig = { client: "ca-pub-YOUR_ID", slot: "YOUR_SLOT_ID" };
</script>
```

Place it **before** `cookie-consent.js`. Then push to GitHub.

---

## Step 4 — EU consent in AdSense

1. AdSense → **Privacy & messaging** → **EU user consent**.
2. Turn on Google's consent message **or** confirm you use your own banner (this site already has one).
3. If using your own banner, choose the option that matches a custom CMP / consent tool where applicable.

---

## Step 5 — Test

1. Open the site in a **private/incognito** window.
2. Click **Accept all**.
3. Barcode and ad area should appear; after a few minutes to hours, a real ad may show (new sites often show blank at first).
4. Check `https://julijacibulska.github.io/kartina/ads.txt` loads in the browser.

---

## Troubleshooting

| Problem | What to do |
|--------|------------|
| Blank ad box | Normal for new sites; wait 24–48h after linking site in AdSense |
| ads.txt not found | File must be at site root; push to `main` and wait for Pages deploy |
| Ads on reject cookies | Should not happen; clear site data and test again |
| Application rejected | Add more original content, fix policy links, reapply after 2–4 weeks |

---

## Files involved

| File | Role |
|------|------|
| `adsense-config.js` | Your IDs (create from example) |
| `ads.txt` | Authorizes Google to sell ads on your domain |
| `cookie-consent.js` | Loads AdSense only after Accept all |
| `index.html` | Loads config + consent script |
