# Serve sitemap.xml with Cloudflare (Figma Make workaround)

Your site stays on Figma Make. Cloudflare only answers **/sitemap.xml** with XML; all other URLs go to Figma as normal.

---

## 1. Put your domain on Cloudflare

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) and sign up or log in.
2. Click **Add a site** and enter **peptidesrated.com**.
3. Pick the **Free** plan.
4. Cloudflare will show you two nameservers (e.g. `ada.ns.cloudflare.com` and `bob.ns.cloudflare.com`).
5. In your **domain registrar** (where you bought peptidesrated.com), change the domain’s **nameservers** to those two. Save.
6. Back in Cloudflare, click **Check nameservers**. Wait until the status is **Active** (can take a few minutes to 24 hours).

---

## 2. Set Figma Make as the origin

1. In Cloudflare, open **peptidesrated.com** → **DNS** (or **Records**).
2. You should see an **A** or **CNAME** record pointing to Figma Make’s host (or your current host). Leave it as is, or:
   - If Figma gave you an IP: add an **A** record, name `@`, value = that IP, Proxy status **Proxied** (orange cloud).
   - If Figma gave you a hostname: add a **CNAME** record, name `@` (or `www`), value = that hostname, Proxy status **Proxied** (orange cloud).
3. Make sure the **orange cloud (Proxied)** is on so traffic goes through Cloudflare.

---

## 3. Create the Worker

1. In the left sidebar click **Workers & Pages**.
2. Click **Create** → **Create Worker**.
3. Name it (e.g. `sitemap`).
4. Click **Edit code** (or **Quick edit**).
5. Delete the default code and **paste the full contents** of `cloudflare-sitemap-worker.js` from this project.
6. Click **Save and deploy**.

---

## 4. Route /sitemap.xml to the Worker

1. Go to **Workers & Pages** → your worker (e.g. `sitemap`) → **Settings** → **Triggers**.
2. Under **Routes** click **Add route**.
3. Set:
   - **Route:** `peptidesrated.com/sitemap.xml`
   - **Zone:** peptidesrated.com (your site).
4. Save.

Now when someone visits **https://peptidesrated.com/sitemap.xml**, Cloudflare runs the Worker and returns the XML. All other URLs still go to Figma Make.

---

## 5. Check it

- Open **https://peptidesrated.com/sitemap.xml** in a browser. You should see the XML.
- In [Google Search Console](https://search.google.com/search-console), add the sitemap URL: **https://peptidesrated.com/sitemap.xml**.

---

## Updating the sitemap later

Edit the Worker: **Workers & Pages** → your worker → **Edit code**. Change the `SITEMAP` string (add/remove/change `<url>...</url>` blocks), then **Save and deploy**. No need to touch Figma Make.
