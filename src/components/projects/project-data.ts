export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  poster: string;
  link: string;
  previewThumbnail: string; // Landing page screenshot path
  github?: string;
  tags: string[];
  ambientColor: string; // RGB values for subtle background glow
  accentGlow: string; // Hex color for poster rim highlight
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "krishisetu",
    number: "01 / 04",
    title: "KrishiSetu",
    subtitle: "AI-Powered Agricultural Ecosystem",
    category: "AI & Full-Stack Platform",
    description:
      "Intelligent agricultural platform leveraging machine learning for crop disease diagnosis, real-time market price forecasting, and direct farmer-to-buyer commerce.",
    poster: "/projects/krishisetu.png",
    link: "https://krishisetu-team404.vercel.app/",
    previewThumbnail: "/ss/krishisetu.png",
    tags: ["AI & ML", "Next.js", "Python", "Computer Vision", "Tailwind CSS"],
    ambientColor: "16, 185, 129", // Soft emerald green glow
    accentGlow: "#10B981",
  },
  {
    id: "airsense",
    number: "02 / 04",
    title: "AirSense",
    subtitle: "Real-Time Environmental Intelligence & Prediction",
    category: "Deep Learning & IoT Platform",
    description:
      "Predictive air quality monitoring system powered by time-series neural networks, satellite telemetry, and real-time geospatial environmental analytics.",
    poster: "/projects/airsense.png",
    link: "https://air-sense-caywpmxxt-kkabir022007-8140s-projects.vercel.app/",
    previewThumbnail: "/ss/airsense.png",
    tags: ["Time-Series AI", "PyTorch", "React", "Mapbox GL", "FastAPI"],
    ambientColor: "14, 165, 233", // Soft cyan/blue glow
    accentGlow: "#0EA5E9",
  },
  {
    id: "securaride",
    number: "03 / 04",
    title: "SecuraRide",
    subtitle: "Autonomous Telematics & Commute Safety System",
    category: "Computer Vision & Edge Computing",
    description:
      "Real-time driver fatigue monitoring, accident detection, and edge-AI telematics system designed for vehicle safety and fleet risk management.",
    poster: "/projects/securaride.png",
    link: "https://github.com/kabir/securaride",
    previewThumbnail: "/ss/securaride.png",
    tags: ["Edge AI", "OpenCV", "TensorFlow Lite", "TypeScript", "Node.js"],
    ambientColor: "245, 158, 11", // Subtle amber and blue dual glow
    accentGlow: "#F59E0B",
  },
  {
    id: "portfolio",
    number: "04 / 04",
    title: "Cinematic Portfolio",
    subtitle: "3D Workspace & High-Performance Web Experience",
    category: "WebGL & Creative Engineering",
    description:
      "Ultra-minimal, Apple-inspired personal portfolio featuring a realistic 3D workstation model, custom physical dolly camera rig, and interactive product showcase.",
    poster: "/projects/portfolio-poster.png",
    link: "https://thekabir.co.in",
    previewThumbnail: "/ss/portfolio.png",
    tags: ["Three.js", "React Three Fiber", "Next.js", "Framer Motion", "Tailwind CSS"],
    ambientColor: "234, 179, 8", // Warm gold glow
    accentGlow: "#EAB308",
  },
];
