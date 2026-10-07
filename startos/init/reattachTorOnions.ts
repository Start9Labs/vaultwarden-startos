import { setupOnionReattachment } from 'tor-startos/startos/utils/reattach'
import { storeJson } from '../fileModels/store.json'
import { manifest } from '../manifest'
import { sdk } from '../sdk'
import { mainHostId, uiPort, vaultInterfaceId } from '../utils'

export const reattachTorOnions = setupOnionReattachment(sdk, {
  packageId: manifest.id,
  hostId: mainHostId,
  to: { interfaceId: vaultInterfaceId, internalPort: uiPort, ssl: false },
  pending: storeJson.read((s) => s.reattachTorOnions),
  clear: (effects) =>
    storeJson.merge(
      effects,
      { reattachTorOnions: false },
      { allowWriteAfterConst: true },
    ),
})
