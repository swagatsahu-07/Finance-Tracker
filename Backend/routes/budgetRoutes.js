const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { setBudget, getBudgets, deleteBudget } = require("../controllers/budgetController");

const router = express.Router();

router.post("/", authMiddleware, setBudget);
router.get("/", authMiddleware, getBudgets);
router.delete("/:id", authMiddleware, deleteBudget);

module.exports = router;
