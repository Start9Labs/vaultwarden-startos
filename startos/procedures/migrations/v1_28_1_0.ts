import { sdk } from '../../sdk'
import { ADMIN_DEFAULT } from '../actions/changeToken'
import { createOrUpdateVault } from '../createOrUpdateVault'

export const v1_28_1_0 = sdk.Migration.of({
  version: '1.28.1.0',
  up: async ({ effects, utils }) => {
    await createOrUpdateVault(utils, '/adminToken', ADMIN_DEFAULT)
    await effects.setConfigured(true)
  },
  down: async ({ effects, utils }) => {},
})
