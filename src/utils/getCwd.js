import { state } from './state.js'

export function getCwd() {
  process.stdout.write(`\nCurrent working directory is ${state.path}\n`)
}