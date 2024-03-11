import { DataTypes } from "sequelize";
import { sq } from "../db/sequelize.js";

const Token = sq.define('Token', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  token: { type: DataTypes.STRING, allowNull: false },
}, {
  sequelize: sq,
  modelName: 'Token',
  tableName: 'Token',
});

export default Token;