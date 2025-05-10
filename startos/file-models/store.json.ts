import { matches, FileHelper } from '@start9labs/start-sdk'

const { object, string, any } = matches

const shape = object({
  ADMIN_TOKEN: string,
  DOMAIN: string,
  smtp: object({
    selection: any,
    value: any,
  }).onMismatch({ selection: 'disabled' as any, value: {} }),
})

export const store = FileHelper.json(
  { volumeId: 'main', subpath: '/store.json' },
  shape,
)
