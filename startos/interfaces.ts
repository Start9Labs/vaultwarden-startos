import { sdk } from './sdk'
import { uiPort } from './utils'

export const setInterfaces = sdk.setupInterfaces(async ({ effects }) => {
  const uiMulti = sdk.MultiHost.of(effects, 'ui-multi')
  const uiMultiOrigin = await uiMulti.bindPort(uiPort, {
    protocol: 'http',
  })

  // web vault
  const vault = sdk.createInterface(effects, {
    name: 'Web Vault',
    id: 'vault',
    description:
      'Primary user interface for interacting with Vaultwarden in a web browser',
    type: 'ui',
    masked: false,
    schemeOverride: null,
    username: null,
    path: '',
    query: {},
  })

  // admin portal
  const admin = sdk.createInterface(effects, {
    name: 'Admin Portal',
    id: 'admin',
    description: 'User interface for administrator operations.',
    type: 'ui',
    masked: false,
    schemeOverride: null,
    username: null,
    path: '/admin',
    query: {},
  })

  const uiReceipt = await uiMultiOrigin.export([vault, admin])

  return [uiReceipt]
})
