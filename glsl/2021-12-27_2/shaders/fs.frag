precision mediump float;

uniform vec2 u_resolution;
uniform sampler2D u_texture;
// uniform float u_randomR;
// uniform float u_randomG;
// uniform float u_randomB;
uniform float u_time;

varying vec2 v_uv;
varying float v_time;

// func from thebookofshaders.com/10
float random(vec2 uv) {
  return fract(sin(dot(uv.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  vec2 uv = v_uv;
  float time = u_time * 2.5;

  uv = uv - 0.5;
  uv.x = uv.x * u_resolution.x / u_resolution.y;

  // float stp =
  //     step(abs(sin(u_time + uv.x * uv.y)) * 0.4, min(abs(uv.x),
  //     abs(uv.y)));
  // float stp = fract(uv.x * 10.0) + cos(u_time);
  // stp *= fract((uv.y) * 10.0) + sin(u_time) * 0.3;

  // vec3 color = mix(vec3(1.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0),
  // stp); vec3 color =
  //     vec3(random(vec2(floor(uv.x * 40.0 + uv.y * sin(u_time))
  //     + sin(time),
  //                      floor(uv.y * 20.5 + uv.x * cos(u_time))
  //                      + sin(time))));

  uv = vec2(uv.x + sin(time + uv.y * 20. * sin(u_time)) * 0.1,
            uv.y + sin(time + uv.x * 10.) * 0.1);

  vec3 color = vec3(1.);
  float circle = smoothstep(0.21, 0.20, length(uv));
  color = mix(color, vec3(1.0, 0.0, 0.0), circle);

  // color = mix(vec3(abs(sin(u_time)), 0.0, 0.0),
  //             vec3(0.0, abs(sin(u_time + 1.64)), 0.0), color);

  gl_FragColor = vec4(color, 1.0);
}