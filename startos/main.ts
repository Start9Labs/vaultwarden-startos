import { sdk } from './sdk'
import { T } from '@start9labs/start-sdk'
import { uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects, started }) => {
  /**
   * ======================== Setup (optional) ========================
   *
   * In this section, we fetch any resources or run any desired preliminary commands.
   */
  console.info('Starting Vaultwarden!')

  const { DOMAIN, ADMIN_TOKEN, smtp } = await sdk.store
    .getOwn(effects, sdk.StorePath)
    .const()

  let smtpCredentials: T.SmtpValue | null = null

  if (smtp.selection === 'system') {
    smtpCredentials = await sdk.getSystemSmtp(effects).const()
    if (smtpCredentials && smtp.value.customFrom)
      smtpCredentials.from = smtp.value.customFrom
  } else if (smtp.selection === 'custom') {
    smtpCredentials = smtp.value
  }

  let smtpEnv = {} as SMTP_ENV
  if (smtpCredentials) {
    smtpEnv = {
      SMTP_HOST: smtpCredentials.server,
      SMTP_FROM: smtpCredentials.from,
      SMTP_PORT: String(smtpCredentials.port),
      SMTP_SECURITY: 'starttls',
      SMTP_USERNAME: smtpCredentials.login,
    }
    if (smtpCredentials.password)
      smtpEnv.SMTP_PASSWORD = smtpCredentials.password
  }

  /**
   * ======================== Additional Health Checks (optional) ========================
   *
   * In this section, we define *additional* health checks beyond those included with each daemon (below).
   */
  const healthReceipts: T.HealthCheck[] = []

  /**
   * ======================== Daemons ========================
   *
   * In this section, we create one or more daemons that define the service runtime.
   *
   * Each daemon defines its own health check, which can optionally be exposed to the user.
   */
  return sdk.Daemons.of(effects, started, healthReceipts).addDaemon('primary', {
    subcontainer: { imageId: 'vaultwarden' },
    command: ['start.sh'],
    mounts: sdk.Mounts.of().addVolume('main', null, '/data', false),
    env: {
      PASSWORD_ITERATIONS: '2000000',
      DOMAIN,
      ADMIN_TOKEN,
      ...smtpEnv,
    },
    ready: {
      display: 'Web Interface',
      fn: () =>
        sdk.healthCheck.checkPortListening(effects, uiPort, {
          successMessage: 'The web interface is ready',
          errorMessage: 'The web interface is not ready',
        }),
    },
    requires: [],
  })
})

type SMTP_ENV = {
  SMTP_HOST: string
  SMTP_FROM: string
  SMTP_PORT: string
  SMTP_SECURITY: 'starttls'
  SMTP_USERNAME: string
  SMTP_PASSWORD?: string
}
