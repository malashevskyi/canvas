// // attribute vec2 a_position;
// varying vec2 vUv;

// // void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
// void main() {
//   vUv = uv;
//   gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xyz, 1.0);
// }

attribute vec2 a_position;
attribute vec2 a_texCoord;

varying vec2 v_texCoord;
uniform mat4 u_matrix;
// uniform vec2 uresolution;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);

  // v_texCoord = a_texCoord;
  v_texCoord = (a_position + 1.0) * 0.5;
  v_texCoord = vec2(a_texCoord.x, a_texCoord.y);
}