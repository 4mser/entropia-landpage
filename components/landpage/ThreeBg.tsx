"use client";
import { InstancedMesh, MathUtils } from "three";
import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Instances, Instance, Environment } from "@react-three/drei";


// Definir el tipo para las partículas
interface Particle {
  factor: number;
  speed: number;
  xFactor: number;
  yFactor: number;
  zFactor: number;
}

const particles: Particle[] = Array.from({ length: 200 }, () => ({
  factor: MathUtils.randInt(50, 100),
  speed: MathUtils.randFloat(0.1, 0.75),
  xFactor: MathUtils.randFloatSpread(40),
  yFactor: MathUtils.randFloatSpread(40),
  zFactor: MathUtils.randFloatSpread(10),
}));

export default function ThreeBg() {
  return (
    <section className="w-full  h-[100vh] z-50 left-0 top-0">
      <Canvas
        shadows
        gl={{ antialias: false }} // Mantener antialiasing desactivado para mayor rendimiento
        camera={{ fov: 100, position: [0, 0, 20] }}
      >
        <Bubbles />
        
        <Environment preset="city" />
      </Canvas>
    </section>
  );
}

function Bubbles() {
  const ref = useRef<InstancedMesh>(null); // Usar ref para InstancedMesh

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.position.y = MathUtils.damp(
        ref.current.position.y,
        state.mouse.y * 5,
        2.75,
        delta
      );

      ref.current.rotation.y = MathUtils.damp(
        ref.current.rotation.y,
        (-state.mouse.x * Math.PI) / 2,
        2.75,
        delta
      );
    }
  });

  return (
    <Instances
      limit={particles.length}
      ref={ref}
      castShadow
      receiveShadow
      position={[0, 0, 0]}
    >
      <sphereGeometry args={[0.02, 10, 10]} /> {/* Mantener geometría */}
      <meshStandardMaterial roughness={1} color="#eeeeee" />
      {particles.map((data, i) => (
        <Bubble key={i} {...data} />
      ))}
    </Instances>
  );
}

interface BubbleProps {
  factor: number;
  speed: number;
  xFactor: number;
  yFactor: number;
  zFactor: number;
}

function Bubble({ factor, speed, xFactor, yFactor, zFactor }: BubbleProps) {
  const ref = useRef<InstancedMesh>(null); // Usar ref para InstancedMesh

  let accelerometerXFactor = 0;
  let accelerometerYFactor = 0;
  let accelerometerZFactor = 0;

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      accelerometerXFactor = event.gamma ? event.gamma / 5 : 0;
      accelerometerYFactor = event.beta ? event.beta / 5 : 0;
      accelerometerZFactor = event.alpha ? event.alpha / 5 : 0;
    };

    if ("DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", handleOrientation);
    }

    return () => {
      if ("DeviceOrientationEvent" in window) {
        window.removeEventListener("deviceorientation", handleOrientation);
      }
    };
  }, []);

  useFrame((state) => {
    const t = factor + state.clock.elapsedTime * (speed / 3);
    if (ref.current) {
      ref.current.scale.setScalar(Math.max(1.5, Math.cos(t) * 3));
      ref.current.position.set(
        Math.cos(t) +
          Math.sin(t * 1) / 10 +
          xFactor +
          accelerometerXFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 1) * factor) / 10,
        Math.sin(t) +
          Math.cos(t * 2) / 10 +
          yFactor +
          accelerometerYFactor +
          Math.sin((t / 10) * factor) +
          (Math.cos(t * 2) * factor) / 10,
        Math.sin(t) +
          Math.cos(t * 2) / 10 +
          zFactor +
          accelerometerZFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 3) * factor) / 4
      );
    }
  });

  return <Instance ref={ref} />;
}
