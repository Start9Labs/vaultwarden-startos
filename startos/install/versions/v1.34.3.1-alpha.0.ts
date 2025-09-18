import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const v1_34_3_1 = VersionInfo.of({
  version: '1.34.3:1-alpha.0',
  releaseNotes: `\
Updated for StartOS 0.4.0

### Dependency Updates
*   Updated SDK to beta.41
*   Updated dev dependencies to latest versions`,
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
