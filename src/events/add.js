import { state } from '../utils/state.js'
import path from 'path'
import fs from 'fs'
import { getCwd } from '../utils/getCwd.js'

export function add(...args) {
  // checkArguments(this.argumentsLength, args)
  const filePath = path.join(state.path, `/${args[1]}`)
  const ws = fs.createWriteStream(filePath, { encoding: 'utf-8' })
  ws.once('open', () => {
    ws.write('')
    getCwd()
    ws.close()
  })
}