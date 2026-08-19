import Hero from "@/components/sections/hero/hero";
import Projects from "@/components/sections/projects";
import Skills from "@/components/sections/skills";
import FoundationSection from "@/components/sections/foundation/FoundationSection";
import ConnectSection from "@/components/sections/connect/ConnectSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <Skills />
      <FoundationSection />
      <ConnectSection />
    </main>
  );
}