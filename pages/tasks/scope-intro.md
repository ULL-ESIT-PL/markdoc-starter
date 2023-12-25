---
title: "Introduction to Scoping"
key: scope-intro
published: true
date:
delivery:
campus: "https://campusingenieriaytecnologia2223.ull.es/mod/assign/view.php?id=27580"
order: 9
layout: Practica
sidebar: auto
prev: "espree-logging.md"
next: "spread-operator.md"
rubrica:
  - "Opciones en línea de comandos (-o, -V, -h, etc.)"
  - "Traduce correctamente las expresiones fuente a JS"
  - "Refleja la asociatividad y prioridad de operaciones correcta"
  - Se añade correctamente el código de "run time support" en el preámbulo del programa JS
  - Se declaran las variables inicializadas en el preámbulo del programa JS
  - Da mensajes de error para variables no declaradas
  - "Maneja números complejos: i, i^2, 2-i^3, etc."
  - El <code>package.json</code> tiene scripts para ejecutar el programa
  - Ha añadido tests suficientes
  - Se añade un estudio de cubrimiento de las pruebas (coverage) y se ha publicado en GitHub pages
  - Se han documentado el código con JSDoc o similar y publicado en GH-Pages
  - Se ha añadido el enlace a las GH pages en el "About" del repo
  - Se hace integración Continua usando GitHub Actions
---

# {{ $frontmatter.title }}

## Descripción de la Tarea

Queremos extender nuestra calculadora para que soporte operaciones de coma, identificadores, asignación y `print` de manera que podamos escribir una entrada como esta:

```js
➜  calc2js-solution git:(develop) ✗ cat test/data/input/test-id.calc 
a = 4+i, 
b = 2-2i, 
print(a*b)
```

Cuando se llame a nuestro transpiler con esta entrada, se debe generar un programa JS que al ejecutarse en NodeJS muestre por pantalla el resultado de la operación:

```js
➜  calc2js-solution git:(develop) ✗ bin/calc2js.mjs  test/data/input/test-id.calc    
#!/usr/bin/env node
const Complex = require("/Users/casianorodriguezleon/campus-virtual/2223/pl2223/practicas/drafts/calc2js-solution/src/complex.js");  
const print = x => { console.log(x); return x; };
let $a, $b;
($a = Complex("4").add(Complex("i")), $b = Complex("2").sub(Complex("2i"))), print($a.mul($b));
``` 


### Análisis de las dependencias de funciones de soporte

El programa JS generado incluye el código de soporte para números complejos y sólo se añade la función `print` y no otras del catálogo de funciones de soporte como `factorial`, `max` o `min` que no son necesarias

```js
const print = x => { console.log(x); return x; };
```
Nótese como se genera la importación  del módulo `complex.js` con la ruta en la que haya quedado la instalación del módulo

```js
const Complex = require("/Users/casianorodriguezleon/campus-virtual/2223/pl2223/practicas/drafts/calc2js-solution/src/complex.js");
```

### Análisis de las variables inicializadas

Las variables que se inicializan en el fuente como  `a` y `b` se declaran como variables globales siguiendo al código de soporte y precediendo al programa JS generado:
   
```js
// ... Código de soporte
let $a, $b;
($a = Complex("4").add(Complex("i")), 
 $b = Complex("2").sub(Complex("2i"))
), 
print($a.mul($b));
```

### Evitación de conflictos con palabras reservadas y nombres de soporte

Nótese también como las variables del programa de entrada se declaran con un prefijo `$` para evitar conflictos con las variables de soporte, palabras reservadas JS, etc. en el programa JS generado. Por ejemplo, si el programa de entrada es `while = 4` el potencial conflicto con el `while` de JS es resuelto mediante la traducción `$while = 4`.

### Código generado

El código generado deberá poder ejecutarse correctamente con NodeJS:

```js
➜  calc2js-solution git:(develop) ✗ bin/calc2js.mjs  test/data/input/test-id.calc | node -
{ re: 10, im: -6 }
```

## Declaración de Variables

Asumiremos que en nuestra calculadora, similar a como ocurre en Ruby, tan pronto una variable es inicializada se declara (en este caso en el único ámbito global). 

Un programa que contenga el **uso** de una variable no inicializada/declarada debe dar un error de ejecución.
Por ejemplo:

```js
➜  scope-intro-solution git:(scope-analysis) cat test/data/input/test-scope1.calc 
a = 4+d+i, 
b = 2-2i, 
print(c)
```

producirá una salida como:

```
➜  scope-intro-solution git:(scope-analysis) bin/calc2js.mjs  test/data/input/test-scope1.calc
Not declared variable 'd'
Not declared variable 'c'
```

## Fases del Compilador de la Calculadora

El compilador de la calculadora se puede dividir en las siguientes fases:

```js
module.exports = async function transpile(inputFile, outputFile) {
  let input = await fs.readFile(inputFile, 'utf-8') // 1. leer la entrada
  let ast;
  try {
    ast = p.parse(input);               // 2. parsear la entrada
  } catch (e) {
    let m = e.message                   // 3. si hay error, mostrarlo
    console.error(m);
    return m;
  }

  ast = dependencies(ast);             // 4. calcular que funciones de soporte se necesitan
  ast = initializedVariables(ast);     // 5. calcular que variables se inicializan paa su declaración
  ast = usedVariables(ast);            // 6. calcular que variables son utilizadas
  let d = difference(ast.used, ast.symbolTable)
  if (d.size > 0) {                    // 7. si hay variables usadas y no inicializadas, mostrar error
    let m = notDeclared(d).join('');
    console.error(m);
    return m;
  }

  let output = codeGen(ast);           // 8. generar el código JS
  
  await writeCode(output, outputFile); // 9. escribir el código JS en el fichero de salida
  return output;
}
```

Para las fases 4,5 y 6 deberá recorrer el AST usando `visit` del módulo [ast-types](/temas/tree-transformations/ast-types) 
para completar el código de las funciones `dependencies`, `initializedVariables` y `usedVariables` respectivamente.
Utilice el módulo [recast](/temas/tree-transformations/jscodeshift-recast) para la escritura de `codeGen`.

## Pruebas, Covering e Integración Continua

Escriba las pruebas, haga un estudio de cubrimiento usando [c8](https://github.com/bcoe/c8) y añada integración continua usando [GitHub Actions](/temas/introduccion-a-javascript/github-actions.html).

Lea las secciones [Testing with Mocha](/temas/introduccion-a-javascript/mocha.html#mocha) y [Jest](/temas/introduccion-a-javascript/jest).

## Documentación

[Documente](/temas/introduccion-a-javascript/documentation)
el módulo incorporando un `README.md` y la documentación de la función exportada usando [JsDoc](/temas/introduccion-a-javascript/documentation.html).
Lea la sección [Documenting the JavaScript Sources](/temas/introduccion-a-javascript/creating-and-publishing-npm-module.html#documenting-the-javascript-sources)

## References

* [ast-types](/temas/tree-transformations/ast-types)
* [recast](/temas/tree-transformations/jscodeshift-recast) 
* More on JSCodeshift in the article [Write Code to Rewrite Your Code: jscodeshift](https://www.toptal.com/javascript/write-code-to-rewrite-your-code) by Jeremy Greer
* See [Tree  Transformations References](/temas/tree-transformations/tree-transformations-references)

!!!include(includes/jscodeshift-links.md)!!!
