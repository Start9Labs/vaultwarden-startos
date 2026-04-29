import { VersionGraph } from '@start9labs/start-sdk'
import { v_1_35_7_1 } from './v1.35.7.1'
import { v_1_35_7_2 } from './v1.35.7.2'

export const versionGraph = VersionGraph.of({
  current: v_1_35_7_2,
  other: [v_1_35_7_1],
})
