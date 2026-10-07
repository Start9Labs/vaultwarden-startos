import { storeJson } from './fileModels/store.json'
import { i18n } from './i18n'
import { sdk } from './sdk'
import { mainHostId, vaultInterfaceId } from './utils'

export const primaryUrl = sdk.setupPrimaryUrl({
  id: 'set-primary-domain',
  hostId: mainHostId,
  interfaceId: vaultInterfaceId,
  metadata: {
    name: i18n('Set Primary Domain'),
    description: i18n(
      'Choose the URL Vaultwarden puts in the links and emails it sends, such as invitations and password resets. Passkeys and security keys used for two-step login are tied to this domain, so after a change they must be registered again.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  },
  field: { name: i18n('Primary Domain'), description: null },
  get: storeJson.read((s) => s.primaryUrl),
  set: (effects, url) => storeJson.merge(effects, { primaryUrl: url }),
})
