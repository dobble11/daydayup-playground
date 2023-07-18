import { parse } from '@babel/parser';
import * as t from '@babel/types';
import generator from '@babel/generator';
import traverse from '@babel/traverse';

// const ast = parse(
//   `function square(n) {
//     return n * n;
//   }`,
// );

// traverse(ast, {
//   FunctionDeclaration(path) {
//     const { parent, node } = path;

//     if (t.isProgram(parent)) {
//       parent.body.push(
//         t.expressionStatement(t.callExpression(t.identifier(node.id!.name), [t.numericLiteral(1)])),
//       );
//     }
//   },
// });

const ast = parse(
  `import React from "react";
type Props = {};

const App = (props: Props) => {
  return <div>App</div>;
};

export default App;
`,
  {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
  },
);

traverse(ast, {
  ImportDeclaration(path) {
    if (path.node.source?.value === 'antd') {
      const vars = (path.node.specifiers as t.ImportSpecifier[]).map((m) => m.local.name);

      path.replaceWithMultiple(
        vars
          .map((m) => [
            t.importDeclaration(
              [t.importDefaultSpecifier(t.identifier(m))],
              t.stringLiteral(`antd/es/${m.toLowerCase()}`),
            ),
            t.importDeclaration([], t.stringLiteral(`antd/es/${m.toLowerCase()}/style`)),
          ])
          .flat(),
      );
    }
  },
});

const output = generator(ast);

console.log(output.code);
