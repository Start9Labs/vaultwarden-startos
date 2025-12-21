import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { load } from 'js-yaml'
import { storeJson } from '../../fileModels/store.json'

export const v1_34_3_2_b0 = VersionInfo.of({
  version: '1.34.3:2-beta.0',
  releaseNotes: 'Revamped for StartOS 0.4.0',
  migrations: {
    up: async ({ effects }) => {
      // get old config.yaml
      const configYaml: { 'admin-token'?: string } | undefined =
        (await readFile(
          '/media/startos/volumes/main/start9/config.yaml',
          'utf-8',
        ).then(load, () => undefined)) as { 'admin-token'?: string } | undefined

      if (configYaml) {
        await storeJson.write(effects, {
          ADMIN_TOKEN: configYaml['admin-token'] || '',
          DOMAIN: '',
          smtp: {
            selection: 'disabled',
            value: {},
          },
        })

        // remove old start9 dir
        await rm('/media/startos/volumes/main/start9', {
          recursive: true,
        }).catch(console.error)
      }
    },
    down: IMPOSSIBLE,
  },
})
