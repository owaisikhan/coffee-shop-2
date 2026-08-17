"use client";

import { Canvas } from "@react-three/fiber";
import { CoffeeCupModel, type CupVariant } from "./CoffeeCupModel";

export default function CoffeeCupCanvas({ variant, active }: { variant: CupVariant; active: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 1.55, 3.3], fov: 32 }}
      frameloop={active ? "always" : "demand"}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.6} color="#fff4e0" />
      <directionalLight position={[2.2, 3, 2]} intensity={1.15} color="#ffd9a0" />
      <directionalLight position={[-2, 1.4, -1]} intensity={0.3} color="#cbd8ff" />
      <pointLight position={[0, 1.2, 2.4]} intensity={0.35} color="#fff7ea" />
      <CoffeeCupModel variant={variant} active={active} />
    </Canvas>
  );
}
