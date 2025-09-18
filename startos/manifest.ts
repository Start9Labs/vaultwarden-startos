import { setupManifest } from '@start9labs/start-sdk'
import { SDKImageInputSpec } from '@start9labs/start-sdk/base/lib/types/ManifestTypes'

const BUILD = process.env.BUILD || ''

const architectures =
  BUILD === 'x86_64' || BUILD === 'aarch64' ? [BUILD] : ['x86_64', 'aarch64']

export const manifest = setupManifest({
  id: 'vaultwarden',
  title: 'Vaultwarden',
  license: 'MIT',
  wrapperRepo: 'https://github.com/Start9Labs/vaultwarden-startos/',
  upstreamRepo: 'https://github.com/dani-garcia/vaultwarden/',
  supportSite: 'https://vaultwarden.discourse.group/',
  marketingSite: 'https://github.com/dani-garcia/vaultwarden/',
  donationUrl: 'https://liberapay.com/dani-garcia/',
  docsUrl:
    'https://github.com/Start9Labs/vaultwarden-startos/blob/update/040/docs/README.md',
  description: {
    short: 'Secure password management',
    long: 'Vaultwarden is a lightweight and secure password manager for storing and auto-filling sensitive information such as usernames and passwords, credit cards, identities, and notes. It is an alternative implementation of the Bitwarden server API written in Rust and compatible with upstream Bitwarden clients. All data is stored in an encrypted vault on your server.',
  },
  volumes: ['main'],
  images: {
    vaultwarden: {
      source: {
        dockerTag: 'vaultwarden/server:1.34.3-alpine',
      },
      arch: architectures
    } as SDKImageInputSpec,
    argon2: {
      source: {
        dockerBuild: {
          dockerfile: './argon2.Dockerfile',
        },
      },
      arch: architectures
    } as SDKImageInputSpec,
  },
  hardwareRequirements: { arch: architectures },
  alerts: {
    install: null,
    update: null,
    uninstall: null,
    restore: null,
    start: null,
    stop: null,
  },
  dependencies: {},
})
