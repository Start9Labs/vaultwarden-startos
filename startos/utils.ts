import { T } from '@start9labs/start-sdk'
import { sdk } from './sdk'

export const uiPort = 80

export async function getVaultInterfaceUrls(
  effects: T.Effects,
): Promise<string[]> {
  return sdk.serviceInterface
    .getOwn(effects, 'vault', (i) => i?.addressInfo?.nonLocal.format() || [])
    .const()
}
