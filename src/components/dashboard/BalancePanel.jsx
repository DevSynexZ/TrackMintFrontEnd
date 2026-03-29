// src/components/BalancePanel.jsx
export default function BalancePanel({ balance }) {
  return (
    <div id="balanceBox">
      Balance: <span id="balanceDisplay">{balance.toFixed(2)}</span>
    </div>
  );
}
