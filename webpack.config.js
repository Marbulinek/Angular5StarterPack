/*
  WEBPACK INIT
  - environments: dev, prod
  - default run command: webpack --env=dev
 */

function buildConfig(env) {
  return require('./webpack_' + env + '_config.js')(env)
}

module.exports = buildConfig;