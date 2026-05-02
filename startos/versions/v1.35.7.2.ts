import { VersionInfo, IMPOSSIBLE, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { configJson } from '../fileModels/config.json'

export const v_1_35_7_2 = VersionInfo.of({
  version: '1.35.7:2',
  releaseNotes: {
    en_US: 'Internal updates (start-sdk 1.3.3)',
    es_ES: 'Actualizaciones internas (start-sdk 1.3.3)',
    de_DE: 'Interne Aktualisierungen (start-sdk 1.3.3)',
    pl_PL: 'Aktualizacje wewnętrzne (start-sdk 1.3.3)',
    fr_FR: 'Mises à jour internes (start-sdk 1.3.3)',
  },
  migrations: {
    up: async ({ effects }) => {
      // get old config.yaml
      const configYaml: { 'admin-token'?: string } | undefined = await readFile(
        '/media/startos/volumes/main/start9/config.yaml',
        'utf-8',
      ).then(YAML.parse, () => undefined)

      if (configYaml) {
        await configJson.merge(effects, {
          admin_token: configYaml['admin-token'] || '',
          domain: '',
          smtp_security: 'starttls',
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
