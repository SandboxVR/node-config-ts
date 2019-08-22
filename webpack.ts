import * as pkg from './package.json'
import {config} from './index'
import {DefinePlugin, Configuration} from 'webpack'
import * as R from 'ramda'

const {name} = pkg as {name: string}

const setConfigResolver = R.assocPath(['resolve', 'alias', name], `${name}/iso`)
const setGlobalConfigPlugin = R.over(
  R.lensProp('plugins'),
  R.append(
    new DefinePlugin({
      __CONFIG__: JSON.stringify(config)
    })
  )
)

export const NodeConfigTSPlugin: {
  (config: Configuration): Configuration
} = R.compose(
  setConfigResolver,
  setGlobalConfigPlugin
) as (config: Configuration) => Configuration
