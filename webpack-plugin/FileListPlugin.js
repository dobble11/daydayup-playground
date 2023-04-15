class FileListPlugin {
  apply(
    /** @type import('webpack').Compiler */
    compiler,
  ) {
    const {
      Compilation,
      sources: { RawSource },
    } = compiler.webpack;

    compiler.hooks.thisCompilation.tap(FileListPlugin.name, (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: FileListPlugin.name,
          stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
        },
        (assets) => {
          const content = Object.keys(assets)
            .map((k) => `- ${k}（${compilation.assets[k].size()}）`)
            .join('\r\n');

          compilation.emitAsset('file-list.md', new RawSource(content));
        },
      );
    });
  }
}

module.exports = FileListPlugin;
