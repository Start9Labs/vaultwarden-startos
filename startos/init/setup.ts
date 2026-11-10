import { configJson } from '../fileModels/config.json'
import { sdk } from '../sdk'
import { primaryUrl } from '../primaryUrl'

export const setup = sdk.setupOnInit(async (effects) => {
  const domain = await primaryUrl.bestUsable(effects).const()

  const configured = await configJson.read((c) => c.domain).const(effects)

  if (domain && domain !== configured) {
    await configJson.merge(effects, { domain }, { allowWriteAfterConst: true })
  }
})
