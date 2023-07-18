import * as swc from '@swc/core';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import * as prettier from 'prettier';

const span = {
  start: 0,
  end: 0,
  ctxt: 0,
};
async function main() {
  const ast = await swc.parseFile(resolve(__dirname, '../src/async.ts'), {
    syntax: 'typescript',
  });

  ast.body.unshift({
    type: 'ImportDeclaration',
    span,
    specifiers: [
      {
        type: 'ImportSpecifier',
        span,
        local: {
          type: 'Identifier',
          span,
          value: 'Button',
          optional: false,
        },
        isTypeOnly: false,
      },
    ],
    source: {
      type: 'StringLiteral',
      span,
      value: 'antd',
    },
    typeOnly: false,
  });

  const { code } = await swc.transform(ast, {
    sourceMaps: false,
    jsc: {
      target: 'es2022',
      parser: {
        /** 设置为typescript会删除插入导入 */
        syntax: 'ecmascript',
      },
    },
  });
  console.log(code);
  const targetDir = resolve(__dirname, '../swc-replace');

  if (!existsSync(targetDir)) {
    mkdirSync(targetDir);
  }
  writeFileSync(
    `${targetDir}/async.ts`,
    prettier.format(code, {
      parser: 'typescript',
    }),
  );
}

main();
