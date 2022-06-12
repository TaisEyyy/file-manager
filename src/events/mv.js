import { state } from '../utils/state.js'
import path from 'path'
import fs from 'fs'
import { getCwd } from '../utils/getCwd.js'

export function mv(...args) {
// checkArguments(this.argumentsLength, args);
const splitFileName = args[1].split("/");
const fileName = splitFileName[splitFileName.length- 1]
const absolutePath = args[1].startsWith("/") && args[1];
const newAbsolutePath = args[2].startsWith("/") && `${args[2]}/${fileName}`;

const filePath = absolutePath
  ? absolutePath
  : path.join(state.path, args[1]);
const newFilePath = newAbsolutePath
  ? newAbsolutePath
  : path.join(state.path, `${args[2]}/${fileName}`);

if (fs.existsSync(filePath)) {
  fs.createReadStream(filePath)
    .pipe(fs.createWriteStream(newFilePath))
    .once("close", () => {
      fs.unlinkSync(filePath)
      getCwd()
    })
    .on('error', (err) => {
      process.stdout.write(`Oops\n, ${err}`)
    })
} else {
  process.stdout.write("Wrong path\n");
  getCwd();
}
}
