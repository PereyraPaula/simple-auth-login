import { Sequelize } from "sequelize";
import { config } from 'dotenv';

config();

const dialect = process.env.DB_DIALECT || 'sqlite';
let database, username, password, host;

if (dialect === 'sqlite') {
  database = process.env.DB_STORAGE || 'db.sqlite3';
} else {
  // Otras bases de datos
  database = process.env.DB_NAME || 'database';
  username = process.env.DB_USER || 'username';
  password = process.env.DB_PASSWORD || 'password';
  host = process.env.DB_HOST || 'localhost';
}

const sq = new Sequelize(database, username, password, {
  host,
  dialect // Install the database package, if necessary.
});

export { sq };
