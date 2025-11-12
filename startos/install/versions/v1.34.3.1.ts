import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v1_34_3_1 = VersionInfo.of({
  version: '1.34.3:1-alpha.1',
  releaseNotes: `\
Updated for StartOS 0.4.0

### Dependency Updates
*   Updated SDK to beta.43
*   Updated interface name for backwards compatibility
*   Updated dev dependencies to latest versions`,
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
