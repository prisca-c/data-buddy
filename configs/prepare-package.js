import fs from 'fs'
import path from 'path'

const buildDir = './dist'
function createEsmModulePackageJson() {
  const packageJson = {
    type: 'module',
    main: './index.js',
    module: './index.js',
    types: 'index.d.ts',
    typesVersions: {
      '*': {
        base: ['types/data_buddy.d.ts'],
      },
    },
    exports: {
      '.': './index.js',
      './data-buddy': './data_buddy.js',
    },
  }

  fs.writeFileSync(path.join(buildDir, 'package.json'), JSON.stringify(packageJson, null, 2))
}

createEsmModulePackageJson()
