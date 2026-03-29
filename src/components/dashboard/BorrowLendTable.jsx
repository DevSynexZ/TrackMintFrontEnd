import React, { useContext, useEffect, useState } from "react";
import { PiggyContext } from "../../context/PiggyContext";
import API from "../../services/api";

export default function BorrowLendTable() {
  const { currentUser, refreshUser } = useContext(PiggyContext);
  const [showAll, setShowAll] = useState(false);
  const [borrowHistory, setBorrowHistory] = useState([]);
  const [lendHistory, setLendHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const borrowRes = await API.get("/borrow/history");
      const lendRes = await API.get("/lend/history");

      setBorrowHistory(borrowRes.data.history || []);
      setLendHistory(lendRes.data.history || []);
    } catch (err) {
      console.error("Failed to fetch borrow/lend history", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch history when component mounts and when user refreshes
  useEffect(() => {
    fetchHistory();
  }, [currentUser]); // or you can pass refreshUser as dependency

  // Combine borrow + lend with type
  const combined = [
    ...borrowHistory.map((item) => ({ ...item, type: "borrow" })),
    ...lendHistory.map((item) => ({ ...item, type: "lend" })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  const display = showAll ? combined : combined.slice(0, 10);

  const handleDelete = async (id, type) => {
    if (!window.confirm("Are you sure? This will adjust your balance.")) return;
    try {
      if (type === "borrow") await API.delete(`/borrow/delete/${id}`);
      else await API.delete(`/lend/delete/${id}`);
      await refreshUser();
      await fetchHistory(); // refresh table
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  if (loading) return <p>Loading history...</p>;

  return (
    <div className="panel">
      <h3>Borrow / Lend History</h3>
      {combined.length === 0 ? (
        <p style={{ fontSize: "13px", color: "#777" }}>
          No borrow or lend records yet.
        </p>
      ) : (
        <>
          <table className="historyTable">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Note</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {display.map((item, index) => (
                <tr key={item._id || index}>
                  <td>{index + 1}</td>
                  <td>{item.personName}</td>
                  <td>{item.note || "-"}</td>
                  <td
                    style={{
                      color: item.type === "borrow" ? "green" : "red",
                      fontWeight: 600,
                    }}
                  >
                    {item.type === "borrow" ? "Borrow (+)" : "Lend (-)"}
                  </td>
                  <td>{item.amount}</td>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(item._id, item.type)}
                      style={{ cursor: "pointer" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {combined.length > 10 && !showAll && (
            <button
              style={{
                marginTop: 10,
                padding: "5px 12px",
                fontSize: 13,
                cursor: "pointer",
              }}
              onClick={() => setShowAll(true)}
            >
              See More
            </button>
          )}
        </>
      )}
    </div>
  );
}
