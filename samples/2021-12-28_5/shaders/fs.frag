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

vec2 rotate(vec2 uv, float a) {
  uv = mat2(cos(a), -sin(a), sin(a), cos(a)) * uv;
  return uv + 0.5;
}

void main() {
  vec2 uv = v_uv;

  uv -= 0.5;
  uv *= 3.0;
  uv.x *= u_resolution.x / u_resolution.y;
  float fw = fwidth(uv.x);

  vec3 color = vec3(0.0);

  for (float i = 0.0; i < 16.0; i++) {
    vec2 xy = rotate(uv, QTR_PI / 4.0 * i);
    color += step(0.0, length(uv));
    color -= smoothstep(0.1 - fw, 0.1 + fw, length(xy));
  }

  gl_FragColor = vec4(color, 1.0);
}