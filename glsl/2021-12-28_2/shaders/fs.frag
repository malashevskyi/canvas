// https://developer.mozilla.org/en-US/docs/Wer,
// offset.b/API/OES_standard_derivatives
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

  float fw = fwidth(uv.x);

  vec4 color = texture2D(u_texture, uv);
  vec4 offset = texture2D(u_textureData, uv);

  gl_FragColor = texture2D(
      u_texture, vec2(uv.x + cos(u_time + uv.y * 10.) * 0.01,
                      uv.y + sin(u_time + uv.x * 4.) * 0.01) -
                     sin(u_time) * 0.01 *
                         vec2(offset.r + sin(u_time), offset.b + cos(u_time)));
}