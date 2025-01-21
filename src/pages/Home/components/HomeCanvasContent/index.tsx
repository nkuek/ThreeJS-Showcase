import { extend, ShaderMaterialProps, useFrame } from "@react-three/fiber";
import vertexShader from "../../shaders/vertex.glsl";
import fragmentShader from "../../shaders/fragment.glsl";
import {
  createInstances,
  InstancedAttribute,
  shaderMaterial,
} from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { useControls } from "leva";

type LavaLampShaderMaterialUniforms = {
  uTime: number;
  uColor?: THREE.Color | string;
};

const LavaLampShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color("white"),
    uOffset: 0,
  },
  vertexShader,
  fragmentShader
);

type BlobInstance = {
  aRandomness: number;
  aPosition: [number, number, number];
  aScale: number;
  aOffset: number;
};

extend({ LavaLampShaderMaterial });

export default function HomeCanvasContent() {
  const meshRef = useRef<THREE.InstancedMesh | null>(null);

  const [BlobInstances, BlobInstance] = createInstances<BlobInstance>();

  const { color } = useControls({
    color: {
      value: "white",
    },
  });
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const material = meshRef.current.material as THREE.ShaderMaterial;
    material.uniforms.uTime.value = clock.getElapsedTime();
  });
  return (
    <group>
      <BlobInstances limit={10} range={10} ref={meshRef}>
        <icosahedronGeometry args={[1, 128]} />
        <lavaLampShaderMaterial
          key={LavaLampShaderMaterial.key}
          uTime={0}
          uColor={new THREE.Color(color)}
        />
        {Array.from({ length: 10 }).map((_, index) => (
          <BlobInstance
            key={index}
            aPosition={[Math.random() * 10 - 5, 0, Math.random() * 6 - 3]}
            aRandomness={Math.random() * 2 + 1}
            aScale={Math.random() * 0.5 + 0.5}
            aOffset={Math.random() * 4}
          />
        ))}
        <InstancedAttribute name="aRandomness" defaultValue={3} />
        <InstancedAttribute name="aPosition" defaultValue={[0, 0, 0]} />
        <InstancedAttribute name="aScale" defaultValue={1} />
        <InstancedAttribute name="aOffset" defaultValue={1} />
      </BlobInstances>
    </group>
  );
}

// unfortunately, we have to extend the ThreeElements interface in order to use it without any type errors
// https://r3f.docs.pmnd.rs/tutorials/typescript#extending-threeelements
declare module "@react-three/fiber" {
  interface ThreeElements {
    lavaLampShaderMaterial: LavaLampShaderMaterialUniforms &
      ShaderMaterialProps;
  }
}