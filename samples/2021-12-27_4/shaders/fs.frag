precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

varying vec2 v_uv;

void main() {
  vec2 uv = v_uv;
  float time = u_time * 2.5;

  uv = uv - 0.5;
  uv.x = uv.x * u_resolution.x / u_resolution.y;

  vec3 color = vec3(abs(sin(u_time)) * 0.7 /
                    distance(vec2(uv.x * (abs(sin(u_time)) * 3.2),
                                  uv.y * (abs(cos(u_time)) * 3.2)),
                             vec2(0)));
  color *= vec3(abs(sin(u_time + 3.14 / 4.)) * 0.7 /
                distance(vec2(uv.y * (abs(sin(u_time + 3.14 / 4.)) * 3.2),
                              uv.x * (abs(cos(u_time + 3.14 / 4.)) * 3.2)),
                         vec2(0)));
  color = mix(vec3(1.0, 0.5, 0.0), vec3(1.0, 1.0, 0.0), color);

  gl_FragColor = vec4(color, 1.0);
}