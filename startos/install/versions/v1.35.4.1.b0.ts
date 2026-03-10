import { VersionInfo, IMPOSSIBLE, YAML } from '@start9labs/start-sdk'
import { readFile, rm } from 'fs/promises'
import { configJson } from '../../fileModels/config.json'

export const v_1_35_4_1_b0 = VersionInfo.of({
  version: '1.35.4:1-beta.0',
  releaseNotes: {
    en_US: 'Update to StartOS SDK beta.59',
    es_ES: 'Actualización a StartOS SDK beta.59',
    de_DE: 'Update auf StartOS SDK beta.59',
    pl_PL: 'Aktualizacja do StartOS SDK beta.59',
    fr_FR: 'Mise à jour vers StartOS SDK beta.59',
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
