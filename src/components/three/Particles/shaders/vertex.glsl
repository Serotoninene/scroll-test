#pragma glslify: rotation3dY = require('../../utils/rotate3D-Y')

uniform float uTime;


void main() {
  vec3 particlePosition = position * rotation3dY(uTime * 0.2);

  vec4 modelPosition = modelMatrix * vec4(particlePosition, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
  gl_PointSize = 5.0;
}