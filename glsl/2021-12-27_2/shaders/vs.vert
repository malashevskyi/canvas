uniform vec2 u_frequency;
// uniform float u_time;
uniform float u_randomR;
uniform float u_randomG;
uniform float u_randomB;

varying vec2 v_uv;
// varying float v_time;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  // modelPosition.z += sin(modelPosition.x * u_frequency.x - u_time) * 0.1;
  // modelPosition.z += sin(modelPosition.y * u_frequency.y - u_time) * 0.1;

  // modelPosition.x = modelPosition.x + u_randomR * 0.1;
  // modelPosition.y = modelPosition.y + u_randomG * 0.1;
  // modelPosition.z = modelPosition.z + u_randomB * 0.1;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  v_uv = uv;
  // v_time = u_time;
}