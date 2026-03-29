import { useState, useContext, useEffect } from "react";
import { PiggyContext } from "../../context/PiggyContext";
import { resetAccount } from "../../services/expenseService";

export default function Sidebar() {
  const { currentUser, logout, refreshUser } = useContext(PiggyContext);

  const [open, setOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const { setGlobalRefresh } = useContext(PiggyContext);

  const storageKey = `profilePic_${currentUser?.email}`;

  useEffect(() => {
    const savedPic = localStorage.getItem(storageKey);
    if (savedPic) setProfilePic(savedPic);
  }, [storageKey]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/"))
      return alert("Please select an image file");
    if (file.size > 2 * 1024 * 1024) return alert("Image must be under 2MB");

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePic(reader.result);
      localStorage.setItem(storageKey, reader.result);
    };
    reader.readAsDataURL(file);
  };

  // 🔥 RESET ACCOUNT FUNCTION
  // const handleReset = async () => {
  //   if (!window.confirm("Are you sure? This will reset your account!")) return;

  //   try {
  //     await resetAccount(); // reset backend data
  //     await refreshUser(); // refresh all frontend context data
  //     alert("Your account has been reset!");
  //   } catch (err) {
  //     console.error("Reset failed:", err);
  //     alert("Reset failed. Try again.");
  //   }
  // };

  const handleReset = async () => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await resetAccount();
      await refreshUser();

      setGlobalRefresh((prev) => prev + 1); // 🔥 trigger ALL components

      alert("Account reset successful!");
    } catch (err) {
      console.error(err);
    }
  };

  if (!currentUser) return <div>Loading menu...</div>;

  return (
    <>
      <div id="sidebar" className={open ? "sidebar-open" : ""}>
        <div id="profile">
          <img
            src={profilePic || "https://via.placeholder.com/60"}
            id="profilePic"
            alt="profile"
          />
          <label style={{ fontSize: "12px", cursor: "pointer" }}>
            Change photo
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageUpload}
            />
          </label>
          <div id="profileName">{currentUser.name}</div>
          <div style={{ fontSize: "10px", color: "#888" }}>
            Saved locally (temporary)
          </div>
        </div>

        <button className="sidebarBtn" onClick={logout}>
          Logout
        </button>
        <button className="sidebarBtn" onClick={handleReset}>
          Reset Account
        </button>
        <button className="sidebarBtn" onClick={() => setOpen(false)}>
          Close
        </button>
      </div>

      <div
        id="overlay"
        className={open ? "visible" : ""}
        onClick={() => setOpen(false)}
      />

      <button id="sidebarToggle" onClick={() => setOpen(true)}>
        ☰
      </button>
    </>
  );
}
