// This code was inspired by [Charlie Gerard interview: How Stripe Powers Their Documentation with MarkDoc](https://youtu.be/M1E0dUVuC48?si=nhtYYwOv12HRLzNS)  GitHub channel in Youtube. - Open Source Friday #opensource
 
import React from "react";
import Markdoc from "@markdoc/markdoc";
import { Banner } from "../components";

function Resources() {
    const config = {
        variables: {
            name: "Rizel",
        },
        functions: {
        },
        tags: {
        },
    }
    const content = `
    
# Resources

The text:

\`\`\`
           Name is \{\% $name \%\\}
\`\`\`

is converted to:

Name is {% $name %}

Here is some **code**:

\`\`\`js
       const foo = 'bar';
\`\`\`

## References

- See [Dinesh Pandiyan - Markdoc: What is it and why do I love it?](https://youtu.be/XIw-0fCpP_4?si=POxU243rzlm1e71K)
- [How Stripe builds interactive docs with Markdoc](https://stripe.com/blog/markdoc) by Ryan Paul September 13, 2022
- [Charlie Gerard interview: How Stripe Powers Their Documentation with MarkDoc](https://youtu.be/M1E0dUVuC48?si=nhtYYwOv12HRLzNS)  GitHub channel in Youtube. - Open Source Friday #opensource
- [Building Markdoc: A Powerful, Flexible Open Source Markdown Framework - Mike BiFulco](https://youtu.be/hH_pZTIS_-o?si=ox8v--KSAA9xRN2q) 28 December 2022
- [Getting started with Markdoc in Next.js](https://dev.to/stripe/getting-started-with-markdoc-in-nextjs-ioj). Charlie Gerard for Stripe
Posted on 11 may 2022
    `;
    const ast = Markdoc.parse(content);
    const errors = Markdoc.validate(ast, config);
    if (errors.length > 0) {
        console.error(errors);
    }
    const doc = Markdoc.transform(ast, config);
    //const html = Markdoc.renderers.html(content);
    
    const result =  Markdoc.renderers.react(doc, React, {
        components: {Banner},   
    })
    return result;
}

export default Resources;