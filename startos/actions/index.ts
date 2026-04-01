import { sdk } from '../sdk'
import { setAdminToken } from './admin-token'
import { manageSmtp } from './manageSmtp'
import { setPrimaryDomain } from './setPrimaryUrl'
import { toggleSignups } from './toggleSignups'

export const actions = sdk.Actions.of()
  .addAction(toggleSignups)
  .addAction(setAdminToken)
  .addAction(setPrimaryDomain)
  .addAction(manageSmtp)
