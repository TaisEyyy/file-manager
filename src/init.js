import os from 'os'
import Emitter from 'events'
import { state } from './utils/state.js'
import * as events from './events/index.js'
import { registerEvents } from './utils/registerEvents.js'
import { getCwd } from './utils/getCwd.js'
const args = process.argv.slice(2)

const eventEmmiter = new Emitter()

process.stdin.setEncoding('utf-8')
process.stdout.setEncoding('utf-8')

function removeLineBreak(array) {
  const rightStr = array[array.length - 1].split(os.EOL)[0]
  array[array.length - 1] = rightStr

  return array
}

export function init() {
  registerEvents(eventEmmiter)
  const username = args.find(arg => arg.startsWith('--username'))?.split('=')[1] || 'Incognito'
  process.stdout.write(`Welcome to the File Manager, ${username}\n`)
  process.stdout.write(`\nCurrent working directory is ${state.path}\n`)

  process.stdin.on('data', (data) => {
    if(data.split(os.EOL)[0] === '.exit') {
      process.stdout.write(`\nThanks for using file manager, ${username}\n`)
      process.exit()
    }

    const command = removeLineBreak(data.split(' '))

    if(!Object.keys(events).includes(command[0])) {
      process.stdout.write('Invalid input')
      getCwd()
    } else {
      eventEmmiter.emit(command[0], ...command)
    }
  })

  process.on('SIGINT', function(){
    process.stdout.write(`\nThanks for using file manager, ${username}\n`);
    process.exit();
  });
}