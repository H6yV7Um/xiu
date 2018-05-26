'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL18090: '"http://101.132.181.5:18090"',
  API_URL18091: '"http://101.132.181.5:18091"',
  API_URL18088: '"http://101.132.181.5:18088"',
  WX_APP_ID: '"wx916b01a3cbb1ab9f"',
  APP_KEY: '"orient_show_key_20180326"',
  APP_SECRET: '"9e787f77f3774fa7ac053321ed556bb4"'
})
