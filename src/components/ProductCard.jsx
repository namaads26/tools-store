import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function ProductCard({ producto }) {
  const { agregar } = useContext(CartContext);

  return (
    <div style={styles.card}>
      {producto.imagen && (
        <img
          src={producto.imagen}
          alt={producto.nombre}
          style={styles.image}
        />
      )}

      <h3>{producto.nombre}</h3>
      <p style={styles.price}>${producto.precio}</p>

      <button
        style={styles.button}
        onClick={() => agregar(producto)}
      >
        Agregar al carrito
      </button>
    </div>
  );
}

export default ProductCard;

const styles = {
  card: {
    border: "1px solid #ddd",
    padding: "15px",
    width: "220px",
    textAlign: "center",
    borderRadius: "10px"
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    marginBottom: "10px"
  },
  price: {
    fontWeight: "bold"
  },
  button: {
    marginTop: "10px",
    padding: "10px",
    background: "#00ff88",
    border: "none",
    cursor: "pointer"
  }
};