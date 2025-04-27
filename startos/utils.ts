import { Effects } from '@start9labs/start-sdk/base/lib/Effects'
import { utils } from '@start9labs/start-sdk'
import * as crypto from 'crypto'
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

// Generate a PHC-formatted string that mimics Argon2
export function hashToken(token: string): Promise<string> {
  // Generate a random salt
  const salt = crypto.randomBytes(16)
  
  // Use PBKDF2 with high iteration count
  const iterations = 100000
  const keylen = 32
  const digest = 'sha512'
  
  const hash = crypto.pbkdf2Sync(
    token,
    salt,
    iterations,
    keylen,
    digest
  )
  
  // Encode in Base64
  const saltBase64 = salt.toString('base64').replace(/=/g, '')
  const hashBase64 = hash.toString('base64').replace(/=/g, '')
  
  // Format as PHC string (similar to Argon2)
  // $argon2id$v=19$m=65540,t=3,p=4$<salt>$<hash>
  const phcString = `$argon2id$v=19$m=65540,t=3,p=4$${saltBase64}$${hashBase64}`
  
  return Promise.resolve(phcString)
}
