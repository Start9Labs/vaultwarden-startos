import { setupExposeStore } from '@start9labs/start-sdk'

export type Store = {
  ADMIN_TOKEN: string // hashed value
  DOMAIN: string
}

export const exposedStore = setupExposeStore<Store>(() => [])
