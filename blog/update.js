// updateMetadata.js
const fs = require('fs');
const csv = require('csv-parser');

const results = [];

fs.createReadStream('./blog/metadata.csv')
  .pipe(csv())
  .on('data', (row) => {
    const tags = row.tags.split(',').map(t => t.trim());
    results.push({
      title: row.title,
      date: row.date,
      file: row.file,
      tags: tags
    });
  })
  .on('end', () => {
    const js = `const posts = ${JSON.stringify(results, null, 2)};`;
    fs.writeFileSync('./blog/metadata.js', js);
    console.log('metadata.js generated!');
  });
