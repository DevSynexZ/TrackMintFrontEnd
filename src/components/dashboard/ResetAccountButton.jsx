import React, { useContext, useState } from "react";
import { PiggyContext } from "../../context/PiggyContext";
import { API } from "../../services/api";

export default function ResetAccountButton() {
  const { refreshUser } = useContext(PiggyContext);
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (
      !window.confirm(
        "Are you sure you want to reset your account? This cannot be undone!",
      )
    )
      return;

    setLoading(true);
    try {
      const res = await API.post("/user/reset"); // backend endpoint
      alert(res.data.message);
      refreshUser(); // refresh frontend state
    } catch (err) {
      console.error(err);
      alert("Failed to reset account. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleReset}
      disabled={loading}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      {loading ? "Resetting..." : "Reset Account"}
    </button>
  );
}
