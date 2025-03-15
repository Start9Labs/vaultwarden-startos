import { setupExposeStore } from '@start9labs/start-sdk'
import { sdk } from './sdk'

export type Store = {
  ADMIN_TOKEN: string // hashed value
  DOMAIN: string
  smtp: typeof sdk.inputSpecConstants.smtpInputSpec._TYPE
}

export const exposedStore = setupExposeStore<Store>(() => [])
