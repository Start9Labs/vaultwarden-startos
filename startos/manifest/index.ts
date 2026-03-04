import { setupManifest } from '@start9labs/start-sdk'
import i18n from './i18n'

export const manifest = setupManifest({
  id: 'vaultwarden',
  title: 'Vaultwarden',
  license: 'MIT',
  packageRepo: 'https://github.com/Start9Labs/vaultwarden-startos/tree/update/040',
  upstreamRepo: 'https://github.com/dani-garcia/vaultwarden/',
  marketingUrl: 'https://github.com/dani-garcia/vaultwarden/',
  donationUrl: 'https://liberapay.com/dani-garcia/',
  docsUrls: ['https://github.com/dani-garcia/vaultwarden/wiki', 'https://bitwarden.com/help/'],
  description: i18n.description,
  volumes: ['main'],
  images: {
    vaultwarden: {
      source: {
        dockerTag: 'vaultwarden/server:1.35.4-alpine',
      },
      arch: ['x86_64', 'aarch64'],
    },
    argon2: {
      source: {
        dockerBuild: {
          dockerfile: './argon2.Dockerfile',
        },
      },
      arch: ['x86_64', 'aarch64'],
    },
  },
  dependencies: {},
})
