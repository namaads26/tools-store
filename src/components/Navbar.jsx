import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../services/firebase";
import Cart from "./Cart";

const auth = getAuth(app);

function Navbar() {
  const { user } = useContext(AuthContext);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <nav style={styles.nav}>
      {/* LOGO */}
      <h2>Nama Tools 🚀</h2>

      {/* LINKS */}
      <div style={styles.links}>
        <Link to="/">Home</Link>
        <Link to="/shop">Tienda</Link>

        {!user && <Link to="/login">Login</Link>}
        {user && <Link to="/admin">Admin</Link>}
      </div>

      {/* DERECHA */}
      <div style={styles.right}>
        {user ? (
          <>
            <span>{user.email}</span>
            <button onClick={logout}>Salir</button>
          </>
        ) : (
          <span>Invitado</span>
        )}

        <Cart />
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
    padding: "15px 20px",
    background: "#111",
    color: "#fff"
  },
  links: {
    display: "flex",
    gap: "15px"
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  }
};