import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { app } from "../services/firebase";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc
} from "firebase/firestore";

const db = getFirestore(app);

function Admin() {
  const { user } = useContext(AuthContext);

  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  // 🔄 cargar productos
  const cargarProductos = async () => {
    const snapshot = await getDocs(collection(db, "productos"));
    const lista = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setProductos(lista);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // ➕ crear
  const crearProducto = async () => {
    await addDoc(collection(db, "productos"), {
      nombre,
      precio: Number(precio),
      imagen
    });
    reset();
    cargarProductos();
  };

  // ❌ eliminar
  const eliminarProducto = async (id) => {
    await deleteDoc(doc(db, "productos", id));
    cargarProductos();
  };

  // ✏️ editar
  const iniciarEdicion = (p) => {
    setNombre(p.nombre);
    setPrecio(p.precio);
    setImagen(p.imagen || "");
    setEditandoId(p.id);
  };

  const guardarEdicion = async () => {
    await updateDoc(doc(db, "productos", editandoId), {
      nombre,
      precio: Number(precio),
      imagen
    });
    reset();
    cargarProductos();
  };

  const reset = () => {
    setNombre("");
    setPrecio("");
    setImagen("");
    setEditandoId(null);
  };

  // 🔒 protección
  if (!user || user.role !== "admin") {
    return <h1 style={{ textAlign: "center" }}>No autorizado</h1>;
  }

  return (
    <div style={styles.container}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h1>Dashboard Admin 🚀</h1>
        <p>Gestioná tu tienda en tiempo real</p>
      </div>

      {/* MÉTRICAS */}
      <div style={styles.metrics}>
        <div style={styles.metric}>
          <h2>{productos.length}</h2>
          <p>Productos</p>
        </div>
        <div style={styles.metric}>
          <h2>${productos.reduce((acc, p) => acc + p.precio, 0)}</h2>
          <p>Valor total</p>
        </div>
      </div>

      {/* FORM */}
      <div style={styles.form}>
        <h2>{editandoId ? "Editar Producto" : "Nuevo Producto"}</h2>

        <input
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />

        <input
          placeholder="URL Imagen"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
        />

        {editandoId ? (
          <>
            <button onClick={guardarEdicion}>Guardar</button>
            <button onClick={reset}>Cancelar</button>
          </>
        ) : (
          <button onClick={crearProducto}>Crear</button>
        )}
      </div>

      {/* GRID PRODUCTOS */}
      <div style={styles.grid}>
        {productos.map((p) => (
          <div key={p.id} style={styles.card}>
            {p.imagen && <img src={p.imagen} alt="" />}

            <h3>{p.nombre}</h3>
            <p>${p.precio}</p>

            <div style={styles.actions}>
              <button onClick={() => iniciarEdicion(p)}>✏️</button>
              <button onClick={() => eliminarProducto(p.id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;

// 🎨 estilos PRO
const styles = {
  container: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "auto"
  },
  header: {
    marginBottom: "20px"
  },
  metrics: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px"
  },
  metric: {
    flex: 1,
    background: "#111",
    color: "#fff",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "30px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px"
  },
  card: {
    border: "1px solid #ddd",
    padding: "15px",
    borderRadius: "10px",
    textAlign: "center"
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    gap: "10px"
  }
};