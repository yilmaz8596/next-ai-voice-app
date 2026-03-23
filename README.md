# Voxio — AI Voice Studio

A full-stack AI-powered text-to-speech web application that lets users convert text into natural-sounding speech, clone their own voice, and manage audio projects — all in a clean, modern interface.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green)

---

## Features

- **Text-to-Speech Generation** — Convert text into lifelike audio using the Chatterbox Multilingual TTS model running on a serverless GPU (Modal + NVIDIA L4).
- **Voice Cloning** — Upload your own voice sample to clone your voice and use it for speech synthesis.
- **Multi-language Support** — Generate speech in multiple languages with natural intonation.
- **Tunable Parameters** — Fine-tune output with `exaggeration` and `cfg_weight` controls.
- **Audio History** — Browse and replay all previously generated audio projects from your dashboard.
- **Credit System** — New users receive 10 free credits. Credits are consumed at a rate of 1 per 100 characters.
- **Payments** — Purchase credit top-ups via [Polar.sh](https://polar.sh) with three tiers.
- **Authentication** — Email/password and GitHub OAuth via [Better Auth](https://better-auth.com).

---

## Tech Stack

| Layer     | Technology                                           |
| --------- | ---------------------------------------------------- |
| Framework | Next.js 16 (App Router)                              |
| Language  | TypeScript 5                                         |
| Styling   | Tailwind CSS v4, Radix UI, shadcn/ui                 |
| Auth      | Better Auth (email + GitHub OAuth)                   |
| Database  | PostgreSQL (Neon Serverless) + Drizzle ORM           |
| Storage   | AWS S3                                               |
| AI / ML   | Modal (serverless GPU) + Chatterbox Multilingual TTS |
| Payments  | Polar.sh                                             |
| Forms     | React Hook Form + Zod                                |

---

## Pricing / Credits

| Plan     | Credits     | Product ID   |
| -------- | ----------- | ------------ |
| Beginner | 50 credits  | via Polar.sh |
| Pro      | 150 credits | via Polar.sh |
| Custom   | 250 credits | via Polar.sh |

New accounts start with **10 free credits**.

---

## Project Structure

```
src/
├── actions/          # Server actions (TTS generation, voice uploads)
├── app/              # Next.js App Router pages & layouts
│   ├── (auth)/       # Sign-in / sign-up pages
│   ├── (dashboard)/  # Main dashboard & upgrade page
│   ├── (success)/    # Post-checkout success page
│   └── api/auth/     # Better Auth API route handler
├── components/       # UI components (sidebar, create panel, landing page)
├── db/schema.ts      # Drizzle ORM schema
├── lib/              # Auth config, utility functions
└── types/            # Shared TypeScript types

backend/
└── text-to-speech/
    └── tts.py        # Modal serverless TTS app (Chatterbox model on GPU)
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- A PostgreSQL database (e.g., [Neon](https://neon.tech))
- An [AWS S3](https://aws.amazon.com/s3/) bucket
- A [Modal](https://modal.com) account with the TTS backend deployed
- A [Polar.sh](https://polar.sh) account for payments

### 1. Clone the repository

```bash
git clone https://github.com/your-username/voxio-ai-voice-studio.git
cd voxio-ai-voice-studio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database (PostgreSQL / Neon)
DATABASE_URL=postgresql://user:password@host/dbname

# Better Auth
BETTER_AUTH_SECRET=your_better_auth_secret

# GitHub OAuth (optional)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# AWS S3
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=your_bucket_name
AWS_S3_BUCKET_URL=https://your_bucket_name.s3.amazonaws.com

# Modal (TTS API)
MODAL_API_URL=https://your-modal-endpoint.modal.run
MODAL_API_KEY=your_modal_api_key
MODAL_API_SECRET=your_modal_api_secret

# Polar.sh (Payments)
POLAR_ACCESS_TOKEN=your_polar_access_token
POLAR_WEBHOOK_SECRET=your_polar_webhook_secret
```

### 4. Push the database schema

```bash
npx drizzle-kit push
```

### 5. Deploy the TTS backend to Modal

```bash
pip install modal
modal deploy backend/text-to-speech/tts.py
```

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Scripts

| Command                  | Description                         |
| ------------------------ | ----------------------------------- |
| `npm run dev`            | Start the development server        |
| `npm run build`          | Build for production                |
| `npm run start`          | Start the production server         |
| `npm run lint`           | Run ESLint                          |
| `npx drizzle-kit push`   | Push schema changes to the database |
| `npx drizzle-kit studio` | Open Drizzle Studio (DB GUI)        |

---

## Docker

The repo ships with a `Dockerfile` (multi-stage, production build) and a `docker-compose.yml` that runs the Next.js app together with a local PostgreSQL database.

### Architecture

```
Browser
  └──► Next.js app  (Docker, port 3000)
          ├──► PostgreSQL  (Docker, port 5432)   ← internal: db:5432
          └──► Modal cloud (HTTPS)               ← MODAL_API_URL
```

The Python TTS backend runs on **Modal's serverless GPU infrastructure** — it is not part of docker-compose. The Next.js container calls it over HTTPS directly. Deploy it once with:

```bash
pip install modal
modal deploy backend/text-to-speech/tts.py
```

### Run with Docker Compose

Make sure your `.env` file is present in the project root (see [Environment Variables](#3-configure-environment-variables) above), then:

```bash
docker compose up --build
```

- App: [http://localhost:3000](http://localhost:3000)
- Postgres: `localhost:5432`

The `DATABASE_URL` in docker-compose is automatically overridden to point to the `db` service (`db:5432`) instead of the external Neon URL, so the local Postgres container is used when running via Docker.

To stop and remove containers:

```bash
docker compose down
```

To also delete the database volume:

```bash
docker compose down -v
```

---

## Deployment

The recommended way to deploy the Next.js app is [Vercel](https://vercel.com). Set all environment variables from the `.env` section in your Vercel project settings.

The TTS backend runs on [Modal](https://modal.com) and scales automatically, so no separate server infrastructure is needed.

---

## License

MIT
