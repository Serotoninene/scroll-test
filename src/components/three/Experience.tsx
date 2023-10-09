import { CustomCanvas, House } from ".";
import { Lights } from "./Lights";

export const Experience = () => {
  return (
    <div className="h-full">
      <CustomCanvas>
        <Lights />
        <House />
      </CustomCanvas>
    </div>
  );
};
