const express = require("express");

const router = express.Router();
const {
  getCountries,
  getCountry,
  addCountry,
  updateCountry,
  deleteCountry,
} = require("../controllers/country");
const {
  getTransactions,
  getTransaction,
  addTransaction,
  deleteTransaction,
  updateTransaction,
  paymentTransaction,
  getTransactionbyToken,
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
  updateUser,
  getUser,
} = require("../controllers/user");
const { auth, admin } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadFIle");

router.get("/users", auth, getUsers);
router.get("/user", auth, getUser);
router.post("/register", register);
router.post("/login", login);
router.patch("/user", auth, uploadFile("imageFile"), updateUser);
router.delete("/users/:id", auth, admin, deleteUser);

router.get("/countries", getCountries);
router.get("/countries/:id", getCountry);
router.post("/country", auth, admin, addCountry);
router.patch("/countries/:id", auth, admin, updateCountry);
router.delete("/countries/:id", auth, admin, deleteCountry);

router.get("/trips", getTrips);
router.get("/trip/:id", getTrip);
router.post("/trips", auth, admin, uploadFile("imageFile"), addTrip);
router.patch("/trips/:id", auth, admin, uploadFile("imageFile"), updateTrip);
router.delete("/trips/:id", auth, admin, deleteTrip);

router.get("/transactions", auth, getTransactions);
router.get("/transaction", auth, getTransactionbyToken);
router.get("/transaction/:id", auth, getTransaction);
router.post("/transactions", auth, addTransaction);
router.patch("/transactions/:id", auth, admin, updateTransaction);
router.delete("/transactions/:id", auth, admin, deleteTransaction);
router.patch(
  "/transactions/payment/:id",
  auth,
  uploadFile("imageFile"),
  paymentTransaction
);

module.exports = router;
