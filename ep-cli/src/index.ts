import { program } from "commander";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pkg = require("../package.json");

program.name("ep").version(pkg.version, "-v, --version", "查看版本号");

program
  .command("dev")
  .description("启动开发服务")
  .action(async () => {
    const { dev } = await import("./commands/dev.js");
    dev();
  });

program.parse();
