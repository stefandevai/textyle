export const CANVAS_ID = 'editor-canvas';

export const BATCH_VERTEX_SHADER_SOURCE = `#version 300 es

      in vec2 aPosition;
      in vec4 aColor;
      in vec2 aTextureCoord;

      out vec4 vColor;
      out vec2 vTextureCoord;

      uniform mat4 uModelViewMatrix;
      uniform mat4 uProjectionMatrix;

      void main() {
        gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 0.0, 1.0);
        vColor = aColor;
        vTextureCoord = aTextureCoord;
      }
      `;

export const BATCH_FRAGMENT_SHADER_SOURCE = `#version 300 es

      precision mediump float;

      in vec4 vColor;
      in vec2 vTextureCoord;

      out vec4 oColor;

      uniform sampler2D uSampler;

      void main() {
        //oColor = vColor;
        oColor = texture(uSampler, vTextureCoord);
      }
      `;

