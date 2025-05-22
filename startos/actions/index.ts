import { sdk } from '../sdk'
import { setAdminToken } from './admin-token'
import { manageSmtp } from './manageMmtp'
import { setPrimaryDomain } from './setPrimaryUrl'

export const actions = sdk.Actions.of()
  .addAction(setAdminToken)
  .addAction(setPrimaryDomain)
  .addAction(manageSmtp)
