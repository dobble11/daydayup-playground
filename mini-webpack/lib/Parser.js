const { parse, traverse, transformFromAstSync } = require('@babel/core');
const { readFileSync } = require('fs');
const path = require('path');

const Parser = {
  getAst(path) {
    const content = readFileSync(path, 'utf-8');
    return parse(content, {
      sourceType: 'module',
    });
  },
  getDependecies(ast, filename) {
    // ./src
    const dirname = path.dirname(filename);
    const denpendecies = {};

    traverse(ast, {
      ImportDeclaration({ node }) {
        // ./ + src/hello.js
        const filepath = './' + path.join(dirname, node.source.value);
        // ./hello.js  ->  ./src/hello.js
        denpendecies[node.source.value] = filepath;
      },
    });
    return denpendecies;
  },
  getCode(ast) {
    return transformFromAstSync(ast, null, {
      presets: ['@babel/preset-env'],
    }).code;
  },
};

module.exports = Parser;
