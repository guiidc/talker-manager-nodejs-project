const fs = require('fs').promises;

fs.writeFile('./texto.txt', 'Segundoo texto', (err) => {
  if (err) return console.log(err);
  console.log('arquivo escrito');
});