import { configJson } from '../fileModels/config.json'
import { systemSmtpJson } from '../fileModels/systemSmtp.json'
import { sdk } from '../sdk'

export const watchSystemSmtp = sdk.setupOnInit(async (effects) => {
  const systemSmtpSettings = await systemSmtpJson.read().const(effects)
  const systemSmtp = await sdk.getSystemSmtp(effects).const()

  if (systemSmtpSettings?.enabled && systemSmtp) {
    await configJson.merge(effects, {})
  }
})
