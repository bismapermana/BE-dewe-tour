const { transaction, user, trip, country } = require("../../models");

exports.getTransactions = async (req, res) => {
  try {
    const data = await transaction.findAll({
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: [
              "updatedAt",
              "createdAt",
              "id",
              "status",
              "profilePicture",
              "password",
            ],
          },
        },
        {
          model: trip,
          as: "trip",

          attributes: {
            exclude: ["updatedAt", "createdAt", "id", "idCountry"],
          },
          include: {
            model: country,
            as: "country",
            attributes: {
              exclude: ["updatedAt", "createdAt", "id", "password", "address"],
            },
          },
        },
      ],
    });
    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      message: "server error",
    });
  }
};

exports.getTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await transaction.findOne({
      where: { id },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["updatedAt", "createdAt", "id", "password", "address"],
          },
        },
        {
          model: trip,
          as: "trip",
          attributes: {
            exclude: ["updatedAt", "createdAt", "id", "idCountry"],
          },
          include: {
            model: country,
            as: "country",
            attributes: {
              exclude: ["updatedAt", "createdAt", "id"],
            },
          },
        },
      ],
    });
    res.send({
      status: "succes",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      message: "server error",
    });
  }
};

exports.addTransaction = async (req, res) => {
  try {
    const attachment = req.files.imageFile[0].filename;
    const allData = { ...req.body, attachment };
    const data = await transaction.create(allData);

    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      message: "server error",
    });
  }
};
