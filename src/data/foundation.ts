export interface FoundationItem {
  id: string;
  number: string;
  year: string;
  title: string;
  subtitle: string;
  institution: string;
  period: string;
  grade?: string;
  description: string;
}

export const FOUNDATION_ITEMS: FoundationItem[] = [
  {
    id: "btech-cse",
    number: "01",
    year: "2025",
    title: "Bachelor of Technology",
    subtitle: "Computer Science (AI & Machine Learning)",
    institution: "Lovely Professional University",
    period: "2025 – Present",
    grade: "Current CGPA: 9.45",
    description:
      "Specializing in artificial intelligence, neural networks, machine learning systems, statistical computing, and high-performance software architecture.",
  },
  {
    id: "senior-secondary",
    number: "02",
    year: "2024",
    title: "Senior Secondary",
    subtitle: "Physics, Chemistry & Mathematics (PCM)",
    institution: "Senior Secondary School",
    period: "2023 – 2025",
    description:
      "Built a rigorous foundation in higher mathematics, calculus, physics principles, analytical logic, and early computer science fundamentals.",
  },
  {
    id: "secondary-school",
    number: "03",
    year: "2021",
    title: "Secondary School",
    subtitle: "General Sciences & Mathematics",
    institution: "Secondary School",
    period: "2021 – 2023",
    description:
      "Developed core computational thinking, mathematical problem-solving, and foundational algorithmic logic.",
  },
];
