const { user } = require("../../models/");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getUsers = async (req, res) => {
  try {
    const data = await user.findAll();
    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await user.destroy({
      where: { id },
    });

    res.send({
      status: "success",
      message: `delete user id  ${id} success `,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.register = async (req, res) => {
  try {
    const data = req.body;

    const schema = joi
      .object({
        fullName: joi.string().required(),
        email: joi
          .string()
          .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
        password: joi.string().min(5).required(),
        phone: joi.string().required(),
        address: joi.string().required(),
      })
      .validate(data);

    if (schema.error) {
      return res.status(400).send({
        status: "failed",
        message: schema.error.message,
      });
    }

    const findData = await user.findOne({
      where: { email: req.body.email },
    });
    console.log(findData);
    if (findData) {
      return res.status(400).send({
        status: "error",
        message: "email has been registered",
        data: findData,
      });
    }

    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const createData = await user.create({
      ...data,
      password: hashedPassword,
    });

    res.send({
      status: "success",
      createData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const schema = joi
      .object({
        email: joi
          .string()
          .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
        password: joi.string().min(5).required(),
      })
      .validate(req.body);

    if (schema.error) {
      return res.status(400).send({
        status: "error",
        message: schema.error.message,
      });
    }

    const checkEmail = await user.findOne({
      where: { email },
    });

    if (!checkEmail) {
      return res.status(400).send({
        status: "failed",
        mesage: "email or password don't match",
      });
    }

    const isValidPassword = await bcrypt.compare(password, checkEmail.password);

    if (!isValidPassword) {
      return res.status(400).send({
        status: "failed",
        message: "email or password don't match",
      });
    }

    const token = jwt.sign(
      {
        id: checkEmail.id,
      },
      process.env.SECRET_KEY
    );

    console.log(process.env.SECRET_KEY);

    res.status(200).send({
      status: "success",
      message: "successfully login",
      data: {
        email: checkEmail.email,
        status: checkEmail.status,
        token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
