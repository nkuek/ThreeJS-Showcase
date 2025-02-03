import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import ParticleFlowFieldCanvasContent from "./components/ParticleFlowFieldCanvasContent";
import { Loader } from "@react-three/drei";
import LevaWrapper from "~/components/general/LevaWrapper";

export default function ParticleFlowField() {
  return (
    <div className="h-svh bg-black">
      <Canvas>
        <Suspense fallback={null}>
          <ParticleFlowFieldCanvasContent />
        </Suspense>
      </Canvas>
      <Loader />
      <LevaWrapper collapsed={false} />
    </div>
  );
}
