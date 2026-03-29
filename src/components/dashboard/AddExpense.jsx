// import React, { useState } from "react";
// import { addExpense } from "../../services/expenseService";
// import { usePiggy } from "../../context/PiggyContext";

// export default function AddExpense({ setRefreshTrigger }) {

//   const { refreshUser } = usePiggy();

//   const [title, setTitle] = useState("");
//   const [amount, setAmount] = useState("");
//   const [category, setCategory] = useState("Grocery");
//   const [date, setDate] = useState(
//     new Date().toISOString().split("T")[0]
//   );

//   const [loading, setLoading] = useState(false);

//   const handleAddExpense = async () => {

//     const value = Number(amount);

//     if (!title || !value || value <= 0) return;

//     try {

//       setLoading(true);

//       await addExpense({
//         title,
//         amount: value,
//         category,
//         date
//       });

//       // refresh header balance
//       await refreshUser();

//       // tell history to reload
//       setRefreshTrigger(prev => prev + 1);

//       setTitle("");
//       setAmount("");

//     } catch (err) {

//       console.error("Expense add failed:", err);

//     } finally {

//       setLoading(false);

//     }
//   };

//   return (
//     <div className="panel">

//       <h3>Add Expense</h3>

//       <div className="inputRow">

//         <input
//           type="text"
//           placeholder="Expense Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />

//         <input
//           type="number"
//           placeholder="Amount"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//         />

//         <select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//         >
//           <option>Grocery</option>
//           <option>Meal</option>
//           <option>University</option>
//           <option>Personal</option>
//           <option>Family</option>
//           <option>Electricity Bill</option>
//           <option>House Rent</option>
//           <option>Wifi Bill</option>
//           <option>Maid</option>
//           <option>Recharge</option>
//         </select>

//         <input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//         />

//         <button
//           className="primaryBtn"
//           onClick={handleAddExpense}
//           disabled={loading}
//         >
//           {loading ? "Adding..." : "Add"}
//         </button>
// a
//       </div>

//     </div>
//   );
// }

// // src/components/dashboard/AddExpense.jsx
// import React, { useState } from "react";
// import { addExpense } from "../../services/expenseService";
// import { usePiggy } from "../../context/PiggyContext";

// export default function AddExpense({ setRefreshTrigger }) {
//   const { refreshUser, currentUser, setCurrentUserExpenses } = usePiggy();

//   const [title, setTitle] = useState("");
//   const [amount, setAmount] = useState("");
//   const [category, setCategory] = useState("Grocery");
//   const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
//   const [loading, setLoading] = useState(false);

//   const handleAddExpense = async () => {
//     const value = Number(amount);
//     if (!title || !value || value <= 0) return;

//     setLoading(true);
//     try {
//       await addExpense({ title, amount: value, category, date });

//       // 🔹 immediately update context
//       setCurrentUserExpenses([...currentUser.expenses, { title, amount: value, category, date }]);

//       // optional refresh to sync with backend
//       await refreshUser();
//       // trigger history reload
//       setRefreshTrigger(prev => prev + 1);

//       setTitle("");
//       setAmount("");
//     } catch (err) {
//       console.error("Expense add failed:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="panel">
//       <h3>Add Expense</h3>
//       <div className="inputRow">
//         <input type="text" placeholder="Expense Title" value={title} onChange={e => setTitle(e.target.value)} />
//         <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
//         <select value={category} onChange={e => setCategory(e.target.value)}>
//           <option>Grocery</option>
//           <option>Meal</option>
//           <option>University</option>
//           <option>Personal</option>
//           <option>Family</option>
//           <option>Electricity Bill</option>
//           <option>House Rent</option>
//           <option>Wifi Bill</option>
//           <option>Maid</option>
//           <option>Recharge</option>
//         </select>
//         <input type="date" value={date} onChange={e => setDate(e.target.value)} />
//         <button className="primaryBtn" onClick={handleAddExpense} disabled={loading}>
//           {loading ? "Adding..." : "Add"}
//         </button>
//       </div>
//     </div>
//   );
// }

// // src/components/dashboard/AddExpense.jsx
// import React, { useState } from "react";
// import { addExpense } from "../../services/expenseService";
// import { usePiggy } from "../../context/PiggyContext";

// export default function AddExpense({ setRefreshTrigger }) {
//   const { currentUser, setCurrentUserExpenses, refreshUser } = usePiggy();

//   const [title, setTitle] = useState("");
//   const [amount, setAmount] = useState("");
//   const [category, setCategory] = useState("Grocery");
//   const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
//   const [loading, setLoading] = useState(false);

//   const handleAddExpense = async () => {
//     const value = Number(amount);
//     if (!title || !value || value <= 0) return;

//     setLoading(true);
//     try {
//       await addExpense({ title, amount: value, category, date });

//       // 1️⃣ Update context immediately
//       const newExpenses = [
//         ...currentUser.expenses,
//         { title, amount: value, category, date }
//       ];
//       setCurrentUserExpenses(newExpenses);

//       // 2️⃣ Optional: refresh user to sync backend totals
//       await refreshUser();

//       // 3️⃣ trigger history reload
//       setRefreshTrigger(prev => prev + 1);

//       setTitle("");
//       setAmount("");
//     } catch (err) {
//       console.error("Expense add failed:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="panel">
//       <h3>Add Expense</h3>
//       <div className="inputRow">
//         <input type="text" placeholder="Expense Title" value={title} onChange={e => setTitle(e.target.value)} />
//         <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
//         <select value={category} onChange={e => setCategory(e.target.value)}>
//           <option>Grocery</option>
//           <option>Meal</option>
//           <option>University</option>
//           <option>Personal</option>
//           <option>Family</option>
//           <option>Electricity Bill</option>
//           <option>House Rent</option>
//           <option>Wifi Bill</option>
//           <option>Maid</option>
//           <option>Recharge</option>
//         </select>
//         <input type="date" value={date} onChange={e => setDate(e.target.value)} />
//         <button className="primaryBtn" onClick={handleAddExpense} disabled={loading}>
//           {loading ? "Adding..." : "Add"}
//         </button>
//       </div>
//     </div>
//   );
// }

// src/components/dashboard/AddExpense.jsx
import React, { useState } from "react";
import { addExpense } from "../../services/expenseService";
import { usePiggy } from "../../context/PiggyContext";

export default function AddExpense({ setRefreshTrigger }) {
  const { currentUser, setCurrentUserExpenses, refreshUser } = usePiggy();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Grocery");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(false);

  const handleAddExpense = async () => {
    const value = Number(amount);
    if (!title || !value || value <= 0) return;

    setLoading(true);
    try {
      await addExpense({ title, amount: value, category, date });

      // ✅ ONLY DO THIS
      await refreshUser(); // updates everything from backend

      setRefreshTrigger?.((prev) => prev + 1);

      setTitle("");
      setAmount("");
    } catch (err) {
      console.error("Expense add failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="panel">
      <h3>Add Expense</h3>
      <div className="inputRow">
        <input
          type="text"
          placeholder="Expense Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Grocery</option>
          <option>Meal</option>
          <option>University</option>
          <option>Personal</option>
          <option>Family</option>
          <option>Electricity Bill</option>
          <option>House Rent</option>
          <option>Wifi Bill</option>
          <option>Maid</option>
          <option>Recharge</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button
          className="primaryBtn"
          onClick={handleAddExpense}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </div>
    </div>
  );
}
