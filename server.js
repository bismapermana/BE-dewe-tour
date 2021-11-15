require("dotenv").config();

const express = require("express");

const cors = require("cors");

const http = require("http");
const { Server } = require("socket.io");

const router = require("./src/routes/index");

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const port = 5000;

app.use(express.json());

app.use(cors());

app.use("/uploads", express.static("uploads"));
app.use("/api/v1/", router);

server.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
