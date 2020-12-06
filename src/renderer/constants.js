export const UNIFORM_PROJECTION = 'uProjectionMatrix';
export const UNIFORM_MODEL_VIEW = 'uModelViewMatrix';
export const UNIFORM_SAMPLERS = 'uSamplers';

export const ATTRIB_POSITION = 'aPosition';
export const ATTRIB_TEXTURE_COORD = 'aTextureCoord';
export const ATTRIB_TEXTURE_IDX = 'aTextureIdx';
export const ATTRIB_COLOR = 'aColor';

export const BATCH_VERTEX_SHADER_SOURCE = `#version 300 es

      in vec2 ${ATTRIB_POSITION};
      in float ${ATTRIB_TEXTURE_IDX};
      in vec2 ${ATTRIB_TEXTURE_COORD};
      in vec4 ${ATTRIB_COLOR};

      out vec2 vTextureCoord;
      out float vTextureIdx;
      out vec4 vColor;

      uniform mat4 ${UNIFORM_MODEL_VIEW};
      uniform mat4 ${UNIFORM_PROJECTION};

      void main() {
        gl_Position = ${UNIFORM_PROJECTION} * ${UNIFORM_MODEL_VIEW} * vec4(aPosition, 0.0, 1.0);
        vTextureCoord = ${ATTRIB_TEXTURE_COORD};
        vTextureIdx = ${ATTRIB_TEXTURE_IDX};
        vColor = ${ATTRIB_COLOR};
      }
      `;

export const BATCH_FRAGMENT_SHADER_SOURCE = `#version 300 es

      precision mediump float;

      in vec2 vTextureCoord;
      in float vTextureIdx;
      in vec4 vColor;

      out vec4 oColor;

      uniform sampler2D ${UNIFORM_SAMPLERS}[11];

      void main() {
        vec4 finalColor = vec4(0.0);
        int tid = int(vTextureIdx + 0.5);

        switch (tid)
        {
          case 0:
            finalColor = texture(${UNIFORM_SAMPLERS}[0], vTextureCoord);
            break;
          case 1:
            finalColor = texture(${UNIFORM_SAMPLERS}[1], vTextureCoord);
            break;
          case 2:
            finalColor = texture(${UNIFORM_SAMPLERS}[2], vTextureCoord);
            break;
          case 3:
            finalColor = texture(${UNIFORM_SAMPLERS}[3], vTextureCoord);
            break;
          case 4:
            finalColor = texture(${UNIFORM_SAMPLERS}[4], vTextureCoord);
            break;
          case 5:
            finalColor = texture(${UNIFORM_SAMPLERS}[5], vTextureCoord);
            break;
          case 6:
            finalColor = texture(${UNIFORM_SAMPLERS}[6], vTextureCoord);
            break;
          case 7:
            finalColor = texture(${UNIFORM_SAMPLERS}[7], vTextureCoord);
            break;
          case 8:
            finalColor = texture(${UNIFORM_SAMPLERS}[8], vTextureCoord);
            break;
          case 9:
            finalColor = texture(${UNIFORM_SAMPLERS}[9], vTextureCoord);
            break;
          case 10:
            finalColor = texture(${UNIFORM_SAMPLERS}[10], vTextureCoord);
            break;
        }

        oColor = finalColor;
      }
      `;
        
