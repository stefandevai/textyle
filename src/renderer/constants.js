export const UNIFORM_PROJECTION = 'uProjectionMatrix';
export const UNIFORM_MODEL_VIEW = 'uModelViewMatrix';
export const UNIFORM_SAMPLER = 'uSampler';

export const ATTRIB_POSITION = 'aPosition';
export const ATTRIB_TEXTURE_COORD = 'aTextureCoord';
export const ATTRIB_COLOR = 'aColor';

export const BATCH_VERTEX_SHADER_SOURCE = `#version 300 es

      in vec2 ${ATTRIB_POSITION};
      in vec2 ${ATTRIB_TEXTURE_COORD};
      in vec4 ${ATTRIB_COLOR};

      out vec4 vColor;
      out vec2 vTextureCoord;

      uniform mat4 ${UNIFORM_MODEL_VIEW};
      uniform mat4 ${UNIFORM_PROJECTION};

      void main() {
        gl_Position = ${UNIFORM_PROJECTION} * ${UNIFORM_MODEL_VIEW} * vec4(aPosition, 0.0, 1.0);
        vColor = aColor;
        vTextureCoord = aTextureCoord;
      }
      `;

export const BATCH_FRAGMENT_SHADER_SOURCE = `#version 300 es

      precision mediump float;

      in vec4 vColor;
      in vec2 vTextureCoord;

      out vec4 oColor;

      uniform sampler2D ${UNIFORM_SAMPLER};

      void main() {
        //oColor = vColor;
        oColor = texture(${UNIFORM_SAMPLER}, vTextureCoord);
      }
      `;

