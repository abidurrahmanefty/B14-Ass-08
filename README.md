# বাজার দর (BazarDor)

Bangla-first market price dashboard for daily essentials. Compare today’s prices, category listings, and division-wise bazar rates—with sign-in for full product details.

## Live demo

- **Live:** _(add your Vercel URL)_
- **GitHub:** _(add your repository URL)_

## Technologies

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS** + **DaisyUI**
- **Better Auth** (email/password, Google, GitHub)
- **Prisma** + **PostgreSQL**
- **react-hot-toast**

## Key features

1. **Home dashboard** — hero, price ticker, top 6 risers/fallers, and full product grid with Bengali numerals.
2. **Category browsing** — filtered products with sort (default / price low–high / high–low).
3. **Product detail (protected)** — min/max/average summary and market-wise price table.
4. **Authentication** — sign up, sign in, social login, profile and name update.
5. **Responsive UI** — mobile-friendly navbar, cards, and tables aligned with the assignment Figma.

## API

Data from [Programming Hero BazarDor API](https://openapi.programming-hero.com/api/bazardor).

## Local setup

```bash
npm install
cp .env.example .env
# Set DATABASE_URL, BETTER_AUTH_SECRET, BETTER_AUTH_URL
npx prisma db push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

Deploy on **Vercel**, set the same environment variables, and run `npx prisma db push` (or migrations) against your hosted Postgres database.
