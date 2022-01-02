const dbConfig = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pg-root',
  database: 'chat',
};

module.exports = {
  development: dbConfig,
  test: dbConfig,
  production: dbConfig,
};
