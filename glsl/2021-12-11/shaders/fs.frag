#extension GL_EXT_shader_texture_lod : enable
#extension GL_OES_standard_derivatives : enable
precision mediump float;

varying vec2 vUv;

// uniform float u_width;
// // uniform float u_height;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_randomR;
uniform float u_randomG;
uniform float u_randomB;
varying vec2 v_texCoord;
// uniform vec2 u_mouse;

vec4 glitch1(vec2 uv, vec2 texCoord, float time) {

  float r = texture2D(u_texture, vec2(texCoord.x,
                                      texCoord.y + u_randomR * sin(time) * 0.2))
                .r;
  float g =
      texture2D(u_texture, vec2(texCoord.x - u_randomG * sin(time + 1.0) * 0.1,
                                texCoord.y + u_randomG * sin(time + 1.0) * 0.1))
          .g;
  float b = texture2D(u_texture,
                      vec2(texCoord.x - u_randomB * sin(time + 3.14) * 0.1,
                           texCoord.y + u_randomB * sin(time + 3.14) * 0.4))
                .b;

  uv -= 0.5;
  return mix(vec4(r, g, b, 1.), vec4(0.),
             step(.5, max(length(uv.x), length(uv.y))));
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;

  float time = u_time * 0.005;

  float rnd = random(uv) * time;
  float fw = fwidth(uv.x);

  vec4 color = vec4(0.0);

  color = glitch1(uv, v_texCoord, sin(u_time) * 0.2);

  gl_FragColor = color;
}