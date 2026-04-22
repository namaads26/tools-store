import { useEffect, useState } from "react";
import { obtenerProductos } from "../services/products";
import ProductCard from "../components/ProductCard";

function Shop() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔄 cargar productos desde Firebase
  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await obtenerProductos();
        setProductos(data);
      } catch (err) {
        console.error(err);
        setError("Error cargando productos");
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, []);

  // ⏳ loading
  if (loading) {
    return <h2 style={styles.center}>Cargando productos...</h2>;
  }

  // ❌ error
  if (error) {
    return <h2 style={styles.center}>{error}</h2>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Tienda 🛒</h1>

      {productos.length === 0 ? (
        <p style={styles.center}>No hay productos aún</p>
      ) : (
        <div style={styles.grid}>
          {productos.map((p) => (
            <ProductCard key={p.id} producto={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Shop;

// 🎨 estilos
const styles = {
  container: {
    padding: "20px"
  },
  title: {
    textAlign: "center",
    marginBottom: "20px"
  },
  grid: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  center: {
    textAlign: "center",
    marginTop: "40px"
  }
};