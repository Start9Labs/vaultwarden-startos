import { CheckResult } from '@start9labs/start-sdk/lib/health/checkFns'
import { ExpectedExports } from '@start9labs/start-sdk/lib/types'
import { HealthReceipt } from '@start9labs/start-sdk/lib/health/HealthReceipt'
import { Daemons } from '@start9labs/start-sdk/lib/mainFn/Daemons'
import { sdk } from '../sdk'
import { ADMIN_DEFAULT } from './actions/changeToken'

export const main: ExpectedExports.main = sdk.setupMain(
  async ({ effects, utils, started }) => {
    /**
     * ======================== Setup ========================
     *
     * In this section, you will fetch any resources or run any commands necessary to run the service
     */
    const env = {
      ADMIN_TOKEN: await utils.store.getOwn('/adminToken').const(),
      PASSWORD_ITERATIONS: '2000000',
      CONF_FILE: '/etc/nginx/conf.d/default.conf',
    }
    /**
     * ======================== Additional Health Checks (optional) ========================
     *
     * In this section, you will define additional health checks beyond those associated with daemons
     */
    const healthReceipts: HealthReceipt[] = []

    /**
     * ======================== Daemons ========================
     *
     * In this section, you will create one or more daemons that define the service runtime
     *
     * Each daemon defines its own health check, which can optionally be exposed to the user
     */
    return Daemons.of({
      effects,
      started,
      healthReceipts, // Provide the healthReceipts or [] to prove they were at least considered
    }).addDaemon('webui', {
      command: '/start.sh', // The command to start the daemon
      env,
      ready: {
        display: 'Web Interface',
        // The function to run to determine the health status of the daemon
        fn: async (): Promise<CheckResult> =>
          fetch('http://vaultwarden.embassy:80/alive').then(
            () => ({
              status: 'passing',
            }),
            () => ({
              status: 'failing',
            }),
          ),
      },
      requires: [],
    })
  },
)
