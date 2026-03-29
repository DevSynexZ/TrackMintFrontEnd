import { useState } from "react";
import { addBalance } from "../../services/balanceService";
import { usePiggy } from "../../context/PiggyContext";

export default function AddMoney() {

  const { currentUser, refreshUser } = usePiggy();

  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  if (!currentUser) return null;

  const handleAdd = async () => {

    const value = Number(amount);
    if (!value || value <= 0) return;

    try {

      setLoading(true);

      await addBalance({
        amount: value,
        date: date || new Date().toISOString().slice(0, 10),
      });

      // Refresh user data from backend
      await refreshUser();

      setAmount("");
      setDate("");

    } catch (err) {

      console.error("Add balance failed:", err);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="panel">

      <h3>Add Balance</h3>

      <div className="inputRow">

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button
          className="primaryBtn"
          onClick={handleAdd}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add"}
        </button>

      </div>

    </div>
  );
}