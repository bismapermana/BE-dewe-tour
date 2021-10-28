const express = require("express");

const router = express.Router();
const {
  getCountries,
  getCountry,
  addCountry,
  updateCountry,
} = require("../controllers/country");
const { getUsers, deleteUser } = require("../controllers/user");

router.get("/users", getUsers);
router.delete("/users/:id", deleteUser);

router.get("/countries", getCountries);
router.get("/countries/:id", getCountry);
router.post("/countries", addCountry);
router.patch("/countries/:id", updateCountry);

module.exports = router;
