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
const { auth, admin } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadFIle");

router.get("/users", auth, getUsers);
router.delete("/users/:id", auth, admin, deleteUser);
router.post("/register", register);
router.post("/login", auth, login);

router.get("/countries", getCountries);
router.get("/countries/:id", getCountry);
router.post("/countries", auth, admin, addCountry);
router.patch("/countries/:id", auth, admin, updateCountry);

router.get("/trips", getTrips);
router.get("/trips/:id", getTrip);
router.post("/trips", auth, uploadFile("imageFile"), addTrip);
router.patch("/trips/:id", auth, admin, uploadFile("imageFile"), updateTrip);
router.delete("/trips/:id", auth, admin, deleteTrip);

router.get("/transactions", auth, getTransactions);
router.get("/transactions/:id", auth, getTransaction);
router.post("/transactions", auth, uploadFile("imageFile"), addTransaction);

module.exports = router;
