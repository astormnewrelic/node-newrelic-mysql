'use strict'

const tap = require('tap')
const utils = require('@newrelic/test-utilities')

utils(tap)

tap.test('mysql basic pool', (t) => {
  t.autoend()
  require('../common/basic-pool')(t, (helper) => {
    if (helper) {
      helper.registerInstrumentation({
        moduleName: 'mysql',
        type: 'datastore',
        onRequire: require('../../../lib/instrumentation').callbackInitialize
      })
    }

    return require('mysql')
  })
})
