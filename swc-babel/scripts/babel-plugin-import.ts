import * as Babel from '@babel/core';

export default function (babel: typeof Babel): Babel.PluginObj {
  const { types: t } = babel;

  return {
    name: 'babel-plugin-import',
    visitor: {
      ImportDeclaration(path, state) {
        if (path.node.source?.value === 'antd') {
          const vars = path.node.specifiers.map((m) => m.local.name);
          const { libraryDirectory = 'es' } = state.opts as any;

          path.replaceWithMultiple(
            vars
              .map((m) => [
                t.importDeclaration(
                  [t.importDefaultSpecifier(t.identifier(m))],
                  t.stringLiteral(`antd/${libraryDirectory}/${m.toLowerCase()}`),
                ),
                t.importDeclaration(
                  [],
                  t.stringLiteral(`antd/${libraryDirectory}/${m.toLowerCase()}/style`),
                ),
              ])
              .flat(),
          );
        }
      },
    },
  };
}
