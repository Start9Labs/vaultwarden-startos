import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

const shape = z.object({
  domain: z.string().optional().catch(undefined),
  admin_token: z.string().optional().catch(undefined),
  signups_allowed: z.boolean().catch(false),
  smtp_host: z.string().optional().catch(undefined),
  smtp_security: z.enum(['starttls', 'force_tls']).catch('starttls'),
  smtp_port: z.number().int().nonnegative().optional().catch(undefined),
  smtp_from: z.string().optional().catch(undefined),
  smtp_from_name: z.string().optional().catch(undefined),
  smtp_username: z.string().optional().catch(undefined),
  smtp_password: z.string().optional().catch(undefined),
})

export const configJson = FileHelper.json(
  { base: sdk.volumes.main, subpath: '/config.json' },
  shape,
)
