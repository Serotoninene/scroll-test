import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useLogo } from "./hooks/useLogo";
import {
  Physics,
  RigidBody,
  CuboidCollider,
  InstancedRigidBodies,
} from "@react-three/rapier";
import { useWindowSize } from "../../../hooks";

export const FallingLogos = () => {
  const count = 10;
  const refs = useRef<THREE.InstancedMesh>(null);
  const { width, height } = useWindowSize();
  const { geometry, material } = useLogo();

  const instances = useMemo<InstancedRigidBodies>(() => {
    const instances = [];

    for (let i = 0; i < count; i++) {
      instances.push({
        key: "instance_" + i,
        position: [i * 2, 0, 0],
        rotation: [90, 0, 90],
        scale: [100, 100, 100],
      });
    }

    return instances;
  }, []);

  useEffect(() => {
    const width = window.innerWidth;
    for (let i = 0; i < count; i++) {
      const matrix = new THREE.Matrix4();
      // positions
      const x = Math.random() * width - width / 2;
      const y = i * 200;

      // rotations : first on the z axis, then on the x axis
      const quaternion = new THREE.Quaternion();
      quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2);
      const xQuaternion = new THREE.Quaternion();
      xQuaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);
      quaternion.multiply(xQuaternion);

      matrix.compose(
        new THREE.Vector3(x, y, 0),
        quaternion,
        new THREE.Vector3(100, 100, 100)
      );

      refs.current?.setMatrixAt(i, matrix);
    }
  }, []);

  // if (!width || !height) return null;

  return (
    <>
      <Physics gravity={[0, -90.08, 0]}>
        <InstancedRigidBodies instances={instances}>
          <instancedMesh args={[geometry, material, count]} />
        </InstancedRigidBodies>
        <RigidBody type="fixed">
          <CuboidCollider
            args={[width, 0.5, width]}
            position={[0, -height / 2, 0]}
          />
          <CuboidCollider
            args={[0.5, height, width]}
            position={[width / 2, 0, 0]}
          />
          <CuboidCollider
            args={[0.5, height, width]}
            position={[-width / 2, 0, 0]}
          />
          <CuboidCollider
            args={[width, height, 0.5]}
            position={[0, 0, width / 2]}
          />
        </RigidBody>
      </Physics>
    </>
  );
};
