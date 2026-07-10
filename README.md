# Skill Swap (ExchangeN) — Frontend

A platform where users trade skills with each other — offer what you know, find someone who can teach you what you don't. Built with Next.js.

Live app: https://frontend-green-three-51.vercel.app
Backend API: https://skill-swap-backend-30a3.onrender.com ([repo](https://github.com/YashiBuildss/skill-swap-backend))

## Features

- Signup/login
- Browse skill-matching listings and posts
- Editable profile with photo upload
- Real-time 1:1 chat — text, file, and voice messages, typing indicators, online status
- Audio/video calling via WebRTC
- Contact and about pages

## Tech stack

- **Next.js 15** (App Router) + **React 19**
- **Tailwind CSS 4**
- **Socket.io client** — real-time chat, presence, call signaling
- **Formik + Yup** — forms and validation
- **Framer Motion** — animations

## Local setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Requires the [backend](https://github.com/YashiBuildss/skill-swap-backend) running locally (or pointed at a deployed instance) via the env var below.

### Environment variables

Create `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Point this at your backend's URL — locally or deployed.

## Deployment

Deployed on [Vercel](https://vercel.com). `NEXT_PUBLIC_API_URL` is set in the Vercel project's Production environment to the live backend URL. Deploy with:

```bash
vercel --prod
```
