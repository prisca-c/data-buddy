import { configure, processCLIArgs, run } from '@japa/runner'
import { assert } from '@japa/assert'
import { fileSystem } from '@japa/file-system'

processCLIArgs(process.argv.splice(2))
configure({
  files: ['tests/**/*.spec.ts'],
  plugins: [
    assert(),
    fileSystem({
      autoClean: false,
      basePath: process.cwd(),
    }),
  ],
})

run()
