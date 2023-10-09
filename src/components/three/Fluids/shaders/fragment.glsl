precision highp float;
uniform sampler2D uTouchTexture;

varying vec2 vUv;


void main() {   
  vec4 touchTexture = texture2D(uTouchTexture, vUv);  
  float touch = touchTexture.r;
  vec4 color = vec4(.0 , vUv ,1.0);
  color.g += touch;
  color.b += touch;



  gl_FragColor = color;
}