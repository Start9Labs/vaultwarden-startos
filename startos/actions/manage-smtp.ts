import { sdk } from '../sdk'

const { InputSpec } = sdk

export const inputSpec = InputSpec.of({
  smtp: sdk.inputSpecConstants.smtpInputSpec,
})

export const manageSmtp = sdk.Action.withInput(
  // id
  'manage-smtp',

  // metadata
  async ({ effects }) => ({
    name: 'Configure SMTP',
    description: 'Add SMTP credentials for sending emails',
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  // form input specification
  inputSpec,

  // optionally pre-fill the input form
  async ({ effects }) => ({
    smtp: await sdk.store.getOwn(effects, sdk.StorePath.smtp).const(),
  }),

  // the execution function
  async ({ effects, input }) =>
    sdk.store.setOwn(effects, sdk.StorePath.smtp, input.smtp),
)
