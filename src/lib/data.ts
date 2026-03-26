import { NavItem, Stat, TimelineItem, SkillCategory, Project, BlogPost, ContactInfo } from "@/types";

export const PERSONAL_INFO = {
  name: "Abdullah",
  title: "Frontend Developer",
  tagline: "I build modern, animated, high-performance web experiences.",
  whatsapp: "01581818368",
  whatsappLink: "https://wa.me/8801581818368",
  location: "College Road, Kapasia-1730, Gazipur, Dhaka, Bangladesh",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  facebook: "https://facebook.com",
};

export const NAV_ITEMS: NavItem[] = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Skills", href: "/#skills" },
  { name: "Projects", href: "/#projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/#contact" },
];

export const STATS: Stat[] = [
  { id: "exp", label: "Years Experience", value: "3+", icon: "Briefcase", color: "blue" },
  { id: "projects", label: "Projects Completed", value: "50+", icon: "Code2", color: "green" },
  { id: "mobile", label: "Mobile Apps Built", value: "20+", icon: "Smartphone", color: "purple" },
  { id: "clients", label: "Happy Clients", value: "30+", icon: "Users", color: "orange" },
];

export const TIMELINE: TimelineItem[] = [
  { id: "1", year: "2021", title: "The Journey Begins", description: "Started learning web development fundamentals (HTML, CSS, JS).", icon: "Rocket" },
  { id: "2", year: "2022", title: "Mobile Dev Focus", description: "Mastered Flutter and Firebase for cross-platform app development.", icon: "Smartphone" },
  { id: "3", year: "2023", title: "Full Stack Mastery", description: "Expanded to MERN stack and Next.js for scalable web apps.", icon: "Layers" },
  { id: "4", year: "2024", title: "Senior Developer", description: "Leading projects and building complex, high-performance systems.", icon: "Award" },
];

export const SKILLS: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    color: "blue",
    gradient: "from-blue-500 to-cyan-500",
    skills: [
      { name: "React", icon: "⚛️", percentage: 90 },
      { name: "Next.js", icon: "▲", percentage: 85 },
      { name: "Tailwind CSS", icon: "🎨", percentage: 90 },
      { name: "TypeScript", icon: "📘", percentage: 80 },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    color: "green",
    gradient: "from-green-500 to-emerald-500",
    skills: [
      { name: "Node.js", icon: "🟢", percentage: 85 },
      { name: "Express", icon: "🚂", percentage: 80 },
      { name: "MongoDB", icon: "🍃", percentage: 75 },
      { name: "REST API", icon: "🔌", percentage: 85 },
    ],
  },
  {
    id: "mobile",
    title: "Mobile",
    color: "purple",
    gradient: "from-purple-500 to-pink-500",
    skills: [
      { name: "Flutter", icon: "📱", percentage: 90 },
      { name: "React Native", icon: "📲", percentage: 75 },
      { name: "Firebase", icon: "🔥", percentage: 80 },
    ],
  },
  {
    id: "tools",
    title: "Tools & Others",
    color: "orange",
    gradient: "from-orange-500 to-red-500",
    skills: [
      { name: "Git", icon: "🔀", percentage: 85 },
      { name: "VS Code", icon: "💻", percentage: 90 },
      { name: "Figma", icon: "🎨", percentage: 70 },
      { name: "Docker", icon: "🐳", percentage: 65 },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "E-commerce Mobile App",
    description: "A full-featured shopping app with real-time updates and secure payments.",
    image: "/projects/p1.png",
    category: "Mobile",
    tech: ["Flutter", "Firebase", "Stripe"],
    featured: true,
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: "p2",
    title: "Task Management Web App",
    description: "Collaborative project management tool with real-time notifications.",
    image: "/projects/p2.png",
    category: "Web",
    tech: ["Next.js", "Node.js", "MongoDB", "Socket.io"],
    featured: true,
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: "p3",
    title: "Restaurant Management System",
    description: "End-to-end solution for managing orders, inventory, and staff.",
    image: "/projects/p3.png",
    category: "Full Stack",
    tech: ["React", "Express", "PostgreSQL"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: "p4",
    title: "Weather App",
    description: "Dynamic weather forecasting application using open weather data.",
    image: "/projects/p4.png",
    category: "Mobile",
    tech: ["Flutter", "OpenWeather API"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: "p5",
    title: "Portfolio Website",
    description: "Modern 3D portfolio with immersive graphics and smooth animations.",
    image: "/projects/p5.png",
    category: "Web",
    tech: ["Next.js", "Three.js", "Tailwind"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: "p6",
    title: "Chat Application",
    description: "Secure, real-time messaging app with multimedia support.",
    image: "/projects/p6.png",
    category: "Full Stack",
    tech: ["React", "Node.js", "Socket.io", "MongoDB"],
    githubUrl: "#",
    liveUrl: "#",
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "b1",
    slug: "getting-started-with-nextjs-14",
    title: "Getting Started with Next.js 14",
    excerpt: "Learn how to use the App Router and server components in the latest version of Next.js.",
    date: "March 15, 2024",
    readingTime: "5 min read",
    category: "Web Development",
    image: "/blog/b1.jpg",
  },
  {
    id: "b2",
    slug: "building-beautiful-uis-with-flutter",
    title: "Building Beautiful UIs with Flutter",
    excerpt: "Explore advanced widget techniques for creating stunning mobile interfaces.",
    date: "March 10, 2024",
    readingTime: "7 min read",
    category: "Mobile Dev",
    image: "/blog/b2.jpg",
  },
  {
    id: "b3",
    slug: "rest-api-best-practices",
    title: "REST API Best Practices",
    excerpt: "Designing scalable, maintainable, and secure APIs for modern applications.",
    date: "March 5, 2024",
    readingTime: "6 min read",
    category: "Backend",
    image: "/blog/b3.jpg",
  },
];

export const CONTACT_INFO: ContactInfo = {
  email: "contact@abdullah.dev",
  whatsapp: PERSONAL_INFO.whatsapp,
  whatsappLink: PERSONAL_INFO.whatsappLink,
  location: PERSONAL_INFO.location,
  address: "College Road, Kapasia-1730, Gazipur, Dhaka, Bangladesh",
};
