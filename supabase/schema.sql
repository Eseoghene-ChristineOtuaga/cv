-- ============================================================
-- Eseoghene's CV — content tables for the admin dashboard.
-- Run once in the Supabase SQL editor (safe to re-run; seeding
-- only happens when a table is empty).
-- ============================================================

-- Who may edit. Add Eseoghene's login email here (see bottom of file).
create table if not exists public.admins (
  email text primary key
);
alter table public.admins enable row level security;
-- No policies on admins: nobody can read or change it through the API.

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admins where email = (auth.jwt() ->> 'email')
  );
$$;

-- ---------- Content tables ----------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  text text not null default '',
  tags text[] not null default '{}',
  cover text not null default '',
  image_url text,
  image_alt text,
  href text,
  status text,
  position int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  icon text not null default 'FaStar',
  text text not null default '',
  pills text[] not null default '{}',
  position int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.interests (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  icon text not null default 'FaHeart',
  position int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  text text not null default '',
  cover text not null default '',
  date text not null default '',
  href text,
  position int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.hobbies (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  icon text not null default 'FaStar',
  text text not null default '',
  tags text[] not null default '{}',
  special boolean not null default false,
  position int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- Row level security: anyone reads, only admins write ----------
do $$
declare t text;
begin
  foreach t in array array['projects', 'skills', 'interests', 'notes', 'hobbies'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "public read" on public.%I', t);
    execute format('drop policy if exists "admin write" on public.%I', t);
    execute format('create policy "public read" on public.%I for select using (true)', t);
    execute format(
      'create policy "admin write" on public.%I for all to authenticated using (public.is_admin()) with check (public.is_admin())',
      t
    );
  end loop;
end $$;

-- ---------- Storage for project images ----------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "admin upload media" on storage.objects;
drop policy if exists "admin update media" on storage.objects;
drop policy if exists "admin delete media" on storage.objects;
create policy "admin upload media" on storage.objects
  for insert to authenticated with check (bucket_id = 'media' and public.is_admin());
create policy "admin update media" on storage.objects
  for update to authenticated using (bucket_id = 'media' and public.is_admin());
create policy "admin delete media" on storage.objects
  for delete to authenticated using (bucket_id = 'media' and public.is_admin());

-- ---------- Seed with what the site shows today ----------
insert into public.projects (title, text, tags, cover, image_url, image_alt, href, status, position)
select * from (values
  ('Naira Financial Tracker',
   'A web app to track expenses, visualise spending patterns, and manage budgets — built with a great team.',
   array['Python', 'Streamlit', 'Team Project'], 'Expense Tracker', null, null,
   'https://exp-nodatabase.streamlit.app/#naira-ghibli-financial-tracker', null, 0),
  ('Day Weaver',
   'A smart task management app with AI-powered daily planning suggestions that learns from your habits.',
   array['Gemini', 'React', 'Vercel'], 'Day Weaver', '/dayweaver.png', 'Day Weaver app screenshot',
   'https://day-weaver-pi.vercel.app/', null, 1),
  ('Chess Game Analytics',
   'A platform that analyses chess games and surfaces insights to sharpen your strategy over time.',
   array['JavaScript', 'Data Viz', 'Chess API'], 'Chess Analytics — Coming Soon', null, null,
   null, 'In Progress', 2)
) v
where not exists (select 1 from public.projects);

insert into public.skills (title, icon, text, pills, position)
select * from (values
  ('AI & Machine Learning', 'FaRobot',
   'Building intelligent systems, working with LLMs, and applying machine learning to real-world problems.',
   array['Python', 'TensorFlow', 'Gemini API', 'Prompt Engineering'], 0),
  ('Web Development', 'FaCode',
   'Crafting responsive, interactive web experiences from clean HTML/CSS to dynamic React applications.',
   array['HTML & CSS', 'JavaScript', 'React', 'Streamlit'], 1),
  ('Data Analysis', 'FaChartBar',
   'Turning raw numbers into clear stories — using data to discover insights and drive smarter decisions.',
   array['Pandas', 'NumPy', 'Matplotlib', 'SQL'], 2),
  ('Problem Solving', 'FaChessBoard',
   'Chess taught me to think several moves ahead. I bring that same strategic patience to every coding challenge.',
   array['Algorithms', 'Data Structures', 'Systems Thinking'], 3)
) v
where not exists (select 1 from public.skills);

insert into public.interests (label, icon, position)
select * from (values
  ('Chess Player', 'FaChess', 0),
  ('Foodie', 'FaMugHot', 1),
  ('Marshmallow Lover', 'FaHeart', 2),
  ('Anime Watcher', 'FaFilm', 3)
) v
where not exists (select 1 from public.interests);

insert into public.notes (title, text, cover, date, href, position)
select * from (values
  ('My Mentors & Guides', 'Reflections on the people who shaped my journey through tech and life.',
   'Mentors', 'Published: September 16th, 2025', '/notes/mentors-and-guides', 0),
  ('Building with AI', 'How I collaborated with AI to build this website and what I learned along the way.',
   'Building with AI', 'Coming soon', null, 1),
  ('Chess Strategies for Developers', 'Applying chess thinking patterns to programming and problem solving.',
   'Chess & Code', 'Coming soon', null, 2)
) v
where not exists (select 1 from public.notes);

insert into public.hobbies (title, icon, text, tags, special, position)
select * from (values
  ('Marshmallows', 'FaCloud',
   'I absolutely LOVE marshmallows! There''s something magical about their soft, fluffy texture and sweet taste. Though they''re hard to find in Nigeria, the hunt makes them even more special.',
   array['Soft & Fluffy', 'Sweet Tooth', 'Rare Find'], true, 0),
  ('Reading', 'FaBookOpen',
   'Getting lost in a good book is one of my favourite escapes. I enjoy both fiction and non-fiction, with a particular love for fantasy novels and tech books.',
   array['Fantasy', 'Tech Books', 'Non-fiction'], false, 1),
  ('Football Games', 'FaFutbol',
   'Huge football fan! I love watching matches and playing Dream League Soccer (DLS) — I can spend hours building my dream team and competing online.',
   array['DLS', 'Watching Matches', 'Fan'], false, 2),
  ('Anime & Ghibli', 'FaStar',
   'Studio Ghibli shaped the way I see creativity. The warmth, the detail, the magic in everyday things — that''s the energy I try to bring into everything I build.',
   array['Studio Ghibli', 'Anime', 'Storytelling'], false, 3),
  ('Food & Cooking', 'FaUtensils',
   'Self-proclaimed foodie who loves exploring cuisines. From Nigerian classics to international dishes — good food is one of life''s greatest joys.',
   array['Nigerian Food', 'Exploring Cuisines', 'Foodie'], false, 4),
  ('Chess', 'FaChessKnight',
   'Chess isn''t just a game — it''s a mindset. Planning ahead, adapting under pressure, staying calm when things get complicated. Sound familiar? It''s basically debugging.',
   array['Strategic', 'Chess.com', 'Online Player'], false, 5)
) v
where not exists (select 1 from public.hobbies);

-- ---------- Finally: let Eseoghene in ----------
-- 1. Authentication → Users → "Add user" with her email + a password.
-- 2. Put that same email below and run this line:
-- insert into public.admins (email) values ('her-email@example.com') on conflict do nothing;
