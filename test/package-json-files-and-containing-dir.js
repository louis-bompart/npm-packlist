// ensure we don't get files more than one time, even if specified
// in ways that will have them included from multiple directions
'use strict'

const t = require('tap')
const packlist = require('../')

const pkg = t.testdir({
  'package.json': JSON.stringify({
    files: [
      'lib',
      '/lib/*.js',
      'lib/*.js',
      '/lib/one.js',
      'lib/one.js',
      'lib/one.*',
    ],
  }),
  lib: {
    'one.js': 'one',
    'two.js': 'two',
    'tre.js': 'tre',
    'for.js': 'for',
    '.npmignore': 'two.js',
    '.DS_Store': 'a store of ds',
  },
})

t.test('package with negated files', async (t) => {
  const files = await packlist({ path: pkg })
  t.same(files, [
    'lib/for.js',
    'lib/one.js',
    'lib/tre.js',
    'lib/two.js',
    'package.json',
  ])
})
