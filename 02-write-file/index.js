const {stdin, stdout} = process;
const readline = require('readline');
const fs = require('fs');
const path = require('path');
const pathName = path.join(__dirname, 'text.txt');

fs.writeFile(
  path.join(__dirname, 'text.txt'),
  '',
  (err) => {
    if (err) throw err;
  }
);

const rl = readline.createInterface({ input: stdin, output: stdout });

rl.question('Enter your text\n', (input) => {
  if (input === 'exit') {
    rl.close();
  } else
  if (input) {
    fs.appendFile(pathName, input, function(error) {
      if (error) throw error;
    });
    rl.setPrompt('Anything else?\n');
    rl.prompt();
    rl.on('line', (input)=> {
      if (input == 'exit') {
        rl.close();
      } else if (input) {
        fs.appendFile(pathName, input, function(error) {
          if (error) throw error;
          rl.setPrompt('Anything else?\n');
          rl.prompt();
        });
      }
    });
  }
});

rl.on('close', ()=>{
  console.log('Bye!');
});