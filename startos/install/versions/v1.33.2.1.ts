import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { load } from 'js-yaml'
import { getHttpInterfaceUrls, getHttpOnionUrl, hashToken } from '../../utils'
import { store, StoreType } from '../../fileModels/store.json'
import { sdk } from '../../sdk'
import { setAdminToken } from '../../actions/admin-token'

export const v1_33_2_1 = VersionInfo.of({
  version: '1.33.2:1',
  releaseNotes: 'Revamped for StartOS 0.4.0',
  migrations: {
    up: async ({ effects }) => {
      // get all URLs
      const urls = await getHttpInterfaceUrls(effects)

      // get old config.yaml
      const configYaml = load(
        await readFile('/data/start9/config.yaml', 'utf-8'),
      ) as { 'admin-token'?: string } | undefined

      const toSave: StoreType = {
        ADMIN_TOKEN: '',
        DOMAIN: getHttpOnionUrl(urls),
        smtp: {
          selection: 'disabled',
          value: {},
        },
      }

      if (configYaml?.['admin-token']) {
        await store.write(effects, {
          ...toSave,
          ADMIN_TOKEN: configYaml['admin-token'],
        })
      } else {
        await store.write(effects, toSave)
        await sdk.action.createOwnTask(effects, setAdminToken, 'critical', {
          reason: 'Create your Vaultwarden admin password/token',
        })
      }

      // remove old start9 dir
      await rm('/data/start9', { recursive: true }).catch(console.error)
    },
    down: IMPOSSIBLE,
  },
})
