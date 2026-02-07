import { setupManifest } from '@start9labs/start-sdk'
import i18n from './i18n'

export const manifest = setupManifest({
  id: 'vaultwarden',
  title: 'Vaultwarden',
  license: 'MIT',
  wrapperRepo: 'https://github.com/Start9Labs/vaultwarden-startos/',
  upstreamRepo: 'https://github.com/dani-garcia/vaultwarden/',
  supportSite: 'https://vaultwarden.discourse.group/',
  marketingSite: 'https://github.com/dani-garcia/vaultwarden/',
  donationUrl: 'https://liberapay.com/dani-garcia/',
  docsUrl: 'https://github.com/dani-garcia/vaultwarden/wiki',
  description: i18n.description,
  volumes: ['main'],
  images: {
    vaultwarden: {
      source: {
        dockerTag: 'vaultwarden/server:1.35.2-alpine',
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
