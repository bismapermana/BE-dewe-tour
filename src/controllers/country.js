const { country } = require("../../models");

exports.getCountries = async (req, res) => {
  try {
    const data = await country.findAll();
    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await country.findOne({
      where: { id },
    });

    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.addCountry = async (req, res) => {
  try {
    const createData = await country.create(req.body);
    res.send({
      status: "success",
      data: "add data succes",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.updateCountry = async (req, res) => {
  try {
    const { id } = req.params;
    await country.update(req.body, {
      where: { id },
    });
    res.send({
      status: "success",
      message: `update country id ${id} success`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};
