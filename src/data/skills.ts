export type SkillCategory =
  | "Language"
  | "Frontend"
  | "Backend"
  | "Database"
  | "ML/Data Science"
  | "Tooling"
  | "Deployment";

export interface Skill {
  id: string;          // matches filename stem, used as React key
  name: string;         // display name
  icon: string;         // path under /public
  category: SkillCategory;
  description: string;  // shown in the info panel
  docUrl: string;       // official documentation URL
}

export const skills: Skill[] = [
  { id: "python", name: "Python", icon: "/skills/python-original.svg", category: "Language", description: "Primary language for ML pipelines and backend services.", docUrl: "https://docs.python.org/3/" },
  { id: "javascript", name: "JavaScript", icon: "/skills/javascript-original.svg", category: "Language", description: "Core language for interactive frontend work.", docUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { id: "typescript", name: "TypeScript", icon: "/skills/typescript-original.svg", category: "Language", description: "Typed JavaScript used across all frontend projects.", docUrl: "https://www.typescriptlang.org/docs/" },
  { id: "c", name: "C", icon: "/skills/c-original.svg", category: "Language", description: "Foundational systems programming language.", docUrl: "https://en.cppreference.com/w/c" },
  { id: "cplusplus", name: "C++", icon: "/skills/cplusplus-original.svg", category: "Language", description: "Used for performance-critical and embedded work.", docUrl: "https://en.cppreference.com/w/cpp" },
  { id: "html5", name: "HTML5", icon: "/skills/html5-original.svg", category: "Frontend", description: "Semantic markup foundation for every web project.", docUrl: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { id: "css3", name: "CSS3", icon: "/skills/css3-original.svg", category: "Frontend", description: "Styling foundation, paired with Tailwind for velocity.", docUrl: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { id: "react", name: "React", icon: "/skills/react-original.svg", category: "Frontend", description: "Primary UI library for building interactive interfaces.", docUrl: "https://react.dev/" },
  { id: "nextjs", name: "Next.js", icon: "/skills/nextjs-original.svg", category: "Frontend", description: "React framework powering this portfolio itself.", docUrl: "https://nextjs.org/docs" },
  { id: "tailwindcss", name: "Tailwind CSS", icon: "/skills/tailwindcss-original.svg", category: "Frontend", description: "Utility-first styling for fast, consistent UI work.", docUrl: "https://tailwindcss.com/docs" },
  { id: "nodejs", name: "Node.js", icon: "/skills/nodejs-original.svg", category: "Backend", description: "JavaScript runtime for backend services and tooling.", docUrl: "https://nodejs.org/en/docs/" },
  { id: "fastapi", name: "FastAPI", icon: "/skills/fastapi-original.svg", category: "Backend", description: "Python framework for building fast ML-backed APIs.", docUrl: "https://fastapi.tiangolo.com/" },
  { id: "postgresql", name: "PostgreSQL", icon: "/skills/postgresql-original.svg", category: "Database", description: "Relational database for structured application data.", docUrl: "https://www.postgresql.org/docs/" },
  { id: "supabase", name: "Supabase", icon: "/skills/supabase-original.svg", category: "Database", description: "Backend-as-a-service for auth, storage, and Postgres.", docUrl: "https://supabase.com/docs" },
  { id: "numpy", name: "NumPy", icon: "/skills/numpy-original.svg", category: "ML/Data Science", description: "Numerical computing foundation for data pipelines.", docUrl: "https://numpy.org/doc/" },
  { id: "pandas", name: "Pandas", icon: "/skills/pandas-original.svg", category: "ML/Data Science", description: "Data wrangling and analysis for ML pipeline work.", docUrl: "https://pandas.pydata.org/docs/" },
  { id: "matplotlib", name: "Matplotlib", icon: "/skills/matplotlib-original.svg", category: "ML/Data Science", description: "Visualization for model results and data exploration.", docUrl: "https://matplotlib.org/stable/" },
  { id: "scikitlearn", name: "scikit-learn", icon: "/skills/scikitlearn-original.svg", category: "ML/Data Science", description: "Classical ML models for prediction pipelines.", docUrl: "https://scikit-learn.org/stable/" },
  { id: "tensorflow", name: "TensorFlow", icon: "/skills/tensorflow-original.svg", category: "ML/Data Science", description: "Deep learning framework for model training.", docUrl: "https://www.tensorflow.org/learn" },
  { id: "pytorch", name: "PyTorch", icon: "/skills/pytorch-original.svg", category: "ML/Data Science", description: "Deep learning framework for research-style model work.", docUrl: "https://pytorch.org/docs/stable/" },
  { id: "jupyter", name: "Jupyter", icon: "/skills/jupyter-original.svg", category: "Tooling", description: "Notebook environment for ML experimentation.", docUrl: "https://docs.jupyter.org/" },
  { id: "git", name: "Git", icon: "/skills/git-original.svg", category: "Tooling", description: "Version control across every project.", docUrl: "https://git-scm.com/doc" },
  { id: "github", name: "GitHub", icon: "/skills/github-original.svg", category: "Tooling", description: "Hosting, collaboration, and CI for all repos.", docUrl: "https://docs.github.com/" },
  { id: "vscode", name: "VS Code", icon: "/skills/vscode-original.svg", category: "Tooling", description: "Primary development environment.", docUrl: "https://code.visualstudio.com/docs" },
  { id: "vercel", name: "Vercel", icon: "/skills/vercel-original.svg", category: "Deployment", description: "Hosting and deployment for Next.js projects.", docUrl: "https://vercel.com/docs" },
];