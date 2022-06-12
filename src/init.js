import os from 'os'
import emitter from 'events'
import { state } from './utils/state.js'
import * as events from './events/index.js'
import { registerEvents } from './utils/registerEvents.js'
import { getCwd } from './utils/getCwd.js'
const args = process.argv.slice(2)

const eventEmmiter = new emitter()

process.stdin.setEncoding('utf-8')
process.stdout.setEncoding('utf-8')

const pathObj = { path: os.homedir() }

function removeLineBreak(array) {
  const rightStr = array[array.length - 1].split(os.EOL)[0]
  array[array.length - 1] = rightStr

  return array
}

// function checkArguments(argsLength, args) {
//   args.length > argsLength ? process.stdout.write('Wrong Arguments') : null
// }

export function init() {
  registerEvents(eventEmmiter)
  const username = args.find(arg => arg.startsWith('--username'))?.split('=')[1] || 'Incognito'
  process.stdout.write(`Welcome to the club, ${username}\n`)
  process.stdout.write(`\nCurrent working directory is ${state.path}\n`)

  process.stdin.on('data', (data) => {
    if(data.split(os.EOL)[0] === '.exit') {
      process.stdout.write(`\nThanks for using file manager, ${username}`)
      process.exit()
    }

    const command = removeLineBreak(data.split(' '))

    if(!Object.keys(events).includes(command[0])) {
      getCwd()
    } else {
      eventEmmiter.emit(command[0], ...command)
    }
  })

  process.on('SIGINT', function(){
    process.stdout.write(`\nThanks for using file manager, ${username}`);
    process.exit();
  });
}