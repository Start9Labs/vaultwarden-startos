import { setAdminToken } from '../actions/admin-token'
import { storeJson } from '../fileModels/store.json'
import { sdk } from '../sdk'
import { getVaultInterfaceUrls } from '../utils'

export const setup = sdk.setupOnInit(async (effects) => {
  const urls = await getVaultInterfaceUrls(effects)

  const store = await storeJson.read().const(effects)

  if (!store?.DOMAIN || !urls.includes(store.DOMAIN)) {
    await storeJson.merge(
      effects,
      {
        DOMAIN: urls.find((u) => u.includes('.local')),
      },
      { allowWriteAfterConst: true },
    )
  }

  if (!store?.ADMIN_TOKEN) {
    await sdk.action.createOwnTask(effects, setAdminToken, 'critical', {
      reason: 'Create your Vaultwarden admin password/token',
    })
  }
})
