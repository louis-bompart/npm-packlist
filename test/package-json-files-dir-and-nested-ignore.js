// Show that a nested .npmignore will be honored if the
// 'files' array matches a dir, but not any specific files.
'use strict'

const t = require('tap')
const packlist = require('../')

const pkg = t.testdir({
  'package.json': JSON.stringify({
    files: [
      'lib',
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
    'package.json',
  ])
})
