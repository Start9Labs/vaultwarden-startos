import { getRandomString } from '@start9labs/start-sdk/lib/util/getRandomString'
import { Store } from '../store'
import { Utils } from '@start9labs/start-sdk/lib/util/utils'
import { ExposeAllUiPaths } from '@start9labs/start-sdk/lib/types'

export async function createOrUpdateVault<Path extends string>(
  utils: Utils<Store>,
  key: ExposeAllUiPaths<Store, Path>,
  generator: { readonly charset: 'a-z,A-Z,0-9,/,='; readonly len: 64 },
) {
  await utils.store
    .getOwn(key as any)
    .once()
    .catch(async () => {
      const value = getRandomString(generator)
      await utils.store.setOwn(key as any, getRandomString(generator) as any)
      return value
    })
    .then(String)
}
