// https://developer.mozilla.org/en-US/docs/Web/API/OES_standard_derivatives
#extension GL_EXT_shader_texture_lod : enable
#extension GL_OES_standard_derivatives : enable

precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

varying vec2 v_uv;

void main() {
  vec2 uv = v_uv;

  float time = u_time * 1.8;
  uv *= 7.0;
  uv.x = abs(uv.x - uv.y) + uv.y * 0.5 + sin(time + uv.y);
  uv.y = uv.y + sin(time + uv.x);
  uv = fract(uv);

  vec3 color = vec3(1.0);

  uv.x = uv.x + sin(time + uv.y * 2.0);
  uv.y = uv.y + sin(time + uv.x * 5.0);

  vec3 mx = mix(vec3(1.0, 0.0, 1.0), vec3(1.0, 1.0, 0.0), length(uv.x) * 0.2);

  color *= smoothstep(sin(time) * 0.25 + 0.25, 1.0, mx);

  gl_FragColor = vec4(color, 1.0);
}