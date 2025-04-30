import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'
import { readFile, rmdir } from 'fs/promises'
import { load } from 'js-yaml'
import { getHttpInterfaceUrls, getHttpOnionUrl, hashToken } from '../utils'
import { sdk } from '../sdk'

export const v1_33_2_1 = VersionInfo.of({
  version: '1.33.2:1',
  releaseNotes: 'Revamped for StartOS 0.3.6',
  migrations: {
    up: async ({ effects }) => {
      // get all URLs
      const urls = await getHttpInterfaceUrls(effects)

      // get old config.yaml
      const configYaml = load(
        await readFile('/data/start9/config.yaml', 'utf-8'),
      ) as { 'admin-token': string }

      await sdk.store.setOwn(effects, sdk.StorePath, {
        ADMIN_TOKEN: await hashToken(effects, configYaml['admin-token']),
        DOMAIN: getHttpOnionUrl(urls),
        smtp: {
          selection: 'disabled',
          value: {},
        },
      })

      // remove old start9 dir
      await rmdir('/data/start9')
    },
    down: IMPOSSIBLE,
  },
})
