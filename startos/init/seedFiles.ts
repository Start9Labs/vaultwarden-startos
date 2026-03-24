import { sdk } from '../sdk'
import { configJson } from '../fileModels/config.json'
import { systemSmtpJson } from '../fileModels/systemSmtp.json'
import { toggleSignups } from '../actions/toggleSignups'

export const seedFiles = sdk.setupOnInit(async (effects, kind) => {
  await systemSmtpJson.merge(effects, {})

  if (kind === 'install') {
    await configJson.merge(effects, { signups_allowed: true })
    await sdk.action.createOwnTask(effects, toggleSignups, 'important', {
      reason:
        'After creating your first account, you should run the Action to disable signups. As it stands, anyone with your Vaultwarden URL can create an account on your server.',
    })
  } else {
    await configJson.merge(effects, {})
  }
})
