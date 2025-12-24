import BurgerMenu from "./BurgerMenu";

export default function Navbar() {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        height: "10vh",
        minHeight: "56px",
        maxHeight: "80px",
        backgroundColor: "#393E46",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        boxSizing: "border-box",
      }}
    >
      {/* Left: Logo */}
      <div
        style={{
          color: "#EEEEEE",
          fontSize: "22px",
          fontWeight: "700",
          letterSpacing: "1px",
        }}
      >
        SyncScript
      </div>
      <BurgerMenu />
    </nav>
  );
}
