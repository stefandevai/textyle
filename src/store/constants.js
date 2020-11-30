export const CANVAS_ID = 'editor-canvas';

export const VERTEX_SHADER_SOURCE = `
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

export const FRAGMENT_SHADER_SOURCE = `
      precision mediump float;

      varying vec4 vColor;

      void main() {
        gl_FragColor = vColor;
      }
      `;
