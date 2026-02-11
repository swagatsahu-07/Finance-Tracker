const db = require("../config/db");


exports.addExpense = (req, res) => {
  const { amount, category, expense_date, description } = req.body;
  const userId = req.userId; 

  if (!amount || !category || !expense_date) {
    return res.json({
      success: false,
      message: "Required fields missing"
    });
  }

  const query =
    "INSERT INTO expenses (user_id, amount, category, expense_date, description) VALUES (?, ?, ?, ?, ?)";

  db.query(
    query,
    [userId, amount, category, expense_date, description],
    (err) => {
      if (err) {
        return res.json({ success: false, message: "Failed to add expense" });
      }

      res.json({ success: true, message: "Expense added successfully" });
    }
  );
};


exports.getExpenses = (req, res) => {
  const userId = req.userId;

  const query =
    "SELECT * FROM expenses WHERE user_id = ? ORDER BY expense_date DESC";

  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.json({ success: false, message: "Failed to fetch expenses" });
    }

    res.json({ success: true, data: results });
  });
};


exports.deleteExpense = (req, res) => {
  const expenseId = req.params.id;
  const userId = req.userId;

  const query =
    "DELETE FROM expenses WHERE id = ? AND user_id = ?";

  db.query(query, [expenseId, userId], (err, result) => {
    if (err) {
      return res.json({
        success: false,
        message: "Failed to delete expense"
      });
    }

    if (result.affectedRows === 0) {
      return res.json({
        success: false,
        message: "Expense not found"
      });
    }

    res.json({
      success: true,
      message: "Expense deleted successfully"
    });
  });
};