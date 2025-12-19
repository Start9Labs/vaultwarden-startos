import { utils, T } from '@start9labs/start-sdk'
import * as crypto from 'crypto'
import { sdk } from './sdk'

export const uiPort = 80

export async function getVaultInterfaceUrls(
  effects: T.Effects,
): Promise<string[]> {
  const vaultInterface = await sdk.serviceInterface
    .getOwn(effects, 'vault')
    .const()

  return vaultInterface?.addressInfo?.format() || []
}

export function getHttpOnionUrl(urls: string[]): string {
  return urls.find((u) => u.startsWith('http:') && u.includes('.onion')) || ''
}

export function createAdminToken(): string {
  return utils.getDefaultString({
    charset: 'A-Z,a-z,0-9',
    len: 32,
  })
}

export function createSalt(): string {
  return crypto.randomBytes(32).toString('base64')
}

export async function hashToken(effects: T.Effects, token: string) {
  const salt = createSalt()
  return (
    await sdk.SubContainer.withTemp(
      effects,
      { imageId: 'argon2' },
      null,
      'argon2',
      (subc) =>
        subc.execFail(
          ['argon2', salt, '-e', '-id', '-k', '65540', '-t', '3', '-p', '4'],
          {
            input: token,
          },
        ),
    )
  ).stdout
    .toString('utf-8')
    .trim()
}
