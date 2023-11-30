import { useMemo, useRef } from "react";
import * as THREE from "three";

const PARTICLES: number = 10000;

export default function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particlesPosition = useMemo(() => {
    const particlesPosition = new Float32Array(PARTICLES * 3);
    const distance = 250;

    for (let i = 0; i < PARTICLES; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);
      const x = distance * Math.sin(theta) * Math.cos(phi);
      const y = distance * Math.sin(theta) * Math.sin(phi);
      const z = distance * Math.cos(theta);
      particlesPosition.set([x, y, z], i * 3);
    }
    return particlesPosition;
  }, [PARTICLES]);

  return (
    <points ref={particlesRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach={"attributes-position"}
          count={PARTICLES}
          array={particlesPosition}
          itemSize={3}
          normalized={false}
        />
      </bufferGeometry>
      <pointsMaterial attach="material" size={5} color="red" />
    </points>
  );

  //   const particlesRef = useRef<THREE.Points>(null);
  //   // Create an array to store the particle positions
  //   const positions = new Float32Array(PARTICLES * 3); // 1000 particles, 3 values (x, y, z) each
  //   // Generate random positions for each particle in the shape of a cube
  //   for (let i = 0; i < positions.length; i++) {
  //     positions[i] = (Math.random() - 0.5) * 500; // Random value between -5 and 5
  //   }
  //   // Create a buffer geometry and assign the positions to it
  //   const geometry = new THREE.BufferGeometry();
  //   geometry.setAttribute("position", new THREE.BoxGeometry(500, 500, 500));
  //   // Create a points material
  //   const material = new THREE.PointsMaterial({ color: "red", size: 10 });
  //   // Rotate the particles on each frame
  //   useFrame(() => {
  //     if (particlesRef.current) {
  //       particlesRef.current.rotation.x += 0.001;
  //       particlesRef.current.rotation.y += 0.001;
  //     }
  //   });
  //   return <points ref={particlesRef} geometry={geometry} material={material} />;
}
