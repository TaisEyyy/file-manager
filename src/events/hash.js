import fs from 'fs'
import crypto from 'crypto'
import { state } from '../utils/state.js'
import path from 'path'
import { getCwd } from '../utils/getCwd.js'

export function hash(...args) {
  const absolutePath = args[1].startsWith("/") && args[1];
  const filePath = absolutePath
    ? absolutePath
    : path.join(state.path, args[1]);

  if (fs.existsSync(filePath)) {
    const readStream = fs.createReadStream(filePath)
    const hashSum = crypto.createHash('sha256')

    readStream.on('data', (data) => {
      hashSum.update(data)

      process.stdout.write('\n' + hashSum.digest('hex') + '\n')

      getCwd()
    }).on('error', () => {
      process.stdout.write('Operation failed\n')
      getCwd()
    })
  } else {
    process.stdout.write('Wrong path\n')
    getCwd()
  }
}