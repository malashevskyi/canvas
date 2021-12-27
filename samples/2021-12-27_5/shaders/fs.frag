precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

varying vec2 v_uv;

void main() {
  vec2 uv = v_uv;
  float time = u_time * 2.5;

  uv.x = uv.x * u_resolution.x / u_resolution.y;

  vec3 color = vec3(0.0);

  float x = uv.x * 5.;

  color += smoothstep(0.0, 0.01,
                      min(fract(x), fract(1. - x)) * abs(sin(u_time)) * 0.3 -
                          uv.y + 0.3);

  color = mix(vec3(1.0, 1.0, 0.0), vec3(1.0, 0.0, 1.0), color);

  gl_FragColor = vec4(color, 1.0);
}