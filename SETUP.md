# SubVerse AI — Turning On Live Integrations

The app is **fully coded** for every integration. To go from demo mode → fully
functional, you just add environment variables. Each one activates its feature
automatically (no code changes).

**Where to add them:** Vercel → your project → **Settings → Environment
Variables** → add each key for the **Production** (and Preview) environment →
then **Redeploy**.

**How to verify:** after redeploying, open `https://<your-app>.vercel.app/api/health`.
Each integration should flip to `true`.

Recommended order: **Database + Auth → OpenAI → Storage → Stripe.**

---

## 1. Database (PostgreSQL) — persist projects & users

Easiest free option is **Neon** (or Supabase).

1. Create a project at [neon.tech](https://neon.tech)
2. Copy the **connection string** (starts with `postgresql://…`, include `?sslmode=require`)
3. Add to Vercel:
   ```
   DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
   ```
4. Push the schema (from your machine, once):
   ```bash
   DATABASE_URL="<same value>" npx prisma db push
   ```
   This creates all tables from `prisma/schema.prisma`.

Verify: `/api/health` → `database_postgres: true`.

---

## 2. Authentication (Clerk) — real login/signup

1. Create an application at [clerk.com](https://clerk.com)
2. In **API Keys**, copy both keys
3. Add to Vercel:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
   CLERK_SECRET_KEY=sk_live_...
   ```
4. (Optional) enable Google/GitHub in Clerk → **SSO Connections**

The `/login` and `/signup` pages automatically switch from the demo form to
Clerk's real components, and `/dashboard` + `/admin` become protected.

Verify: `/api/health` → `auth_clerk: true`.

---

## 3. AI (OpenAI) — real transcription, translation, content

1. Create a key at [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Add billing/credits to your OpenAI account (Whisper + GPT are pay-as-you-go)
3. Add to Vercel:
   ```
   OPENAI_API_KEY=sk-...
   ```

Now uploads run real Whisper transcription, translation, and content generation.

> **Note:** Whisper's API accepts files up to **25 MB**. For larger videos,
> extract/compress audio with FFmpeg in a background worker first — the pipeline
> (`src/lib/ai/pipeline.ts`) already guards this limit with a clear error.

Verify: `/api/health` → `ai_openai: true`.

---

## 4. Storage (Cloudflare R2) — real video uploads

1. In Cloudflare → **R2** → create a bucket (e.g. `subverse-uploads`)
2. Create an **R2 API Token** (Account → R2 → Manage API Tokens)
3. Add to Vercel:
   ```
   R2_ACCOUNT_ID=...
   R2_ACCESS_KEY_ID=...
   R2_SECRET_ACCESS_KEY=...
   R2_BUCKET_NAME=subverse-uploads
   R2_PUBLIC_URL=https://pub-xxxx.r2.dev   # optional, for public files
   ```
4. Add a **CORS policy** to the bucket so the browser can PUT directly:
   ```json
   [{ "AllowedOrigins": ["https://<your-app>.vercel.app"],
      "AllowedMethods": ["PUT", "GET"],
      "AllowedHeaders": ["*"] }]
   ```

Verify: `/api/health` → `storage_r2: true`.

---

## 5. Billing (Stripe) — real subscriptions

1. In [dashboard.stripe.com](https://dashboard.stripe.com) create two **Products/Prices** (Pro, Enterprise)
2. Add to Vercel:
   ```
   STRIPE_SECRET_KEY=sk_live_...
   STRIPE_PRO_PRICE_ID=price_...
   STRIPE_ENTERPRISE_PRICE_ID=price_...
   ```
3. Create a webhook endpoint → `https://<your-app>.vercel.app/api/webhooks/stripe`
   listening for `checkout.session.completed`, `customer.subscription.*`,
   `invoice.payment_failed`. Copy its signing secret:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

Verify: `/api/health` → `billing_stripe: true`.

---

## App URL

Set this so Stripe redirects and OAuth callbacks resolve correctly:
```
NEXT_PUBLIC_APP_URL=https://<your-app>.vercel.app
```

---

## After adding keys

1. **Redeploy** (Vercel → Deployments → Redeploy, uncheck build cache)
2. Open `/api/health` and confirm the integrations you configured are `true`
3. Test the flow: sign up → upload a short clip → watch it transcribe →
   generate content → export

Any integration you leave unset simply stays in demo mode — the app never breaks.
