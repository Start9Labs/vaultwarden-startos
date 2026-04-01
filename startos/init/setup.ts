import { setAdminToken } from '../actions/admin-token'
import { configJson } from '../fileModels/config.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { getVaultInterfaceUrls } from '../utils'

export const setup = sdk.setupOnInit(async (effects) => {
  const urls = await getVaultInterfaceUrls(effects)

  const config = await configJson
    .read((c) => ({ domain: c.domain, admin_token: c.admin_token }))
    .const(effects)

  if (!config?.domain || !urls.includes(config.domain)) {
    await configJson.merge(
      effects,
      {
        domain: urls.find((u) => u.includes('.local')),
      },
      { allowWriteAfterConst: true },
    )
  }

  if (!config?.admin_token) {
    await sdk.action.createOwnTask(effects, setAdminToken, 'critical', {
      reason: i18n('Create your Vaultwarden admin portal token'),
    })
  }
})
