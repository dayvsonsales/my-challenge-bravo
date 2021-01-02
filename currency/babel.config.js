module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@config': './src/config',
          '@services': './src/services',
          '@config': './src/config',
          '@entities': './src/infra/typeorm/entities',
          '@providers': './src/providers',
          '@infra': './src/infra',
          '@container': './src/container',
          '@errors': './src/errors',
          '@domain': './src/domain',
        },
      },
    ],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
};
