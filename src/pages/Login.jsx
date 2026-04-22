import { useState, useContext, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../services/firebase";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const auth = getAuth(app);

function Login() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modoRegistro, setModoRegistro] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔁 Si ya está logeado → redirigir
  useEffect(() => {
    if (user) {
      navigate("/admin");
    }
  }, [user, navigate]);

  // 🔐 LOGIN
  const handleLogin = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🆕 REGISTRO

  const db = getFirestore(app);
  
const handleRegister = async () => {
  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);

    // 🔥 guardamos usuario en DB
    await setDoc(doc(db, "usuarios", userCred.user.uid), {
      email,
      role: "cliente" // por defecto
    });

    alert("Cuenta creada");
  } catch (err) {
    alert(err.message);
  }
};

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>{modoRegistro ? "Crear cuenta" : "Iniciar sesión"}</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        {modoRegistro ? (
          <button onClick={handleRegister} style={styles.primaryBtn} disabled={loading}>
            {loading ? "Creando..." : "Registrarse"}
          </button>
        ) : (
          <button onClick={handleLogin} style={styles.primaryBtn} disabled={loading}>
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        )}

        <p style={styles.switch}>
          {modoRegistro ? "¿Ya tenés cuenta?" : "¿No tenés cuenta?"}
          <span onClick={() => setModoRegistro(!modoRegistro)} style={styles.link}>
            {modoRegistro ? " Iniciar sesión" : " Registrarse"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;

// 🎨 estilos
const styles = {
  container: {
    height: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    padding: "30px",
    border: "1px solid #ccc",
    width: "300px",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  input: {
    padding: "10px"
  },
  primaryBtn: {
    padding: "10px",
    background: "#00ff88",
    border: "none",
    cursor: "pointer"
  },
  switch: {
    fontSize: "14px"
  },
  link: {
    color: "blue",
    cursor: "pointer",
    marginLeft: "5px"
  }
};