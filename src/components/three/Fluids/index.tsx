import vertex from "./shaders/vertex.glsl";

export const Fluids = () => {
  console.log(vertex);
  return (
    <mesh>
      <boxGeometry args={[500, 500, 1]} />
      <meshBasicMaterial color={0x0000ff} />
    </mesh>
  );
};
