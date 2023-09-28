varying vec2 vUv; 

const float PI = 3.1415;


void main()
{
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);  
  gl_Position = modelPosition;  
}