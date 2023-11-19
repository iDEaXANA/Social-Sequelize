const { db } = require("../db/connection");
const { Sequelize } = require("sequelize");

const Profile = db.define("profile", {
  bio: Sequelize.STRING,
  profilePicture: Sequelize.STRING,
  birthday: Sequelize.STRING,
});
module.exports = Profile ;
