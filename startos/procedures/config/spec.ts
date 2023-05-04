import { Config } from '@start9labs/start-sdk/lib/config/builder/config'
import { Value } from '@start9labs/start-sdk/lib/config/builder/value'

export const configSpec = Config.of({
  adminToken: Value.text({
    name: 'Admin Token',
    required: {
      default: {
        charset: 'a-z,A-Z,0-9,/,=',
        len: 64,
      },
    },
    description: 'Authentication token for logging into your admin dashboard.',
    warning: null,
    masked: true,
    placeholder: null,
    inputmode: 'text',
    patterns: [
      {
        regex: '[a-zA-Z0-9/=\\-_]+',
        description: 'Must be a valid base 64 string',
      },
    ],
    minLength: null,
    maxLength: null,
  }),
})
export const matchConfigSpec = configSpec.validator
export type ConfigSpec = typeof matchConfigSpec._TYPE
