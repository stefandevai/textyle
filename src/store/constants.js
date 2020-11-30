export const CANVAS_ID = 'editor-canvas';

export const BATCH_VERTEX_SHADER_SOURCE = `
      attribute vec2 aVertexPosition;
      attribute vec4 aColor;

      varying vec4 vColor;

      uniform mat4 uModelViewMatrix;
      uniform mat4 uProjectionMatrix;

      void main() {
        gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 0.0, 1.0);
        vColor = aColor;
      }
      `;

export const BATCH_FRAGMENT_SHADER_SOURCE = `
      precision mediump float;

      varying vec4 vColor;

      void main() {
        gl_FragColor = vColor;
      }
      `;

export const TEST_VERTEX_SHADER_SOURCE = `
      attribute vec2 aVertexPosition;
      attribute vec2 aTextureCoord;

      varying highp vec2 vTextureCoord;

      void main() {
        gl_Position = vec4(aVertexPosition, 0.0, 1.0);
        vTextureCoord = aTextureCoord;
      }
      `;

export const TEST_FRAGMENT_SHADER_SOURCE = `
      precision mediump float;

      varying highp vec2 vTextureCoord;

      uniform sampler2D uSampler;

      void main() {
        //gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        gl_FragColor = texture2D(uSampler, vTextureCoord);
      }
      `;
