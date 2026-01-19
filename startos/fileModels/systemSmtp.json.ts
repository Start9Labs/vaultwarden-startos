import { matches, FileHelper } from '@start9labs/start-sdk'

const { object, string, boolean } = matches

const shape = object({
  enabled: boolean,
  customFrom: string.nullable(),
})

export const systemSmtpJson = FileHelper.json(
  { volumeId: 'main', subpath: '/systemSmtp.json' },
  shape,
)
