#pragma glslify: rotation3dY = require('../../utils/rotate')
#pragma glslify: rotation3dX = require('../../utils/rotate')
// #pragma glslify: snoise = require('glsl-noise/simplex/3d')
#pragma glslify: cnoise = require('glsl-noise/classic/3d')

#pragma glslify: curlNoise = require('../../utils/curl-noise)

uniform float uTime;
uniform float uRadius;
uniform float uFrequency;
uniform float uProgress;
uniform float uSpeed;



void main() {
  float SPEED = uSpeed * 0.001;
  

  float distanceFactor = pow(uRadius - distance(position, vec3(0.5)), 1.5);
  vec3 rotatedPos = position * rotation3dX(uTime * SPEED * distanceFactor * 0.5);
  rotatedPos = rotatedPos * rotation3dY(uTime * SPEED * distanceFactor);

  vec3 noise = curlNoise(rotatedPos * uFrequency);
  rotatedPos += noise * uProgress * distanceFactor;

  vec3 pos = mix(position, rotatedPos, uProgress);
  vec3 curlPos = vec3(pos.x * noise.x, pos.y * 1./noise.x, pos.z * noise.z);
  
  vec4 modelPosition = modelMatrix * vec4(mix(pos, curlPos, sin(uTime)), 1.0);

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;


  gl_Position = projectedPosition;
  gl_PointSize = 10.0;
}