import { sdk } from '../../sdk'
const { Config, Value } = sdk

export const ADMIN_DEFAULT = {
  charset: 'a-z,A-Z,0-9,/,=',
  len: 64,
} as const
/**
 * This is an example Action
 *
 * By convention, each action receives its own file
 *
 * Actions optionally take an arbitrary config form as input
 */
const input = Config.of({
  adminToken: Value.text({
    name: 'Admin Token',
    required: {
      default: ADMIN_DEFAULT,
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

/**
 * This function defines the Action, including the FormSpec (if any)
 *
 * The first argument is the Action metadata. The second argument is the Action function
 *
 * If no input is required, FormSpec would be null
 */
export const changeToken = sdk.createAction(
  {
    name: 'Change the admin token',
    description: 'Need to change the token for vaultwarden',
    id: 'changeToken',
    input,
    allowedStatuses: 'any',
  },
  async ({ effects, utils, input }) => {
    await utils.store.setOwn('/adminToken', input.adminToken)

    return {
      message: `Changed the admin token`,
      value: null,
    }
  },
)
