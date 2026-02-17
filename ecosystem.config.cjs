module.exports = {
  apps: [
    {
      name: "finance-api",
      cwd: ".",
      script: "cmd.exe",
      args: "/c pnpm -C apps/api start:prod",
      env: {
        NODE_ENV: "production",
      },
      autorestart: true,
      watch: false,
      max_restarts: 10,
      restart_delay: 3000,
    },
    {
      name: "finance-web",
      cwd: ".",
      script: "cmd.exe",
      args: "/c pnpm -C apps/web start",
      env: {
        NODE_ENV: "production",
      },
      autorestart: true,
      watch: false,
      max_restarts: 10,
      restart_delay: 3000,
    },
  ],
};
