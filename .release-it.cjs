/* eslint-disable no-template-curly-in-string */
module.exports = {
  hooks: {
    'before:init': ['npm run typecheck', 'npm run test:ci'],
    'after:bump': 'npm run build',
  },
  git: {
    commitMessage: 'chore: release v${version}',
  },
  github: {
    release: true,
  },
  npm: {
    release: true,
  },
  plugins: {
    '@release-it/conventional-changelog': {
      preset: 'angular',
      infile: 'CHANGELOG.md',
    },
  },
}
