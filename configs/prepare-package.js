import fs from 'fs'
import path from 'path'

const buildDir = './dist'
function createEsmModulePackageJson() {
  const packageJson = {
    name: 'data-buddy',
    version: '0.0.1',
    type: 'module',
    main: './index.js',
    module: './index.js',
    types: 'index.d.ts',
    typesVersions: {
      '*': {
        'data-buddy': ['types/data_buddy.d.ts'],
        'data-buddy/utils': ['types/data_buddy_utils.d.ts'],
      },
    },
    exports: {
      '.': './index.js',
      './data-buddy': {
        import: './data_buddy.js',
        types: './types/data_buddy.d.ts',
      },
      './data-buddy/utils': {
        import: './data_buddy_utils.js',
        types: './types/data_buddy_utils.d.ts',
      },
    },
  }

  fs.writeFileSync(path.join(buildDir, 'package.json'), JSON.stringify(packageJson, null, 2))
}

createEsmModulePackageJson()
