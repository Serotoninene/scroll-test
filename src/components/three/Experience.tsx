import { CustomCanvas } from ".";
import { ShaderGradient } from "./ShaderGradient";

export const Experience = () => {
  return (
    <div className="h-full">
      <CustomCanvas>
        <ShaderGradient />
      </CustomCanvas>
    </div>
  );
};
