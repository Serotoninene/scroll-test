precision highp float;
uniform sampler2D uTouchTexture;

varying vec2 vUv;


void main() {   
  float touch = texture2D(uTouchTexture, vUv).r;  
  vec4 color = vec4(.0 , vUv ,1.0);
  color.rgb += vec3(touch);

  gl_FragColor = color;
}