const Compiler = require('./lib/Compiler');
const config = require('./webpack.config');

new Compiler(config).run();
