import { T } from '@start9labs/start-sdk'
import * as crypto from 'crypto'
import { sdk } from './sdk'

export const uiPort = 80

// Host id (the `sdk.MultiHost.of` group) carrying both the vault and admin
// interfaces — distinct from the interface ids exported on it.
export const mainHostId = 'main'
export const vaultInterfaceId = 'vault'

export function smtpConfig(
  smtp: T.SmtpValue | null,
  customFrom?: string | null,
) {
  return {
    smtp_host: smtp?.host,
    smtp_port: smtp?.port,
    smtp_from: smtp ? customFrom || smtp.from : undefined,
    smtp_username: smtp?.username,
    smtp_password: smtp?.password ?? undefined,
    smtp_security: smtp?.security === 'tls' ? 'force_tls' : 'starttls',
  } as const
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
