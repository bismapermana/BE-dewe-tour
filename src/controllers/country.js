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
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.addCountry = async (req, res) => {
  try {
    const allData = await country.findOne({
      where: req.body,
    });
    if (allData) {
      return res.status(400).send({
        status: "failed",
        message: "Country already exist",
      });
    }
    const createData = await country.create(req.body);
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
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.deleteCountry = async (req, res) => {
  try {
    const { id } = req.params;

    await country.destroy({
      where: { id },
    });

    res.send({
      status: "success",
      message: `delete country id ${id} success `,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};
