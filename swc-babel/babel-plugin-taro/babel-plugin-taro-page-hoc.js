'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
exports.__esModule = true;
var path_1 = __importDefault(require('path'));
var fs_1 = __importDefault(require('fs'));
var parser_1 = require('@babel/parser');
var traverse_1 = __importDefault(require('@babel/traverse'));
var ignoreFlag = '@nohoc';
function default_1(babel, opt) {
  var hocSource = opt.hocSource,
    _a = opt.hocName,
    hocName = _a === void 0 ? '__hoc__' : _a;
  var t = babel.types;
  var srcPath = path_1['default'].join(process.cwd(), './src');
  var filenames = fs_1['default'].readdirSync(srcPath);
  var appConfigPath = ''.concat(srcPath, '/').concat(
    filenames.find(function (m) {
      return m.includes('app.config.');
    }),
  );
  var pages = [];
  if (fs_1['default'].existsSync(appConfigPath)) {
    var code = fs_1['default'].readFileSync(appConfigPath).toString();
    var ast = (0, parser_1.parse)(code, {
      sourceType: 'module',
      plugins: ['typescript'],
    });
    (0, traverse_1['default'])(ast, {
      ArrayExpression: function (path) {
        if (
          t.isObjectProperty(path.parent) &&
          t.isIdentifier(path.parent.key) &&
          path.parent.key.name === 'pages'
        ) {
          pages = pages.concat(
            path.node.elements.map(function (m) {
              return m.value;
            }),
          );
        }
      },
    });
  }
  return {
    name: 'babel-plugin-taro-page-hoc',
    visitor: {
      ExportDefaultDeclaration: function (path, state) {
        var _a;
        var ignore =
          (_a = path.node.leadingComments) === null || _a === void 0
            ? void 0
            : _a.some(function (m) {
                return m.value.trim() === ignoreFlag;
              });
        var filename = state.filename;
        var isPage = filename.includes('.config.')
          ? false
          : pages.some(function (m) {
              return state.filename.includes(m);
            });
        if (!t.isClassDeclaration(path.node.declaration) && hocSource && isPage && !ignore) {
          path.insertBefore(
            t.importDeclaration(
              [t.importDefaultSpecifier(t.identifier(hocName))],
              t.stringLiteral(hocSource),
            ),
          );
          path.node.declaration = t.callExpression(t.identifier(hocName), [path.node.declaration]);
        }
      },
    },
  };
}
exports['default'] = default_1;
