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
- All the content (projects, notes, hobbies, mentors, skills, links) is in `lib/data.ts`, so updating the site usually means editing that one file.
- Styles are in `app/globals.css`. Images go in `public/`.
- Old `.html` links (like `/projects.html`) redirect to the new routes, set in `next.config.ts`.
