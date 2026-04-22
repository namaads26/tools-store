import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../services/firebase";

const auth = getAuth(app);

function Navbar() {
  const { user } = useContext(AuthContext);
  const { carrito, total } = useContext(CartContext);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <nav style={styles.nav}>
      
      {/* LOGO */}
      <h2 style={styles.logo}>Nama Tools</h2>

      {/* LINKS */}
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/shop" style={styles.link}>Tienda</Link>

        {!user && (
          <Link to="/login" style={styles.link}>Login</Link>
        )}

        {user && (
          <Link to="/admin" style={styles.link}>Admin</Link>
        )}
      </div>

      {/* USER + CART */}
      <div style={styles.right}>
        
        {/* USER */}
        {user ? (
          <div>
            <span style={styles.user}>{user.email}</span>
            <button onClick={handleLogout} style={styles.button}>
              Logout
            </button>
          </div>
        ) : (
          <span style={styles.user}>Invitado</span>
        )}

        {/* CART */}
        <div style={styles.cart}>
          🛒 {carrito.length} | ${total}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "#111",
    color: "#fff"
  },
  logo: {
    margin: 0
  },
  links: {
    display: "flex",
    gap: "20px"
  },
  link: {
    color: "#fff",
    textDecoration: "none"
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },
  user: {
    fontSize: "14px"
  },
  button: {
    marginLeft: "10px",
    padding: "5px 10px",
    cursor: "pointer"
  },
  cart: {
    background: "#333",
    padding: "5px 10px",
    borderRadius: "5px"
  }
};