module.exports = [
  {
    script: 'dist/src/infra/http/server.js',
    name: 'currency-api-backend',
    instances: 4,
    exec_mode: 'cluster',
  },
  {
    script: 'dist/src/worker/update-currencies.js',
    name: 'update-rates-backend',
  },
];
