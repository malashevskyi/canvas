precision mediump float;

uniform float u_time;

varying vec2 v_uv;

void main() {
  vec2 uv = v_uv;

  uv = uv - 0.5;

  float stp =
      step(abs(sin(u_time + uv.x * uv.y)) * 0.4, min(abs(uv.x), abs(uv.y)));

  vec3 color = mix(vec3(1.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0), stp);

  gl_FragColor = vec4(color, 1.0);
}