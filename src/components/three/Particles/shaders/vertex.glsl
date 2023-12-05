#pragma glslify: rotation3dY = require('../../utils/rotate')
#pragma glslify: rotation3dX = require('../../utils/rotate')
#pragma glslify: snoise = require('glsl-noise/simplex/3d')
#pragma glslify: cnoise = require('glsl-noise/classic/3d')


uniform float uTime;
uniform float uRadius;

void main() {
  float yFactor = abs(position.y) / uRadius; // normalize y to [0, 1]
  float rotationSpeed = mix(0.005, 0.0005, yFactor); // interpolate between 0.005 and 0.05 based on yFactor
  // float rotationSpeed = 0.01;

  float distanceFactor = uRadius - distance(position, vec3(0.0));
  vec3 rotatedPositionY = position * rotation3dX(uTime * rotationSpeed * distanceFactor);

  float yOffset = 0.1 * distanceFactor * sin(uTime * 3.) ;
  vec3 particlePosition = vec3(rotatedPositionY.x, rotatedPositionY.y, rotatedPositionY.z);


  vec4 modelPosition = modelMatrix * vec4(particlePosition, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;


  gl_Position = projectedPosition;
  gl_PointSize = 5.0;
}