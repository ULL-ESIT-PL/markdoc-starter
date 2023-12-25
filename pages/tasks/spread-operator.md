---
title: "ast-types: spread-operator"
key: spread-operator
campus: "https://campusingenieriaytecnologia2223.ull.es/mod/assign/view.php?id=20508&forceview=1"
published: true
date: 2022/03/24
delivery: "2023/03/16"
order: 10
layout: Practica
prev: scope-intro.md
next: constant-folding.md
sidebar: true
rubrica: 
  - El paquete está publicado en gitHub Registry con el ámbito de la organización
  - Contiene un ejecutable que se ejecuta correctamente (<code>--help</code>, etc.)
  - The <code>spread</code> has been extended for SpreadElements inside an ArrayExpression 
  - El módulo exporta las funciones adecuadas
  - Contiene tests y comprueba que el módulo publicado se importa correctamente
  - "Estudio de covering"
  - Se ha hecho CI con GitHub Actions
  - Módulo bien documentado 
  - Informe hecho con Vuepress o equivalente desplegado
  - Actualizó a Vuepress 2.x
  - El repo tiene rellenada la sección "about" con el enlace a la doc desplegada
  - Se ha hecho un buen uso del versionado semántico en la evolución del módulo
---

# {{ $frontmatter.title }}

## Warning

::: danger Deadline
This GitHub Classroom assignment is configured with deadline 16/03/2023 8:00

![/images/deadline.png](/images/deadline.png)

:::

## Objetivos

Construya un paquete npm y 
publíquelo en [GitHub Registry](/temas/introduccion-a-javascript/creating-and-publishing-npm-module.html#what-is-github-registry) con ámbito `@ULL-ESIT-PL-2122` y nombre el nombre del repo asignado.

El módulo además de exportar la función `spread` provee un ejecutable `spread` que se llama así:

```
spread input.js output.js
```

el cual realiza [una traducción del operador es6 `...` a versiones anteriores de JS](/temas/tree-transformations/index.html#translating-the-es6-spread-operator-to-es5) sobre `input.js` dejando la salida en `output.js`. Tiene una solución en la sección 
[Translating the ES6 spread operator ... to ES5](/temas/tree-transformations/ast-types.html#translating-the-es6-spread-operator-to-es5)
de estos apuntes.

Una parte de los conceptos y habilidades a adquirir con esta práctica se explican en la sección [Creating and publishing a node.js module en GitHub y en NPM](/temas/introduccion-a-javascript/creating-and-publishing-npm-module). Léala con detenimiento antes de hacer esta práctica. 

## Pruebas

Deberá añadir pruebas usando [Mocha y Chai](/temas/introduccion-a-javascript/creating-and-publishing-npm-module.html#testing-with-mocha-and-chai) o [Jest](/temas/introduccion-a-javascript/jest).
Repase las secciones [Testing with Mocha and Chai](/temas/introduccion-a-javascript/creating-and-publishing-npm-module.html#testing-with-mocha-and-chai) y [Jest](/temas/introduccion-a-javascript/jest). Añada un estudio de covering. See the notes in [covering](/temas/introduccion-a-javascript/covering). Añada CI con GitHub Actions.

## Informe y Documentación

[Documente](/temas/introduccion-a-javascript/documentation)
el módulo incorporando un `README.md`: Como se instala, como se usa el ejecutable, como se carga la librería, etc.

No haga el informe de la práctica en el `README.md`  sino que utilice el generador estático [Vuepress](https://vuepress.vuejs.org/guide/) para hacer el informe. El template de la práctica usa Vuepress 1.x que ha quedado algo obsoleto y produce errores si se usa con versiones de Node.js posteriores a la 16. Para evitar estos errores puede cambiar a la versión 2.x de Vuepress (recomendado) o bajar la versión de Node.js a la 16.


Para el despliegue en GitHub Pages use el directorio `docs`. Si lo desea puede también usar Netlify o Vercel para el despliegue.

Para el [despliegue en v1.x](https://vuepress.vuejs.org/guide/deploy.html#deploying) y [v2.x](https://v2.vuepress.vuejs.org/guide/deployment.html#deployment) del informe puede 

- mover los ficheros generados por VuePress del directorio `src/.vuepress/dist/` 
al directorio `docs/`).
- En v1.x recuerde poner `base` en su Vuepress `config.js` con el nombre de su repo. Algo así:

  ```js
  module.exports = {
    title: 'Lab ast-types Report',
    base: '/ast-types-casiano-rodriguez-leon-alumno5/',
    ...
  }
  ```
- Añada un fichero con nombre [`.nojekyll`](https://github.blog/2009-12-29-bypassing-jekyll-on-github-pages/) en su directorio `docs/`.

Puede sustituir el uso de Vuepress por algún otro generador como 
[Vitepress](https://vitepress.dev/guide/what-is-vitepress), [Docusaurus](https://docusaurus.io/docs), [Nextra](https://github.com/shuding/nextra) o [Astro](https://docs.astro.build/en/getting-started/).

La documentación de la API de la función exportada usando [JsDoc](/temas/introduccion-a-javascript/documentation.html) la puede dejar accesible en el despliegue (directorio `docs/api`) o puede tratar de integrarla con [Vuepress JsDoc Plugin](https://vuepress-jsdoc-example.vercel.app/code/). 

Añada el informe de Covering también (directorio `docs/covering` o similar).


## SpreadElements inside an ArrayExpression

With ES6 spread syntax it is easy to create a new array using an existing array:

```js
let parts = ['shoulders', 'knees'];
let lyrics = ['head', ...parts, 'and', 'toes'];
//  ["head", "shoulders", "knees", "and", "toes"]
```

The same can be done in former versions of JS using `Array.concat`:

```js
> parts = ['shoulders', 'knees'];
> lyrics = [].concat('head', parts, 'and', 'toes')
[ 'head', 'shoulders', 'knees', 'and', 'toes' ] // makes a shallow copy of parts
``` 

But can be achieved with other strategies.

Extend your translator to cover this use of the spread operator inside an `ArrayExpression`.

Publish it and update the version following the
[Semantic Versioning](/temas/introduccion-a-javascript/creating-and-publishing-npm-module.html#semantic-versioning)
rules.

## References

### ast-types

* [ast-types in this notes](/temas/tree-transformations/index.html#ast-types)
* [ast-types examples in crguezl/hello-ast-types](https://github.com/crguezl/hello-ast-types)

### ASTs Anatomy

* [Esprima AST syntax and format](https://docs.esprima.org/en/latest/syntax-tree-format.html)
* [The ESTree Spec](https://github.com/estree/estree)
  * [es2015](https://github.com/estree/estree/blob/master/es2015.md)


### Packages

* [Creating and Publishing a node.js Module in GitHub and NPM Registries](/temas/introduccion-a-javascript/creating-and-publishing-npm-module)
* [Módulos](/temas/introduccion-a-javascript/modulos)
* [Node.js docs. Modules: ECMAScript modules](https://nodejs.org/api/esm.html#introduction)
* [Node.js Packages](/temas/introduccion-a-javascript/nodejspackages)
* [Instalación de Módulos desde GitHub](/temas/introduccion-a-javascript/nodejspackages.html#instalaci%C3%B3n-desde-github)
* [Introducción a los Módulos en JS](https://lenguajejs.com/automatizadores/introduccion/commonjs-vs-es-modules/) por Manz
* [@ull-esit-dsi-1617/scapegoat](https://www.npmjs.com/package/@ull-esit-dsi-1617/scapegoat) en npm
* [How to install an npm package from GitHub directly?](https://stackoverflow.com/questions/17509669/how-to-install-an-npm-package-from-github-directly) in StackOverflow
* [Working with scoped packages](https://docs.npmjs.com/getting-started/scoped-packages)
* [npm-scope manual: Scoped packages](https://docs.npmjs.com/misc/scope#publishing-public-scoped-packages-to-the-public-npm-registry)
* [Package.json documentation en npm site](https://docs.npmjs.com/files/package.json)

### Testing 

* [Jest](/temas/introduccion-a-javascript/jest)
* [Mocha](/temas/introduccion-a-javascript/mocha)

### Documentation

* [Vuepress](https://vuepress.vuejs.org/guide/)
  * [Deployment](https://vuepress.vuejs.org/guide/deploy.html#deploying)
  * [Vuepress JsDoc Plugin](https://vuepress-jsdoc-example.vercel.app/code/)
  * [jsdoc2vuepress](https://www.npmjs.com/package/jsdoc2vuepress)
  * [Vuepress Autodoc Plugin](https://bprinty.github.io/vuepress-plugin-autodoc/#overview)
* [.nojekyll](https://github.blog/2009-12-29-bypassing-jekyll-on-github-pages/) Bypassing Jekyll on GitHub Pages
* [Vitepress](https://vitepress.dev/guide/what-is-vitepress)
* [Docusaurus](https://docusaurus.io/docs)
* [Nextra](https://github.com/shuding/nextra)
* [Astro](https://docs.astro.build/en/getting-started/).
* [JSDoc and others](/temas/introduccion-a-javascript/documentation) in this notes

### Semantic versioning and npm

* [Semantic versioning and npm](https://docs.npmjs.com/getting-started/semantic-versioning)
* [Semantic Versioning: Why You Should Be Using it](https://www.sitepoint.com/semantic-versioning-why-you-should-using/) SitePoint
* [YouTube Video: Semantic versioning and npm](https://youtu.be/kK4Meix58R4)
* [El comando npm version](https://docs.npmjs.com/cli/version)
