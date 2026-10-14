# こんにちは! Welcome to my cv website. I created it as part of Udemy's 2020 Web Development boot camp by Angela Yu. I came back to this website to use as a reference; it brought back so many memories😂.Even though I put in a lot of effort to build it , it wasn't going to showcase my skills as a developer. So I ghiblified it! hehe.
# This website is inspired by my favourite programmer - Angela Yu and modeled after Sean halphin's website. 

## Running it locally

The site is a Next.js app (App Router, TypeScript, plain CSS).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

- Pages live in `app/` (one folder per route), shared pieces in `components/`.
- Projects, skills, interests, notes and marshmallows (hobbies) are edited from the admin dashboard at `/admin` and stored in Supabase. Everything else (mentors, links, chess) is in `lib/data.ts`, which is also the fallback content when Supabase isn't set up.
- Styles are in `app/globals.css`. Images go in `public/`.
- Old `.html` links (like `/projects.html`) redirect to the new routes, set in `next.config.ts`.

## Admin dashboard (Supabase)

One-time setup:

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run `supabase/schema.sql`. It creates the tables, the `media` image bucket, and copies in the current site content.
3. Authentication → Users → **Add user** with Eseoghene's email and a password. Then in the SQL editor:
   `insert into public.admins (email) values ('her@email.com');`
4. Turn off public sign-ups (Authentication → Sign In / Providers → "Allow new users to sign up").
5. Copy `.env.example` to `.env.local` and fill in the URL and publishable key from Project Settings → API. Add the same two variables in Vercel.

Then sign in at `/admin`. Changes show up on the site right after saving.
