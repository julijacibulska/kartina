# Push to GitHub (kartina)

Run these commands in **Terminal** on your Mac (not in the agent — it needs your GitHub login):

```bash
cd /Users/julija/barcode-ad-site

git remote add origin https://github.com/julijacibulska/kartina.git
# If remote already exists: git remote set-url origin https://github.com/julijacibulska/kartina.git

git branch -M main
git push -u origin main
```

If you use SSH instead of HTTPS:

```bash
git remote add origin git@github.com:julijacibulska/kartina.git
git push -u origin main
```

## Enable GitHub Pages

After push: **https://github.com/julijacibulska/kartina/settings/pages**

- Source: Deploy from branch **main** / **/ (root)**
- Site URL: **https://julijacibulska.github.io/kartina/**
