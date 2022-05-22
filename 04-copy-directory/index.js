const fsProm = require('fs/promises');
const path = require('path');

const srcPath = path.join(__dirname, 'files');
const destPath = path.join(__dirname, 'files-copy');

async function copyDir() {
  
  await fsProm.mkdir(destPath, {recursive: true});
  const content = await fsProm.readdir(srcPath, {withFileTypes: true});

  const files = content.filter(item => item.isFile());
  const newFiles = await fsProm.readdir(destPath, {withFileTypes: true});

  newFiles.forEach(file=>{
    fsProm.unlink(path.join(destPath, file.name));
  });

  files.forEach((file)=>{
    if(!newFiles.includes(file)) {
      fsProm.copyFile(path.join(srcPath, `${file.name}`), path.join(destPath, `${file.name}`));
    }
  });
}

copyDir();