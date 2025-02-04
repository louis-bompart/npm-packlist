// cannot include package-lock.json in the root
'use strict'

const t = require('tap')
const packlist = require('../')

const pkg = t.testdir({
  'package.json': JSON.stringify({
    files: ['.npmignore', 'package-lock.json'],
  }),
  '.npmignore': `
!package-lock.json
`,
  'package-lock.json': '{}',
})

t.test('try to include package-lock.json but cannot', async (t) => {
  const files = await packlist({ path: pkg })
  t.same(files, [
    '.npmignore',
    'package.json',
  ])
})
