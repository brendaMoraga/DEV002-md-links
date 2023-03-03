
const { existeRuta, esRutaAbsoluta, rutaEsArchivo } = require('./funciones.js');

// EXISTE RUTA ?
const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    const ruta = '/Users/Brenda/Desktop/<L>/MDLINKS/DEV005-md-links/archivosDePrueba/prueba.md';
    if (existeRuta(ruta)) {

      console.log(`La ruta ${ruta} existe`);

      if (esRutaAbsoluta(ruta)) {
          console.log("la ruta si es absoluta")
        if (archivoExiste){
          console.log("el archivo si existe")
        }else{
          console.log("el archivo no existe")
        }
      } else {
        console.log("la ruta no es absoluta")
      }

    }
    else {
      //reject(`La ruta ${ruta} no existe`);
      console.log("la ruta no existe")
    }
  }

  )
};

mdLinks('/Users/Brenda/Desktop/<L>/MDLINKS/DEV002-md-links/archivosDePrueba');
//  console.log(mdLinks('/Users/Brenda/Desktop'));


//ABSOLUTA?
const ruta = '/Users/Brenda/Desktop/<L>/MDLINKS/DEV002-md-links/archivosDePrueba/prueba.md';
if (esRutaAbsoluta(ruta)) {
  return true
} else {
  return false
}


// const ruta2 = './Brenda/Desktop/<L>/MDLINKS/DEV002-md-links/archivosDePrueba/prueba.md';

// console.log(esRutaAbsoluta(ruta1)); // true
// console.log(esRutaAbsoluta(ruta2)); // false

// const os = require ('os');
// console.log(os.homedir());
// module.exports = {     
//   mdLinks
// };