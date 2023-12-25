---
sidebar: auto
prev: /temas/interpretation/ast-interpretation.md
next: /temas/interpretation/function-interpretation.md
---
# Interpretation of Assignment Expressions

In this language, the way to bind a value to a name is via `def`ine. 
This construct acts as a way both to define new bindings and to give existing ones a new value.

As a consequence, when you try to give a nonlocal binding a new value, you will end up defining a local one with the same name instead. 

::: tip Goals
The problem here is to add a special interpreter for `set(x, value)`, similar to `def(x, value)`, but

1. Does not create a new binding in the current scope
2. Updates the entry in the **nearest scope** (local, parent, grand-parent, etc.) in which a binding with name `x` exist
3. If no binding with name `x` exists, throws a `ReferenceError`.
::: 

This example illustrates the kind of behavior we want:

```js
➜  eloquentjsegg git:(private2122) cat examples/scope.egg 
do( 
  def(x,9), /* def crea una nueva variable local */
  def(f, fun( /* fun creates a new scope */
    do(
      def(x, 4), 
      print(x) # 4
    )
  )),
  def(g, fun(set(x, 8))), /* set no crea una nueva variable local */
  f(),
  print(x), # 9
  g(),
  print(x) # 8
)
➜  eloquentjsegg git:(private2122) bin/egg.js examples/scope.egg 
4
9
8
```

## l-values and r-values

Some languages use the idea of **l-values** and **r-values**, deriving from the typical mode of evaluation on the left and right-hand side of an assignment statement. 

* An **l-value** refers to an object that persists beyond a single expression. 
* An **r-value** is a temporary value that does not persist beyond the expression that uses it.

In many languages, notably the C family, l-values have storage addresses that are programmatically accessible to the running program (e.g., via some address-of operator like "`&`" in C/C++), meaning that they are variables or de-referenced references to a certain memory location. 

Form the perspective of interpretation and translation, the same sub-expresion `x` has different meanings depending on the side of the assignment in which it is:

```js
x = x
```
On the left side `x` is a reference or a binding, on the right side is a value: the value stored on that reference. 

## leftEvaluate  

Our `evaluate` methods do not work here, since they interpret the expressions in a r-value context.

The proposal is to introduce `leftEvaluate` methods in the AST node classes that evaluate the expressions in a l-value context. Something like the following code for `specialForms['=']`:

```js{10}
specialForms['='] = specialForms['set'] = function(args, env) { 
  if (args.length !== 2 || args[0].type === 'value') {
    throw new SyntaxError('Bad use of set');
  }

  let valueTree = args[args.length-1];
  let value = valueTree.evaluate(env);

  let leftSide = args[0];
  let [scope, name] = leftSide.leftEvaluate(env);
  scope[name] = value;

  return value;
}
```

## leftEvaluate for WORD Nodes

Try to write the `leftEvaluate` method(s) for WORD nodes. To start with, allow only words on the left side of any assignment so that, for instance in the following program 


```js{5}  
➜  egg-interpreter-solution git:(master) ✗ cat examples/fun.egg 
do(
   define(x, 4),
   define(setx, fun(val, 
     set(x, val)
     ) # end fun
   ),  # end define setx
   setx(50),
   print(x)
)
```

The interpretation of the `set(x, val)` at line 5 leads to the execution of the `specialForm["="]` and consequently to the following lines:

```js
  let [scope, name] = leftSide.leftEvaluate(env);
  scope[name] = value;
```
For this code to work, we need for  `leftEvaluate` to return as `scope` the global scope `topEnv` where `x` was declared and `name` has to be the string `"x"` pointing to the entry for `x`. 

::: tip So, what is a leftValue or memory reference in Egg?
As a first approach, we may say that a leftValue in Egg is the JS reference to the scope `env` object inside our associative memory prototype hierarchy followed by the specific `string` giving the specific entry inside such `env`.
:::

The Egg program above when executed produces:

```
➜  egg-interpreter-solution git:(master) ✗ bin/egg.js examples/fun.egg
50
```

## Accesing elements on arrays and objects 

::: warning Accesing elements on Data Structures
**If you only provide a `leftEvaluate` for `WORD ` nodes, then you can't  modify en element of an array or a property of an object or an entry of a dictionary/map**. 😟 👎

In the previous section we proposed that a leftValue in Egg is an array whose first element is JS reference to the scope/hash `env` object inside our associative memory prototype hierarchy followed by a second element containing the specific `string` giving the specific entry inside such `env`. 

The goal is to achieve that a program like this works:

```ruby
➜  eloquentjsegg git:(private2122) ✗ cat examples/leftvalue-pair.egg        
do(
  def (x, array(array(1,2),array(3,4))),
  =(array(x, 0),9),
  print(x) # [9,[3,4]]
)
```
:::

::: tip leftValue in Egg redefined
**Let us generalize to say that a leftValue in Egg is a word or an array containing as first element any expression that is evaluated to a JS reference to a data structure, followed by any legal subsequence of expressions that evaluate to legal indices inside such referenced data structure.**
::: 

So the idea is that a `leftEvaluate` method for `APPLY` nodes has to return an array whose first element is a reference to some JS data structure and the remaining elements constitute a legal sequence of selection inside the referenced data structure. Notice that in JavaScript all objects are references. For instance, the execution of the specialForm of `=`  in the `examples/leftvalue-pair.egg` example above:

```js
  =(array(x, 0),9),
```

has as first argument `args[0]`  this AST 

```js 
APPLY(op:WORD(name:array), args([WORD(name:x), VALUE(0)])
```

If we (right) `evaluate`  this node, the interpretation of the AST results in the call to `array(evaluated WORD, evaluated VALUE)` that returns the JS array `[env["x"], 0]`. 

Notice that here 
`env["x"]`  is a **JS reference** to the Egg array `x` and
`0` is a legal index inside the data structure referenced by `x`, since the definition of `x` was:

```js
def (x, array(array(1,2),array(3,4)))
```

Therefore the execution of the special form for `=` resulting of the interpretation of

```js
  =(array(x, 0),9),
```

can use the Egg leftvalue `[x, 0]` array to change to `9` the first element of `x` .

### Functions returning Egg leftValues

Any function that returns a valid **Egg reference** can be used as a left value. Here `reference(y,i)` 
is a function that returns a reference to the element  `y.length-i-1` of the array `y`:


```ruby 
➜  eloquentjsegg git:(private2223) ✗ cat examples/set-apply.egg 
do(
    def(x, array(4)),
    def(z, array(9,1,3)),

    def(reference, fun(y, i, array(y, -(-(length(y), i),1)))),
    set(reference(x,0), 9),
    print(x), # [9]
    set(reference(z,0), 1000),
    print(z)  # [9,1,1000]
)
```

When executed produces:

```
➜  eloquentjsegg git:(private2223) ✗ bin/egg.js examples/set-apply.egg
[9]
[9,1,1000]
```

and for future extensions (when we extend the language with maps, objects, etc.) we want programs like this one to work:

```ruby
➜  eloquentjsegg git:(private2122) ✗ cat examples/leftvalue-object.egg                                          
do {
  def (x, object(a: 1, b:3)),
  =(array(x, "a"),9),
  print(x) # { "a":9, "b":3}
}
```

that when executed produces:

```                                                                                                  
➜  eloquentjsegg git:(private2122) ✗ bin/egg.js examples/leftvalue-object.egg 
{"a":9,"b":3}
```

## Multiple indices

::: danger  More difficult!
If you solved the previous exercise you can consider supporting multiple indices.

How to make something like this work?

```ruby
➜  eloquentjsegg git:(private2122) ✗ cat examples/leftvalue-array-multiple-indices-2.egg
do (
  def (x, array(array(1,2),array(3,4))),
  =(array(x, 0, 0),9),
  print(x) # [[9,2], [3,4]]
)
```                                                                                                                        

```
➜  eloquentjsegg git:(private2122) ✗ bin/egg.js examples/leftvalue-array-multiple-indices-2.egg 
[[9,2],[3,4]]
```
::: 

## Set and Negative indices

If you decide to give support to negative indices in your arrays, you not only must take care of the `element` function 
but also inside the `set` for programs like this one:


```js
➜  eloquentjsegg git:(private2122) ✗ cat examples/leftvalue-array-negative-indices.egg       
do (
  def (x, array(array(1,2),array(3,4))),
  =(array(x, -1, -1),9),
  print(x) # [[1,2],[3,9]]
)                                                                                                                                     
➜  eloquentjsegg git:(private2122) ✗ bin/egg.js examples/leftvalue-array-negative-indices.egg
[[1,2],[3,9]]
```

Here is another example:

```ruby
➜  eloquentjsegg git:(private2122) ✗ cat examples/leftvalue-object-multiple.egg       
do {
  def (x, object(a: array(1, 2), b:3)),
  =(array(x, "a", -1), 9),
  print(x) # {"a":[1,9],"b":3}
}
                                          
➜  eloquentjsegg git:(private2122) ✗ bin/egg.js examples/leftvalue-object-multiple.egg
{"a":[1,9],"b":3}
```

## Future Work on Assignments

::: danger Future Work

Although by now we will restrict to allow only words on the left side of any assignment, we aim to increase expressiveness and to allow assignments that can contains expressions like the `=(y["y"][1], 9)` or `=(self.c, a)` in the following example (`examples/set-lefteval.egg`):

```js{4}
do (
  def (x, [[1,2], [3,4]]),
  =(x[0], 9), # [9, [3,4]]
  print(x), # [ 9, [ 3, 4 ] ]
  
  def(y, map(x:4, y: array(0,7))),
  =(y["y"][1], 9), # map(x:4, y: [0,9])
  print(y["y", 1]), # 9
  print(y), # { x: 4, y: [ 0, 9 ] }

  def(z, { c:4, g: fun(a, =(self.c, a))}),
  print(z.c),    # 4
  print(z.g(8)), # 8
  print(z.c)     # 8
)
```

That we will compile and execute like here:

```
➜  egg-oop-parser-solution git:(master) ✗ bin/eggc.js examples/set-lefteval.egg
➜  egg-oop-parser-solution git:(master) ✗ bin/evm examples/set-lefteval.json   
[9,[3,4]]
[0,9]
{"x":4,"y":[0,9]}
4
8
8
```
::: 

## See also

* See also section [Fixing Scope](https://eloquentjavascript.net/12_language.html#i_Y9ZDMshYCQ) in the EloquentJS book
* Puede encontrar una solución al problema en la rama `inicial` de este repo [ULL-ESIT-PL-1617/egg/](https://github.com/ULL-ESIT-PL-1617/egg/tree/inicial). La rama `inicial` como su nombre indica contiene además del código  descrito en el capítulo de EloquentJS las soluciones a los ejercicios propuestos en el capítulo del libro.
