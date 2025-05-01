import { sdk } from './sdk'
import { T } from '@start9labs/start-sdk'
import { uiPort, getHttpInterfaceUrls, getHttpOnionUrl } from './utils'

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

  // Get the HTTP interface URLs
  const urls = await getHttpInterfaceUrls(effects)
  console.info(`Available URLs: ${JSON.stringify(urls)}`)

  // Use the first URL if DOMAIN is empty or not provided
  let domainWithProtocol = DOMAIN

  if (!domainWithProtocol || domainWithProtocol.trim() === '') {
    // If DOMAIN is empty, use the first URL from the HTTP interface
    if (urls.length > 0) {
      domainWithProtocol = urls[0]
      console.info(`Using URL from HTTP interface: ${domainWithProtocol}`)
    } else {
      // Fallback to a default value if no URLs are available
      domainWithProtocol = 'http://localhost'
      console.info(`No URLs available, using default: ${domainWithProtocol}`)
    }
  } else {
    // Ensure DOMAIN has a protocol
    if (
      !domainWithProtocol.startsWith('http://') &&
      !domainWithProtocol.startsWith('https://')
    ) {
      domainWithProtocol = `https://${domainWithProtocol}`
      console.info(`Added protocol to DOMAIN: ${domainWithProtocol}`)
    }
  }

  // Validate that the domain has a host
  const url = new URL(domainWithProtocol)
  if (!url.hostname || url.hostname === '') {
    console.error(`Invalid domain: ${domainWithProtocol} - hostname is empty`)
    // Use a fallback domain
    domainWithProtocol = 'http://localhost'
    console.info(`Using fallback domain: ${domainWithProtocol}`)
  }

  console.info(`Final DOMAIN value: ${domainWithProtocol}`)

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
    subcontainer: await sdk.SubContainer.of(
      effects,
      { imageId: 'vaultwarden' },
      sdk.Mounts.of().addVolume('main', null, '/data', false),
      'vaultwarden-sub',
    ),
    command: ['/start.sh'],
    env: {
      PASSWORD_ITERATIONS: '2000000',
      DOMAIN: domainWithProtocol,
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
