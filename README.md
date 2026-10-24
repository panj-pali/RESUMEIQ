# ResumeIQ

ResumeIQ consists of a Vite/React frontend and an Express API. Deploy them as
two Vercel projects from this repository so the API can use its own environment
variables and serverless functions.

## Deploy to Vercel

### 1. Deploy the frontend

Create a Vercel project for this repository with **Root Directory** set to
`frontend`. Use the Vite preset, the `npm run build` build command, and `dist`
as the output directory. The `frontend/vercel.json` rewrite sends client-side
routes back to the SPA entry point.

The frontend's Vercel rewrite proxies `/api/*` requests to the API deployment,
so browser requests and authentication cookies stay on the frontend origin.

### 2. Deploy the API

Create a second Vercel project for the same repository with **Root Directory**
set to `Backend` and the **Other** framework preset. Leave the build command
and output directory unset so Vercel deploys `Backend/api/[...path].js` as a
serverless function. Add these project environment variables for Production
(and Preview if you use preview deployments):

| Variable | Value |
| --- | --- |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | A long, random secret used to sign auth tokens |
| `GOOGLE_GENAI_API_KEY` | Google GenAI API key |
| `FRONTEND_URL` | Frontend origin, such as `https://your-app.vercel.app` (comma-separated origins are supported) |
| `PUPPETEER_SKIP_DOWNLOAD` | `true` (the Vercel Chromium binary is supplied by `@sparticuz/chromium`) |

Deploy the API and copy its deployment URL. Configure MongoDB network access
to permit connections from the API deployment, following your database
provider's guidance.

### 3. Connect the frontend and API

The frontend Vercel rewrite targets
`https://resumeiq-mqsl.vercel.app`. If you use a different API deployment,
update that destination in `frontend/vercel.json` and redeploy the frontend.
If the frontend's final domain differs from the origin used when deploying the
API, update `FRONTEND_URL` in the API project and redeploy the API.

Verify that the API function responds at
`https://your-api.vercel.app/api/health`. Database-backed endpoints return
HTTP 503 with a clear setup message when the database is unavailable; check
the API function logs for the underlying connection error. Authentication
uses secure, HTTP-only cookies in production. Resume uploads are limited to 4
MB on Vercel to stay within the platform's request-size limit.

## Local development

Copy `Backend/.env.example` to `Backend/.env` and fill in the required
credentials. The Vite development server proxies `/api/*` to
`http://localhost:3100`.

Install dependencies and run each app in a separate terminal:

```text
cd Backend
npm install
npm run dev
```

```text
cd frontend
npm install
npm run dev
```

Do not commit `.env` files or production secrets. Both project directories
include Vercel and environment-file entries in their `.gitignore`.
