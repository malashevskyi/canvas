precision mediump float;

uniform vec2 u_resolution;
uniform sampler2D u_texture;
uniform float u_time;

varying vec2 v_uv;
varying float v_time;

// func from thebookofshaders.com/10
float random(vec2 uv) {
  return fract(sin(dot(uv.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  vec2 uv = v_uv;
  float time = u_time * 2.5;

  uv = uv - 0.5;
  uv.x = uv.x * u_resolution.x / u_resolution.y;

  uv = vec2(uv.x + sin(time + uv.y * 20. * sin(u_time)) * 0.1,
            uv.y + sin(time + uv.x * 10.) * 0.1);

  vec3 color = vec3(1.);
  float circle = smoothstep(0.21, 0.20, length(uv));
  color = mix(color, vec3(1.0, 0.0, 0.0), circle);

  gl_FragColor = vec4(color, 1.0);
}