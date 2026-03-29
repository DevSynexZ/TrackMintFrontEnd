import React, { useState } from "react";

export default function AIAdvisor() {

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating AI Button */}
      <div className="ai-button" onClick={() => setOpen(!open)}>
        🤖 AI Advisor
      </div>

      {/* Popup Panel */}
      {open && (
        <div className="ai-panel">
          <h3>AI Advisor</h3>

          <p>
            🚧 AI Advisor is currently under development.
          </p>

          <p>
            Future versions will analyze:
          </p>

          <ul>
            <li>Weekly expense behaviour</li>
            <li>Category spending patterns</li>
            <li>Budget warnings</li>
            <li>Smart saving suggestions</li>
          </ul>

          <p className="ai-note">
            Coming soon in future updates.
          </p>
        </div>
      )}
    </>
  );
}