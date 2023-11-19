const { db } = require("../db/connection");
const { Sequelize } = require("sequelize");

const User = db.define("user", {
  username: Sequelize.STRING,
  email: Sequelize.STRING,
});

module.exports = User;
