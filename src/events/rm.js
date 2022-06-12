import { state } from '../utils/state.js'
import path from 'path'
import fs from 'fs'
import { getCwd } from '../utils/getCwd.js'

export function rm(...args) {
  // checkArguments(this.argumentsLength, args)
  const absolutePath = args[1].startsWith('/') && args[1]
  const filePath = absolutePath ? absolutePath : path.join(state.path, args[1])
  if(fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  } else {
    process.stdout.write("Wrong path\n");
  }
  getCwd()
}