import { configJson } from '../fileModels/config.json'
import { systemSmtpJson } from '../fileModels/systemSmtp.json'
import { sdk } from '../sdk'
import { i18n } from '../i18n'

const { InputSpec } = sdk

export const inputSpec = InputSpec.of({
  smtp: sdk.inputSpecConstants.smtpInputSpec,
})

export const manageSmtp = sdk.Action.withInput(
  // id
  'manage-smtp',

  // metadata
  async ({ effects }) => ({
    name: i18n('Configure SMTP'),
    description: i18n('Add SMTP credentials for sending emails.'),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  // form input specification
  inputSpec,

  // optionally pre-fill the input form
  async ({ effects }) => {
    const smtp = await systemSmtpJson.read().once()

    if (smtp?.enabled) {
      return {
        smtp: {
          selection: 'system' as const,
          value: { customFrom: smtp.customFrom || undefined },
        },
      }
    }

    const config = await configJson.read().once()

    if (config?.smtp_host) {
      const { smtp_host, smtp_port, smtp_from, smtp_username, smtp_password } =
        config
      return {
        smtp: {
          selection: 'custom' as const,
          value: {
            server: smtp_host,
            port: smtp_port,
            from: smtp_from,
            login: smtp_username,
            password: smtp_password,
          },
        },
      }
    }

    return { smtp: { selection: 'disabled' as const, value: {} } }
  },

  // the execution function
  async ({ effects, input }) => {
    if (input.smtp.selection === 'system') {
      await systemSmtpJson.merge(effects, {
        enabled: true,
        customFrom: input.smtp.value.customFrom,
      })
    } else if (input.smtp.selection === 'custom') {
      const { server, port, from, login, password } = input.smtp.value
      await configJson.merge(effects, {
        smtp_host: server,
        smtp_port: port,
        smtp_from: from,
        smtp_username: login,
        smtp_password: password || undefined,
      })
    } else {
      await configJson.merge(effects, {
        smtp_host: undefined,
        smtp_port: undefined,
        smtp_from: undefined,
        smtp_username: undefined,
        smtp_password: undefined,
      })
    }
  },
)
