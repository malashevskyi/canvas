precision mediump float;

uniform float u_time;

varying vec2 v_uv;

void main() {
  vec2 uv = v_uv;

  vec3 color =
      vec3(abs(sin(u_time + uv.x)), abs(sin(u_time + uv.y)), abs(sin(u_time)));

  gl_FragColor = vec4(color, 1.0);
}