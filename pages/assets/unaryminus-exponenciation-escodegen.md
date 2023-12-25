
::: danger Exponentiation is ECMAScript 2016
New Features in ECMAScript 2016:  JavaScript Exponentiation (**)
See for instance: <https://www.w3schools.com/js/js_2016.asp> and <https://262.ecma-international.org/7.0/>

> ...   This specification also includes support for **a new exponentiation operator** and adds a new method to Array.prototype called **includes**

Since escodegen does not support this Feature the combination of unary minus and exponentiation currently does not work.

```js
➜  arith2js-parallel-computing-group-parallel git:(essay-2023-02-15-miercoles) ✗ node
Welcome to Node.js v18.8.0.
Type ".help" for more information.
> let  espree = require('espree')
> let ast = espree.parse('(-2)**2') // gives an error since the default compiler is ecma 5
Uncaught [SyntaxError: Unexpected token *
> let ast3 = espree.parse('(-2)**2', { ecmaVersion: 7}) // no errors. Right AST
> let escodegen = require('escodegen')
> escodegen.generate(ast3) // escodegen does not support this feature
'-2 ** 2;'                 // the code generated is wrong
> let gc = escodegen.generate(ast3)
> gc
'-2 ** 2;'
> eval(gc) // the evaluation of the code produces errors
Uncaught:
SyntaxError: Unary operator used immediately before exponentiation expression. Parenthesis must be used to disambiguate operator precedence
> -2 ** 2 # JS does not accept this expression
-2 ** 2
^^^^^
Uncaught:
SyntaxError: Unary operator used immediately before exponentiation expression. Parenthesis must be used to disambiguate operator precedence
> (-2) ** 2  # ... But this code works 
4
:::

Therefore, the following  continuation of the former node session suggest the correct translation:

::: tip Use Math.pow
```js
> let ast5 = espree.parse('Math.pow(-2,2)')
undefined
> gc = escodegen.generate(ast5)
'Math.pow(-2, 2);'
> eval(gc)
4
``` 
:::