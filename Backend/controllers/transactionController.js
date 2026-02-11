const db = require("../config/db");

exports.getTransactions = (req, res) => {
  const userId = req.userId;

  const query = `
  SELECT 
    id,
    'expense' AS type,
    amount,
    category,
    description,
    NULL AS frequency,
    expense_date AS date
  FROM expenses
  WHERE user_id = ?

  UNION ALL

  SELECT
    id,
    'income' AS type,
    amount,
    source AS category,
    NULL AS description,
    frequency,
    income_date AS date
  FROM income
  WHERE user_id = ?

  ORDER BY date DESC
`;



  db.query(query, [userId, userId], (err, results) => {
    if (err) {
      return res.json({
        success: false,
        message: "Failed to fetch transactions",
      });
    }

    res.json({
      success: true,
      data: results,
    });
  });
};
