'use strict'

const t = require('tap')
const packlist = require('../')

const elfJS = `
module.exports = elf =>
  console.log("i'm a elf")
`

const pkg = t.testdir({
  'package.json': JSON.stringify({
    name: 'test-package',
    version: '3.1.4',
    files: [
      'elf.js',
      'deps/foo/config/config.gypi',
    ],
  }),
  'npm-shrinkwrap.json': JSON.stringify({ shrink: 'wrap' }),
  'elf.js': elfJS,
  '.npmrc': 'packaged=false',
  // don't bother even reading this file, because we have files list
  '.npmignore': '!.npmignore\n!dummy\npackage.json',
  dummy: 'foo',
  build: {
    'config.gypi': "i_wont_be_included='with any luck'",
    'npm-debug.log': '0 lol\n',
  },
  deps: {
    foo: {
      config: {
        'config.gypi': "i_will_be_included='with any luck'",
      },
    },
  },
  '.git': {
    gitstub: "won't fool git, also won't be included",
  },
  node_modules: {
    history: {
      'README.md': "please don't include me",
    },
  },
})

t.test('follows npm package ignoring rules', async (t) => {
  const files = await packlist({ path: pkg })
  t.same(files, [
    'deps/foo/config/config.gypi',
    'elf.js',
    'npm-shrinkwrap.json',
    'package.json',
  ])
})
