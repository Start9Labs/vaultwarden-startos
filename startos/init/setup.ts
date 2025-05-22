import { setAdminToken } from '../actions/admin-token'
import { store } from '../fileModels/store.json'
import { sdk } from '../sdk'
import { getHttpInterfaceUrls, getHttpOnionUrl } from '../utils'

export const setup = sdk.setupOnInstall(async (effects) => {
  const urls = await getHttpInterfaceUrls(effects)
  await store.merge(effects, { DOMAIN: getHttpOnionUrl(urls) })

  await sdk.action.createOwnTask(effects, setAdminToken, 'critical', {
    reason: 'Create your Vaultwarden admin password/token',
  })
})
