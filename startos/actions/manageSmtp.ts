import { smtpPrefill } from '@start9labs/start-sdk'
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
        smtp: smtpPrefill({
          selection: 'system',
          value: { customFrom: smtp.customFrom },
        }),
      }
    }

    const config = await configJson.read().once()

    if (config?.smtp_host) {
      const isTls = config.smtp_security === 'force_tls'
      return {
        smtp: smtpPrefill({
          selection: 'custom',
          value: {
            provider: {
              selection: 'other',
              value: {
                host: config.smtp_host,
                from: config.smtp_from ?? '',
                username: config.smtp_username ?? '',
                password: config.smtp_password ?? null,
                security: {
                  selection: isTls ? 'tls' : 'starttls',
                  value: {
                    port: String(config.smtp_port ?? (isTls ? 465 : 587)),
                  },
                },
              },
            },
          },
        }),
      }
    }

    return { smtp: smtpPrefill({ selection: 'disabled', value: {} }) }
  },

  // the execution function
  async ({ effects, input }) => {
    if (input.smtp.selection === 'system') {
      await systemSmtpJson.merge(effects, {
        enabled: true,
        customFrom: input.smtp.value.customFrom,
      })
    } else if (input.smtp.selection === 'custom') {
      const { host, from, username, password, security } =
        input.smtp.value.provider.value
      await configJson.merge(effects, {
        smtp_host: host,
        smtp_port: Number(security.value.port),
        smtp_from: from,
        smtp_username: username,
        smtp_password: password || undefined,
        smtp_security:
          security.selection === 'tls' ? 'force_tls' : 'starttls',
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
