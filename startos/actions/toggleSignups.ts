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
        ? i18n(
            'Signups are currently enabled. Run this action to prohibit new signups.',
          )
        : i18n(
            'Signups are currently disabled. Run this action to permit new signups.',
          ),
      warning: allowed
        ? i18n(
            "New accounts can no longer be created by signing up. Existing accounts are unaffected. Invitations still let people create accounts, whether sent from the Admin Portal or by any user to an organization or for emergency access; to block new-user invitations from organizations and emergency access, turn off Allow invitations in the Admin Portal's General settings. This does not revoke existing invitations or block Admin Portal invitations. Without SMTP, whoever first registers an invited email address gets that account.",
          )
        : i18n(
            'Anyone with your Vaultwarden URL will be able to create an account on your server, which represents a security risk. Be careful!',
          ),
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
