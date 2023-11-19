const Comment = require("./Comment");
const Like = require("./Like");
const Post = require("./Post");
const Profile = require("./Profile");
const User = require("./User");

User.hasOne(Profile);
Profile.belongsTo(User);

Post.hasOne(User);
User.hasMany(Post);

Comment.hasOne(Post);
Post.hasMany(Comment);

User.belongsToMany(Like, { through: "UserLikes" });
Like.belongsToMany(User, { through: "UserLikes" });

// In index.js, define the following associations:
// A User can have one Profile and vice versa. // --DONE
// A User can have many Post instances, but a Post can only have one User. // --DONE
// A Post can have many Comment instances, but a Comment can only have one Post. // --DONE
// A User can have many Like instances and vice versa. // --DONE

module.exports = {
  Comment,
  Like,
  Post,
  Profile,
  User,
};
