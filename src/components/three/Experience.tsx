import { CustomCanvas, Skate } from ".";
import { Lights } from "./Lights";

export const Experience = () => {
  return (
    <div className="h-full">
      <CustomCanvas>
        {/* <OrbitControls /> */}
        <Lights />
        <Skate />
      </CustomCanvas>
    </div>
  );
};
