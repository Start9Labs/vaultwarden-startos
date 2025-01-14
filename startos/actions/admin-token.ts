import { sdk } from '../sdk'
import { createAdminToken, hashToken } from '../utils'

export const setAdminToken = sdk.Action.withoutInput(
  // id
  'set-admin-token',

  // metadata
  async ({ effects }) => {
    const existing = await sdk.store
      .getOwn(effects, sdk.StorePath.ADMIN_TOKEN)
      .const()

    return {
      name: existing ? 'Update Admin Token' : 'Create Admin Token',
      description: existing
        ? 'Create your admin token in order to access the admin portal'
        : 'Update your admin token',
      warning: null,
      allowedStatuses: 'any',
      group: null,
      visibility: 'enabled',
    }
  },

  // the execution function
  async ({ effects }) => {
    const token = createAdminToken()

    await sdk.store.setOwn(
      effects,
      sdk.StorePath.ADMIN_TOKEN,
      await hashToken(token),
    )

    return {
      version: '1',
      title: 'Your Admin Token',
      message: 'Save this token to a secure location.',
      result: {
        value: token,
        copyable: true,
        masked: true,
        qr: false,
        type: 'single',
      },
    }
  },
)
