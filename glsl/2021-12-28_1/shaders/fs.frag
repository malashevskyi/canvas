// https://developer.mozilla.org/en-US/docs/Web/API/OES_standard_derivatives
#extension GL_EXT_shader_texture_lod : enable
#extension GL_OES_standard_derivatives : enable

precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

varying vec2 v_uv;

vec2 rotate(vec2 uv, float a) {
  uv = mat2(cos(a), -sin(a), sin(a), cos(a)) * uv;
  return uv + 0.5;
}
float TAU = 6.28;

vec3 bgColor = vec3(0.05, 0.22, 0.47);
vec3 lColor = vec3(0.62, 0.68, 0.79);

void main() {
  vec2 uv = v_uv;

  float time = u_time;
  uv -= 0.5;
  uv *= 2.0;
  uv.x *= u_resolution.x / u_resolution.y;
  float fw = fwidth(uv.x);

  vec3 color = vec3(0.0);
  vec3 shape = vec3(0.0);

  float n = 25.;
  float a = TAU / n;
  for (float i = 0.0; i < 25.; i++) {
    vec2 xy = rotate(vec2(uv.x + cos(time + uv.y * 3.5) * 0.3,
                          uv.y + sin(time + uv.x * 2.0) * 0.3),
                     a * i);
    xy.y -= .189;

    float x = xy.x + sin(time + xy.y * 3.0) * 0.02;
    float y = xy.y + sin(time + xy.x * 3.0) * 0.02;
    shape += (1.0 - smoothstep(0.1, 0.105, length(vec2(x, y)))) *
             smoothstep(0.1, 0.105, length(vec2(x + 0.05, y - 0.117)));
  }

  color = mix(bgColor, color, shape);
  color = mix(color, lColor, shape);

  gl_FragColor = vec4(color, 1.0);
}