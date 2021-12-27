precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

varying vec2 v_uv;

void main() {
  vec2 uv = v_uv;

  uv = uv - 0.5;
  uv.x = uv.x * u_resolution.x / u_resolution.y;

  vec2 st = vec2(atan(uv.x, uv.y), length(uv));

  // uv = vec2(st.x / 6.28 + u_time * 0.1 + uv.y, st.y);
  // uv = vec2(st.x / 6.28 + u_time * 0.1 + st.y, st.y);
  uv = vec2(st.x / 6.28 + u_time * 0.1 + st.y, st.y / 6.28);

  vec3 color = vec3(0.0);

  float x = uv.x * 5.;
  float offset = abs(sin(u_time)) * 0.1 + 0.03;
  color +=
      smoothstep(0.0, 0.02, min(fract(x), fract(1. - x)) * .3 + offset - uv.y);

  color -= vec3(1.0, 0.0, 0.0);

  gl_FragColor = vec4(color, 1.0);
}