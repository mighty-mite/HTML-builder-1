const path = require('path');
const fsProm = require('fs/promises');

const srcStyles = path.join(__dirname, 'styles');
const destStyles = path.join(__dirname, 'project-dist');

async function mergeStyles() {
  let styles = [];
  let data = '';
  const content = await fsProm.readdir(srcStyles, {withFileTypes: true});
  const files = content.filter(file => file.isFile());
  files.forEach(file=>{
    if (path.extname(file.name) === '.css') styles.push(file);
  });
  
  for(let style of styles) {
    data += await fsProm.readFile(path.join(srcStyles,style.name));
  }
  await fsProm.writeFile(path.join(destStyles, 'bundle.css'), data);

}

mergeStyles();
