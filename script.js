const text = document.getElementById("text");
const amount = document.getElementById("amount");
const btn = document.getElementById("btn");
const list = document.getElementById("list");

const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateUI() {

    list.innerHTML = "";

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((item, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            ${item.text} - ₹${item.amount}
            <button class="delete" onclick="deleteTransaction(${index})">Delete</button>
        `;

        list.appendChild(li);

        if (item.amount > 0) {
            totalIncome += item.amount;
        } else {
            totalExpense += Math.abs(item.amount);
        }

    });

    income.innerText = "₹" + totalIncome;
    expense.innerText = "₹" + totalExpense;
    balance.innerText = "₹" + (totalIncome - totalExpense);

    localStorage.setItem("transactions", JSON.stringify(transactions));
}

btn.addEventListener("click", () => {

    if (text.value === "" || amount.value === "") {
        alert("Please enter all fields");
        return;
    }

    transactions.push({
        text: text.value,
        amount: Number(amount.value)
    });

    text.value = "";
    amount.value = "";

    updateUI();

});

function deleteTransaction(index) {

    transactions.splice(index, 1);

    updateUI();

}

updateUI();