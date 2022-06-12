import { state } from '../utils/state.js'
import path from 'path'
import fs from 'fs'
import { getCwd } from '../utils/getCwd.js'

export function cat(...args) {
  // checkArguments(this.argumentsLength, args);
  const absolutePath = args[1].startsWith("/") && args[1];

  const pathToFile = absolutePath ? absolutePath : path.join(state.path, args[1]);
  if (fs.existsSync(pathToFile)) {
    fs.createReadStream(pathToFile, { encoding: "utf-8" })
      .on("data", (data) => {
        process.stdout.write(`\n${data}\n`);
        getCwd()
      })
      .on("error", () => {
        process.stdout.write("Oops\n");
        getCwd()
      });
  } else {
    process.stdout.write("Wrong path\n");
    getCwd()
  }
}
