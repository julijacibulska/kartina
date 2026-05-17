# kartina — barcode + ad landing page

Mobile-first static site: one scannable barcode image and a single footer ad slot. No backend required.

**Repository:** https://github.com/julijacibulska/kartina

## Local preview

```bash
cd /Users/julija/barcode-ad-site
python3 -m http.server 8080
```

Open http://localhost:8080 on your phone (same Wi‑Fi) or use browser dev tools mobile view.

## Replace the barcode

1. Add your image as `assets/barcode.png` (or keep `.svg` / `.jpg`).
2. In `index.html`, set the `<img src="...">` to your file.
3. Update the `alt` text if helpful.

## Deploy to GitHub Pages (free)

1. Push to GitHub (see [PUSH.md](PUSH.md) if you have not pushed yet):

   ```bash
   cd /Users/julija/barcode-ad-site
   git remote add origin https://github.com/julijacibulska/kartina.git
   git push -u origin main
   ```

2. On GitHub: **Settings → Pages → Build and deployment**
   - Source: **Deploy from a branch**
   - Branch: `main` / `/ (root)`
3. After a minute, the site is live at **https://julijacibulska.github.io/kartina/**.

### Custom domain (recommended for AdSense)

1. Add a `CNAME` file with your domain (e.g. `www.example.com`) or configure in Pages settings.
2. At your DNS provider, add the records GitHub shows in Pages settings.

## Google AdSense checklist

You do **not** have AdSense yet. After the site is live:

1. **Improve thin content** (helps approval):
   - Edit the short “about” copy on the home page.
   - Add your contact email in `privacy.html`.
2. **Apply** at [https://www.google.com/adsense](https://www.google.com/adsense) with your live URL.
3. **After approval:**
   - Uncomment the AdSense script in `index.html` `<head>` (replace `ca-pub-XXXXXXXX`).
   - In `#ad-slot`, remove the `.ad-placeholder` block and uncomment the `<ins class="adsbygoogle">` snippet from AdSense (Ads → By ad unit → Display).
   - Update `ads.txt` with your line, e.g.  
     `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`
4. **EU users:** Enable consent messaging in the AdSense dashboard (Privacy & messaging).
5. **Test on a real phone:** barcode is large and unobstructed; ad sits below without covering the code.

### Ad tips

- Use **one** manual display unit (320×100 or responsive) in `#ad-slot`.
- Avoid enabling extra Auto ad formats until you confirm they stay non-intrusive.
- Do not place ads on top of the barcode.

## File overview

| File | Purpose |
|------|---------|
| `index.html` | Page layout, barcode, ad slot |
| `styles.css` | Mobile layout |
| `assets/barcode.svg` | Placeholder until your image is ready |
| `privacy.html` | Required for AdSense |
| `ads.txt` | Publisher authorization for ads |

## Cost

- Hosting: **$0** (GitHub Pages)
- Build: **$0** (plain HTML/CSS, no npm)
- Backend: **not needed**
