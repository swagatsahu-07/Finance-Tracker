const db = require("../config/db");


exports.addIncome = (req, res) => {
  const { amount, source, frequency, income_date } = req.body;
  const userId = req.userId;

  if (!amount || !source || !income_date) {
    return res.json({
      success: false,
      message: "All fields required"
    });
  }

  const query =
    "INSERT INTO income (user_id, amount, source,frequency, income_date) VALUES (?, ?, ?, ?, ?)";

  db.query(query, [userId, amount, source, frequency, income_date], (err) => {
    if (err) {
      return res.json({ success: false, message: "Failed to add income" });
    }

    res.json({ success: true, message: "Income added successfully" });
  });
};


exports.getIncome = (req, res) => {
  const userId = req.userId;

  const query =
    "SELECT * FROM income WHERE user_id = ? ORDER BY income_date DESC";

  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.json({ success: false, message: "Failed to fetch income" });
    }

    res.json({ success: true, data: results });
  });
};


exports.deleteIncome = (req, res) => {
  const incomeId = req.params.id;
  const userId = req.userId;

  const query =
    "DELETE FROM income WHERE id = ? AND user_id = ?";

  db.query(query, [incomeId, userId], (err, result) => {
    if (err) {
      return res.json({
        success: false,
        message: "Failed to delete income"
      });
    }

    if (result.affectedRows === 0) {
      return res.json({
        success: false,
        message: "Income not found"
      });
    }

    res.json({
      success: true,
      message: "Income deleted successfully"
    });
  });
};
