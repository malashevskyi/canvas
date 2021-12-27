precision mediump float;

uniform float u_time;

varying vec2 v_uv;

// func from thebookofshaders.com/10
float random(vec2 uv) {
  return fract(sin(dot(uv.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  vec2 uv = v_uv;
  float time = u_time * 0.000005;

  vec3 color = vec3(random(
      vec2(floor(uv.x * 40.0) + sin(time), floor(uv.y * 20.5) + sin(time))));

  color = mix(vec3(abs(sin(u_time)), 0.0, 0.0),
              vec3(0.0, abs(sin(u_time + 1.64)), 0.0), color);

  gl_FragColor = vec4(color, 1.0);
}