import { configJson } from '../fileModels/config.json'
import { systemSmtpJson } from '../fileModels/systemSmtp.json'
import { sdk } from '../sdk'

export const watchSystemSmtp = sdk.setupOnInit(async (effects) => {
  const systemSmtpSettings = await systemSmtpJson.read().const(effects)
  const systemSmtp = await sdk.getSystemSmtp(effects).const()

  if (systemSmtpSettings?.enabled && systemSmtp) {
    await configJson.merge(effects, {
      smtp_host: systemSmtp.host,
      smtp_port: systemSmtp.port,
      smtp_from: systemSmtpSettings.customFrom || systemSmtp.from,
      smtp_username: systemSmtp.username,
      smtp_password: systemSmtp.password ?? undefined,
      smtp_security: systemSmtp.security === 'tls' ? 'force_tls' : 'starttls',
    })
  }
})
