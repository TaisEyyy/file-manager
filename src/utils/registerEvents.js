import * as events from '../events/index.js'
import { getCwd } from './getCwd.js'
import fs from 'fs'

export function registerEvents(eventEmmiter) {
  Object.keys(events).forEach(key => {  
    eventEmmiter.on(key, events[key])
  })
}