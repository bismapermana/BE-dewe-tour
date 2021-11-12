const { transaction, user, trip, country } = require("../../models");

exports.getTransactions = async (req, res) => {
  try {
    const data = await transaction.findAll({
      include: [
        {
          model: user,
          as: "users",
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
          as: "trips",

          attributes: {
            exclude: ["updatedAt", "createdAt", "id", "idCountry"],
          },
          include: {
            model: country,
            as: "countries",
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
          as: "users",
          attributes: {
            exclude: ["updatedAt", "createdAt", "id", "password", "address"],
          },
        },
        {
          model: trip,
          as: "trips",
          attributes: {
            exclude: ["updatedAt", "createdAt", "id", "idCountry"],
          },
          include: {
            model: country,
            as: "countries",
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

exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    await transaction.update(
      {
        status: req.body.status,
      },
      {
        where: { id },
      }
    );

    if (req.body.status === "approved") {
      const findUpdateData = await transaction.findOne({
        where: {
          id,
        },
      });
      const findData = await trip.findOne({
        where: {
          id: findUpdateData.idTrip,
        },
      });

      await trip.update(
        {
          available: findUpdateData.counterQty + findData.available,
        },
        {
          where: {
            id: findUpdateData.idTrip,
          },
        }
      );
    }

    res.send({
      status: "succes",
      message: `update transaction id ${id} success`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.addTransaction = async (req, res) => {
  try {
    const { id } = req.idUser;
    const allData = {
      ...req.body,
      idUser: id,
      status: "waiting for payment",
    };

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

exports.paymentTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const image = req.files.imageFile[0].filename;
    const attachment = process.env.PATH_FILE + image;
    await transaction.update(
      {
        status: "waiting to approve",
        attachment,
      },
      {
        where: { id },
      }
    );
    res.send({
      status: "success",
      message: `update transaction id ${id} success`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      message: "server error",
    });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    await transaction.destroy({
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

exports.getTransactionbyToken = async (req, res) => {
  try {
    const { id } = req.idUser;
    const transactions = await transaction.findAll({
      where: { idUser: id },
      include: [
        {
          model: user,
          as: "users",
          attributes: {
            exclude: ["updatedAt", "createdAt", "id", "password", "address"],
          },
        },
        {
          model: trip,
          as: "trips",
          attributes: {
            exclude: ["updatedAt", "createdAt", "id", "idCountry"],
          },
          include: {
            model: country,
            as: "countries",
            attributes: {
              exclude: ["updatedAt", "createdAt", "id"],
            },
          },
        },
      ],
    });

    res.send({
      status: "success",
      data: transactions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};
