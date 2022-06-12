import os from 'os'
import { getCwd } from '../utils/getCwd.js'

const methods = {
  EOL() {
    process.stdout.write(os.EOL.split()[0])
  },
  cpus() {
    const info = os.cpus()
    process.stdout.write(`CPUS amount: ${info.length}\n`)
    info.forEach(el => {
      process.stdout.write(`${el.model.trimEnd()}, ${el.speed}\n`)
    })
  },
  homedir() {
    process.stdout.write(`${os.homedir()}\n`)
  },
  username() {
    process.stdout.write(os.userInfo().username)
  },
  architecture() {
    process.stdout.write(os.arch())
  }
}

export function osImpl(...args) {
  const method = args[1].replace('--', '')
  if(methods[method]) {
    methods[method]()
    getCwd()
  } else {
    process.stdout.write('Unknown operation')
    getCwd()
  }
}