// attribute vec2 a_position;
varying vec2 vUv;

// void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xyz, 1.0);
}