import type { IconType } from "react-icons";
import {
  FaBookOpen,
  FaBrain,
  FaChartBar,
  FaChartLine,
  FaChess,
  FaChessBoard,
  FaChessKnight,
  FaCloud,
  FaCode,
  FaDribbble,
  FaFilm,
  FaFutbol,
  FaGithub,
  FaGlobe,
  FaHeart,
  FaInstagram,
  FaJs,
  FaLinkedin,
  FaMugHot,
  FaPython,
  FaReact,
  FaRobot,
  FaStar,
  FaTwitter,
  FaUtensils,
  FaWind,
  FaYoutube,
} from "react-icons/fa6";

export type Social = { label: string; href: string; icon: IconType };

export const navLinks = [
  { href: "/", label: "Me" },
  { href: "/projects", label: "Projects" },
  { href: "/marshmallows", label: "Marshmallows" },
  { href: "/notes", label: "Notes" },
  { href: "/chess", label: "Chess" },
  { href: "/contact", label: "Contact" },
];

export const socials: Social[] = [
  { label: "Instagram", href: "https://www.instagram.com/e.s.e._?utm_source=qr&igsh=NjRpam5vNnNveTMw", icon: FaInstagram },
  { label: "GitHub", href: "https://github.com/Eseoghene-ChristineOtuaga", icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/eseoghene-christine-otuaga-ba1337378", icon: FaLinkedin },
  { label: "Chess.com", href: "https://www.chess.com/member/mhizdar", icon: FaChess },
];

export const chessProfile = "https://www.chess.com/member/mhizdar";

export const interests = [
  { label: "Chess Player", icon: FaChess },
  { label: "Foodie", icon: FaMugHot },
  { label: "Marshmallow Lover", icon: FaHeart },
  { label: "Anime Watcher", icon: FaFilm },
];

export const skills = [
  {
    title: "AI & Machine Learning",
    icon: FaRobot,
    text: "Building intelligent systems, working with LLMs, and applying machine learning to real-world problems.",
    pills: ["Python", "TensorFlow", "Gemini API", "Prompt Engineering"],
  },
  {
    title: "Web Development",
    icon: FaCode,
    text: "Crafting responsive, interactive web experiences from clean HTML/CSS to dynamic React applications.",
    pills: ["HTML & CSS", "JavaScript", "React", "Streamlit"],
  },
  {
    title: "Data Analysis",
    icon: FaChartBar,
    text: "Turning raw numbers into clear stories — using data to discover insights and drive smarter decisions.",
    pills: ["Pandas", "NumPy", "Matplotlib", "SQL"],
  },
  {
    title: "Problem Solving",
    icon: FaChessBoard,
    text: "Chess taught me to think several moves ahead. I bring that same strategic patience to every coding challenge.",
    pills: ["Algorithms", "Data Structures", "Systems Thinking"],
  },
];

export const workflow = [
  { label: "Python", tip: "Write logic & data pipelines", icon: FaPython, className: "wf-py" },
  { label: "Gemini API", tip: "Add AI reasoning", icon: FaBrain, className: "wf-gemini" },
  { label: "Streamlit", tip: "Prototype fast", icon: FaChartLine, className: "wf-sl" },
  { label: "React", tip: "Build the real UI", icon: FaReact, className: "wf-react" },
  { label: "JavaScript", tip: "Bring it to life", icon: FaJs, className: "wf-js" },
  { label: "GitHub", tip: "Version & collaborate", icon: FaGithub, className: "wf-gh" },
  { label: "Vercel", tip: "Ship it to the world", icon: FaWind, className: "wf-vercel" },
];

export type Project = {
  title: string;
  text: string;
  tags: string[];
  cover: string;
  image?: { src: string; alt: string };
  href?: string;
  status?: string;
};

export const projects: Project[] = [
  {
    title: "Naira Financial Tracker",
    text: "A web app to track expenses, visualise spending patterns, and manage budgets — built with a great team.",
    tags: ["Python", "Streamlit", "Team Project"],
    cover: "Expense Tracker",
    href: "https://exp-nodatabase.streamlit.app/#naira-ghibli-financial-tracker",
  },
  {
    title: "Day Weaver",
    text: "A smart task management app with AI-powered daily planning suggestions that learns from your habits.",
    tags: ["Gemini", "React", "Vercel"],
    cover: "Day Weaver",
    image: { src: "/dayweaver.png", alt: "Day Weaver app screenshot" },
    href: "https://day-weaver-pi.vercel.app/",
  },
  {
    title: "Chess Game Analytics",
    text: "A platform that analyses chess games and surfaces insights to sharpen your strategy over time.",
    tags: ["JavaScript", "Data Viz", "Chess API"],
    cover: "Chess Analytics — Coming Soon",
    status: "In Progress",
  },
];

export type Note = {
  title: string;
  text: string;
  cover: string;
  date: string;
  href?: string;
};

export const notes: Note[] = [
  {
    title: "My Mentors & Guides",
    text: "Reflections on the people who shaped my journey through tech and life.",
    cover: "Mentors",
    date: "Published: September 16th, 2025",
    href: "/notes/mentors-and-guides",
  },
  {
    title: "Building with AI",
    text: "How I collaborated with AI to build this website and what I learned along the way.",
    cover: "Building with AI",
    date: "Coming soon",
  },
  {
    title: "Chess Strategies for Developers",
    text: "Applying chess thinking patterns to programming and problem solving.",
    cover: "Chess & Code",
    date: "Coming soon",
  },
];

export const hobbies = [
  {
    title: "Marshmallows",
    icon: FaCloud,
    special: true,
    text: "I absolutely LOVE marshmallows! There's something magical about their soft, fluffy texture and sweet taste. Though they're hard to find in Nigeria, the hunt makes them even more special.",
    tags: ["Soft & Fluffy", "Sweet Tooth", "Rare Find"],
  },
  {
    title: "Reading",
    icon: FaBookOpen,
    text: "Getting lost in a good book is one of my favourite escapes. I enjoy both fiction and non-fiction, with a particular love for fantasy novels and tech books.",
    tags: ["Fantasy", "Tech Books", "Non-fiction"],
  },
  {
    title: "Football Games",
    icon: FaFutbol,
    text: "Huge football fan! I love watching matches and playing Dream League Soccer (DLS) — I can spend hours building my dream team and competing online.",
    tags: ["DLS", "Watching Matches", "Fan"],
  },
  {
    title: "Anime & Ghibli",
    icon: FaStar,
    text: "Studio Ghibli shaped the way I see creativity. The warmth, the detail, the magic in everyday things — that's the energy I try to bring into everything I build.",
    tags: ["Studio Ghibli", "Anime", "Storytelling"],
  },
  {
    title: "Food & Cooking",
    icon: FaUtensils,
    text: "Self-proclaimed foodie who loves exploring cuisines. From Nigerian classics to international dishes — good food is one of life's greatest joys.",
    tags: ["Nigerian Food", "Exploring Cuisines", "Foodie"],
  },
  {
    title: "Chess",
    icon: FaChessKnight,
    text: "Chess isn't just a game — it's a mindset. Planning ahead, adapting under pressure, staying calm when things get complicated. Sound familiar? It's basically debugging.",
    tags: ["Strategic", "Chess.com", "Online Player"],
  },
];

export const mentors: { name: string; role: string; text: string; links: Social[] }[] = [
  {
    name: "Dr Angela Yu",
    role: "Developer & Lead Instructor",
    text: "My favourite programmer and teacher. She makes coding approachable and fun — her teaching inspires me to keep learning every single day. The way she breaks down complex topics into something joyful is a superpower I aspire to.",
    links: [
      { label: "Twitter", href: "https://twitter.com/yu_angela", icon: FaTwitter },
      { label: "LinkedIn", href: "https://linkedin.com/in/angela-yu-963a584b/", icon: FaLinkedin },
      { label: "Website", href: "https://www.appbrewery.com/", icon: FaGlobe },
      { label: "YouTube", href: "https://www.youtube.com/c/Londonappbrewery", icon: FaYoutube },
    ],
  },
  {
    name: "Sean Halpin",
    role: "Product Designer",
    text: "A product designer based in Ireland whose visual style shaped the look and feel of this very website. His work motivates me to think about design with clarity, warmth, and originality — that details matter, and that personality belongs in everything you ship.",
    links: [
      { label: "Website", href: "https://www.seanhalpin.xyz/", icon: FaGlobe },
      { label: "LinkedIn", href: "https://ie.linkedin.com/in/seanehalpin", icon: FaLinkedin },
      { label: "Dribbble", href: "https://dribbble.com/seanehalpin", icon: FaDribbble },
      { label: "GitHub", href: "https://github.com/seanehalpin", icon: FaGithub },
    ],
  },
];

export type PieceKey = "pawn" | "knight" | "bishop" | "rook" | "queen" | "king";

export const chessPieces: Record<PieceKey, { label: string; glyph: string; title: string; desc: string }> = {
  pawn: { label: "Pawn", glyph: "♟", title: "The Pawn", desc: "Methodical and persistent — you know small, consistent steps lead to great things. You start humble but have extraordinary potential." },
  knight: { label: "Knight", glyph: "♞", title: "The Knight", desc: "Creative and unpredictable — you solve problems from unexpected angles and love a challenge that others find confusing." },
  bishop: { label: "Bishop", glyph: "♝", title: "The Bishop", desc: "Strategic and focused — you think in clear lines, excel at long-term planning, and always see the bigger picture." },
  rook: { label: "Rook", glyph: "♜", title: "The Rook", desc: "Direct and powerful — you cut through complexity and tackle problems head-on with efficient, no-nonsense solutions." },
  queen: { label: "Queen", glyph: "♛", title: "The Queen", desc: "Versatile and dynamic — you adapt to any situation, juggle multiple challenges at once, and lead naturally." },
  king: { label: "King", glyph: "♚", title: "The King", desc: "Steady and strategic — you provide direction, protect what matters, and understand that patience is its own kind of power." },
};
