---
sidebar: false
---
# How to Deploy to GitHub Pages a VuePress Report

Estando en la raíz de nuestra práctica emitimos el comando:

```
npx create-vuepress-site
```

Respondemos a todas las preguntas con las respuestas por defecto

Instalamos:

```
cd docs
npm install
```

Editamos el fichero `docs/src/.vuepress/config.js` y añadimos como valor de `base`:

```js
➜  docs git:(master) ✗ head -n 5  src/.vuepress/config.js
const { description } = require('../../package')

module.exports = {
  base: "/egg-parser-diego-perez-garcia-alu0101345918/report/",
```

Sustituya `/egg-parser-diego-perez-garcia-alu0101345918` por su correspondiente `assignmentName-team` 

Nos vamos al `docs/package.json` que `create-vuepress-site` ha creado y modificamos el  script `build` como sigue:

```json
➜  docs git:(master) ✗ jq '.scripts' package.json
{
  "dev": "vuepress dev src",
  "build": "vuepress build src -d report"
}
```

Esto hará que los HTML generados por Vuepress queden en `docs/report`. 

Ahora comprobemos en local nuestro despliegue. Estando en `docs/src` escribimos:

```
npm run dev
```


La url de despliegue que estamos viendo en el browser debería ser algo con el patrón 

`http://localhost:8081/egg-parser-diego-perez-garcia-alu0101345918/report/`

esto es, debe seguir el patrón  `/nombre-del-repo/report/`

A continuación construimos el site:

```
npm run build
```

Esto debería producir un directorio `docs/report` con los ficheros generados:

```
➜  docs git:(master) ✗ ls report
404.html   assets     config     guide      index.html
```

Añada `docs/report` al control de versiones (`git add docs`, etc.).

Visite su repo en GitHub. Active las GitHub pages de su report desde la rama principal con directorio `docs` como fuente y haga un `commit` y un `push`.

Debería poder ver el informe en el subdirectorio `report` de su despliegue.

Todo lo que escriba en `docs/src` se verá reflejado en el informe.



## Deploy a VuePress site to Cyclic

Chat GPT instructions to deploy a VuePress site to Cyclic. 

You can follow these general steps:

1. Build your VuePress site locally by running the `vuepress build` command in your terminal. This will generate a static version of your site in the `dist` folder.
2. Log in to your Cyclic account and create a new project.
3. Connect your project to your Git repository where your VuePress site is hosted.
4. Set up a build command in Cyclic to build your site using the `vuepress build` command. You can do this by adding a `cyclic.yml` file to your repository with the following content:

```
steps:
  - name: build
    command: vuepress build
```

5. Set up a deploy command in Cyclic to deploy your site to your chosen hosting service. For example, if you want to deploy to GitHub Pages, you can add the following to your `cyclic.yml` file:

```
steps:
  - name: build
    command: vuepress build
  - name: deploy
    command: |
      git config --global user.email "you@example.com"
      git config --global user.name "Your Name"
      cd dist
      git init
      git add -A
      git commit -m "Deploy to GitHub Pages"
      git push -f git@github.com:username/repo.git master:gh-pages
```

Replace `you@example.com` and `Your Name` with your own email address and name, and replace `username/repo.git` with the URL of your own repository.

6. Save your `cyclic.yml` file and trigger a build on Cyclic. Your site should be built and deployed automatically.

Note: These steps assume that you already have a basic understanding of VuePress and Git, and that you have already set up a Git repository for your VuePress site. If you need more information about any of these steps, please refer to the VuePress and Cyclic documentation.