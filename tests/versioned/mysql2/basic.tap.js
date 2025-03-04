'use strict'

process.env.NEW_RELIC_HOME = __dirname

const tap = require('tap')
const utils = require('@newrelic/test-utilities')


utils(tap)

tap.test('mysql basic', (t) => {
  t.autoend()
  require('../common/basic')(t, (helper) => {
    if (helper) {
      helper.registerInstrumentation({
        moduleName: 'mysql2',
        type: 'datastore',
        onRequire: require('../../../lib/instrumentation').callbackInitialize
      })
    }
    return require('mysql2')
  })
})
