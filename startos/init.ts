import { sdk } from './sdk'
import { setDependencies } from './dependencies'
import { setInterfaces } from './interfaces'
import { versions } from './versions'
import { actions } from './actions'
import { setAdminToken } from './actions/admin-token'
import { getHttpInterfaceUrls, getHttpOnionUrl } from './utils'
import { store } from './file-models/store.json'

// **** Pre Install ****
const preInstall = sdk.setupPreInstall(async ({ effects }) => {
  await store.write(effects, {
    ADMIN_TOKEN: '',
    DOMAIN: '',
    smtp: { selection: 'disabled', value: {} },
  })
})

// **** Post Install ****
const postInstall = sdk.setupPostInstall(async ({ effects }) => {
  await sdk.action.requestOwn(effects, setAdminToken, 'critical')

  const urls = await getHttpInterfaceUrls(effects)

  await store.merge(effects, { DOMAIN: getHttpOnionUrl(urls) })
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
)
