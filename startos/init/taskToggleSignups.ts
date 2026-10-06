import { sdk } from '../sdk'
import { toggleSignups } from '../actions/toggleSignups'
import { i18n } from '../i18n'

export const taskToggleSignups = sdk.setupOnInit(async (effects, kind) => {
  if (kind === 'install') {
    await sdk.action.createOwnTask(effects, toggleSignups, 'important', {
      reason: i18n(
        'After creating your first account, you should run the Action to disable signups. As it stands, anyone with your Vaultwarden URL can create an account on your server.',
      ),
    })
  }
})
