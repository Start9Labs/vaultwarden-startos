import { T } from '@start9labs/start-sdk'
import { sdk } from './sdk'

export const uiPort = 80

// Host id (the `sdk.MultiHost.of` group) carrying both the vault and admin
// interfaces — distinct from the interface ids exported on it. Used for
// `sdk.host.getOwn` lookups.
export const mainHostId = 'main'
export const vaultInterfaceId = 'vault'

export function getVaultInterfaceUrls(effects: T.Effects): Promise<string[]> {
  return sdk.host
    .getOwn(effects, mainHostId, (host) => {
      const iface =
        host &&
        Object.values(host.bindings)
          .flatMap((b) => Object.values(b.interfaces))
          .find((i) => i.id === vaultInterfaceId)
      return iface ? iface.addressInfo.nonLocal.format() : []
    })
    .const()
}
