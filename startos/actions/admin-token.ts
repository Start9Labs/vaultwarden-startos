import { T, utils } from '@start9labs/start-sdk'
import * as crypto from 'crypto'
import { sdk } from '../sdk'
import { configJson } from '../fileModels/config.json'
import { i18n } from '../i18n'

export const setAdminToken = sdk.Action.withoutInput(
  // id
  'set-admin-token',

  // metadata
  async ({ effects }) => {
    const existing = await configJson.read((c) => c.admin_token).const(effects)

    return {
      name: existing ? i18n('Update Admin Token') : i18n('Create Admin Token'),
      description: existing
        ? i18n('Create your admin token in order to access the admin portal')
        : i18n('Update your admin token'),
      warning: null,
      allowedStatuses: 'any',
      group: null,
      visibility: 'enabled',
    }
  },

  // the execution function
  async ({ effects }) => {
    const token = utils.getDefaultString({
      charset: 'A-Z,a-z,0-9',
      len: 32,
    })

    const hash = await hashToken(effects, token)

    await configJson.merge(effects, { admin_token: hash })

    return {
      version: '1',
      title: i18n('Your Admin Token'),
      message: i18n('Save this token to a secure location.'),
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

export async function hashToken(effects: T.Effects, token: string) {
  const salt = crypto.randomBytes(32).toString('base64')
  return (
    await sdk.SubContainer.withTemp(
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
  ).stdout
    .toString('utf-8')
    .trim()
}
