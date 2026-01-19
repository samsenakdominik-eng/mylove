const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const directory = '.'; // Změňte na požadovaný adresář, pokud není aktuální

fs.readdir(directory, (err, files) => {
  if (err) {
    console.error('Chyba při čtení adresáře:', err);
    return;
  }

  files.forEach(file => {
    const parsed = path.parse(file);
    const ext = parsed.ext.toLowerCase();
    let name = parsed.name;

    if (ext === '.jpg' || ext === '.jpeg') {
      // Vyčistit název od případných .JPG nebo .jpg
      if (name.toUpperCase().endsWith('.JPG')) {
        name = name.slice(0, -4);
      } else if (name.toLowerCase().endsWith('.jpg')) {
        name = name.slice(0, -4);
      }

      const output = name + '.jpeg';
      const inputPath = path.join(directory, file);
      const outputPath = path.join(directory, output);

      if (inputPath !== outputPath) {
        sharp(inputPath)
          .jpeg()
          .toFile(outputPath)
          .then(() => {
            console.log(`Konvertováno ${file} na ${output}`);
            // Volitelně smazat původní soubor
            fs.unlink(inputPath, (err) => { if (err) console.error('Chyba při mazání:', err); });
          })
          .catch(err => {
            console.error(`Chyba při konverzi ${file}:`, err);
          });
      }
    }
  });
});