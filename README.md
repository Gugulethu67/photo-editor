# AI Photo Editor

An AI-powered photo editor built with Next.js 15, Tailwind CSS v4, Fabric.js, Convex and Clerk.

## Features

- Crop, resize, adjust and add text to images on a Fabric.js canvas
- AI background removal, image extension and AI editing (via ImageKit)
- Project dashboard with autosave, undo/redo and export to PNG, JPEG or WebP
- Plan-based access control with Clerk billing

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env.local` with your Clerk, Convex and ImageKit keys (for example `NEXT_PUBLIC_CONVEX_URL`, Clerk publishable/secret keys and ImageKit credentials).

3. Start Convex and the dev server:

   ```bash
   npx convex dev
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

## Theme

The UI uses a white and green (emerald) theme. Colour tokens live in `app/globals.css` under `:root`, along with the shared animation utilities (`animate-fade-up`, `animate-float`, `animate-blob`, `animate-shimmer`, `animate-pop-in`, `text-gradient`, `anim-delay-*`). All animations respect the user's `prefers-reduced-motion` setting.
