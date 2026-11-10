import { sdk } from '../sdk'
import { rotateAdminToken, toggleAdminPortal } from './admin-token'
import { manageSmtp } from './manageSmtp'
import { primaryUrl } from '../primaryUrl'
import { toggleSignups } from './toggleSignups'

export const actions = sdk.Actions.of()
  .addAction(toggleSignups)
  .addAction(toggleAdminPortal)
  .addAction(rotateAdminToken)
  .addAction(primaryUrl.action)
  .addAction(manageSmtp)
