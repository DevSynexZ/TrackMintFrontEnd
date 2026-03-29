// // src/components/dashboard/Dashboard.jsx
// import React, { useState } from "react";
// import Sidebar from "./Sidebar";
// import Header from "./Header";
// import Calendar from "./Calendar";
// import TrackingDate from "./TrackingDate";
// import AddMoney from "./AddBalance";
// import AddExpense from "./AddExpense";
// import BorrowLend from "./BorrowLend";
// import ExpenseHistory from "./ExpenseHistory";
// import ExpenseSummary from "./ExpenseSummary";
// import BorrowLendTable from "./BorrowLendTable";
// import AIAdvisor from "./AIAdvisor";
// import { usePiggy } from "../../context/PiggyContext";

// export default function Dashboard() {
//   const { currentUser, loading } = usePiggy();
//   const [refreshTrigger, setRefreshTrigger] = useState(0);

//   if (loading) return <div style={{ color: "white", textAlign: "center", marginTop: "50px" }}>Loading user data...</div>;
//   if (!currentUser) return <div style={{ color: "white", textAlign: "center", marginTop: "50px" }}>You are not logged in. Please <a href="/">login</a> to continue.</div>;

//   return (
//     <div className="dashboardLayout">
//       <Header />
//       <Sidebar />
//       <main className="dashboardContent">
//         <TrackingDate />
//         <Calendar />
//         <AddMoney />
//         <AddExpense setRefreshTrigger={setRefreshTrigger} />
//         <ExpenseHistory refreshTrigger={refreshTrigger} />
//         <ExpenseSummary />
//         <BorrowLend />
//         <BorrowLendTable />
//       </main>
//       <h2 style={{ textAlign: "center", marginTop: "30px" }}>Developed By DevSynexZ</h2>
//       <AIAdvisor />
//     </div>
//   );
// }

// src/components/dashboard/Dashboard.jsx
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Calendar from "./Calendar";
import TrackingDate from "./TrackingDate";
import AddMoney from "./AddBalance";
import AddExpense from "./AddExpense";
import BorrowLend from "./BorrowLend";
import ExpenseHistory from "./ExpenseHistory";
import ExpenseSummary from "./ExpenseSummary";
import TrendChart from "./TrendChart";
import BorrowLendTable from "./BorrowLendTable";
import AIAdvisor from "./AIAdvisor";

import { usePiggy } from "../../context/PiggyContext";

export default function Dashboard() {
  const { currentUser, loading, trend } = usePiggy();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  if (loading)
    return (
      <div style={{ color: "white", textAlign: "center", marginTop: "50px" }}>
        Loading user data...
      </div>
    );
  if (!currentUser)
    return (
      <div style={{ color: "white", textAlign: "center", marginTop: "50px" }}>
        You are not logged in. Please <a href="/">login</a> to continue.
      </div>
    );

  return (
    <div className="dashboardLayout">
      <Header />
      <Sidebar />
      <main className="dashboardContent">
        <TrackingDate />
        <Calendar />
        <AddMoney />
        <AddExpense setRefreshTrigger={setRefreshTrigger} />
        <ExpenseHistory refreshTrigger={refreshTrigger} />
        <ExpenseSummary />

        <div className="mt-8">
          {trend && trend.length > 0 ? (
            <TrendChart data={trend} />
          ) : (
            <div className="bg-slate-900 p-10 rounded-2xl text-center text-slate-400">
              No data available for the last 7 days.
            </div>
          )}
        </div>

        <BorrowLend />
        <BorrowLendTable />
      </main>
      <h2 style={{ textAlign: "center", marginTop: "30px" }}>
        Developed By DevSynexZ
      </h2>
      <AIAdvisor />
    </div>
  );
}
