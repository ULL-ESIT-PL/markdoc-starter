---
title: "Constant Folding"
key: constant-folding
published: true
date: 2023/03/16
delivery: "2023/03/23"
order: 11
layout: Practica
campus: https://campusingenieriaytecnologia2223.ull.es/mod/assign/view.php?id=20506
prev: spread-operator.md
next: #ast-types.md
sidebar: auto
rubrica: 
  - El paquete está publicado en GitHub Registry
  - Contiene un ejecutable que se ejecuta correctamente (<code>--help</code>, etc.)
  - The folding has been extended to other kind of expressions (not only arithmetic)
  - El módulo exporta las funciones adecuadas
  - Contiene suficientes tests 
  - "Estudio de covering"
  - Se ha hecho CI con GitHub Actions
  - "La documentación es completa: API, ejecutable, instalación, etc." 
  - "Publicar la documentación con Vuepress, API y Covering" 
  - "Ha editado la sección <i>About</i> del repo con el enlace a la página web de la API"
  - Se comprueba que el módulo npm se instala desde el GitHub Registry y funciona
  - Probar que el ejecutable queda correctamente instalado, puede ser ejecutado con el nombre publicado y produce salidas correctas
  - Se ha hecho un buen uso del versionado semántico en la evolución del módulo
---

# {% $markdoc.frontmatter.title %}

## Objetivos

Construya un paquete npm y 
publíquelo en el GitHub Registry que además de exportar la función `constantFolding` provea un ejecutable `cf` que se llama así:

```
cf input.js output.js
```

el cual realiza [la transformación de plegado de constantes](/temas/tree-transformations/index.html#constant-folding) sobre `input.js` dejando la salida en `output.js`.

Una parte de los conceptos y habilidades a adquirir con esta práctica se explican en la sección [Creating and publishing a node.js module en GitHub y en NPM](/temas/introduccion-a-javascript/creating-and-publishing-npm-module). Léala con detenimiento antes de hacer esta práctica. 

## Ámbitos

Para saber sobre ámbitos, vea la sección [Scopes and Registries](/temas/introduccion-a-javascript/creating-and-publishing-npm-module#scopes-and-registries).

## Pruebas

Deberá añadir pruebas usando [Mocha y Chai](/temas/introduccion-a-javascript/creating-and-publishing-npm-module.html#testing-with-mocha-and-chai) o [Jest](/temas/introduccion-a-javascript/jest).
Repase las secciones [Testing with Mocha and Chai](/temas/introduccion-a-javascript/creating-and-publishing-npm-module.html#testing-with-mocha-and-chai) y [Jest](/temas/introduccion-a-javascript/jest).

## Documentación

[Documente](/temas/introduccion-a-javascript/documentation)
el módulo incorporando un `README.md` y la documentación de la función exportada usando [JsDoc](/temas/introduccion-a-javascript/documentation.html).
Repase la sección [Documenting the JavaScript Sources](/temas/introduccion-a-javascript/creating-and-publishing-npm-module.html#documenting-the-javascript-sources)

## Constant Folding of MemberExpression literals

Añada ahora plegado de constantes para métodos (con argumentos plegables) y propiedades de los arrays. Esto es, expresiones como:

```js
["a", "b", "c"].concat(["d", "e"], "f", "g", ["h"]);
["a", "b", "c"].join();
["a", "b", "c"].join('@');
[1, 2, 3].length;
[1, 2, 3][2-1];
[1, 2, 3].shift();
[1, 2, 3].slice(0, 1+1);
[a, b, c].pop(); // substitute the MemberExpression node by the last AST in the "elements" array of the object Array Expression
[a, b, c].reverse(); // reverse the ASTs
```

Serán evaluadas en tiempo de compilación produciendo:

```js
["a", "b", "c", "d", "e", "f", "g", "h"];
"a,b,c";
"a@b@c";
3;
2;
2;
[1, 2];
c;
[c, b, a];
```

Publique ahora esta mejora en la funcionalidad del módulo.  

¿Como debe en cambiar el nº de versión?

Repase la sección [Semantic Versioning](/temas/introduccion-a-javascript/creating-and-publishing-npm-module.html#semantic-versioning)

Other possible **optional** extensions are:

* Constant folding for methods and properties of Literal Strings:

  ```js
  "abc"[0];
  "abc".charAt();
  "abc".charAt(1);
  "abc".length;
  "a,b,c".split(",");
  ```
* Constant folding for methods and properties of Objects, Numbers, etc.

  ```js
  {a:4, b:5}.b
  (100 + 23).toString();
  ```

## References

### Constant Folding

* [Transformación de plegado de constantes](/temas/tree-transformations/index.html#constant-folding) en estos apuntes
* Babel plugin [minify-constant-folding](https://github.com/babel/minify/tree/master/packages/babel-plugin-minify-constant-folding)
* esmangle ([esmangle](http://github.com/estools/esmangle)) is
mangler / minifier for [Parser API](https://developer.mozilla.org/en/SpiderMonkey/Parser_API) AST that includes [constant folding](https://github.com/estools/esmangle/blob/master/lib/pass/tree-based-constant-folding.js)
### Packages

* [Creating and Publishing a node.js Module in GitHub and NPM Registries](/temas/introduccion-a-javascript/creating-and-publishing-npm-module)
* [Módulos](/temas/introduccion-a-javascript/modulos)
* [Node.js Packages](/temas/introduccion-a-javascript/nodejspackages)
* [Instalación de Módulos desde GitHub](/temas/introduccion-a-javascript/nodejspackages.html#instalaci%C3%B3n-desde-github)
* [Introducción a los Módulos en JS](https://lenguajejs.com/automatizadores/introduccion/commonjs-vs-es-modules/) por Manz
* [@ull-esit-dsi-1617/scapegoat](https://www.npmjs.com/package/@ull-esit-dsi-1617/scapegoat) en npm
* [How to install an npm package from GitHub directly?](https://stackoverflow.com/questions/17509669/how-to-install-an-npm-package-from-github-directly) in StackOverflow
* [Working with scoped packages](https://docs.npmjs.com/getting-started/scoped-packages)
* [npm-scope manual: Scoped packages](https://docs.npmjs.com/misc/scope#publishing-public-scoped-packages-to-the-public-npm-registry)
* [Package.json documentation en npm site](https://docs.npmjs.com/files/package.json)

### Testing and Documentation

* [Jest](/temas/introduccion-a-javascript/jest)
* [Mocha](/temas/introduccion-a-javascript/mocha)
* [Documentation](/temas/introduccion-a-javascript/documentation)

### Semantic versioning and npm

* [Semantic versioning and npm](https://docs.npmjs.com/getting-started/semantic-versioning)
* [Semantic Versioning: Why You Should Be Using it](https://www.sitepoint.com/semantic-versioning-why-you-should-using/) SitePoint
* [YouTube Video: Semantic versioning and npm](https://youtu.be/kK4Meix58R4)
* [El comando npm version](https://docs.npmjs.com/cli/version)
