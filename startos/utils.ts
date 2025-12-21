import { T } from '@start9labs/start-sdk'
import { sdk } from './sdk'

export const uiPort = 80

export async function getVaultInterfaceUrls(
  effects: T.Effects,
): Promise<string[]> {
  const vaultInterface = await sdk.serviceInterface
    .getOwn(effects, 'vault')
    .const()

  return vaultInterface?.addressInfo?.nonLocal.format() || []
}
