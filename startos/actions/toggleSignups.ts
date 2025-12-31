import { configJson } from '../fileModels/config.json'
import { sdk } from '../sdk'

export const toggleSignups = sdk.Action.withoutInput(
  // id
  'toggle-signups',

  // metadata
  async ({ effects }) => {
    const allowed = await configJson
      .read((c) => c.signups_allowed)
      .const(effects)

    return {
      name: allowed ? 'Disable Signups' : 'Enable Signups',
      description: allowed
        ? 'Signups are currently enabled. Run this action to prohibit new signups.'
        : 'Signups are currently disabled. Run this action to permit new signups.',
      warning: allowed
        ? null
        : 'Anyone with your Vaultwarden URL will be able to create an account on your server, which represents a security risk. Be careful!',
      allowedStatuses: 'any',
      group: null,
      visibility: 'enabled',
    }
  },

  // the execution function
  async ({ effects }) => {
    const allowed = await configJson
      .read((c) => c.signups_allowed)
      .const(effects)

    await configJson.merge(effects, {
      signups_allowed: !allowed,
    })
  },
)
