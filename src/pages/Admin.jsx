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

  // 🔹 Cargar productos
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

  // 🔹 Crear producto
  const crearProducto = async () => {
    if (!nombre || !precio) return alert("Completar campos");

    await addDoc(collection(db, "productos"), {
      nombre,
      precio: Number(precio),
      imagen
    });

    resetForm();
    cargarProductos();
  };

  // 🔹 Eliminar
  const eliminarProducto = async (id) => {
    await deleteDoc(doc(db, "productos", id));
    cargarProductos();
  };

  // 🔹 Editar (cargar datos al form)
  const iniciarEdicion = (producto) => {
    setNombre(producto.nombre);
    setPrecio(producto.precio);
    setImagen(producto.imagen || "");
    setEditandoId(producto.id);
  };

  // 🔹 Guardar edición
  const guardarEdicion = async () => {
    await updateDoc(doc(db, "productos", editandoId), {
      nombre,
      precio: Number(precio),
      imagen
    });

    resetForm();
    cargarProductos();
  };

  // 🔹 Reset
  const resetForm = () => {
    setNombre("");
    setPrecio("");
    setImagen("");
    setEditandoId(null);
  };

  // 🔒 Protección básica
  if (!user) {
    return <h1>No autorizado</h1>;
  }

  return (
    <div style={styles.container}>
      <h1>Panel Admin 🔥</h1>

      {/* FORM */}
      <div style={styles.form}>
        <input
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          placeholder="Precio"
          type="number"
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
            <button onClick={guardarEdicion}>Guardar cambios</button>
            <button onClick={resetForm}>Cancelar</button>
          </>
        ) : (
          <button onClick={crearProducto}>Crear producto</button>
        )}
      </div>

      {/* LISTA */}
      <div style={styles.lista}>
        {productos.map((p) => (
          <div key={p.id} style={styles.card}>
            {p.imagen && (
              <img src={p.imagen} alt={p.nombre} width="120" />
            )}

            <h3>{p.nombre}</h3>
            <p>${p.precio}</p>

            <button onClick={() => iniciarEdicion(p)}>
              Editar
            </button>

            <button onClick={() => eliminarProducto(p.id)}>
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;

// 🎨 estilos simples (después podés pasar a Tailwind)
const styles = {
  container: {
    padding: "20px"
  },
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap"
  },
  lista: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap"
  },
  card: {
    border: "1px solid #ccc",
    padding: "10px",
    width: "200px"
  }
};