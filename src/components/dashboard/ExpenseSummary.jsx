// src/components/dashboard/ExpenseSummary.jsx
import React, { useMemo } from "react";
import { usePiggy } from "../../context/PiggyContext";

// Helper functions
const getWeekNumber = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const dayNum = d.getDay() || 7; // Make Sunday = 7
  d.setDate(d.getDate() + 4 - dayNum);
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return `${d.getFullYear()}-W${weekNo}`;
};

const getMonthKey = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}`;
};

export default function ExpenseSummary() {
  const { currentUser } = usePiggy();
  const expenses = currentUser.expenses || [];

  const summary = useMemo(() => {
    const categories = [...new Set(expenses.map((e) => e.category))];

    return categories.map((category) => {
      const categoryExpenses = expenses.filter((e) => e.category === category);

      // Total spent
      const total = categoryExpenses.reduce((sum, e) => sum + e.amount, 0);

      // Weekly grouping
      const weeklyGroups = {};
      categoryExpenses.forEach((e) => {
        const week = getWeekNumber(e.date);
        weeklyGroups[week] = (weeklyGroups[week] || 0) + e.amount;
      });
      const weeklyTotals = Object.values(weeklyGroups);
      const weeklyAvg =
        weeklyTotals.length > 0
          ? +(
              weeklyTotals.reduce((a, b) => a + b, 0) / weeklyTotals.length
            ).toFixed(2)
          : 0;

      // Monthly grouping
      const monthlyGroups = {};
      categoryExpenses.forEach((e) => {
        const month = getMonthKey(e.date);
        monthlyGroups[month] = (monthlyGroups[month] || 0) + e.amount;
      });
      const monthlyTotals = Object.values(monthlyGroups);
      const monthlyAvg =
        monthlyTotals.length > 0
          ? +(
              monthlyTotals.reduce((a, b) => a + b, 0) / monthlyTotals.length
            ).toFixed(2)
          : 0;

      return { category, total, weeklyAvg, monthlyAvg };
    });
  }, [expenses]);

  return (
    <div className="expense-summary">
      <h2>Expense Summary</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Total Spent</th>
            <th>
              Weekly Avg <small>(Total 4 weeks)</small>
            </th>
            <th>
              Monthly Avg <small>(Calculated after 1 month)</small>
            </th>
          </tr>
        </thead>
        <tbody>
          {summary.map((item, idx) => (
            <tr key={idx}>
              <td>{item.category}</td>
              <td>{item.total}</td>
              <td>{item.weeklyAvg}</td>
              <td>{item.monthlyAvg}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
