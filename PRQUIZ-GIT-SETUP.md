# PRQuiz integration – Git setup (step by step)

Get the quiz app into GitHub so Vercel can auto-deploy it.

---

## Step 1: Create a new repo on GitHub

1. Go to **https://github.com/new**
2. **Repository name:** e.g. `peptides-quiz` or `prquiz`
3. **Public**
4. **Do not** check “Add a README” (you already have code)
5. Click **Create repository**
6. Leave the page open – you’ll need the repo URL (e.g. `https://github.com/uxdesigndani-dotcom/peptides-quiz.git`)

---

## Step 2: Open Terminal and go to the quiz folder

```bash
cd "/Users/daniellespence/Desktop/PRQuiz intergration"
```

---

## Step 3: Start Git in this folder

```bash
git init
```

---

## Step 4: Add a .gitignore (so node_modules and build output aren’t committed)

```bash
echo "node_modules
dist
.env
.env.local
.vercel" > .gitignore
```

---

## Step 5: Add all files and make the first commit

```bash
git add .
git commit -m "Initial commit: menopause quiz + MailerLite subscribe API"
```

---

## Step 6: Rename branch to main (if needed)

```bash
git branch -M main
```

---

## Step 7: Connect to your new GitHub repo

Replace `YOUR_USERNAME` and `YOUR_REPO` with your GitHub username and the repo name you chose:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
```

Example:

```bash
git remote add origin https://github.com/uxdesigndani-dotcom/peptides-quiz.git
```

---

## Step 8: Push to GitHub

```bash
git push -u origin main
```

If GitHub asks you to log in, use your username and a **Personal Access Token** (not your password).  
To create one: GitHub → Settings → Developer settings → Personal access tokens.

---

## Step 9: Connect the repo to Vercel

1. Go to **https://vercel.com/new**
2. **Import** the repo you just created (e.g. `peptides-quiz`)
3. Leave **Build Command** and **Output Directory** as Vercel suggests (usually `npm run build` and `dist`)
4. Under **Environment Variables**, add:
   - **Name:** `MAILERLITE_API_KEY`
   - **Value:** your MailerLite API key
5. Click **Deploy**

---

## Step 10: Use the live quiz URL

After the deploy finishes, Vercel gives you a URL (e.g. `peptides-quiz.vercel.app`). That’s your live quiz. You can point a custom domain to it later if you want.

---

**Quiz at peptidesrated.com/menopause:** The peptidesrated repo has a rewrite so `/menopause` is served by the Menopause-quiz app. After you deploy Menopause-quiz, open the **peptidesrated** repo’s `vercel.json` and replace `menopause-quiz-uxdesigndani-dotcom.vercel.app` with your actual Menopause-quiz Vercel URL (from the Vercel dashboard, no `https://` or trailing slash). Also add **`MAILERLITE_API_KEY`** to the **peptidesrated** project in Vercel so the subscribe API works on that domain.

---

**Later:** When you change the quiz code, just:

```bash
cd "/Users/daniellespence/Desktop/PRQuiz intergration"
git add .
git commit -m "Describe your change"
git push
```

Vercel will deploy automatically.
