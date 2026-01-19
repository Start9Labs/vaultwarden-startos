import { VersionGraph } from '@start9labs/start-sdk'
import { current, other } from './versions'
import { configJson } from '../fileModels/config.json'
import { systemSmtpJson } from '../fileModels/systemSmtp.json'
import { sdk } from '../sdk'
import { toggleSignups } from '../actions/toggleSignups'

export const versionGraph = VersionGraph.of({
  current,
  other,
  preInstall: async (effects) => {
    await configJson.write(effects, {
      signups_allowed: true,
      smtp_security: 'starttls',
    })
    await systemSmtpJson.write(effects, { enabled: false, customFrom: null })
    await sdk.action.createOwnTask(effects, toggleSignups, 'important', {
      reason:
        'After creating your first account, you should run the Action to disable signups. As it stands, anyone with your Vaultwarden URL can create an account on your server.',
    })
  },
})
