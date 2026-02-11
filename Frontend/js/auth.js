// Sections
const loginSection = document.getElementById("loginSection");
const registerSection = document.getElementById("registerSection");

// Password elements
const regPassword = document.getElementById("regPassword");
const loginPassword = document.getElementById("loginPassword");
const togglePassword = document.getElementById("togglePassword");
const toggleLoginPassword = document.getElementById("toggleLoginPassword");
const passwordError = document.getElementById("passwordError");
const registerBtn = document.getElementById("registerBtn");

// Password validation tracking
let passwordValid = false;

// SVG icons
const eyeOpenSVG = `
  <svg class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
`;

const eyeClosedSVG = `
  <svg class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
  </svg>
`;

// Switch to Register
document.getElementById("goToRegister").addEventListener("click", () => {
  loginSection.classList.add("hidden");
  registerSection.classList.remove("hidden");
});

document.getElementById("goToLogin").addEventListener("click", () => {
  registerSection.classList.add("hidden");
  loginSection.classList.remove("hidden");
  registerSection.reset();
  resetPasswordValidation();
});

// Toggle password visibility for register
togglePassword.addEventListener("click", () => {
  if (regPassword.type === "password") {
    regPassword.type = "text";
    togglePassword.innerHTML = eyeClosedSVG;
  } else {
    regPassword.type = "password";
    togglePassword.innerHTML = eyeOpenSVG;
  }
});

// Toggle password visibility for login
toggleLoginPassword.addEventListener("click", () => {
  if (loginPassword.type === "password") {
    loginPassword.type = "text";
    toggleLoginPassword.innerHTML = eyeClosedSVG;
  } else {
    loginPassword.type = "password";
    toggleLoginPassword.innerHTML = eyeOpenSVG;
  }
});

// Password validation function
function validatePassword(password) {
  const requirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  };

  // Check if all requirements are met
  passwordValid = Object.values(requirements).every((req) => req === true);

  // Show error message if password is not empty and invalid
  if (password.length > 0 && !passwordValid) {
    const missingRequirements = [];

    if (!requirements.length) missingRequirements.push("at least 8 characters");
    if (!requirements.uppercase)
      missingRequirements.push("one uppercase letter");
    if (!requirements.lowercase)
      missingRequirements.push("one lowercase letter");
    if (!requirements.number) missingRequirements.push("one number");
    if (!requirements.special)
      missingRequirements.push("one special character");

    passwordError.textContent = `Password must contain ${missingRequirements.join(", ")}.`;
  } else {
    passwordError.textContent = "";
  }

  return passwordValid;
}

// Reset password validation UI
function resetPasswordValidation() {
  passwordError.textContent = "";
  passwordValid = false;
}

// Real-time password validation
regPassword.addEventListener("input", (e) => {
  validatePassword(e.target.value);
});

// Clear error on focus
regPassword.addEventListener("focus", () => {
  if (regPassword.value.length === 0) {
    passwordError.textContent = "";
  }
});

// LOGIN
loginSection.addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!data.success) {
      alert(data.message || "Login failed");
      return;
    }

    localStorage.setItem("token", data.token);
    window.location.href = "dashboard.html";
  } catch (error) {
    console.error(error);
    alert("Server error. Please try again later.");
  }
});

// REGISTER
registerSection.addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value.trim();

  if (!name || !email || !password) {
    alert("All fields are required");
    return;
  }

  // Final password validation check
  if (!validatePassword(password)) {
    passwordError.textContent =
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.";
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!data.success) {
      alert(data.message || "Registration failed");
      return;
    }

    alert("Registration successful. Please login.");

    registerSection.classList.add("hidden");
    loginSection.classList.remove("hidden");
    registerSection.reset();
    resetPasswordValidation();
  } catch (error) {
    console.error(error);
    alert("Server error. Please try again later.");
  }
});
