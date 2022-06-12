import { state } from '../utils/state.js'
import path from 'path'
import fs from 'fs'
import { getCwd } from '../utils/getCwd.js'

export function rn(...args) {
  // checkArguments(this.argumentsLength, args);
  const absolutePath = args[1].startsWith("/") && args[1];
  const filePath = absolutePath ? absolutePath : path.join(state.path, args[1]);
  if (fs.existsSync(filePath)) {
    fs.renameSync(filePath, args[2]);
  } else {
    process.stdout.write("Wrong path\n");
  }
  getCwd();
}
