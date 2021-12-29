uniform vec2 u_frequency;
uniform float u_randomR;
uniform float u_randomG;
uniform float u_randomB;

varying vec2 v_uv;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  v_uv = uv;
}