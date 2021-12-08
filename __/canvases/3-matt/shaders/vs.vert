// attribute vec2 a_position;
varying vec2 v_uv;
varying vec3 v_position;

// void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
void main() {
  v_uv = uv;
  v_position = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xyz, 1.0);
}