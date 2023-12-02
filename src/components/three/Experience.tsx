import { OrbitControls } from "@react-three/drei";
import { CustomCanvas } from ".";
import Particles from "./Particles";

export const Experience = () => {
  return (
    <div className="h-full">
      <CustomCanvas>
        <Particles />
        <OrbitControls autoRotate={false} />
      </CustomCanvas>
    </div>
  );
};
