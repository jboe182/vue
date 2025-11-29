# Deployment Guide

Supabase hosts your **backend** (Database, Auth, Storage), but you need a separate host for your **frontend** (the Vue.js website).

The best and easiest way to deploy a Vue/Vite app is using **Vercel** or **Netlify**. Both offer free tiers and connect directly to your GitHub repository.

## Option 1: Vercel (Recommended)

1.  **Push your code to GitHub**
    Make sure your latest code is pushed to your GitHub repository.
    ```bash
    git add .
    git commit -m "Ready for deployment"
    git push origin main
    ```

2.  **Create a Vercel Account**
    Go to [vercel.com](https://vercel.com) and sign up with GitHub.

3.  **Import Project**
    -   Click "Add New..." -> "Project".
    -   Select your `band-website` repository.

4.  **Configure Project**
    -   **Framework Preset**: Vercel should automatically detect `Vite`.
    -   **Root Directory**: `.` (default)
    -   **Environment Variables**: You MUST add your Supabase keys here so the deployed app can talk to the database.
        -   `VITE_SUPABASE_URL`: (Paste the value from your .env file)
        -   `VITE_SUPABASE_ANON_KEY`: (Paste the value from your .env file)

5.  **Deploy**
    -   Click "Deploy".
    -   Vercel will build your site and give you a live URL (e.g., `https://your-band.vercel.app`).

## Option 2: Netlify

1.  Go to [netlify.com](https://netlify.com) and sign up.
2.  "Add new site" -> "Import an existing project".
3.  Connect to GitHub and pick your repo.
4.  **Build settings**:
    -   Build command: `npm run build`
    -   Publish directory: `dist`
5.  **Environment variables**:
    -   Click "Show advanced" or go to Site Settings -> Environment variables.
    -   Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
6.  Deploy.

## Important: Supabase URL Configuration

Since your app is now live on a domain (e.g., `your-band.vercel.app`), you need to tell Supabase to allow authentication redirects to this domain.

1.  Go to your **Supabase Dashboard**.
2.  Go to **Authentication** -> **URL Configuration**.
3.  Add your new Vercel/Netlify URL to **Site URL** and **Redirect URLs**.
    -   Example: `https://your-band.vercel.app/*`

## Continuous Deployment

Once set up, every time you run `git push origin main`, Vercel/Netlify will automatically detect the change, rebuild your site, and update the live version.
