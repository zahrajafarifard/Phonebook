const Sequelize = require("sequelize");

const sequelize = require("./sequelize");
const Member = sequelize.define("Member", {
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
  address: {
    type: Sequelize.STRING,
    required: true,
  },

});

module.exports = Member;
