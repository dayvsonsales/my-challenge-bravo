const production = {
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'currency_db',
  logging: false,
  entities: ['dist/src/infra/typeorm/entities/*.js'],
  migrations: ['dist/src/infra/typeorm/database/migrations/*.js'],
  seeds: ['dist/src/infra/typeorm/database/seeders/*.js'],
  factories: ['dist/src/infra/typeorm/database/factories/*.js'],
  cli: {
    entitiesDir: 'dist/src/infra/typeorm/entities',
    migrationsDir: 'dist/src/infra/typeorm/migrations',
  },
};

const development = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'currency_db',
  logging: false,
  entities: ['src/infra/typeorm/entities/*.js'],
  migrations: ['src/infra/typeorm/database/migrations/*.ts'],
  seeds: ['src/infra/typeorm/database/seeders/*.ts'],
  factories: ['src/infra/typeorm/database/factories/*.ts'],
  cli: {
    entitiesDir: 'src/infra/typeorm/entities',
    migrationsDir: 'src/infra/typeorm/database/migrations',
  },
};

module.exports =
  process.env.NODE_ENV === 'production' ? production : development;
