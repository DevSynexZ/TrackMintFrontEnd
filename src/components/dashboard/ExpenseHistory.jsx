import React, { useState, useEffect, useContext } from "react";
import { getExpenseHistory } from "../../services/expenseService";
import { PiggyContext } from "../../context/PiggyContext";

export default function ExpenseHistory({ refreshTrigger }) {
  const [expenses, setExpenses] = useState([]);
  const [showFull, setShowFull] = useState(false);
  const { globalRefresh } = useContext(PiggyContext);

  const loadHistory = async () => {
    try {
      const res = await getExpenseHistory();
      setExpenses(res.data.history || []);
    } catch (err) {
      console.error("History load failed:", err);
      setExpenses([]);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    if (refreshTrigger > 0 || globalRefresh > 0) {
      loadHistory();
    }
  }, [refreshTrigger, globalRefresh]);

  const display = showFull ? expenses : expenses.slice(0, 10);

  if (!expenses.length) {
    return (
      <div className="panel">
        <h3>Recent Expenses</h3>
        <div>No expenses recorded yet.</div>
      </div>
    );
  }

  return (
    <div className="panel" id="expenseHistory">
      <h3>Recent Expenses</h3>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {display.map((e, i) => (
            <tr key={e._id}>
              <td>{i + 1}</td>
              <td>{e.title}</td>
              <td>{e.category}</td>
              <td>৳{Number(e.amount).toFixed(0)}</td>
              <td>{new Date(e.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {expenses.length > 10 && (
        <button className="primaryBtn" onClick={() => setShowFull(!showFull)}>
          {showFull ? "Show less" : `Show ${expenses.length - 10} more`}
        </button>
      )}
    </div>
  );
}
