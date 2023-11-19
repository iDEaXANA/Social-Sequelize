const { Comment, Like, Post, Profile, User } = require("./index");
const { db } = require("./db/connection.js");
const users = require("./seed/users.json");
const profiles = require("./seed/profiles.json");
const posts = require("./seed/posts.json");
const likes = require("./seed/likes.json");
const comments = require("./seed/comments.json");
const { Sequelize } = require("sequelize");

describe("Model Creation, Associations are Associating", () => {
  /**
   * Runs the code prior to all tests
   */
  beforeAll(async () => {
    // the 'sync' method will create tables based on the model class
    // by setting 'force:true' the tables are recreated each time the test suite is run
    await db.sync({ force: true });
  });

  // Write your tests here

  test("Can create a User", async function () {
    await User.bulkCreate(users);
    const foundUser = await User.findByPk(1);
    expect(foundUser).toEqual(expect.objectContaining(users[0]));
  });

  test("Can create a Profile", async function () {
    await Profile.bulkCreate(profiles);
    const foundProfile = await Profile.findByPk(1);
    expect(foundProfile).toEqual(expect.objectContaining(profiles[0]));
  });

  test("Can create a Post", async function () {
    await Post.bulkCreate(posts);
    const foundPost = await Post.findByPk(1);
    expect(foundPost).toEqual(expect.objectContaining(posts[0]));
  });

  test("User can only have 1 Profile", async function () {
    await db.sync({ force: true }); //-- Will re-create database!
    let myUser = await User.create(users[0]);
    let myProfile = await Profile.create(profiles[0]);

    await myUser.setProfile(myProfile);

    const associatedProfile = await myUser.getProfile(); // if associated, will get from here too.
    expect(associatedProfile instanceof Profile).toBeTruthy();
  });

  test("User can have many likes", async function () {
    await db.sync({ force: true }); //-- Will re-create database!
    let myUser = await User.create(users[0]);
    let myLike1 = await Like.create(likes[0]);
    let myLike2 = await Like.create(likes[1]);

    await myUser.addLike(myLike1);
    await myUser.addLike(myLike2);

    const associatedLikes = await myUser.getLikes(); // if associated, will get from here too.
    expect(associatedLikes.length).toBe(2);
    expect(
      associatedLikes.every((like) => like.reactionType !== undefined)
    ).toBeTruthy();
    expect(associatedLikes.every((like) => like instanceof Like)).toBeTruthy(); // Extra test to find that instance is of User model
  });

  test("Like can have many Users", async function () {
    await db.sync({ force: true }); //-- Will re-create database!
    let myLike = await Like.create(likes[0]);
    let user1 = await User.create(users[0]);
    let user2 = await User.create(users[1]);

    await myLike.addUser(user1);
    await myLike.addUser(user2);

    const associatedUsers = await myLike.getUsers(); // if associated, will get from here too.
    expect(associatedUsers.length).toBe(2);
    expect(
      associatedUsers.every((user) => user.email !== undefined)
    ).toBeTruthy();
    expect(associatedUsers.every((user) => user instanceof User)).toBeTruthy(); // Extra test to find that instance is of User model
  });
});
