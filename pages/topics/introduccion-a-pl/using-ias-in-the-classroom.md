---
title: "Using IAs in the Classroom"
sidebar: auto
---
# {{ $frontmatter.title }}

Los modelos de IA generativa funcionan mediante el uso de redes neuronales para identificar patrones a partir de grandes conjuntos de datos para luego generar  contenidos. Los *Large Language Models* (LLM) son un tipo de modelo de IA generativa  que procesa y genera texto en lenguaje natural. 

## Disponibilidad de grandes cantidades de textos
Su aparición ha sido posible en parte por la **disponibilidad de grandes cantidades de textos**, como libros, sitios web, publicaciones y códigos en plataformas de desarrollo colaborativo y redes sociales. Estos textos se pueden utilizar para entrenar los modelos de manera que sean capaces de predecir y generar respuestas de lenguaje natural en una variedad de contextos. Entre las  múltiples aplicaciones prácticas que tienen los generadores de texto, como ChatGPT se encuentra la de generar código. 

## Redes adversarias generativas

Otro avance que ha hecho posible los LLM es la aparición de las **redes adversarias generativas (GAN)** que pueden ser  utilizadas para la generación de texto, mediante el entrenamiento de dos redes neuronales, una que genera textos *"falsos"* (Generador) y otra que discrimina entre textos *"reales"* (generados por humanos) y falsos (Discriminador). Las dos redes se entrenan en competencia con el objetivo de mejorar la capacidad del generador para generar textos realistas.

## Modelos basados en transformadores

Otro componente de los LLM es que son **modelos basados en transformadores** descritos por primera vez en un [artículo de Google de 2017](https://arxiv.org/pdf/1706.03762.pdf): la red neuronal aprende el contexto y el significado mediante el seguimiento de las relaciones entre las palabras en la oración. Al encontrar patrones entre elementos matemáticamente, se elimina la necesidad de etiquetar los datos, haciendo posible procesar en paralelo los petabytes de datos de texto que existen en la web. 

Los modelos de transformador aplican un conjunto evolutivo de técnicas matemáticas, llamadas *atención* o *autoatención*, para detectar patrones incluso entre elementos de datos distantes en una serie, que se influyen y dependen unos de otros.

Los transformadores usan codificadores posicionales para etiquetar elementos de datos que entran y salen de la red. 

![/images/Transformer-model-example-aidan-gomez-1280x763.png](/images/Transformer-model-example-aidan-gomez-1280x763.png)

Las *unidades de atención* siguen estas etiquetas, calculando una especie de mapa algebraico de cómo cada elemento se relaciona con los demás.

Las consultas de atención generalmente se ejecutan en paralelo mediante el cálculo de una matriz de ecuaciones en lo que se denomina atención de múltiples cabezas.

Este clip muestra en 7 minutos como funciona ChatGPT:
<https://youtube.com/clip/UgkxRvLkh8LOZ10OHfrOReOXsc2Lx8ZNCJJ_>

## Uso en el Aula

GitHub Copilot es una aplicación LLM que se integra en la IDE del desarrollador (VSCode por ejemplo) y que  a partir de los comentarios en lenguaje natural (inglés, español, ucraniano, etc.) y del código existente en la carpeta de trabajo (*workspace*) usa IA generativa para proporcionar sugerencias de código en una gran variedad de lenguajes de programación, incluidos Python, JavaScript, TypeScript, Ruby, Go, Rust, PHP y C#.

Desde que GitHub introdujo GitHub Copilot en Junio de 2021 y en los cursos 21/22 y 22/23 hemos estado usando no sólo GH Copilot sino también Chat-GPT-3 y Chat-GPT-4 en nuestra docencia, en la elaboración y preparación de clases, ejercicios y prácticas e investigando como los alumnos pueden beneficiarse de los mismos. 

En esta asignatura les animamos a que usen estas herramientas en sus proyectos y prácticas y que nos cuenten sus experiencias.

## References

### Use on Education and Programming

* [Harness the power of generative AI for software development](https://github.com/readme/guides/coding-generative-ai) by Anton Mirhorodchenko
* [Uso de Asistentes IA en concursos de Programación](https://computational-thinking.github.io/ia-assistant-olimpics/) C. León y C. Rodríguez. 2023.
  * [Repositorio Computational-Thinking/ia-assistant-olimpics](https://github.com/Computational-Thinking/ia-assistant-olimpics)
* Seminario sobre inteligencia artificial y docencia universitaria de la ULL
  
  <youtube id="Os2fNi5LXZQ"></youtube>

  30 de Marzo 2023. En los minutos 1:04 al 1:11 se explica el funcionamiento de ChatGPT.
* [Prompt engineering for students – making generative AI work for you](https://educational-innovation.sydney.edu.au/teaching@sydney/prompt-engineering-for-students-making-generative-ai-work-for-you/). Danny Liu. 28 April. 2023
* [GitHub Copilot AI pair programmer: Asset or Liability?](https://arxiv.org/pdf/2206.15331.pdf) Arghavan Moradi Dakhel, Vahid Majdinasab, Amin Nikanjam, Foutse Khomh, Michel C. Desmarais, Zhen Ming (Jack)Jiang Jun 2022
* James Finnie-Ansley, Paul Denny, Brett A. Becker, Andrew Luxton-Reilly, and James Prather. 2022. [The Robots Are Coming: Exploring the Implications of OpenAI Codex on Introductory Programming](https://dl.acm.org/doi/10.1145/3511861.3511863#sec-comments). In Proceedings of the 24th Australasian Computing Education Conference (ACE '22). Association for Computing Machinery, New York, NY, USA, 10–19. <https://doi.org/10.1145/3511861.3511863>
* [Copilot, ChatGPT y GPT-4 han cambiado el mundo de la programación para siempre. Esto opinan los programadores](https://www.xataka.com/servicios/copilot-chatgpt-gpt-4-han-cambiado-para-siempre-mundo-programacion-esto-que-opinan-expertos). Javier Pastor. 28 Marzo 2023. Entrevista con Brais Moore y Miguel Angel Durán. Xataca.com



### The Future

* **First Contact** 
  
  Sparks of AGI: early experiments with GPT-4 by Sebastien Bubeck
  
  <youtube id="qbIk7-JPB2c"></youtube>
  - [1:47](https://www.youtube.com/watch?v=qbIk7-JPB2c&t=107s) – Sebastien starts 
  - [5:36](https://www.youtube.com/watch?v=qbIk7-JPB2c&t=336s) – goal of the talk: there is some intelligence in the system 
  - [6:05](https://www.youtube.com/watch?v=qbIk7-JPB2c&t=365s) – “beware of trillion-dimensional space and its surprises” 
  - [8:20](https://www.youtube.com/watch?v=qbIk7-JPB2c&t=500s) – example demonstrating GPT4’s common sense 
  - [10:40](https://www.youtube.com/watch?v=qbIk7-JPB2c&t=640s) – theory of the mind
  - [12:29](https://www.youtube.com/watch?v=qbIk7-JPB2c&t=749s) – theory of mind example
  - [14:27](https://www.youtube.com/watch?v=qbIk7-JPB2c&t=867s) – consensus definition of intelligence by psychologists published in 1994 and if GPT4 matches this definition
  - [18:00](https://www.youtube.com/watch?v=qbIk7-JPB2c&t=1080s) – how to test GPT4’s intelligence 
  - [19:00](https://www.youtube.com/watch?v=qbIk7-JPB2c&t=1140s) – Asking GP4 to write a proof of infinitude of primes 
  - [22:13](https://www.youtube.com/watch?v=qbIk7-JPB2c&t=1333s) – The Strange Case of the Unicorn 
  - [27:15](https://www.youtube.com/watch?v=qbIk7-JPB2c&t=1635s) – GPT4 vs Stable Diffusion 
  - [29:44](https://www.youtube.com/watch?v=qbIk7-JPB2c&t=1784s) – Coding with a copilot that understands 
  - [32:57](https://www.youtube.com/watch?v=qbIk7-JPB2c&t=1977s) – GPT4’s performance on coding interviews 
  - [33:41](https://www.youtube.com/watch?v=qbIk7-JPB2c&t=2021s) – GPT4’s weaknesses, which can be overcome with tools 
  - [36:09](https://www.youtube.com/watch?v=qbIk7-JPB2c&t=2169s) – A mathematical conversation with GPT4 
  - [42:40](https://www.youtube.com/watch?v=qbIk7-JPB2c&t=2560s) – GPT4 cannot do true planning 
  - [45:02](https://www.youtube.com/watch?v=qbIk7-JPB2c&t=2702s) – Is GPT4 intelligent and does it matter?
* [Sam Altman: OpenAI CEO on GPT-4, ChatGPT, and the Future of AI](https://youtu.be/L_Guz73e6fw) Lex Fridman Podcast #367
  
### Learning LLMs

* [Introduction to Large Language Models](https://youtu.be/zizonToFXDs) by Google Cloud Tech. Youtube. 
* [Introduction to Generative AI](https://youtu.be/G2fqAlgmoPo) by Google Cloud Tech. Youtube. 
* [What Is a Transformer Model?](https://blogs.nvidia.com/blog/2022/03/25/what-is-a-transformer-model/#:~:text=A%20transformer%20model%20is%20a,25%2C%202022%20by%20Rick%20Merritt). March 25, 2022 by Rick Merritt
* [Attention Is All You Need](https://arxiv.org/pdf/1706.03762.pdf) by 
Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Lukasz Kaiser, Illia Polosukhin. 12 Jun 2017

[Pastor]: https://www.xataka.com/servicios/copilot-chatgpt-gpt-4-han-cambiado-para-siempre-mundo-programacion-esto-que-opinan-expertos
[Repositorio]: https://github.com/Computational-Thinking/ia-assistant-olimpics
[P31958_es]: https://jutge.org/problems/P31958_es
[chat-gpt3]: https://github.com/Computational-Thinking/ia-assistant-olimpics/blob/chat-gpt-3/chat-gpt3-solution.js
[chat-gpt3-human]: https://github.com/Computational-Thinking/ia-assistant-olimpics/blob/chat-gpt3-human/chat-gpt3-solution.js#L87-L118

[chat-gpt3-human-sortedbynumedges]: https://github.com/Computational-Thinking/ia-assistant-olimpics/blob/chat-gpt3-human-sortbynumedges/chat-gpt3-solution.js#L115-L116

[chat-gpt-4]: https://github.com/Computational-Thinking/ia-assistant-olimpics/blob/chat-gpt-4/chat-gpt4-solution.js#L41-L68
[chat-gpt-4-human]: https://github.com/Computational-Thinking/ia-assistant-olimpics/blob/chat-gpt-4-human/chat-gpt4-solution.js#L17-L47