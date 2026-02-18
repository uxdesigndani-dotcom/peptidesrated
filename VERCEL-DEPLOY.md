# Deploy peptidesrated.com to Vercel

Your project is already set up for Vercel: `vercel.json` and the `/api/sitemap.xml` route will make **https://peptidesrated.com/sitemap.xml** return proper XML for Google.

---

## 1. Push your code to GitHub

If the project isn’t on GitHub yet:

```bash
cd /Users/daniellespence/generate-this-spark
git add .
git commit -m "Add Vercel config and sitemap API"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

(Create the repo on github.com first, then use its URL.)

---

## 2. Import the project in Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (GitHub is easiest).
2. Click **Add New…** → **Project**.
3. **Import** your GitHub repo (e.g. `generate-this-spark` or whatever you named it).
4. Leave the defaults:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Click **Deploy**.

Wait for the first deployment to finish. You’ll get a URL like `your-project.vercel.app`.

---

## 3. Add your domain

1. In the Vercel dashboard, open your project.
2. Go to **Settings** → **Domains**.
3. Enter **peptidesrated.com** and click **Add**.
4. Also add **www.peptidesrated.com** if you use it.
5. Vercel will show the DNS records you need.

---

## 4. Point your domain to Vercel

In your **domain registrar** (where you bought peptidesrated.com):

**Option A – Use Vercel nameservers (recommended)**  
- Vercel will show two nameservers (e.g. `ns1.vercel-dns.com`, `ns2.vercel-dns.com`).  
- At the registrar, set the domain’s **nameservers** to those two.  
- Back in Vercel, wait until the domain shows as **Verified**.

**Option B – Keep your current DNS**  
- Add an **A** record: name `@`, value **76.76.21.21** (Vercel’s IP).  
- Add a **CNAME** record: name `www`, value **cname.vercel-dns.com**.  
- Remove or change any old A/CNAME records that pointed to Figma so only Vercel’s records are used for the site.

---

## 5. Confirm the sitemap

After the domain is live on Vercel:

1. Open **https://peptidesrated.com/sitemap.xml** in your browser. You should see the XML.
2. In [Google Search Console](https://search.google.com/search-console), add the sitemap: **https://peptidesrated.com/sitemap.xml**.

---

## After this

- **Site:** Served by Vercel (no Figma Make hosting).
- **Sitemap:** Served as XML at `/sitemap.xml` via the API route.
- **Updates:** Push to GitHub; Vercel will redeploy automatically if you connected the repo.

To change sitemap URLs later, edit **`api/sitemap.xml.js`** (the `SITEMAP` string), commit, and push.
