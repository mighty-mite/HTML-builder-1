const path = require('path');
const pathName = require('path').join(__dirname, 'secret-folder');
const fs = require('fs');

fs.readdir(pathName, {withFileTypes: true}, (error, itemList)=>{
  if (error) {
    throw error;
  } else {
    const files = itemList.filter(item => item.isFile());
    files.forEach(item => {
      fs.stat(path.resolve(pathName, item.name), (error, stats)=>{
        if (error) {
          throw error;
        } else {
          const extName = path.extname(item.name).slice(1);
          const arr = item.name.split('.');
          const name = arr[0];
          const size = stats.size;
          console.log(`${name} - ${extName} - ${size}b\n`);
        }
      });
    });
  }
});