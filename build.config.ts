import { rmSync } from 'node:fs'
import { join } from 'node:path'
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
    esbuild: {
      minify: true,
    },
  },
  externals: ['postcss'],
  hooks: {
    'build:done': (ctx) => {
      ['index.d.cts', 'index.d.mts', 'index.mjs'].forEach((file) => {
        rmSync(join(ctx.options.outDir, file))
      })
    },
  },
})
