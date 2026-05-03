const Sequelize = require("sequelize");

const sequelize = require("./sequelize");
const User = sequelize.define("User", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    required: true,
  },
  name: {
    type: Sequelize.STRING,
    required: true,
  },
  mobile: {
    type: Sequelize.STRING,
    required: true,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    required: true,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    required: true,
  },
  addContact: {
    type: Sequelize.BOOLEAN,
    required: true,
  },
});

module.exports = User;
