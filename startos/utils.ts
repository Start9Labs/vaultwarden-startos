import { T } from '@start9labs/start-sdk'

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
