// src/components/dashboard/TrackingDate.jsx
import React, { useState } from "react";
import { usePiggy } from "../../context/PiggyContext";

export default function TrackingDate() {
  const { currentUser, setTrackingDate } = usePiggy();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [loading, setLoading] = useState(false);

  const handleSetDate = async () => {
    setLoading(true);
    try {
      await setTrackingDate(selectedDate);
    } catch (err) {
      console.error("Error setting tracking date:", err);
    } finally {
      setLoading(false);
    }
  };

  const isLocked = !!currentUser?.trackingStart;

  return (
    <div className="panel">
      <h3>Set Tracking Start Date</h3>
      <div className="inputRow">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          disabled={isLocked || loading}
        />
        <button
          className="primaryBtn"
          onClick={handleSetDate}
          disabled={isLocked || loading}
        >
          {isLocked ? "Tracking Started" : loading ? "Setting..." : "Set"}
        </button>
      </div>
      {isLocked && <p>Tracking started from {currentUser.trackingStart}</p>}
    </div>
  );
}
