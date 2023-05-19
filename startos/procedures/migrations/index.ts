import { sdk } from '../../sdk'
import { v1_28_1_0 } from './v1_28_1_0'

/**
 * Add each new migration as the next argument to this function
 */
export const migrations = sdk.setupMigrations(v1_28_1_0)
