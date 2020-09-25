'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  appid: '"wx6604c51e82aabfd3"',
  domain: '"http://ecnu-cs.cn:81/service"'
})
