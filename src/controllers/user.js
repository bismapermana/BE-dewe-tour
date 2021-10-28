const { user } = require("../../models/");

exports.getUsers = async (req, res) => {
  try {
    const data = await user.findAll();
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

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await user.destroy({
      where: { id },
    });

    res.send({
      status: "success",
      message: `delete user id  ${deleteUser} success `,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};
