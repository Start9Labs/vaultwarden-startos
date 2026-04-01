import { configJson } from '../fileModels/config.json'
import { sdk } from '../sdk'
import { getVaultInterfaceUrls } from '../utils'
import { i18n } from '../i18n'

const { InputSpec, Value } = sdk

export const inputSpec = InputSpec.of({
  domain: Value.dynamicSelect(async ({ effects }) => {
    const urls = await getVaultInterfaceUrls(effects)

    return {
      name: i18n('Primary Domain'),
      values: urls.reduce(
        (obj, url) => ({
          ...obj,
          [url]: url,
        }),
        {} as Record<string, string>,
      ),
      default: '',
    }
  }),
})

export const setPrimaryDomain = sdk.Action.withInput(
  // id
  'set-primary-domain',

  // metadata
  async ({ effects }) => ({
    name: i18n('Set Primary Domain'),
    description: i18n(
      'Choose which of your Vaultwarden http URLs should serve as the primary domain for the purposes of creating links, sending invites, etc.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  // form input specification
  inputSpec,

  // optionally pre-fill the input form
  async ({ effects }) => ({
    domain: (await configJson.read((c) => c.domain).once()) || undefined,
  }),

  // the execution function
  async ({ effects, input }) =>
    configJson.merge(effects, { domain: input.domain }),
)
