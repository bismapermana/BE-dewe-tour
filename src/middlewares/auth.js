const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  try {
    const header = req.header("Authorization");

    if (!header) {
      return res.send({
        status: "failed",
        message: "forbidden access!",
      });
    }

    const token = header.replace("Bearer ", "");

    const secretKey = process.env.SECRET_KEY;

    const verified = jwt.verify(token, secretKey);
    console.log("ini clog", verified);
    req.idUser = verified;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
      location: "Middleware",
    });
  }
};
