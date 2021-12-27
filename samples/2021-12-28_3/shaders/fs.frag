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

float QTR_PI = 1.57;

void main() {
  vec2 uv = v_uv;

  float time = u_time * 0.1;
  uv -= 0.5;
  uv *= 4.0;
  uv.x *= u_resolution.x / u_resolution.y;
  float fw = fwidth(uv.x);

  vec3 color = vec3(0.0);

  for (float i = 0.0; i < 16.0; i++) {
    vec2 xy = rotate(uv, QTR_PI / 4.0 * i);
    color += step(0.0, length(uv));
    color -=
        smoothstep(0.1 - fw, 0.1 + fw,
                   length(vec2(abs(xy.x + sin(time * 10.0) * 0.2 - 0.3) - 0.1,
                               pow(xy.y + xy.x * sin(time), 8.0) - 0.05)));
  }

  color = clamp(color, 0.0, 1.0);
  color = mix(vec3(1.0), vec3(1.0, 0.0, 0.0), color);

  gl_FragColor = vec4(color, 1.0);
}