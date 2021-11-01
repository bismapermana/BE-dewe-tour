const { trip, country } = require("../../models");
const joi = require("joi");

exports.getTrips = async (req, res) => {
  try {
    const data = await trip.findAll({
      include: {
        model: country,
        as: "country",
        attributes: {
          exclude: ["createdAt", "updatedAt", "id"],
        },
      },
      attributes: {
        exclude: ["idCountry"],
      },
    });

    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        status: "failed",
        message: "server error",
      });
  }
};

exports.getTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await trip.findOne({
      where: { id },
      include: {
        model: country,
        as: "country",
        attributes: {
          exclude: ["createdAt", "updatedAt", "id"],
        },
      },
      attributes: {
        exclude: ["idCountry"],
      },
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

exports.addTrip = async (req, res) => {
  try {
    const reqData = req.body;

    const schema = joi
      .object({
        title: joi.string().required(),
        idCountry: joi.number().required(),
        accomodation: joi.string(),
        transportation: joi.string(),
        eat: joi.string(),
        day: joi.number().required(),
        night: joi.number().required(),
        date: joi.string(),
        price: joi.number().required(),
        quota: joi.number().required(),
        description: joi.string(),
        dateTrip: joi.string(),
        image: joi.string(),
      })
      .validate(reqData);

    if (schema.error) {
      return res.status(400).send({
        status: "failed",
        message: schema.error.message,
      });
    }

    const image = JSON.stringify(
      req.files.imageFile.map((index) => index.filename)
    );
    const allData = { ...req.body, image };
    const data = await trip.create(allData);

    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      satus: "failed",
      message: "server error",
    });
  }
};

exports.updateTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const image = JSON.stringify(
      req.files.imageFile.map((index) => index.filename)
    );
    const allData = { ...req.body, image };
    await trip.update(allData, {
      where: { id },
    });
    res.send({
      status: "success",
      message: `update data id ${id} success`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.deleteTrip = async (req, res) => {
  try {
    const { id } = req.params;
    await trip.destroy({
      where: { id },
    });
    res.send({
      status: "success",
      message: `delete trip id ${id} success`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};
