const Sequelize = require("sequelize");

const sequelize = require("./sequelize");
const Post = sequelize.define("Post", {
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

module.exports = Post;

