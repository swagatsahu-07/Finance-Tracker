const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  addIncome,
  getIncome,
  deleteIncome
} = require("../controllers/incomeController");

const router = express.Router();

router.post("/", authMiddleware, addIncome);
router.get("/", authMiddleware, getIncome);
router.delete("/:id", authMiddleware, deleteIncome);

module.exports = router;