import { sdk } from '../sdk'
import { configJson } from '../fileModels/config.json'
import { systemSmtpJson } from '../fileModels/systemSmtp.json'

export const seedFiles = sdk.setupOnInit(async (effects, kind) => {
  await systemSmtpJson.merge(effects, {})

  if (kind === 'install') {
    await configJson.merge(effects, { signups_allowed: true })
  } else {
    await configJson.merge(effects, {})
  }
})
