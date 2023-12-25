---
title: Translating Arithmetic Expressions to JavaScript
layout: Practica
published: true
date:
delivery:
campus: "https://campusingenieriaytecnologia2223.ull.es/mod/assign/view.php?id=20502"
key: arith2js
prev: "iaas.md"
next: #hello-compiler.md
order: 6
rubrica:
  - "Opciones en línea de comandos (-o, -V, -h, etc.)"
  - "Tutorial README.md y paneles bien presentados"
  - Todos los operadores han sido implementados con las precedencias correctas
  - Se ha usado commander para procesar la línea de argumentos
  - Utiliza ambos CommonJS y ECMAScript 
  - Se aportan pruebas usando Mocha
  - Se hace un estudio de cubrimiento de las pruebas
  - El <code>package.json</code> tiene scripts para ejecutar el programa
  - Ha entregado el zip en el campus
repo:
  text: "Repo hello-jison"
  href: "https://github.com/ull-esit-pl/hello-jison"

---

# {% $markdoc.frontmatter.title %}

## Objetivos

Usando Jison generalice el ejemplo en la carpeta `ast` del [Repo hello-jison](https://github.com/ull-esit-pl/hello-jison) constituido por los ficheros:

* [minus-ast.jison](https://github.com/ULL-ESIT-PL/hello-jison/blob/master/ast/minus-ast.jison) 
* [ast-build.js](https://github.com/ULL-ESIT-PL/hello-jison/blob/master/ast/ast-build.js)
* [minus-ast.l](https://github.com/ULL-ESIT-PL/hello-jison/blob/master/ast/minus-ast.l)
* [ast2js.js](https://github.com/ULL-ESIT-PL/hello-jison/blob/master/ast/ast2js.js)

para escribir un programa que, recibiendo como entrada una cadena que contiene una secuencia de expresiones aritméticas de enteros separados por comas, produzca un AST compatible con el del [parser espree](https://github.com/eslint/espree). 
Use [escodegen](https://github.com/estools/escodegen) para generar el código JavaScript correspondiente (vea [ast2js.js](https://github.com/ULL-ESIT-PL/hello-jison/blob/master/ast/ast2js.js)). Sigue un ejemplo de una posible ejecución:

```bash
✗ cat test/data/test1.calc 
4 - 2 - 1                                                                                       
✗ bin/calc2js.mjs test/data/test1.calc 
console.log(4 - 2 - 1);
✗ bin/calc2js.js test/data/test1.calc | node -
1
```

Las expresiones aritméticas deben soportar además de suma, resta, multiplicación y división el menos unario `-(2+3)*2`   un operador de factorial `!`, un operador de potencia `**` y paréntesis. Ejemplo: `-(2 + 3) * 4! - 5 ** 6`.

## Opciones en línea de comandos

Use [commander](https://github.com/tj/commander.js#readme) para procesar la línea de argumentos:
  
```bash
$ bin/calc2js.mjs --help
Usage: calc2js [options] <filename>

Arguments:
  filename                 file with the original code

Options:
  -V, --version            output the version number
  -o, --output <filename>  file in which to write the output
  -h, --help               display help for command
```

## Dealing with Ambiguity

Para tratar con los temas de ambigüedad en la gramática,
puede consultar 

* la sección [Precedencia y Asociatividad](https://crguezl.github.io/pl-html/node57.html) de los viejos apuntes de PL
* la sección [Dealing with ambiguity](/practicas/hello-compiler.html#dealing-with-ambiguity) de la práctica [hello-compiler](/practicas/hello-compiler.html) y aplíque los conceptos aprendidos a este proyecto.

## Unary minus and exponentiation in escodegen

[See unary minus section](/assets/unaryminus-exponenciation-escodegen)

## Pruebas

Añada pruebas a este proyecto usando [mocha](/temas/introduccion-a-javascript/mocha.html)


[Mocking and Stubbing](/temas/introduccion-a-javascript/mocking-stubbing)


## Covering 

You can use  [nyc](https://www.npmjs.com/package/nyc) to do the covering of your mocha tests.
See the notes in [covering](/temas/introduccion-a-javascript/covering). 

Activate the GitHub pages of your repo (use the default branch and the `docs` folder) and be sure to include your covering report in the `docs` folder.

```
✗ npm run cov

> hello-jison@1.0.0 cov
> nyc npm test


> hello-jison@1.0.0 test
> npm run compile; mocha test/test.mjs


> hello-jison@1.0.0 compile
> jison src/grammar.jison src/lexer.l -o src/calc.js



  ✔ transpile(test1.calc, out1.js)
  ✔ transpile(test2.calc, out2.js)
  ✔ transpile(test3.calc, out3.js)

  3 passing (20ms)

--------------|---------|----------|---------|---------|-----------------------------------------
File          | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                       
--------------|---------|----------|---------|---------|-----------------------------------------
All files     |   58.92 |    45.83 |   47.22 |   56.63 |                                         
 ast-build.js |     100 |      100 |     100 |     100 |                                         
 calc.js      |   57.44 |    45.78 |   40.62 |   54.92 | ...,530-539,548-569,578,580,602-607,610 
 transpile.js |   81.81 |       50 |     100 |   81.81 | 11-12                                   
--------------|---------|----------|---------|---------|-----------------------------------------
```

## References

### Essentials for this lab

* See the examples in the repo [crguezl/hello-jison](https://github.com/crguezl/hello-jison)
* [https://astexplorer.net](https://astexplorer.net)
* [Tipos de Nodos del AST](/temas/introduccion-a-pl/espree-visitorkeys) y nombres de las propiedades de los hijos
* [Escodegen repo en GitHub](https://github.com/estools/escodegen)
  - [Escodegen API Doc](https://github.com/estools/escodegen/wiki/API)
* [Jison Documentation](https://gerhobbelt.github.io/jison/docs//)

### Jison and Syntax Analysis

* [Análisis Sintáctico Ascendente en JavaScript](https://crguezl.github.io/pl-html/node43.html)
* [Jison](/temas/syntax-analysis/analisis-LR/#introduccion-al-analisis-lr)
* [Mi primer proyecto utilizando Jison](https://ericknavarro.io/2019/07/21/17-Mi-primer-proyecto-utilizando-Jison-Linux/) por Erick Navarro
* [Folder jison/examples from the Jison distribution](https://github.com/zaach/jison/tree/master/examples)
* [Jison Debugger](https://nolanlawson.github.io/jison-debugger/)
* [Precedencia y Asociatividad](https://crguezl.github.io/pl-html/node57.html)
    - [Repo de ejemplo crguezl/jison-prec](https://github.com/crguezl/jison-prec)
* [Construcción de las Tablas para el Análisis SLR](https://crguezl.github.io/pl-html/node49.html)
* [Algoritmo de Análisis LR (yacc/bison/jison)](https://crguezl.github.io/pl-html/node55.html)
* [Repo ULL-ESIT-PL-1718/jison-aSb](https://github.com/ULL-ESIT-PL-1718/jison-aSb)
* [Repo ULL-ESIT-PL-1718/ull-etsii-grado-pl-jisoncalc](https://github.com/ULL-ESIT-PL-1718/ull-etsii-grado-pl-jisoncalc)
* <a href="https://medium.com/basecs/leveling-up-ones-parsing-game-with-asts-d7a6fc2400ff" rel="nofollow">Leveling Up One’s Parsing Game With ASTs</a> by <a href="https://twitter.com/vaidehijoshi" rel="nofollow">Vaidehi Joshi</a> <em> 👍</em>


### Have a look

* [JAVASCRIPT AST VISUALIZER](https://resources.jointjs.com/demos/javascript-ast) jointjs demos
* [Espree](https://github.com/eslint/espree)
  * [Options for parse and tokenize methods](https://github.com/eslint/espree#options)