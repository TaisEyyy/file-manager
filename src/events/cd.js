import { state } from '../utils/state.js'
import path from 'path'
import fs from 'fs'
import { getCwd } from '../utils/getCwd.js'

export function cd(...args) {
  const absolutePath = args[1].startsWith('/') && args[1]

  const newPath = absolutePath ? absolutePath : path.join(state.path, args[1])
  if(fs.existsSync(newPath)) {
    state.path = newPath
  } else {
    process.stdout.write('Wrong path\n')
  }

  getCwd()
}