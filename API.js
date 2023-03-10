const { mdLinks } = require('./index.js');

mdLinks('./archivosDePrueba', { validate: false, stats: true })
    .then((result) => { result })
    .catch((error) => { console.log(error) })
