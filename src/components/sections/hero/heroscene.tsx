import dynamic from "next/dynamic";

const SceneCanvas = dynamic(() => import("@/components/three/scenecanvas"), {
  ssr: false,
});

export default function HeroScene() {
  return (
    <div className="relative h-[520px] w-full lg:h-[600px]">
      <SceneCanvas />
    </div>
  );
}