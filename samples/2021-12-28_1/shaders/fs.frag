// https://developer.mozilla.org/en-US/docs/Web/API/OES_standard_derivatives
#extension GL_EXT_shader_texture_lod : enable
#extension GL_OES_standard_derivatives : enable

precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

varying vec2 v_uv;

void main() {
  vec2 uv = v_uv;

  uv -= 0.5;

  vec3 color = vec3(1.0, 0.0, 0.0);

  uv = normalize(uv);

  color += step(sin(u_time) * 0.5 + 0.5, length(uv.y));

  gl_FragColor = vec4(color, 1.0);
}