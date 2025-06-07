import { matches, FileHelper } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

const { object, string } = matches

const shape = object({
  ADMIN_TOKEN: string,
  DOMAIN: string,
  smtp: sdk.inputSpecConstants.smtpInputSpec.validator.onMismatch({
    selection: 'disabled',
    value: {},
  }),
})

export const storeJson = FileHelper.json(
  { volumeId: 'main', subpath: '/store.json' },
  shape,
)
