const Sequelize = require("sequelize");

const sequelize = require("./sequelize");
const Company = sequelize.define("Company", {
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
});

module.exports = Company;

