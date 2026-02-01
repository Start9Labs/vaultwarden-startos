import { matches, FileHelper } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

const { object, string, boolean } = matches

const shape = object({
  enabled: boolean,
  customFrom: string.nullable(),
})

export const systemSmtpJson = FileHelper.json(
  { base: sdk.volumes.main, subpath: '/systemSmtp.json' },
  shape,
)
