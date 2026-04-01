import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

const shape = z.object({
  enabled: z.boolean().catch(false),
  customFrom: z.string().nullable().catch(null),
})

export const systemSmtpJson = FileHelper.json(
  { base: sdk.volumes.main, subpath: '/systemSmtp.json' },
  shape,
)
