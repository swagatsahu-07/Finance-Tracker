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
0
## 📁 Project Structure
```bash

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

```
---

## ⚙️ Installation & Setup

### Requirements
- Node.js (v16+ recommended)
- MySQL Server

### 1️ Clone Repository

```bash

git clone https://github.com/swagatsahu-07/Finance-Tracker
cd Finance-Tracker


```

### 2️ Backend Setup

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

### 3️ Database Setup

=> Create MySQL database:

```bash

CREATE DATABASE finance_tracker;
USE finance_tracker;


```
=> Create Tables  - Run the following SQL queries:

```bash

-- USERS TABLE
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INCOME TABLE
CREATE TABLE income (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  amount DECIMAL(10,2),
  source VARCHAR(100),
  frequency VARCHAR(50),
  income_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- EXPENSES TABLE
CREATE TABLE expenses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  amount DECIMAL(10,2),
  category VARCHAR(100),
  description VARCHAR(255),
  expense_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- BUDGET TABLE
CREATE TABLE budgets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  category VARCHAR(100),
  amount DECIMAL(10,2),
  month VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


```
### 4 Start Backend Server
```bash
cd .\Backend\
node index.js
```

### 5 Frontend

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