// sequelize.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.DB, 'postgres', process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.DIALECT,
});

export default sequelize;
