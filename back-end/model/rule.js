const Sequelize = require("sequelize");

const sequelize = require("./sequelize");
const Rule = sequelize.define("Rule", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    required: true,
  },
 
});

module.exports = Rule;

