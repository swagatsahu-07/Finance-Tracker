const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "index.html";
}


// API HELPER

const API_BASE = "http://localhost:3000/api";

async function apiRequest(endpoint, method = "GET", body = null) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${API_BASE}${endpoint}`, options);
  return res.json();
}


// DOM ELEMENTS

const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const balanceEl = document.getElementById("balance");
const historyList = document.getElementById("historyList");
const logoutBtn = document.querySelector(".logoutBtn");

// LOAD USER NAME
async function loadUser() {
  const res = await apiRequest("/auth/me");
  console.log("USER API RESPONSE:", res);
  if (res.success) {
    document.getElementById("welcomeUser").innerText =
      `Welcome ${res.user.name}`;
  }
}

// LOAD SUMMARY

async function loadSummary() {
  const incomeRes = await apiRequest("/income");
  const expenseRes = await apiRequest("/expenses");

  let incomeTotal = 0;
  let expenseTotal = 0;

  if (incomeRes.success) {
    incomeRes.data.forEach((i) => (incomeTotal += Number(i.amount)));
  }

  if (expenseRes.success) {
    expenseRes.data.forEach((e) => (expenseTotal += Number(e.amount)));
  }

  incomeEl.innerText = incomeTotal;
  expenseEl.innerText = expenseTotal;
  balanceEl.innerText = incomeTotal - expenseTotal;
}

// LOAD TRANSACTION HISTORY

async function loadTransactions() {
  historyList.innerHTML = "";

  const res = await apiRequest("/transactions");

  if (!res.success || res.data.length === 0) {
    historyList.innerHTML = "";
    return;
  }

  res.data.forEach((txn) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>
        <strong style="color:${txn.type === "income" ? "#10b981" : "#ef4444"}">
          ${txn.type.toUpperCase()}
        </strong>
        | ₹${txn.amount} | ${txn.category}  ${txn.description ? `| ${txn.description.toUpperCase()}` : ""}
    ${txn.frequency ? `| ${txn.frequency}` : ""}
      </span>
      <button class="deleteBtn">Delete</button>
    `;

    li.querySelector(".deleteBtn").onclick = async () => {
      const endpoint =
        txn.type === "income"
          ? `/income/${txn.id}`
          : `/expenses/${txn.id}`;

      const deleteRes = await apiRequest(endpoint, "DELETE");

      if (deleteRes.success) {
        loadSummary();
        loadTransactions();
      } else {
        alert(deleteRes.message);
      }
    };

    historyList.appendChild(li);
  });
}


// ADD INCOME

document.getElementById("incomeForm").onsubmit = async function (e) {
  e.preventDefault();
  const body = {
    amount: Number(incomeAmount.value),
    source: incomeSource.value,
    frequency: incomeFrequency.value,
    income_date: incomeDate.value,
  };

  const res = await apiRequest("/income", "POST", body);

  if (res.success) {
    this.reset();
    loadSummary();
    loadTransactions();
  } else {
    alert(res.message);
  }
};

// ADD EXPENSE

document.getElementById("expenseForm").onsubmit = async function (e) {
  e.preventDefault();
  const body = {
    amount: Number(expenseAmount.value),
    category: expenseCategory.value,
    expense_date: expenseDate.value,
    description: expenseDesc.value,
  };

  const res = await apiRequest("/expenses", "POST", body);

  if (res.success) {
    this.reset();
    loadSummary();
    loadTransactions();
  } else {
    alert(res.message);
  }
};


// SET BUDGET

document.getElementById("budgetForm").onsubmit = async function (e) {
  e.preventDefault();

  const body = {
    category: document.getElementById("budgetCategory").value,
    amount: Number(document.getElementById("budgetAmount").value),
    month: new Date().toISOString().slice(0, 7)
  };

  const res = await apiRequest("/budget", "POST", body);

  if (res.success) {
    alert("Budget set successfully");
    this.reset();
  } else {
    alert(res.message);
  }
};

// SEARCH FILTER

searchInput.oninput = function () {
  const value = this.value.toLowerCase();
  historyList.querySelectorAll("li").forEach((li) => {
    li.style.display = li.innerText.toLowerCase().includes(value)
      ? "flex"
      : "none";
  });
};

// LOGOUT

logoutBtn.onclick = function () {
  localStorage.removeItem("token");
  window.location.href = "index.html";
};


// Budget

const viewBudgetBtn = document.getElementById("viewBudgetBtn");
const budgetModal = document.getElementById("budgetModal");
const closeBudget = document.getElementById("closeBudget");
const budgetList = document.getElementById("budgetList");

// Open modal
viewBudgetBtn.onclick = async () => {
  budgetModal.classList.remove("hidden");

  const res = await apiRequest("/budget");

  budgetList.innerHTML = "";

  if (!res.success || res.data.length === 0) {
    budgetList.innerHTML = "<li>No budgets set</li>";
    return;
  }

 res.data.forEach(b => {
  const li = document.createElement("li");

  li.innerHTML = `
    <span>${b.category} → ₹${b.amount} (${b.month})</span>
    <button class="deleteBtn">Delete</button>
  `;

  li.querySelector(".deleteBtn").onclick = async () => {
    const deleteRes = await apiRequest(`/budget/${b.id}`, "DELETE");

    if (deleteRes.success) {
      li.remove(); 
    } else {
      alert(deleteRes.message);
    }
  };

  budgetList.appendChild(li);
});

};

// Close modal
closeBudget.onclick = () => {
  budgetModal.classList.add("hidden");
};


// INIT LOAD
loadUser();
loadSummary();
loadTransactions();
