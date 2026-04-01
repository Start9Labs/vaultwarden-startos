import { configJson } from '../fileModels/config.json'
import { sdk } from '../sdk'
import { i18n } from '../i18n'

export const toggleSignups = sdk.Action.withoutInput(
  // id
  'toggle-signups',

  // metadata
  async ({ effects }) => {
    const allowed = await configJson
      .read((c) => c.signups_allowed)
      .const(effects)

    return {
      name: allowed ? i18n('Disable Signups') : i18n('Enable Signups'),
      description: allowed
        ? i18n('Signups are currently enabled. Run this action to prohibit new signups.')
        : i18n('Signups are currently disabled. Run this action to permit new signups.'),
      warning: allowed
        ? null
        : i18n('Anyone with your Vaultwarden URL will be able to create an account on your server, which represents a security risk. Be careful!'),
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
