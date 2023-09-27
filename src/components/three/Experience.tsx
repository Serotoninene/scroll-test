import { CustomCanvas, Fluids } from ".";
import { Lights } from "./Lights";

export const Experience = () => {
  return (
    <div className="h-full">
      <CustomCanvas>
        <Lights />
        <Fluids />
      </CustomCanvas>
    </div>
  );
};
