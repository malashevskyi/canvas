// https://developer.mozilla.org/en-US/docs/Web/API/OES_standard_derivatives
#extension GL_EXT_shader_texture_lod : enable
#extension GL_OES_standard_derivatives : enable

precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

varying vec2 v_uv;

float TAU = 6.28;

vec3 bgColor = vec3(0.05, 0.22, 0.47);
vec3 lColor = vec3(0.62, 0.68, 0.79);

void main() {
  vec2 uv = v_uv;

  uv -= 0.5;
  uv *= 2.0;
  uv.x *= u_resolution.x / u_resolution.y;
  float fw = fwidth(uv.x) * 2.;

  vec3 color = vec3(0.0);

  uv.y -= 0.02;
  color += smoothstep(0.5, 0.5 + fw, fract(atan(uv.y, uv.x) / TAU * 2.0));
  color *= 1.0 - smoothstep(0.7, 0.7 + fw, length(uv));
  color += (1.0 - smoothstep(0.8, 0.8 + fw, length(uv))) -
           (1.0 - smoothstep(0.75, 0.75 + fw, length(uv)));

  color = mix(bgColor, lColor, color);

  gl_FragColor = vec4(color, 1.0);
}