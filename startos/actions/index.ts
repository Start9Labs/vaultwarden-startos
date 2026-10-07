import { sdk } from '../sdk'
import { setAdminToken } from './admin-token'
import { manageSmtp } from './manageSmtp'
import { primaryUrl } from '../primaryUrl'
import { toggleSignups } from './toggleSignups'

export const actions = sdk.Actions.of()
  .addAction(toggleSignups)
  .addAction(setAdminToken)
  .addAction(primaryUrl.action)
  .addAction(manageSmtp)
