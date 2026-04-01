import { sdk } from './sdk'
import { uiPort } from './utils'
import { i18n } from './i18n'

export const setInterfaces = sdk.setupInterfaces(async ({ effects }) => {
  const uiMulti = sdk.MultiHost.of(effects, 'main')
  const uiMultiOrigin = await uiMulti.bindPort(uiPort, {
    protocol: 'http',
  })

  // web vault
  const vault = sdk.createInterface(effects, {
    name: i18n('Web Vault'),
    id: 'vault',
    description: i18n(
      'Primary user interface for interacting with Vaultwarden in a web browser',
    ),
    type: 'ui',
    masked: false,
    schemeOverride: null,
    username: null,
    path: '',
    query: {},
  })

  // admin portal
  const admin = sdk.createInterface(effects, {
    name: i18n('Admin Portal'),
    id: 'admin',
    description: i18n('User interface for administrator operations.'),
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
