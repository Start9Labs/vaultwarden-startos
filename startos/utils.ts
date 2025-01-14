import { Effects } from '@start9labs/start-sdk/base/lib/Effects'
import { utils } from '@start9labs/start-sdk'
import * as argon2 from 'argon2'
import { sdk } from './sdk'

export const uiPort = 80

export async function getHttpInterfaceUrls(
  effects: Effects,
): Promise<string[]> {
  const httpInterface = await sdk.serviceInterface
    .getOwn(effects, 'http')
    .const()

  return httpInterface?.addressInfo?.urls || []
}

export function getHttpOnionUrl(urls: string[]): string {
  return urls.find((u) => u.startsWith('http:') && u.includes('.onion')) || ''
}

export function createAdminToken(): string {
  return utils.getDefaultString({
    charset: 'A-Z,a-z,0-9,+,/,=',
    len: 32,
  })
}

export function hashToken(token: string): Promise<string> {
  return argon2.hash(token, {
    memoryCost: 65540,
    timeCost: 3,
    parallelism: 4,
  })
}
