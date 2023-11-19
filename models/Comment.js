const { db } = require("../db/connection");
const { Sequelize } = require("sequelize");

const Comment = db.define("comment", {
  body: Sequelize.STRING,
  createdAt: Sequelize.STRING,
});

module.exports = Comment;
