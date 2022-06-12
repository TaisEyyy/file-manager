import { state } from '../utils/state.js'
import fs from 'fs'
import { getCwd } from '../utils/getCwd.js'

export function ls(...args) {
  // checkArguments(this.argumentsLength, args)
  fs.readdirSync(state.path, { encoding: 'utf-8' }).forEach(file => process.stdout.write((`${file}\n`)))
  getCwd()
}