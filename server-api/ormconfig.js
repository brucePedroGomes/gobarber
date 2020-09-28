module.exports = [
  {
    name: 'default',
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: 'postgres',
    password: 'docker',
    database: 'gostack_gobarber',
    entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
    migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
    cli: {
      migrationsDir: './src/shared/infra/typeorm/migrations',
    },
  },
  {
    name: 'mongodbdocaralho',
    type: 'mongodb',
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    // username: 'mongo',
    // password: 'docker',
    database: 'gobarber',
    useUnifiedTopology: true,
    entities: ['./src/modules/**/infra/typeorm/schemas/*.ts'],
  },
];
