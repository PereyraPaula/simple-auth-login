import { DataTypes, Model } from 'sequelize';
import bcrypt from "bcrypt";
import { sq } from '../db/sequelize.js';
import { generateAccessToken, generateRefreshToken } from '../auth/generateToken.js'
import TokenSchema from './token.js';

class User extends Model {
  toJSON() {
    const attributes = Object.assign({}, this.get());
    delete attributes.password;
    return attributes;
  }
  usernameExist = async (username) => {
    const user = await User.findOne({ where: { username } });
    return !!user;
  }
  comparePassword = async (password, hash) => {
    const same = await bcrypt.compare(password, hash);
    return same;
  }
  createAccessToken = () => {
    const user = this.get();
    delete user.password;
    return generateAccessToken(user);
  }
  createRefreshToken = async () => {
    const user = this.get();
    delete user.password;
    const refreshToken = generateRefreshToken(user);

    try {
      const newToken = await TokenSchema.create({ token: refreshToken });
      console.log("Refresh token created successfully:", newToken.id);
      return refreshToken;
    } catch (error) {
      console.error("Error creating refresh token:", error);
    }
  }
}

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue('password', bcrypt.hashSync(value, 10));
    },
  }
}, {
  sequelize: sq,
  modelName: 'User',
  tableName: 'Users',
});

export default User;