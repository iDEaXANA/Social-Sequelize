const { db } = require("../db/connection");
const { Sequelize } = require("sequelize");

const Like = db.define("like", {
  reactionType: Sequelize.STRING,
  createdAt: Sequelize.STRING,
});

module.exports = Like;
