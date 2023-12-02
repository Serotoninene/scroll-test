#pragma glslify: rotation3dY = require('../../utils/rotate3D-Y')

mat3 rotation3dZ(float angle) {
  float s = sin(angle);
  float c = cos(angle);

  return mat3(
    c, s, 0.0,
    -s, c, 0.0,
    0.0, 0.0, 1.0
  );
}

uniform float uTime;

void main() {
  float distanceFactor = pow(250. - distance(position, vec3(0.0)), 1.5);
  vec3 particlePosition = position * rotation3dZ(uTime * 0.001 * distanceFactor);


  vec4 modelPosition = modelMatrix * vec4(particlePosition, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
  gl_PointSize = 5.0;
}