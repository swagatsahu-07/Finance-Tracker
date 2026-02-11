const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

// Password validation function
function validatePassword(password) {
  if (password.length < 8) {
    return {
      valid: false,
      message: "Password must be at least 8 characters long",
    };
  }

  if (!/[A-Z]/.test(password)) {
    return {
      valid: false,
      message: "Password must contain at least one uppercase letter",
    };
  }

  if (!/[a-z]/.test(password)) {
    return {
      valid: false,
      message: "Password must contain at least one lowercase letter",
    };
  }

  if (!/[0-9]/.test(password)) {
    return {
      valid: false,
      message: "Password must contain at least one number",
    };
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return {
      valid: false,
      message: "Password must contain at least one special character",
    };
  }

  return { valid: true };
}

// Email validation function
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if all fields are provided
  if (!name || !email || !password) {
    return res.json({ success: false, message: "All fields are required" });
  }

  // Validate name
  if (name.trim().length < 2) {
    return res.json({
      success: false,
      message: "Name must be at least 2 characters long",
    });
  }

  // Validate email format
  if (!validateEmail(email)) {
    return res.json({ success: false, message: "Invalid email format" });
  }

  // Validate password
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.valid) {
    return res.json({ success: false, message: passwordValidation.message });
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    db.query(
      query,
      [name.trim(), email.toLowerCase().trim(), hashedPassword],
      (err) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.json({
              success: false,
              message: "Email already registered",
            });
          }
          console.error("Registration error:", err);
          return res.json({
            success: false,
            message: "Registration failed. Please try again.",
          });
        }
        res.json({ success: true, message: "User registered successfully" });
      },
    );
  } catch (error) {
    console.error("Registration error:", error);
    res.json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and password are required",
    });
  }

  if (!validateEmail(email)) {
    return res.json({ success: false, message: "Invalid email format" });
  }

  const query = "SELECT * FROM users WHERE email = ?";

  db.query(query, [email.toLowerCase().trim()], async (err, result) => {
    if (err) {
      console.error("Login error:", err);
      return res.json({
        success: false,
        message: "Server error. Please try again.",
      });
    }

    if (result.length === 0) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const user = result[0];

    try {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.json({ success: false, message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
      );

      res.json({
        success: true,
        message: "Login successful",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.json({ success: false, message: "Server error. Please try again." });
    }
  });
};


exports.getProfile = (req, res) => {
  const userId = req.userId;

  const query = "SELECT name, email FROM users WHERE id = ?";

  db.query(query, [userId], (err, result) => {
    if (err || result.length === 0) {
      return res.json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      user: result[0]
    });
  });
};
