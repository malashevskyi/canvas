// https://developer.mozilla.org/en-US/docs/Web/API/OES_standard_derivatives
#extension GL_EXT_shader_texture_lod : enable
#extension GL_OES_standard_derivatives : enable

precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform sampler2D u_texture;
uniform sampler2D u_textureData;

varying vec2 v_uv;

float QTR_PI = 1.57;

void main() {
  vec2 uv = v_uv;

  gl_FragColor = texture2D(u_textureData, uv);
}