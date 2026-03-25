import { sdk } from '../sdk'
import { toggleSignups } from '../actions/toggleSignups'

export const taskToggleSignups = sdk.setupOnInit(async (effects, kind) => {
  if (kind === 'install') {
    await sdk.action.createOwnTask(effects, toggleSignups, 'important', {
      reason:
        'After creating your first account, you should run the Action to disable signups. As it stands, anyone with your Vaultwarden URL can create an account on your server.',
    })
  }
})
