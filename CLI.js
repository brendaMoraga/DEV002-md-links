#!/usr/bin/env node
const process = require('process');
const { mdLinks } = require ('./index.js');


const ruta = process.argv[2] 
console.log(ruta)
const opcion1 = process.argv[3]
const opcion2 = process.argv[4]

if (ruta) {
    // Si se proporciona una ruta al archivo o directorio.
    if (opcion1 === undefined && opcion2 === undefined) {
        mdLinks(ruta, { validate: false, stats: false })
            .then(result => result)
    // Si la opción "--validate" se proporciona, pero "--stats" no
    } else if (opcion1 === '--validate' && opcion2 === undefined) {
        mdLinks(ruta, { validate: true, stats: false })
            .then(result => result)
    } else if (opcion1 === '--stats' && opcion2 === undefined) {
        mdLinks(ruta, { validate: false, stats: true })
            .then(result => result)
    } else if ((opcion1 === '--validate' && opcion2 === '--stats') || (opcion1 === '--stats' && opcion2 === '--validate')) {
        mdLinks(ruta, { validate: true, stats: true })
            .then(result => result)
    } else {
        // Si se proporcionan opciones adicionales 
        console.log('revisa los parametros')
    }
}


// [1]ruta al ejecutable de Node.js.
// [2]ruta al archivo JavaScript que se está ejecutando actualmente.