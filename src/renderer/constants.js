export const CANVAS_ID = 'editor-canvas';

export const BATCH_VERTEX_SHADER_SOURCE = `#version 300 es

      in vec2 aPosition;
      in vec4 aColor;

      out vec4 vColor;

      uniform mat4 uModelViewMatrix;
      uniform mat4 uProjectionMatrix;

      void main() {
        gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 0.0, 1.0);
        vColor = aColor;
      }
      `;

export const BATCH_FRAGMENT_SHADER_SOURCE = `#version 300 es

      precision mediump float;

      in vec4 vColor;
      out vec4 oColor;

      void main() {
        oColor = vColor;
      }
      `;

export const TEST_VERTEX_SHADER_SOURCE = `#version 300 es

      in vec2 aPosition;
      in vec2 aTextureCoord;

      out vec2 vTextureCoord;

      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
        vTextureCoord = aTextureCoord;
      }
      `;

export const TEST_FRAGMENT_SHADER_SOURCE = `#version 300 es

      precision mediump float;

      in vec2 vTextureCoord;
      out vec4 oColor;

      uniform sampler2D uSampler;

      void main() {
        oColor = texture(uSampler, vTextureCoord);
      }
      `;
