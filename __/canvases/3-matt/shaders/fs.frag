#extension GL_EXT_shader_texture_lod : enable
#extension GL_OES_standard_derivatives : enable
precision mediump float;

varying vec2 v_uv;
varying vec3 v_position;

// uniform float u_width;
// // uniform float u_height;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_count;
uniform vec3 u_points[POINT_COUNT];
// uniform vec2 u_mouse;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  uv -= 0.5;
  uv.x *= u_resolution.x / u_resolution.y;
  float time = u_time * 0.1;
  float fw = fwidth(uv.x) * 2.;

  vec3 color = vec3(0.0);

  float dist = 10000.0;

  for (int i = 0; i < 3; i++) {
    vec3 p = u_points[i];
    float d = distance(v_position, p);
    dist = min(d, dist);
  }
  if (0.1 < dist) {
    discard;
  }

  float mask = smoothstep(0.5 + fw, 0.5 - fw, dist);

  // gl_FragColor = vec4(vec3(dist), 1.);
  vec3 v = mix(vec3(1.0, 0., 0.), vec3(0.), mask);
  //   if (v_position.x > 0.3) {
  //     v = vec3(0.);
  //   }

  gl_FragColor = vec4(vec3(mask), 1.);
}