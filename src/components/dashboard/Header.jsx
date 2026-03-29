import { usePiggy } from "../../context/PiggyContext";
import logo from "../../assets/track.png";

export default function Header() {
  const { currentUser } = usePiggy();

  if (!currentUser) return <div>Loading...</div>;

  return (
    <div id="header" className="header-container">
      <div className="logo-section">
        <img src={logo} alt="logo" className="logo-img" />
        <h2 className="gradient-text">TrackMint</h2>
      </div>

      {/* User Info */}
      <div className="user-info">
        <div>Welcome, {currentUser?.name || "USER"}</div>
        <div>Balance: ৳{currentUser.currentBalance?.toFixed(0) || 0}</div>
      </div>
    </div>
  );
}
