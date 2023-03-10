const {
  existeRuta,
  convertirRuta,
  extension,
  esDirectorio,
  buscarEnArray,
  statsAndValidate,
  respuestasLinks,
  arrayTodosLosArchivos,
  statsResult,
} = require('./funciones.js');


const mdLinks = (ruta, options = { validate: false, stats: false }) => {
  return new Promise((resolve, reject) => {
    const arrArchivosMD = [];

    if (existeRuta(ruta)) {
      console.log(`La ruta ${ruta} existe`);
      const rutaAbsoluta = convertirRuta(ruta)
      // console.log(rutaAbsoluta)
      // Si hay ruta absoluta en el directorio se almacena llama a f recursiva
      if (esDirectorio(rutaAbsoluta)) {
        const buscaArchivo = arrayTodosLosArchivos(rutaAbsoluta)
        buscaArchivo.forEach(archivo => {
          // Si es .md se almacena, si no avisa
          if (extension(archivo) === '.md') {
            arrArchivosMD.push(archivo)
          } else {             
              console.log('no hay archivos .md')           
          }
        })
        // NO ES DIR / SI ES MD PUSHEO AL ARR 
      } else {
        if (extension(rutaAbsoluta) === '.md') {
          arrArchivosMD.push(ruta)
        } else {
          console.log('no es un archivo.md')
        }
      }
      // OPCIONES DEL USUARIO CLI
      // --VALIDATE --STATS 
      if (options.validate === true && options.stats === true) {
        console.log('ingresaste opciones --validate y --stats')
        buscarEnArray(arrArchivosMD)
          .then((result) => {
            // console.log(result)
            respuestasLinks(result)
              .then((result) => {
                console.log(result)
                const statsValidate = statsAndValidate(result)
                console.log("ambas opciones", statsValidate)
                resolve(statsValidate)
              })
          });
      // --STATS
      } else if (options.validate === false && options.stats === true) {
        console.log("elegiste opción stats")
        buscarEnArray(arrArchivosMD)
          .then((result) => {
            // console.log(result)
            const stats = statsResult(result)
            console.log("opcion stats", stats)
            resolve(stats)
          });
      // --VALIDATE
      } else if (options.validate === true && options.stats === false) {
        console.log('elegiste la opción validate')
        buscarEnArray(arrArchivosMD)
          .then((result) => {
            // console.log(result)
            respuestasLinks(result)
              .then((result) => {
                const validate = result
                resolve(validate)
                console.log('opción validate', validate)
              })
          });
      } else {
        console.log('No elegiste una opción')
        buscarEnArray(arrArchivosMD)
          .then((result) => {
            // console.log(result)
            const anyOption = result;
            resolve(anyOption)
            console.log('no ingresaste opción', anyOption)
          });
      }
    } else {
      console.log(`La ruta ${ruta} no existe`);
    }
  });

};

module.exports = {
  mdLinks
};








