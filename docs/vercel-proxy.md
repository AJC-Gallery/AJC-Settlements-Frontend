# Vercel API Proxy Configuration

## Overview

This project uses a **Vercel rewrite proxy** to forward frontend API requests
to a backend service hosted on Render.

The goal is to make frontend and backend requests appear as if they come
from the **same domain**, enabling cookies to work correctly on free hosting plans.

---

## Why This Exists

When the frontend is deployed on Vercel and the backend is deployed on Render:

- They run on **different domains**
- Browsers block cookies across unrelated domains
- Authentication using HttpOnly cookies fails

To solve this, Vercel rewrites are used to proxy API requests.

---

## How It Works

The proxy is defined in `vercel.json`.

### Behavior

- Requests to `/api/*` are forwarded to the Render backend
- All other routes are served by `index.html` to support SPA routing

### Effect

- Frontend calls `/api/...`
- Vercel forwards the request to the backend
- Cookies behave as same-domain cookies
- No CORS configuration is required on the frontend

---

## Current Configuration

- Frontend: Vercel
- Backend: Render
- API base path: `/api`

This setup is intended for development and early production stages.

---

## When to Remove This Proxy

You should remove this proxy when you move to **custom domains**, for example:

- `app.yourdomain.com` → frontend
- `api.yourdomain.com` → backend

With proper cookie `domain` settings, direct API calls will work without a proxy.

---

## How to Remove

1. Delete the `vercel.json` file
2. Update `VITE_API_URL` to point directly to the backend URL
3. Update backend cookie domain configuration
4. Redeploy frontend and backend

---

## Notes

- This proxy is not a replacement for a proper API gateway
- For high-traffic or large-scale systems, using a dedicated API domain is recommended
