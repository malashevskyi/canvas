#extension GL_EXT_shader_texture_lod : enable
#extension GL_OES_standard_derivatives : enable
precision mediump float;

varying vec2 vUv;

// uniform float u_width;
// // uniform float u_height;
uniform vec2 u_resolution;
uniform float u_time;
// uniform vec2 u_mouse;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  uv -= 0.5;
  uv.x *= u_resolution.x / u_resolution.y;
  float time = u_time * 0.1;
  float fw = fwidth(uv.x) * 2.;

  vec2 st = vec2(atan(uv.x, uv.y), length(uv));

  uv = vec2(uv.x + sin(time + uv.y), uv.y);

  uv = vec2(st.x / 6.28 + time, st.y);
  uv = vec2(st.x / 6.28 + time + uv.y, st.y);
  uv = vec2(st.x / 6.28 + time + st.y, st.y);
  uv = vec2(st.x / 6.28 - time + st.y, st.y / 6.28);

  vec3 color = vec3(0.0);

  float x = uv.x * 5.;
  float y;

  float s =
      smoothstep(-fw, fw, min(fract(x), fract(1. - x)) * .3 + 0.01 - uv.y);
  color += s * vec3(sin(time), vUv.x, vUv.y) +
           (1. - s) * vec3(vUv.x, vUv.y, sin(time));

  y = mod(vUv.y, 0.5);
  x = mod(vUv.x, 0.5);

  vec2 center = vec2(.5, .5);
  vec2 pos = mod(vec2(vUv.x * 2. + sin(time + vUv.y * 40.) * 0.01,
                      vUv.y + sin(time + vUv.x)) *
                     5.,
                 1.);
  float d = distance(pos, center);

  float mask = step(0.45, d);

  color =
      mix(color, vec3(vUv.x + sin(time), vUv.y + sin(time), sin(time)), mask);
  //   gl_FragColor = vec4(color, 1.);
  gl_FragColor = vec4(vec3(1., 0., 0.), 1.);
}