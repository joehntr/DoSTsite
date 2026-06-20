import fs from 'fs';
import path from 'path';

function copyFolderSync(from, to) {
  if (!fs.existsSync(from)) return;
  fs.mkdirSync(to, { recursive: true });
  fs.readdirSync(from).forEach((element) => {
    const fromPath = path.join(from, element);
    const toPath = path.join(to, element);
    if (fs.lstatSync(fromPath).isDirectory()) {
      copyFolderSync(fromPath, toPath);
    } else {
      fs.copyFileSync(fromPath, toPath);
    }
  });
}

// Copy to dist/src/assets/images
const srcFrom = path.join(process.cwd(), 'src', 'assets', 'images');
const srcTo = path.join(process.cwd(), 'dist', 'src', 'assets', 'images');
copyFolderSync(srcFrom, srcTo);

// Also copy to dist/assets/images to support any alternate relative references
const assetsTo = path.join(process.cwd(), 'dist', 'assets', 'images');
copyFolderSync(srcFrom, assetsTo);

console.log('Successfully copied src/assets/images to build outputs!');
