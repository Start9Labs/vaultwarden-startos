import { configSpec } from './spec'
import { sdk } from '../../sdk'
import { setInterfaces } from '../interfaces'

/**
 * This function executes on config save
 *
 * Use it to persist config data to various files and to establish any resulting dependencies
 */
export const save = sdk.setupConfigSave(
  configSpec,
  async ({ effects, utils, input, dependencies }) => {
    const dependenciesReceipt = await effects.setDependencies([])

    return {
      interfacesReceipt: await setInterfaces({ effects, utils, input }),
      dependenciesReceipt,
      restart: true,
    }
  },
)
