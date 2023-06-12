import { migrations } from './migrations'
import { sdk } from '../sdk'
import { setInterfaces } from './interfaces'
import { ADMIN_DEFAULT } from './actions/changeToken'
import { createOrUpdateVault } from './createOrUpdateVault'
/**
 * Here you define arbitrary code that runs once, on fresh install only
 */
const install = sdk.setupInstall(async ({ effects, utils }) => {
  const key = '/adminToken'
  const generator = ADMIN_DEFAULT
  await createOrUpdateVault(utils, key, generator)
})
const setupExports = sdk.setupExports(({ effects, utils }) => {
  return {
    ui: [{ path: '/adminToken', title: 'Admin Token' }],
    services: [],
  }
})
/**
 * Here you define arbitrary code that runs once, on uninstall only
 */
const uninstall = sdk.setupUninstall(async ({ effects, utils }) => {})

/**
 * This is a static function. There is no need to make changes here
 */
export const { init, uninit } = sdk.setupInit(
  migrations,
  install,
  uninstall,
  setInterfaces,
  setupExports,
)
