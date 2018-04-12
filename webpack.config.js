/*
  WEBPACK INIT
  - environments: dev, prod
  - default run command: webpack --env=dev or webpack --env=prod
 */

function buildConfig(env) {
  return require('./webpack_' + env + '_config.js')(env)
}

module.exports = buildConfig;