import React from "react";
import { CustomCanvas, Skate } from ".";
import { OrbitControls } from "@react-three/drei";

export const Experience = () => {
  return (
    <div className="h-full">
      <CustomCanvas>
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 15, 10]} angle={0.3} />
        <pointLight position={[-10, -10, -10]} />
        <Skate />
      </CustomCanvas>
    </div>
  );
};