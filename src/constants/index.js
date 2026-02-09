import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "experience",
    title: "Experience",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "education",
    title: "Education",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [];

const technologies = [
  { name: "C", icon: backend },
  { name: "JavaScript", icon: javascript },
  { name: "HTML", icon: html },
  { name: "CSS", icon: css },
  { name: "SQL", icon: backend },
  { name: "React.js", icon: reactjs },
  { name: "Node.js", icon: nodejs },
  { name: "Express.js", icon: backend },
  { name: "MongoDB", icon: mongodb },
  { name: "MySQL", icon: backend },
  { name: "Git", icon: git },
  { name: "Postman", icon: backend },
  { name: "VS Code", icon: backend },
];

const experiences = [
  {
    title: "Web Developer Intern",
    company_name: "Daylink Tech Labs Pvt. Ltd.",
    icon: meta,
    iconBg: "#383E56",
    date: "Dec 2025 - Mar 2026",
    points: [
      "Next.js frontend development",
      "REST API development using Node.js & Express",
      "MongoDB schema design",
      "Authentication & authorization",
      "Git/GitHub collaboration",
    ],
  },
  {
    title: "MERN Stack Intern",
    company_name: "Livewire, Kasaragod",
    icon: shopify,
    iconBg: "#E6DEDD",
    date: "May 2025 - Jun 2025",
    points: [
      "Built a travel booking website (MERN)",
      "User authentication & role-based access",
      "Admin panel & booking system",
      "Deployed on Render",
    ],
  },
];

const testimonials = [];

const projects = [
  {
    name: "Smart Helmet — IoT Safety System",
    description:
      "IoT-based rider safety helmet with alcohol and accident detection using ESP32/Arduino and sensors.",
    tags: [
      { name: "IoT", color: "blue-text-gradient" },
      { name: "ESP32", color: "green-text-gradient" },
    ],
    image: carrent,
    source_code_link: "https://github.com/Bhavishbk",
  },
  {
    name: "Travel Booking Website",
    description:
      "MERN stack application with user authentication, bookings and admin panel. Deployed on Render.",
    tags: [
      { name: "MERN", color: "blue-text-gradient" },
      { name: "Auth", color: "green-text-gradient" },
    ],
    image: jobit,
    source_code_link: "https://github.com/Bhavishbk",
  },
  {
    name: "Candle Booking Website",
    description:
      "MERN stack project with JWT authentication, booking system and admin access. Uses MongoDB Atlas and Render.",
    tags: [
      { name: "MERN", color: "blue-text-gradient" },
      { name: "JWT", color: "green-text-gradient" },
    ],
    image: tripguide,
    source_code_link: "https://github.com/Bhavishbk",
  },
];

export { services, technologies, experiences, testimonials, projects };
