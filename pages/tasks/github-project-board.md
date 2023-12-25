---
title: GitHub Project Board
date:
delivery:
campus: https://campusingenieriaytecnologia2223.ull.es/mod/assign/view.php?id=20499
published: true
key: github-project-board
layout: Practica
order: 3
prev: github-campus-expert.md
next: visual-studio-code.html
rubrica:
  - "Proyecto Kanban creado para la práctica"
  - "Lo estoy usando para informar del avance en mis prácticas"
  - "Convierto las notas en issues"
  - La visibilidad de mis projects boards es correcta
  - "Informe elaborado correcto"
---

# Práctica {{ $frontmatter.title }}

## A Project Board for each Lab

* Para cada práctica/asignación se creará un tablero kanban (GitHub Project Automated Kanban) enlazado al repo de la práctica

  ![](/images/github-project-board-example.png)
* En este tablero de repo se crean inicialmente en la columna `TODO` al menos tantas incidencias como requisitos tiene la práctica
* Cuando en la corrección el profesor comenta que el requisito  esta cumplido **la cerramos**. Si el profesor indica que algo esta mal debe crearse una nueva incidencia que deberá ir a `TODO`.  Cuando crea que la haya arreglado la mueve a `done` y creará una incidencia mencionando al profesor. 
* **En algunos casos, cuando sea razonable y los profesores se lo indiquen, el GitHub Project Automated Kanban podrá estar enlazado a varios repos. Es el caso para estas primeras Prácticas Básicas**

<!--

## Course Project Board

* Cree además un project board automated kanban para el seguimiento de sus prácticas durante el curso.
* Este project board **se usa a nivel global de asignatura** y no de práctica pero lo enlaza también con el repo de cada práctica, de manera que cada repo tiene dos boards enlazados: uno a nivel de asignatura y otro a nivel de práctica/asignación. Sigue un ejemplo:
  
  ![](/images/github-project-boards/one-repo-two-boards.png)
* Este project board de asignatura tiene una sóla nota/incidencia por cada práctica o tarea (con el nombre de la tarea) que se asocia como incidencia al repo de la práctica
* Dicha incidencia se moverá a la columna `done` cuando el alumno considere que está terminada. En ese momento podemos crear una incidencia mencionando al profesor y comunicándole que hemos finalizado la tarea. 

Sigue un ejemplo de como podría configurar la *vista de tabla* del organization project board de un alumno: con columnas `title`, `status` y `repository`

![](/images/organization-project-board-beta.png)

-->

## Project Board Visibility

::: danger Cuidado!

Asegúrese de tener configurados como privados sus project boards. Además proceda a ocultarlos a los miembros de la organización que no sean usted siguiendo estos pasos:

1. Estando en el project board, haga click en el botón `...` y seleccione `Settings`
 
  ![/images/github-project-boards/project-board-visibilit
y-1.png](/images/github-project-boards/project-board-visibility-1.png)
2. En el panel de la izquierda seleccione `Manage access`
 
  ![/images/github-project-boards/project-board-visibility-2.png](/images/github-project-boards/project-board-visibility-2.png)

3. Cambie el valor de `Base Role`a `no access`
   
  ![/images/github-project-boards/project-board-visibility-3.png](/images/github-project-boards/project-board-visibility-3.png)

4. Ahora si otros miembros de la organización navegan  a su board obtendrán unn 404:
   
  ![/images/github-project-boards/project-board-visibility-4.png](/images/github-project-boards/project-board-visibility-4.png)

:::

## References

* [GitHub Docs: About project boards](https://docs.github.com/en/github/managing-your-work-on-github/about-project-boards)


