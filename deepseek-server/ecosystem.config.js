module.exports = {
  apps: [
    {
      name: 'deepseek-proxy',
      script: 'server.js',
      cwd: '/var/www/deepseek-proxy',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        ENABLE_TOPIC_GUARD: 'true'
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '256M'
    }
  ]
};
