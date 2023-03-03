
const fs = require('fs')
const path = require('path');

//  EXISTE RUTA?
const existeRuta = (ruta) => {
  return fs.existsSync(ruta);
}

// LA RUTA ES ABSOLUTA?
const esRutaAbsoluta = (ruta) => {
  return path.isAbsolute(ruta);
}

// CONVERTIR A RUTA ABSOLUTA
const convertirRuta = (rutaRelativa) => {
  const rutaAbsoluta = new URL(rutaRelativa, window.location.href).href;
  return rutaAbsoluta;
}

// ES UN ARCHIVO ?
const rutaEsArchivo = (rutaArchivo) => {
  const archivo = new File(rutaArchivo);
  return archivo.isFile();
}

// // LEER CONTENIDO DEL DIRECTORIO FORMA SINCRONA (files)
const leerDir = (ruta) =>{
try {
  const files = fs.readdirSync('/Users/Brenda/Desktop/<L>/MDLINKS/DEV002-md-links/archivosDePrueba');
  console.log('El contenido del directorio es:', files);
} catch (err) {
  console.error('Error al leer el directorio:', err);
}
}

// ES .MD?
function esArchivoMD(rutaArchivo) {
  return rutaArchivo.endsWith('.md');
}

// LEER ARCHIVO SYNC
const leerMd = () => {
try { const data = fs.readFileSync('readme.md', 'utf8'); 
console.log(data); } 
catch (err) { console.error(err); }
}

// // LEER ARCHIVO ASINCRONA
const leerMdA = () => {
fs.readFile('readme.md', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
}


// // UNIR RUTAS CON LIBRERIA NAVITA PATH
// const path = require('path');
// const segmento1 = '/Users/Brenda/Desktop/<L>';
// const segmento2 = '/MDLINKS/DEV002-md-links/archivosDePrueba/prueba.md';
// const rutaCompleta = path.join(segmento1, segmento2);
// console.log(rutaCompleta);
// // // salida: /Users/Brenda/Desktop/<L>/MDLINKS/DEV002-md-links/archivosDePrueba/prueba.md




module.exports = {     
  existeRuta, esRutaAbsoluta,convertirRuta,rutaEsArchivo,leerDir,esArchivoMD,leerMd,leerMdA
};