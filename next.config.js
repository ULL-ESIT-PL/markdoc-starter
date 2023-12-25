const withMarkdoc = require('@markdoc/next.js');

let config = withMarkdoc(/* config: https://markdoc.io/docs/nextjs#options */)({
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdoc'],
  });


module.exports = config;
