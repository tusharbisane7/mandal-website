import {
  useEffect,
  useState,
} from "react";

import Navbar from "../../components/Navbar/Navbar";

function ManageExpenses() {
  const [expenses, setExpenses] =
    useState([]);

  const [form, setForm] =
    useState({
      title: "",
      amount: "",
      description: "",
    });

  useEffect(() => {
    const saved =
      JSON.parse(
        localStorage.getItem(
          "expenses"
        )
      ) || [];

    setExpenses(saved);
  }, []);

  const addExpense = () => {
    if (
      !form.title ||
      !form.amount
    ) {
      alert(
        "Please fill all fields"
      );
      return;
    }

    const newExpense = {
      id: Date.now(),

      title: form.title,

      amount: form.amount,

      description:
        form.description,

      date:
        new Date().toLocaleDateString(),

      time:
        new Date().toLocaleTimeString(),
    };

    const updated = [
      newExpense,
      ...expenses,
    ];

    setExpenses(updated);

    localStorage.setItem(
      "expenses",
      JSON.stringify(
        updated
      )
    );

    setForm({
      title: "",
      amount: "",
      description: "",
    });

    alert(
      "Expense Added Successfully"
    );
  };

  const deleteExpense =
    (id) => {
      const confirmDelete =
        window.confirm(
          "Delete this expense?"
        );

      if (!confirmDelete)
        return;

      const updated =
        expenses.filter(
          (expense) =>
            expense.id !== id
        );

      setExpenses(updated);

      localStorage.setItem(
        "expenses",
        JSON.stringify(
          updated
        )
      );
    };

  const totalExpense =
    expenses.reduce(
      (sum, item) =>
        sum +
        Number(
          item.amount || 0
        ),
      0
    );

  return (
    <>
      <Navbar />

      <div className="container">

        <div
          style={{
            textAlign:
              "center",
            marginBottom:
              "30px",
          }}
        >
          <h1>
            🧾 Manage
            Expenses
          </h1>

          <p>
            Add and Track
            Mandal Expenses
          </p>
        </div>

        {/* SUMMARY */}

        <div className="total-donations-card">

          <h2>
            ₹
            {totalExpense.toLocaleString()}
          </h2>

          <p>
            Total Expenses
          </p>

          <p>
            Records:
            {" "}
            {
              expenses.length
            }
          </p>

        </div>

        {/* FORM */}

        <div className="donation-form">

          <h2>
            Add Expense
          </h2>

          <input
            type="text"
            placeholder="Expense Title"
            value={
              form.title
            }
            onChange={(e) =>
              setForm({
                ...form,
                title:
                  e.target
                    .value,
              })
            }
          />

          <input
            type="number"
            placeholder="Amount"
            value={
              form.amount
            }
            onChange={(e) =>
              setForm({
                ...form,
                amount:
                  e.target
                    .value,
              })
            }
          />

          <textarea
            placeholder="Description"
            value={
              form.description
            }
            onChange={(e) =>
              setForm({
                ...form,
                description:
                  e.target
                    .value,
              })
            }
          />

          <button
            onClick={
              addExpense
            }
          >
            Add Expense
          </button>

        </div>

        {/* LIST */}

        <div
          className="cards"
          style={{
            marginTop:
              "30px",
          }}
        >

          {expenses.length >
          0 ? (
            expenses.map(
              (
                expense
              ) => (
                <div
                  className="card"
                  key={
                    expense.id
                  }
                >

                  <h3>
                    {
                      expense.title
                    }
                  </h3>

                  <h2
                    style={{
                      color:
                        "#dc2626",
                    }}
                  >
                    ₹
                    {
                      expense.amount
                    }
                  </h2>

                  <p>
                    {
                      expense.description
                    }
                  </p>

                  <p>
                    📅
                    {" "}
                    {
                      expense.date
                    }
                  </p>

                  <p>
                    🕒
                    {" "}
                    {
                      expense.time
                    }
                  </p>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteExpense(
                        expense.id
                      )
                    }
                  >
                    Delete
                  </button>

                </div>
              )
            )
          ) : (
            <h2>
              No Expenses
              Found
            </h2>
          )}

        </div>

      </div>
    </>
  );
}

export default ManageExpenses;