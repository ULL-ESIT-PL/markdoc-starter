---
title: Tasks
food: [apple, orange, banana]
---

# {% $markdoc.frontmatter.title %}

{% $markdoc.frontmatter.food %}

{% if equals(1, 1) %}

Show the password

{% /if %}


{% upper("hello") %}

Markdoc uses **partials** to reuse content across documents. A separate Markdoc file stores the content, and it's referenced from within the `partial` tag.

{% partial variables={sdk: "Ruby", version: 3} file="header.md" /%}


{% callout title="tutu" %}
This is a full-featured boilerplate for a creating a documentation website using Markdoc and Next.js.
{% /callout %}

Here is use my own component:

{% mycomp 
  title="chachi" 
  otro="blah blah" 
  escierto=true
%}
This is a full-featured boilerplate 
for a creating a documentation website
using Markdoc and Next.js.
{% /mycomp %}

## References

- See [Dinesh Pandiyan - Markdoc: What is it and why do I love it?](https://youtu.be/XIw-0fCpP_4?si=POxU243rzlm1e71K)
- [How Stripe builds interactive docs with Markdoc](https://stripe.com/blog/markdoc) by Ryan Paul September 13, 2022
- [Building Markdoc: A Powerful, Flexible Open Source Markdown Framework - Mike BiFulco](https://youtu.be/hH_pZTIS_-o?si=ox8v--KSAA9xRN2q) 28 December 2022
- [Getting started with Markdoc in Next.js](https://dev.to/stripe/getting-started-with-markdoc-in-nextjs-ioj). Charlie Gerard for Stripe
Posted on 11 may 2022