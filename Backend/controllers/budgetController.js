const db = require("../config/db");


exports.setBudget = (req, res) => {
  const { category, amount, month } = req.body;
  const userId = req.userId;

  if (!category || !amount || !month) {
    return res.json({
      success: false,
      message: "All fields are required"
    });
  }

  const query =
    "INSERT INTO budgets (user_id, category, amount, month) VALUES (?, ?, ?, ?)";

  db.query(query, [userId, category, amount, month], (err) => {
    if (err) {
      return res.json({
        success: false,
        message: "Failed to set budget"
      });
    }

    res.json({
      success: true,
      message: "Budget set successfully"
    });
  });
};


exports.getBudgets = (req, res) => {
  const userId = req.userId;

  const query =
    "SELECT * FROM budgets WHERE user_id = ? ORDER BY created_at DESC";

  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.json({
        success: false,
        message: "Failed to fetch budgets"
      });
    }

    res.json({
      success: true,
      data: results
    });
  });
};

exports.deleteBudget = (req, res) => {
  const budgetId = req.params.id;
  const userId = req.userId;

  const query =
    "DELETE FROM budgets WHERE id = ? AND user_id = ?";

  db.query(query, [budgetId, userId], (err, result) => {
    if (err) {
      return res.json({
        success: false,
        message: "Failed to delete budget"
      });
    }

    if (result.affectedRows === 0) {
      return res.json({
        success: false,
        message: "Budget not found"
      });
    }

    res.json({
      success: true,
      message: "Budget deleted successfully"
    });
  });
};
