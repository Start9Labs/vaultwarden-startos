import { sdk } from '../sdk'
import { getHttpInterfaceUrls, getHttpOnionUrl } from '../utils'

const { InputSpec, Value } = sdk

export const inputSpec = InputSpec.of({
  domain: Value.dynamicSelect(async ({ effects }) => {
    const urls = await getHttpInterfaceUrls(effects)

    return {
      name: 'Primary Domain',
      values: urls.reduce(
        (obj, url) => ({
          ...obj,
          [url]: url,
        }),
        {} as Record<string, string>,
      ),
      default: getHttpOnionUrl(urls),
    }
  }),
})

export const setPrimaryDomain = sdk.Action.withInput(
  // id
  'set-primary-domain',

  // metadata
  async ({ effects }) => ({
    name: 'Set Primary Domain',
    description:
      'Choose which of your Vaultwarden http URLs should serve as the primary domain for the purposes of creating links, sending invites, etc.',
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  // form input specification
  inputSpec,

  // optionally pre-fill the input form
  async ({ effects }) => ({
    domain: await sdk.store.getOwn(effects, sdk.StorePath.DOMAIN).const(),
  }),

  // the execution function
  async ({ effects, input }) =>
    sdk.store.setOwn(effects, sdk.StorePath.DOMAIN, input.domain),
)
