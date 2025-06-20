import { setAdminToken } from '../actions/admin-token'
import { storeJson } from '../fileModels/store.json'
import { sdk } from '../sdk'
import { getVaultInterfaceUrls, getHttpOnionUrl } from '../utils'

export const setup = sdk.setupOnInit(async (effects) => {
  const store = await storeJson
    .read((s) => ({ DOMAIN: s.DOMAIN, ADMIN_TOKEN: s.ADMIN_TOKEN }))
    .const(effects)

  if (!store?.DOMAIN) {
    const urls = await getVaultInterfaceUrls(effects)
    await storeJson.merge(
      effects,
      { DOMAIN: getHttpOnionUrl(urls) },
      { allowWriteAfterConst: true },
    )
  }

  if (!store?.ADMIN_TOKEN) {
    await sdk.action.createOwnTask(effects, setAdminToken, 'critical', {
      reason: 'Create your Vaultwarden admin password/token',
    })
  }
})
