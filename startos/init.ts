import { sdk } from './sdk'
import { exposedStore, initStore } from './store'
import { setDependencies } from './dependencies'
import { setInterfaces } from './interfaces'
import { versions } from './versions'
import { actions } from './actions'
import { setAdminToken } from './actions/admin-token'
import { getHttpInterfaceUrls, getHttpOnionUrl } from './utils'

// **** Pre Install ****
const preInstall = sdk.setupPreInstall(async ({ effects }) => {})

// **** Post Install ****
const postInstall = sdk.setupPostInstall(async ({ effects }) => {
  await sdk.action.requestOwn(effects, setAdminToken, 'critical')

  const urls = await getHttpInterfaceUrls(effects)

  await sdk.store.setOwn(effects, sdk.StorePath.DOMAIN, getHttpOnionUrl(urls))
})

// **** Uninstall ****
const uninstall = sdk.setupUninstall(async ({ effects }) => {})

/**
 * Plumbing. DO NOT EDIT.
 */
export const { packageInit, packageUninit, containerInit } = sdk.setupInit(
  versions,
  preInstall,
  postInstall,
  uninstall,
  setInterfaces,
  setDependencies,
  actions,
  initStore,
  exposedStore,
)
