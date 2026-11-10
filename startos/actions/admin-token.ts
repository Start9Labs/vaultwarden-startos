import { T, utils } from '@start9labs/start-sdk'
import * as crypto from 'crypto'
import { sdk } from '../sdk'
import { configJson } from '../fileModels/config.json'
import { i18n } from '../i18n'

export const toggleAdminPortal = sdk.Action.withoutInput(
  // id
  'toggle-admin-portal',

  // metadata
  async ({ effects }) => {
    const enabled = !!(await configJson
      .read((c) => c.admin_token)
      .const(effects))

    return {
      name: enabled
        ? i18n('Disable Admin Portal')
        : i18n('Enable Admin Portal'),
      description: enabled
        ? i18n(
            'The Admin Portal is on. Run this action to turn it off and delete its token.',
          )
        : i18n(
            'The Admin Portal is off. Run this action to turn it on and generate its token, shown once.',
          ),
      warning: enabled
        ? i18n(
            'The current admin token stops working. While the portal is off, users can be invited only by turning it back on.',
          )
        : i18n(
            'The Admin Portal will be reachable at every address the Web Vault is, protected only by its token.',
          ),
      allowedStatuses: 'any',
      group: null,
      visibility: 'enabled',
    }
  },

  // the execution function
  async ({ effects }) => {
    if (await configJson.read((c) => c.admin_token).once()) {
      await configJson.merge(effects, { admin_token: '' })
      return null
    }
    return issueAdminToken(effects)
  },
)

export const rotateAdminToken = sdk.Action.withoutInput(
  // id
  'rotate-admin-token',

  // metadata
  async ({ effects }) => ({
    name: i18n('Rotate Admin Token'),
    description: i18n('Generate a new token for the Admin Portal, shown once.'),
    warning: i18n(
      'Replaces the current admin token. The old token stops working, and the new one is shown only once.',
    ),
    allowedStatuses: 'any',
    group: null,
    visibility: (await configJson.read((c) => c.admin_token).const(effects))
      ? 'enabled'
      : 'hidden',
  }),

  // the execution function
  async ({ effects }) => issueAdminToken(effects),
)

async function issueAdminToken(effects: T.Effects) {
  const token = utils.getDefaultString({
    charset: 'A-Z,a-z,0-9',
    len: 32,
  })

  await configJson.merge(effects, {
    admin_token: await hashToken(effects, token),
  })

  return {
    version: '1' as const,
    title: i18n('Your Admin Token'),
    message: i18n('Save this token to a secure location.'),
    result: {
      value: token,
      copyable: true,
      masked: true,
      qr: false,
      launchable: false,
      type: 'single' as const,
    },
  }
}

export async function hashToken(effects: T.Effects, token: string) {
  const salt = crypto.randomBytes(32).toString('base64')
  const { stdout } = await sdk.SubContainer.withTemp(
    effects,
    { imageId: 'argon2' },
    null,
    'argon2',
    (subc) =>
      subc.execFail(
        ['argon2', salt, '-e', '-id', '-k', '65540', '-t', '3', '-p', '4'],
        {
          input: token,
        },
      ),
  )
  return String(stdout).trim()
}
