import { VersionInfo } from '@start9labs/start-sdk'

export const v1_34_1_2 = VersionInfo.of({
  version: '1.34.1:2',
  releaseNotes: `\
Revamped for StartOS 0.4.0

### Dependency Updates
*   Updated to StartOS SDK \`^0.32.0\`
*   Updated dev dependencies to latest versions`,
  migrations: {
    up: async () => {},
    down: async () => {},
  },
})
