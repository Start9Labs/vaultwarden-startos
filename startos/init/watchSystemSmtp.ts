import { configJson } from '../fileModels/config.json'
import { systemSmtpJson } from '../fileModels/systemSmtp.json'
import { sdk } from '../sdk'
import { smtpConfig } from '../utils'

export const watchSystemSmtp = sdk.setupOnInit(async (effects) => {
  const systemSmtpSettings = await systemSmtpJson.read().const(effects)
  const systemSmtp = await sdk.getSystemSmtp(effects).const()

  if (systemSmtpSettings?.enabled) {
    await configJson.merge(
      effects,
      smtpConfig(systemSmtp, systemSmtpSettings.customFrom),
    )
  }
})
