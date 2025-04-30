function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      width: "100%",
      background: "#1e2a38",
      color: "#fff",
      padding: "10px 20px",
      display: "flex",
      justifyContent: "space-between",
      zIndex: 1000
    }}>
      <div><strong>LevelUp</strong></div>
      <button onClick={logout} style={{
        background: "#00c3ff",
        border: "none",
        padding: "8px 16px",
        borderRadius: "5px",
        color: "#000",
        cursor: "pointer"
      }}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;
