import React, { useContext, useState } from "react";
import { PiggyContext } from "../../context/PiggyContext";
import { addBorrow } from "../../services/borrowService";
import { addLend } from "../../services/lendService";

export default function BorrowLend() {
  const { currentUser, refreshUser } = useContext(PiggyContext);

  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("borrow");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!name || !amount) return;

    const payload = {
      personName: name,
      note,
      amount: parseFloat(amount),
      date,
    };

    setLoading(true);
    try {
      if (type === "borrow") {
        await addBorrow(payload);
      } else {
        await addLend(payload);
      }
      await refreshUser();
      setName("");
      setNote("");
      setAmount("");
      setType("borrow");
    } catch (err) {
      console.error("Failed to add borrow/lend", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="panel">
      <h3>Borrow / Lend</h3>
      <div className="inputRow">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="borrow">Borrow (+)</option>
          <option value="lend">Lend (-)</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button className="primaryBtn" onClick={handleAdd} disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </button>
      </div>
    </div>
  );
}
