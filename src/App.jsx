import React, { useContext, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { PiggyContext } from "./context/PiggyContext";
import Login from "./components/auth/Login";

const Dashboard = React.lazy(() => import("./components/dashboard/Dashboard"));

export default function App() {
  const { currentUser, loading } = useContext(PiggyContext);

  if (loading) {
    return <div style={{ color: "white", textAlign: "center" }}>Loading user...</div>;
  }

  return (
    <Router>
      <Suspense fallback={<div style={{ color: "white" }}>Loading...</div>}>
        <Routes>

          <Route
            path="/"
            element={!currentUser ? <Login /> : <Navigate to="/dashboard" />}
          />

          <Route
            path="/dashboard/*"
            element={currentUser ? <Dashboard /> : <Navigate to="/" />}
          />

        </Routes>
      </Suspense>
    </Router>
  );
}