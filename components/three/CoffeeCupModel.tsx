"use client";

import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export type CupVariant = "cappuccino" | "americano" | "espresso" | "iced" | "batch" | "latte";

interface VariantConfig {
  liquidColor: string;
  foamColor?: string;
  foamPattern?: "spiral" | "rosette";
  scale?: number;
  cinnamon?: boolean;
  beans?: boolean;
  steam?: boolean;
  iced?: boolean;
}

const VARIANTS: Record<CupVariant, VariantConfig> = {
  cappuccino: {
    liquidColor: "#3b2314",
    foamColor: "#f3e9da",
    foamPattern: "spiral",
    cinnamon: true,
    steam: true,
  },
  americano: { liquidColor: "#2c1810", steam: true, beans: true },
  espresso: { liquidColor: "#26140b", scale: 0.72, steam: true, beans: true },
  batch: { liquidColor: "#33200f", steam: true, beans: true },
  latte: { liquidColor: "#4a2c16", foamColor: "#f6ecd9", foamPattern: "rosette", steam: true },
  iced: { liquidColor: "#3a2313", iced: true },
};

const CERAMIC = new THREE.MeshStandardMaterial({ color: "#f7f1e6", roughness: 0.35, metalness: 0.05 });
const SAUCER = new THREE.MeshStandardMaterial({ color: "#efe4d2", roughness: 0.4, metalness: 0.03 });
const CINNAMON = new THREE.MeshStandardMaterial({ color: "#8a5a2b", roughness: 0.7 });
const ICE = new THREE.MeshPhysicalMaterial({
  color: "#eaf6f7",
  transparent: true,
  opacity: 0.55,
  roughness: 0.05,
  transmission: 0.6,
  thickness: 0.3,
});
const STEAM_MATERIAL = new THREE.MeshBasicMaterial({
  color: "#fdf6ec",
  transparent: true,
  opacity: 0,
  depthWrite: false,
});

function HotCup({ variant }: { variant: CupVariant }) {
  const cfg = VARIANTS[variant];
  const scale = cfg.scale ?? 1;
  const beanRefs = useRef<(THREE.Mesh | null)[]>([]);
  const steamRefs = useRef<(THREE.Mesh | null)[]>([]);
  const beanCount = cfg.beans ? 3 : 0;
  const steamCount = cfg.steam ? 4 : 0;

  const liquidMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: cfg.liquidColor, roughness: 0.2, metalness: 0.05 }),
    [cfg.liquidColor],
  );
  const foamMat = useMemo(
    () => (cfg.foamColor ? new THREE.MeshStandardMaterial({ color: cfg.foamColor, roughness: 0.55 }) : null),
    [cfg.foamColor],
  );
  const beanMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#241206", roughness: 0.45 }), []);

  // proportions (mug-like: tall, gently tapered, not a bucket)
  const footH = 0.08;
  const footY = 0.05;
  const footTop = footY + footH / 2;
  const bodyH = 1.3;
  const bodyR0 = 0.36; // bottom radius
  const bodyR1 = 0.42; // top radius
  const bodyY = footTop + bodyH / 2;
  const rimY = footTop + bodyH;
  const liquidY = rimY - 0.02;
  const handleY = bodyY + 0.05;

  useFrame((state, delta) => {
    for (let i = 0; i < beanRefs.current.length; i++) {
      const mesh = beanRefs.current[i];
      if (!mesh) continue;
      const period = 2.6;
      const phase = i / beanCount;
      const tt = ((state.clock.elapsedTime / period) * 0.5 + phase) % 1;
      mesh.position.y = THREE.MathUtils.lerp(rimY + 0.55, liquidY + 0.02, tt);
      mesh.position.x = Math.sin(i * 2.4 + state.clock.elapsedTime * 0.6) * 0.16;
      mesh.position.z = Math.cos(i * 1.7) * 0.1;
      mesh.rotation.x += delta * 4;
      mesh.rotation.z += delta * 3;
      mesh.visible = tt < 0.94;
    }
    for (let i = 0; i < steamRefs.current.length; i++) {
      const mesh = steamRefs.current[i];
      if (!mesh) continue;
      const period = 3.4;
      const phase = i / steamCount;
      const tt = (state.clock.elapsedTime / period + phase) % 1;
      mesh.position.y = liquidY + tt * 0.85;
      mesh.position.x = Math.sin(state.clock.elapsedTime * 1.1 + i * 2) * (0.06 + tt * 0.1);
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.sin(tt * Math.PI) * 0.28;
      const s = 0.5 + tt * 1.3;
      mesh.scale.setScalar(s);
    }
  });

  return (
    <group scale={scale}>
      {/* saucer */}
      <mesh position={[0, -0.02, 0]} material={SAUCER} castShadow receiveShadow>
        <cylinderGeometry args={[0.62, 0.65, 0.06, 40]} />
      </mesh>
      {/* cup body */}
      <mesh position={[0, bodyY, 0]} material={CERAMIC} castShadow receiveShadow>
        <cylinderGeometry args={[bodyR1, bodyR0, bodyH, 36, 1, true]} />
      </mesh>
      {/* cup base */}
      <mesh position={[0, footY, 0]} material={CERAMIC}>
        <cylinderGeometry args={[bodyR0 - 0.04, bodyR0 - 0.08, footH, 36]} />
      </mesh>
      {/* rim */}
      <mesh position={[0, rimY, 0]} material={CERAMIC}>
        <torusGeometry args={[bodyR1 + 0.005, 0.018, 12, 36]} />
      </mesh>
      {/* handle: half-torus, ring plane rotated to sit flush against the cup's side wall */}
      <mesh position={[bodyR1 + 0.16, handleY, 0]} rotation={[0, Math.PI / 2, 0]} material={CERAMIC} castShadow>
        <torusGeometry args={[0.19, 0.042, 12, 28, Math.PI * 1.15]} />
      </mesh>
      {/* liquid surface */}
      <mesh position={[0, liquidY, 0]} rotation={[-Math.PI / 2, 0, 0]} material={liquidMat}>
        <circleGeometry args={[bodyR1 - 0.04, 36]} />
      </mesh>
      {/* foam layer + latte-art */}
      {foamMat && (
        <group position={[0, liquidY + 0.005, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} material={foamMat}>
            <circleGeometry args={[bodyR1 - 0.05, 36]} />
          </mesh>
          {cfg.foamPattern === "spiral" &&
            [0.34, 0.24, 0.14].map((r, i) => (
              <mesh key={i} position={[0, 0.006, 0]} rotation={[-Math.PI / 2, 0, 0]} material={liquidMat}>
                <ringGeometry args={[r, r + 0.025, 32]} />
              </mesh>
            ))}
          {cfg.foamPattern === "rosette" &&
            [0, 1, 2, 3].map((i) => (
              <mesh
                key={i}
                position={[0, 0.006, -0.05 + i * 0.11]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[0.32 - i * 0.05, 0.14 - i * 0.015, 1]}
                material={liquidMat}
              >
                <circleGeometry args={[1, 24]} />
              </mesh>
            ))}
        </group>
      )}
      {/* cinnamon sticks on saucer */}
      {cfg.cinnamon && (
        <group position={[0.34, 0.02, 0.34]} rotation={[0, 0.6, 0]}>
          <mesh material={CINNAMON} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.025, 0.025, 0.55, 8]} />
          </mesh>
          <mesh material={CINNAMON} rotation={[0, 0, Math.PI / 2.3]} position={[0.05, 0.04, 0.08]}>
            <cylinderGeometry args={[0.022, 0.022, 0.5, 8]} />
          </mesh>
        </group>
      )}
      {/* falling beans */}
      {Array.from({ length: beanCount }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            beanRefs.current[i] = el;
          }}
          material={beanMat}
          scale={[0.07, 0.1, 0.05]}
        >
          <sphereGeometry args={[1, 10, 8]} />
        </mesh>
      ))}
      {/* steam puffs */}
      {Array.from({ length: steamCount }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            steamRefs.current[i] = el;
          }}
          material={STEAM_MATERIAL.clone()}
          position={[0, 0.9, 0]}
        >
          <sphereGeometry args={[0.09, 10, 8]} />
        </mesh>
      ))}
    </group>
  );
}

function IcedCup() {
  const cubeRefs = useRef<(THREE.Mesh | null)[]>([]);
  const liquidMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: VARIANTS.iced.liquidColor, roughness: 0.2 }),
    [],
  );
  const milkMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#e9dcc4", roughness: 0.3 }), []);
  const cubeCount = 3;

  useFrame((state) => {
    for (let i = 0; i < cubeRefs.current.length; i++) {
      const mesh = cubeRefs.current[i];
      if (!mesh) continue;
      const period = 3;
      const phase = i / cubeCount;
      const tt = (state.clock.elapsedTime / period + phase) % 1;
      mesh.position.y = THREE.MathUtils.lerp(1.5, 0.5, Math.min(tt * 1.6, 1));
      mesh.rotation.y += 0.01;
      mesh.rotation.x = Math.sin(state.clock.elapsedTime + i) * 0.3;
      mesh.visible = tt < 0.85;
    }
  });

  return (
    <group>
      {/* glass */}
      <mesh position={[0, 0.55, 0]} material={ICE} castShadow>
        <cylinderGeometry args={[0.5, 0.42, 1.2, 32, 1, true]} />
      </mesh>
      {/* glass base */}
      <mesh position={[0, -0.03, 0]} material={ICE}>
        <cylinderGeometry args={[0.42, 0.42, 0.05, 32]} />
      </mesh>
      {/* layered liquid: dark base */}
      <mesh position={[0, 0.35, 0]} material={liquidMat}>
        <cylinderGeometry args={[0.46, 0.4, 0.55, 32]} />
      </mesh>
      {/* milk layer */}
      <mesh position={[0, 0.78, 0]} material={milkMat}>
        <cylinderGeometry args={[0.48, 0.46, 0.3, 32]} />
      </mesh>
      {/* straw */}
      <mesh position={[0.18, 1.15, 0]} rotation={[0, 0, -0.18]} material={CINNAMON}>
        <cylinderGeometry args={[0.03, 0.03, 1.1, 10]} />
      </mesh>
      {/* falling ice cubes */}
      {Array.from({ length: cubeCount }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            cubeRefs.current[i] = el;
          }}
          material={ICE}
          position={[Math.sin(i * 2) * 0.2, 1.4, Math.cos(i * 2) * 0.15]}
        >
          <boxGeometry args={[0.16, 0.16, 0.16]} />
        </mesh>
      ))}
    </group>
  );
}

const BASE_Y = -0.68;

export function CoffeeCupModel({ variant, active }: { variant: CupVariant; active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const idleRotation = useRef(0);
  const introSpin = useRef(Math.PI * 4);
  const scaleRef = useRef(0);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;
    if (active) {
      idleRotation.current += delta * 0.22;
      introSpin.current = THREE.MathUtils.damp(introSpin.current, 0, 3.2, delta);
      scaleRef.current = THREE.MathUtils.damp(scaleRef.current, 1, 4.5, delta);
    }
    group.rotation.y = idleRotation.current + introSpin.current;
    group.scale.setScalar(scaleRef.current);
    const bob = active ? Math.sin(Date.now() * 0.0009) * 0.03 : 0;
    group.position.y = BASE_Y + bob;
  });

  return (
    <group ref={groupRef} position={[0, BASE_Y, 0]}>
      {variant === "iced" ? <IcedCup /> : <HotCup variant={variant} />}
    </group>
  );
}
