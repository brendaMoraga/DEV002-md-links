# Markdown Links

## Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...) y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.

![md-links](https://www.ionos.es/digitalguide/fileadmin/_processed_/b/6/csm_md-file-t_6355406f58.jpg)

### Resumen del proyecto
Md-links es una interfaz (CLI) que lee y analiza archivos en formato Markdown, verifica el estado de los links y crea estadisticas basicas de la información que encuantra en tu directorio. 


### Cómo funciona MDLINK

Primero, se verifica si se proporciona una "ruta" al archivo o directorio de Markdown. 

"mdLinks" se llama con la opción "validate" y/o "stats". Esto significa que la función "mdLinks" analizará los enlaces en el archivo o directorio de Markdown y devolverá una matriz de objetos con información sobre cada enlace.

Si se proporciona la opción "--validate", la función "mdLinks" analizará los enlaces en el archivo o directorio de Markdown y, además, verificará si los enlaces son válidos o no. En este caso, la función devolverá una matriz de objetos con información sobre cada enlace, incluyendo si el enlace es válido o no.

Si se proporciona la opción "--stats", la función "mdLinks" analizará los enlaces en el archivo o directorio de Markdown y, además, devolverá estadísticas sobre los enlaces, como el número total de enlaces y el número de enlaces únicos.

Si se proporcionan ambas opciones "--validate" y "--stats", la función "mdLinks" analizará los enlaces en el archivo o directorio de Markdown, verificará si los enlaces son válidos o no y devolverá estadísticas sobre los enlaces.

Finalmente, si se proporcionan opciones adicionales que no se reconocen, se imprimirá un mensaje de error.


##### Valores de retorno

Con `validate:false` :

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.

Con `validate:true` :

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.
* `status`: Código de respuesta HTTP.
* `ok`: Mensaje `fail` en caso de fallo u `ok` en caso de éxito.


Por ejemplo:

```sh
$ mdlinks ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```


```sh
$ mdlinks ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```

##### `--stats`

Si pasamos la opción `--stats` el output (salida) será un texto con estadísticas
básicas sobre los links.

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```

También podemos combinar `--stats` y `--validate` para obtener estadísticas que
necesiten de los resultados de la validación.

```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```


#### Diagrama de Flujo de la función MDLINK

![AltText] (https://www.figma.com/file/BOWBVamH6kmWYAnIjRRlKr/Untitled?node-id=0%3A1&t=EvV6WNjV7PTUHpDw-1)
