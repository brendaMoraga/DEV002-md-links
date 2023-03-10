
const fs = require('fs')
const path = require('path');
const axios = require('axios');
// const fetch = require('node-fetch');

//  EXISTE RUTA?

const existeRuta = (ruta) => fs.existsSync(ruta);

// CONVERTIR A RUTA ABSOLUTA
const convertirRuta = (ruta) => path.resolve(ruta)


//  ES DIRECTORIO? 
const esDirectorio = (ruta) => fs.statSync(ruta).isDirectory();

//ES ARCHIVO??
// const esArchivo = (ruta) => fs.statSync(ruta).esArchivo();


//ES EXTENCIÓN .MD
const extension = (ruta) => path.extname(ruta);

// RECORRER ARREGLO DE ARCHIVOS
const buscarEnArray = (arrArchivosMD) => {
  const nuevoArray = [];
  return new Promise((resolve, reject) => {
    arrArchivosMD.forEach((archivo, index) => {
      fs.readFile(`${archivo}`, 'utf-8', (err, contenido) => {
        if (err) {
          reject('error al recorrer Array');
        } else {
          nuevoArray.push(arrayLinks(archivo, contenido));
          const merge = [].concat(...nuevoArray)
          if (index === (arrArchivosMD.length - 1)) {
            resolve(merge)
          }
        }
      });
    });
  });
}

// Testea que haya links url y text y retorna un arreglo de objetos
const regexLinks = /\[(.+?)\]\((https?:\/\/[^\s]+)(?: "(.+)")?\)|(https?:\/\/[^\s]+)/ig;
const urlRegex = /\((https?:\/\/[^\s]+)(?: "(.+)")?\)|(https?:\/\/[^\s]+)/ig;
const textRegex = /\[(\w+.+?)\]/gi;
const arrayLinks = (archivo, contenido) => {
  const arrayObjetos = [];
  //Si el contenido es diferente del regex links mensaje
  if (regexLinks.test(contenido) === false) {
    console.log('No hay links para verificar en la ruta' + `${archivo}`)
    return [];
  } else {
    //Itera sobre todos los enlaces crea el objeto.
    const matches = contenido.match(regexLinks)
    matches.forEach((item) => {
      const matchesText = item.match(textRegex);
      let unidadText = "";
      let puroText = ['sin texto'];
      if (matchesText) {
        unidadText = matches[0];
        puroText = unidadText.replace(/\[|\]/g, '').split(',');
      }
      const matchesLink = item.match(urlRegex)
      const unidadLink = matchesLink[0];
      const puroLink = unidadLink.replace(/\(|\)/g, '').split(',');
      arrayObjetos.push({ href: puroLink[0], text: puroText[0], path: `${archivo}` })
    })
    return arrayObjetos;
  }
}

// Maneja las repuestas de las promesas del array de links.
const respuestasLinks = (arrayLinks) => Promise.all(arrayLinks.map((objetoLink) => axios.get(objetoLink.href)
  .then((result) => {
    // console.log(result.status)
    const objetValidate = {
      ...objetoLink,
      status: result.status,
      ok: result.statusText ? 'ok' : 'fail',
    }
    return objetValidate
  })
  .catch((err) => {
    // console.log(err.status)
    let respuesta = err.response
    const objetcValidate = {
      ...objetoLink,
      status: err?.response?.status,
      ok: 'fail',
    }
    return objetcValidate
  })
));

//Calcula el resultado de la opcion stats.
const statsResult = (arrayObjeto) => {
  const arrayLink = arrayObjeto.map(element => element.href);
  const uniqueLink = new Set(arrayLink);
  return {
    Total: arrayLink.length,
    Unique: uniqueLink.size
  }
}
//Calcula el resultado de las opciones stats y validate.
const statsAndValidate = (arrayObjeto) => {
  const arrayLink = arrayObjeto.map(element => element.href); //cuenta link
  const uniqueLink = new Set(arrayLink); //hace un set de unicos y cuenta 
  const brokenLink = arrayObjeto.filter(element => element.ok === 'fail') //filtra los rotos fail y cuenta
  return {
    Total: arrayLink.length,
    Unique: uniqueLink.size,
    Broken: brokenLink.length
  }
}


// Retorna un nuevo array con los md que encuentre en los directorios.
const leerTodosLosArchivos = (ruta, nuevoArray = []) => {
  const archivos = fs.readdirSync(ruta)
  archivos.forEach(archivo => {
    const stat = fs.statSync(`${ruta}/${archivo}`)
    // console.log(stat.esDirectorio());
    if (stat.isDirectory()) {
      leerTodosLosArchivos(`${ruta}/${archivo}`, nuevoArray)
    } else {
      //Si no es directorio y es md se pushea
      if (path.extname(archivo) === '.md') {
        nuevoArray.push(`${ruta}/${archivo}`)
      }
    }
  });
  return nuevoArray
}
//Recorre todos los archivos del directorio, leer y concatenta.
const arrayTodosLosArchivos = (ruta) => {
  if (esDirectorio(ruta)) {
    const archivos = fs.readdirSync(ruta)
    return archivos.map((archivo) => {
      return arrayTodosLosArchivos(`${ruta}/${archivo}`)
    }).flat()
  } else {
    return [ruta]
  }
}


module.exports = {
  existeRuta,
  convertirRuta,
  extension,
  esDirectorio,
  buscarEnArray,
  respuestasLinks,
  statsAndValidate,
  leerTodosLosArchivos,
  arrayTodosLosArchivos,
  statsResult,
};








