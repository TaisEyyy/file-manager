import fs from 'fs'
import zlib from 'zlib'
import { state } from '../utils/state.js'
import path from 'path'
import { getCwd } from '../utils/getCwd.js'

export function decompress(...args){

  const splitFileName = args[1].split("/");
  const fileName = splitFileName[splitFileName.length- 1]
  const absolutePath = args[1].startsWith("/") && args[1];
  const newAbsolutePath = args[2].startsWith("/") && `${args[2]}/${fileName}`;

  const filePath = absolutePath
    ? absolutePath
    : path.join(state.path, args[1]);
    const newFileName = filePath.split('/')
  const newFilePath = newAbsolutePath
    ? newAbsolutePath
    : path.join(state.path, `${args[2]}`);

    if(fs.existsSync(filePath) && fs.existsSync(newFilePath)) {
      const readStream = fs.createReadStream(filePath);
      const writeStream = fs.createWriteStream(`${newFilePath}/${newFileName[newFileName.length - 1].replace('.br', '')}`);
    
      const brotli = zlib.createBrotliDecompress();
    
      readStream.pipe(brotli).pipe(writeStream).on('error', () => {
        process.stdout.write('Operation failed\n')
      });
    } else {
      process.stdout.write('Wrong path\n')
      getCwd()
    }
}