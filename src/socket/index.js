const { user } = require("../../models");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const connectedUser = {};

const socketIo = (io) => {
  io.use((socket, next) => {
    if (socket.handsake.auth && socket.handsake.auth.token) {
      next();
    } else {
      next(new Error("Not Authorized"));
    }
  });

  io.on("connection", async (socket) => {
    console.log("client connect :", socket.id);

    const userId = socket.handsake.query.id;
    connectedUser[userId] = socket.id;

    socket.on("load admin Contact", async () => {
      try {
        const adminContact = await user.findOne({
          where: {
            status: "admin",
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        });

        console.log(adminContact);

        socket.emit("admin contact", adminContact);
      } catch (error) {
        console.log(error);
      }
    });
  });
};

module.exports = socketIo;
