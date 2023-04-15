const fs = require('fs');
const { getAst, getDependecies, getCode } = require('./Parser');
const path = require('path');

class Compiler {
  constructor(options) {
    this.options = options;
    this.modules = [];
  }

  run() {
    const { entry } = this.options;
    const info = this.build(entry);
    this.modules.push(info);
    this.modules.forEach(({ dependecies }) => {
      Object.keys(dependecies).forEach((dependency) => {
        this.modules.push(this.build(dependecies[dependency]));
      });
    });
    // 构建依赖图谱
    const dependencyGraph = this.modules.reduce(
      (graph, item) => ({
        ...graph,
        [item.filename]: {
          dependecies: item.dependecies,
          code: item.code,
        },
      }),
      {},
    );
    return this.generate(dependencyGraph);
  }
  generate(code) {
    const { output, entry } = this.options;
    const filePath = path.join(output.path, output.filename);
    const bundle = `(function(graph){
      function require(moduleId){ 
        function localRequire(relativePath){
          return require(graph[moduleId].dependecies[relativePath])
        }
        var exports = {};
        (function(require,exports,code){
          eval(code)
        })(localRequire,exports,graph[moduleId].code);
        return exports;
      }
      require('${entry}')
    })(${JSON.stringify(code)})`;

    if (!fs.existsSync(output.path)) {
      fs.mkdirSync(output.path);
    }
    fs.writeFileSync(filePath, bundle, 'utf-8');
  }
  build(filename) {
    const ast = getAst(filename);
    const dependecies = getDependecies(ast, filename);
    const code = getCode(ast);

    return {
      filename,
      code,
      dependecies,
    };
  }
}

module.exports = Compiler;
