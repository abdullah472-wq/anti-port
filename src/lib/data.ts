import { NavItem, Stat, TimelineItem, SkillCategory, Project, BlogPost, ContactInfo } from "@/types";

export const PERSONAL_INFO = {
  name: "Abdullah",
  title: "Frontend Developer",
  tagline: "I craft fast, beautiful, and accessible web experiences.",
  whatsapp: "01581818368",
  whatsappLink: "https://wa.me/8801581818368",
  location: "College Road, Kapasia-1730, Gazipur, Dhaka, Bangladesh",
  github: "https://github.com/abdullah472-wq",
  linkedin: "https://linkedin.com/in/abdullah",
  facebook: "https://www.facebook.com/share/18BSa9YpyK/",
  telegram: "https://t.me/abdullahbd427",
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
  { id: "websites", label: "Websites Built", value: "30+", icon: "Globe", color: "purple" },
  { id: "clients", label: "Happy Clients", value: "30+", icon: "Users", color: "orange" },
];

export const TIMELINE: TimelineItem[] = [
  { id: "1", year: "2021", title: "The Journey Begins", description: "Started learning web development fundamentals (HTML, CSS, JS) and fell in love with frontend.", icon: "Rocket" },
  { id: "2", year: "2022", title: "React & Next.js", description: "Mastered React ecosystem and built dynamic web applications with modern frameworks.", icon: "Layers" },
  { id: "3", year: "2023", title: "UI/UX Excellence", description: "Focused on creating pixel-perfect, accessible, and performant user interfaces.", icon: "Award" },
  { id: "4", year: "2024", title: "Senior Frontend Dev", description: "Leading frontend projects with clean code, best practices, and high-performance solutions.", icon: "Award" },
];

export const SKILLS: SkillCategory[] = [
  {
    id: "core-frontend",
    title: "Core Frontend",
    color: "blue",
    gradient: "from-blue-500 to-cyan-500",
    skills: [
      { name: "React / Next.js", icon: "⚛️", percentage: 95 },
      { name: "TypeScript", icon: "📘", percentage: 85 },
      { name: "Tailwind CSS", icon: "🎨", percentage: 95 },
      { name: "Core Web Vitals", icon: "⚡", percentage: 90 },
    ],
  },
  {
    id: "ui-motion",
    title: "UI & Animation",
    color: "purple",
    gradient: "from-purple-500 to-pink-500",
    skills: [
      { name: "Framer Motion", icon: "🎭", percentage: 90 },
      { name: "GSAP", icon: "🎬", percentage: 80 },
      { name: "CSS Animations", icon: "✨", percentage: 95 },
      { name: "Storybook", icon: "📚", percentage: 75 },
    ],
  },
  {
    id: "accessibility",
    title: "A11y & Engineering",
    color: "orange",
    gradient: "from-orange-500 to-red-500",
    skills: [
      { name: "Web Accessibility", icon: "♿", percentage: 90 },
      { name: "Git / GitHub", icon: "🔀", percentage: 85 },
      { name: "VS Code / Cursor", icon: "💻", percentage: 95 },
      { name: "Flutter", icon: "📱", percentage: 85 },
    ],
  },
  {
    id: "familiar-with",
    title: "Familiar With",
    color: "green",
    gradient: "from-green-500 to-emerald-500",
    skills: [
      { name: "Node.js", icon: "🟢", percentage: 80 },
      { name: "Express", icon: "🚂", percentage: 75 },
      { name: "MongoDB", icon: "🍃", percentage: 70 },
      { name: "PostgreSQL", icon: "🐘", percentage: 65 },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "E-commerce Mobile App",
    description: "A full-featured shopping app with real-time updates and highly accessible UI components.",
    image: "/projects/p1.png",
    category: "Mobile",
    tech: ["Flutter", "Firebase", "Stripe"],
    featured: true,
    githubUrl: "#",
    liveUrl: "#",
    lighthouseScore: 96,
    loadTime: "1.4s",
    mobileResponsive: true,
  },
  {
    id: "p2",
    title: "Modern SaaS Dashboard",
    description: "Collaborative project management tool featuring high-performance dynamic routing and accessible charts.",
    image: "/projects/p2.png",
    category: "Web",
    tech: ["Next.js", "Framer Motion", "Tailwind", "Radix UI"],
    featured: true,
    githubUrl: "#",
    liveUrl: "#",
    lighthouseScore: 98,
    loadTime: "0.8s",
    mobileResponsive: true,
  },
  {
    id: "p3",
    title: "Frontend Fintech Portal",
    description: "Secure, performant and highly responsive banking frontend with GSAP animations.",
    image: "/projects/p3.png",
    category: "Web",
    tech: ["React", "GSAP", "TypeScript"],
    githubUrl: "#",
    liveUrl: "#",
    lighthouseScore: 95,
    loadTime: "1.2s",
    mobileResponsive: true,
  },
  {
    id: "p4",
    title: "Weather App",
    description: "Dynamic weather forecasting application with micro-animations and offline support.",
    image: "/projects/p4.png",
    category: "Mobile",
    tech: ["Flutter", "Riverpod", "OpenWeather API"],
    githubUrl: "#",
    liveUrl: "#",
    lighthouseScore: 100,
    loadTime: "0.9s",
    mobileResponsive: true,
  },
  {
    id: "p5",
    title: "Portfolio Website",
    description: "Modern 3D portfolio with immersive graphics, smooth animations, and top-tier core web vitals.",
    image: "/projects/p5.png",
    category: "Web",
    tech: ["Next.js", "Three.js", "Framer Motion"],
    githubUrl: "#",
    liveUrl: "#",
    lighthouseScore: 100,
    loadTime: "0.6s",
    mobileResponsive: true,
  },
  {
    id: "p6",
    title: "Real-time Collaboration Canvas",
    description: "Highly interactive frontend canvas with optimistic UI updates and accessibility controls.",
    image: "/projects/p6.png",
    category: "Web",
    tech: ["React", "Zustand", "Socket.io", "A11y"],
    githubUrl: "#",
    liveUrl: "#",
    lighthouseScore: 94,
    loadTime: "1.5s",
    mobileResponsive: true,
  },
];

export const TESTIMONIALS = [
  {
    id: "t1",
    name: "Sarah Jenkins",
    role: "Product Manager",
    country: "USA",
    flag: "🇺🇸",
    text: "Abdullah translated our complex Figma designs into pixel-perfect, accessible React components. The performance gains were incredible and our Lighthouse score jumped to 98. Highly recommended!",
    rating: 5,
  },
  {
    id: "t2",
    name: "Ahmed Al-Fayed",
    role: "Startup Founder",
    country: "UAE",
    flag: "🇦🇪",
    text: "Working with Abdullah was a breeze. We needed a UI with complex GSAP animations and Next.js SEO optimization. He delivered flawlessly, keeping load times under 1 second.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Elena Rossi",
    role: "Lead Designer",
    country: "Italy",
    flag: "🇮🇹",
    text: "Finally, a developer who understands design! Abdullah integrated Framer Motion so smoothly that our website feels alive. His attention to Web Accessibility is a major bonus.",
    rating: 5,
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
  address: " Gazipur, Dhaka, Bangladesh",
};
