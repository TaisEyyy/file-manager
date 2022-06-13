import { state } from '../utils/state.js'
import path from 'path'
import fs from 'fs'
import { getCwd } from '../utils/getCwd.js'

export function up(...args) {
  const newPath = path.join(state.path, "/..");
  if (fs.existsSync(newPath)) {
    state.path = newPath;
  } else {
    process.stdout.write("Wrong path\n");
  }

  getCwd();
}
