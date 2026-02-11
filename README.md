# 💰 Personal Finance Tracker

A full-stack web application that helps users manage their income, expenses, and monthly budgets with secure authentication and real-time transaction tracking.

---

## 🚀 Features

-  User Registration & Login (JWT Authentication)
-  Add, View, Delete Income (with Frequency)
-  Add, View, Delete Expenses (with Description)
-  Monthly Budget Setting & Management
-  Unified Transaction History (Income + Expense)
-  Real-time Dashboard Summary (Income, Expense, Balance)
-  Search Transactions
-  User-specific Data Isolation (Secure CRUD)

---

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- JavaScript (Vanilla JS)

### Backend
- Node.js
- Express.js

### Database
- MySQL

### Authentication
- JSON Web Token (JWT)
- bcrypt (Password Hashing)

---

## 📁 Project Structure

Finance-Tracker/
│
├── Backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── index.js
│   └── .env 
│
├── Frontend/
│   ├── css/
│   ├── js/
│   ├── index.html
│   └── dashboard.html
│
└── README.md


---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash

git clone <your-repository-link>
cd Finance-Tracker


```

2️⃣ Backend Setup

```bash

cd Backend
npm install

```
Create a .env file inside the Backend folder:

```bash

PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=finance_tracker
JWT_SECRET=supersecretkey


```

3️⃣ Database Setup

Create MySQL database:

```bash

CREATE DATABASE finance_tracker;

```
Import required tables (users, income, expenses, budgets)


4️⃣ Frontend

```bash

Frontend/index.html

 ```
 Or run using Live Server in VS Code.


 ## 📡 API Architecture

The application follows RESTful API principles:

Authentication
-   POST /api/auth/register
-   POST /api/auth/login

Income
-   GET /api/income
-   POST /api/income
-   DELETE /api/income/:id


Expenses
-   GET /api/expenses
-   POST /api/expenses
-   DELETE /api/expenses/:id


Budget
-   GET /api/budget
-   POST /api/budget
-   DELETE /api/budget/:id

Transactions
-   GET /api/transactions


## 🎯 Conclusion

This project demonstrates full-stack development skills including REST
API design, authentication implementation, secure database integration,
and dynamic frontend rendering. The application follows clean
architecture principles and secure coding standards.