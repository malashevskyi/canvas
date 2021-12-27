// https://developer.mozilla.org/en-US/docs/Web/API/OES_standard_derivatives
#extension GL_EXT_shader_texture_lod : enable
#extension GL_OES_standard_derivatives : enable

precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

varying vec2 v_uv;

void main() {
  vec2 uv = v_uv;

  uv *= 4.0;
  uv.x *= u_resolution.x / u_resolution.y;
  float fw = fwidth(uv.x);

  uv.x += step(1., mod(uv.y, 2.0)) * 0.5;
  uv = fract(uv);
  uv -= 0.5;

  float x = uv.x;
  float y = uv.y;
  float shape =
      1.0 - smoothstep(0.5 - fw, 0.5 + fw,
                       max(abs(x) + abs(y) + abs(sin(u_time)) * 0.2, abs(y)));

  vec3 color = vec3(shape);

  gl_FragColor = vec4(color, 1.0);
}