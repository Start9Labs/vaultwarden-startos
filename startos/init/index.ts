import { sdk } from '../sdk'
import { setDependencies } from '../dependencies'
import { setInterfaces } from '../interfaces'
import { versionGraph } from '../versions'
import { actions } from '../actions'
import { restoreInit } from '../backups'
import { seedFiles } from './seedFiles'
import { setup } from './setup'
import { watchSystemSmtp } from './watchSystemSmtp'

export const init = sdk.setupInit(
  restoreInit,
  versionGraph,
  setInterfaces,
  setDependencies,
  actions,
  seedFiles,
  setup,
  watchSystemSmtp,
)

export const uninit = sdk.setupUninit(versionGraph)
