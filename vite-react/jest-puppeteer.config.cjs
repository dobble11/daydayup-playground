module.exports = {
  launch: {
    headless: process.env.CI === 'true',
  },
  server: {
    command: 'pnpm dev',
    port: 5173,
  },
};
