const express = require("express");

const router = express.Router();
const {
  getCountries,
  getCountry,
  addCountry,
  updateCountry,
} = require("../controllers/country");
const {
  getTransactions,
  getTransaction,
  addTransaction,
} = require("../controllers/transaction");
const {
  getTrips,
  getTrip,
  addTrip,
  updateTrip,
  deleteTrip,
} = require("../controllers/trip");
const {
  getUsers,
  deleteUser,
  register,
  login,
} = require("../controllers/user");
const { auth } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadFIle");

router.get("/users", getUsers);
router.delete("/users/:id", deleteUser);
router.post("/register", register);
router.post("/login", login);

router.get("/countries", getCountries);
router.get("/countries/:id", getCountry);
router.post("/countries", addCountry);
router.patch("/countries/:id", updateCountry);

router.get("/trips", getTrips);
router.get("/trips/:id", getTrip);
router.post("/trips", auth, uploadFile("imageFile"), addTrip);
router.patch("/trips/:id", uploadFile("imageFile"), auth, updateTrip);
router.delete("/trips/:id", deleteTrip);

router.get("/transactions", getTransactions);
router.get("/transactions/:id", getTransaction);
router.post("/transactions", uploadFile("imageFile"), addTransaction);

module.exports = router;
