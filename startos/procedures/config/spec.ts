import { sdk } from '../../sdk'

const { Config, Value } = sdk

export const configSpec = Config.of({})
export const matchConfigSpec = configSpec.validator
export type ConfigSpec = typeof matchConfigSpec._TYPE
