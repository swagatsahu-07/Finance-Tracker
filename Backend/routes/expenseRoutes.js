const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  addExpense,
  getExpenses,
  deleteExpense
} = require("../controllers/expenseController");

const router = express.Router();

router.post("/", authMiddleware, addExpense);
router.get("/", authMiddleware, getExpenses);
router.delete("/:id", authMiddleware, deleteExpense);

module.exports = router;
