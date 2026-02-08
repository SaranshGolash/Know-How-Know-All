# Deployment: Render (server) + Vercel (client) + Supabase (DB)

## 1. Supabase (Database)

1. Create a project at [supabase.com](https://supabase.com).
2. In **Project Settings → Database**, copy the **Connection string** (URI).
   - For Render, use **Connection pooling** (port **6543**) to avoid too many connections.
3. Run the schema: in Supabase **SQL Editor**, paste and run the contents of `queries.sql` (creates `users`, `purchases`, `user_progress`, and columns).

## 2. Render (Backend)

1. Create a **Web Service** and connect your repo.
2. **Root directory**: leave empty (repo root) or set to `server` if you prefer.
3. **Build command**: `cd server && npm install`
4. **Start command**: `cd server && npm start` (or `npm start` if root is `server`)
5. **Environment variables** (Render Dashboard → Environment):

   | Key | Value |
   |-----|--------|
   | `DATABASE_URL` | Your Supabase connection string (pooler, port 6543) |
   | `PORT` | Leave as-is (Render sets this) |
   | `CLIENT_URL` | Your Vercel app URL, e.g. `https://your-app.vercel.app` (no trailing slash) |
   | `JWT_SECRET` | A long random string (e.g. from `openssl rand -hex 32`) |
   | `STRIPE_SECRET_KEY` | From Stripe Dashboard → API keys |
   | `GEMINI_API_KEY` | From [Google AI Studio](https://aistudio.google.com/app/apikey) |

6. Deploy. Note your Render URL, e.g. `https://your-app.onrender.com`.

## 3. Vercel (Frontend)

1. Import your repo in [Vercel](https://vercel.com).
2. **Root Directory**: leave as `.` (repo root).
3. **Build command**: `npm run build` (uses root `package.json`, which builds the client).
4. **Output directory**: `client/build`
5. **Environment variables** (Vercel → Settings → Environment Variables):

   | Key | Value |
   |-----|--------|
   | `REACT_APP_API_URL` | Your Render URL, e.g. `https://your-app.onrender.com` (no trailing slash) |

   Optional: `REACT_APP_WS_URL` — if not set, the client derives it from `REACT_APP_API_URL` (e.g. `https://…` → `wss://…` on the same host).

6. Deploy. Your app URL is the Vercel URL (e.g. `https://your-app.vercel.app`).

## 4. After deployment

- Set **Render** `CLIENT_URL` to your **Vercel** URL.
- In **Stripe** (if using live mode), set the success/cancel URLs to your Vercel URLs (or the server uses `CLIENT_URL` automatically).

## Troubleshooting

- **CORS errors**: Ensure `CLIENT_URL` on Render is exactly your Vercel URL (no trailing slash).
- **WebSocket fails**: Server runs HTTP and WebSocket on the same port. Use `REACT_APP_API_URL` (and optionally `REACT_APP_WS_URL`) pointing to the Render URL; the client will use `wss://` on that host.
- **DB connection errors**: Use Supabase **Connection pooling** URI (port 6543) and `DATABASE_URL` with SSL (the app already enables SSL for `DATABASE_URL`).
