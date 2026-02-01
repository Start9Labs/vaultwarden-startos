import { matches, FileHelper } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

const { object, string, literal, natural, boolean } = matches

const shape = object({
  domain: string.optional(),
  admin_token: string.optional(),
  signups_allowed: boolean.onMismatch(false),
  smtp_host: string.optional(),
  smtp_security: literal('starttls').onMismatch('starttls'),
  smtp_port: natural.optional().onMismatch(undefined),
  smtp_from: string.optional().onMismatch(undefined),
  smtp_from_name: string.optional().onMismatch(undefined),
  smtp_username: string.optional().onMismatch(undefined),
  smtp_password: string.optional().onMismatch(undefined),
})

export const configJson = FileHelper.json(
  { base: sdk.volumes.main, subpath: '/config.json' },
  shape,
)
