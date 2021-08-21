const dbConfig = require('../config/database/postgres.js');

const Sequelize = require('sequelize');

const conn = new Sequelize(
	dbConfig.DB, 
	dbConfig.USER,
	dbConfig.PASSWORD,
	{
		host: dbConfig.HOST,
		port: dbConfig.PORT,
		dialect: dbConfig.dialect,
		pool: {
			max: dbConfig.pool.max,
			min: dbConfig.pool.min,
			acquire: dbConfig.pool.acquire,
			idle: dbConfig.pool.idle
		}
	}
);
const db = {};

db.Sequelize = Sequelize;
db.conn = conn;

module.exports = db;