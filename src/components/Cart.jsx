import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { carrito, eliminar, total } = useContext(CartContext);
  const [open, setOpen] = useState(false);

  return (
    <div style={styles.wrapper}>
      {/* BOTÓN */}
      <button onClick={() => setOpen(!open)} style={styles.button}>
        🛒 {carrito.length}
      </button>

      {/* PANEL */}
      {open && (
        <div style={styles.panel}>
          <h3>Carrito</h3>

          {carrito.length === 0 ? (
            <p>Vacío</p>
          ) : (
            <>
              {carrito.map((p) => (
                <div key={p.id} style={styles.item}>
                  <span>{p.nombre}</span>
                  <span>${p.precio}</span>
                  <button onClick={() => eliminar(p.id)}>X</button>
                </div>
              ))}

              <h4>Total: ${total}</h4>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Cart;

const styles = {
  wrapper: {
    position: "relative"
  },
  button: {
    padding: "5px 10px",
    cursor: "pointer"
  },
  panel: {
    position: "absolute",
    right: 0,
    top: "40px",
    background: "#fff",
    color: "#000",
    padding: "15px",
    width: "250px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    zIndex: 100
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px"
  }
};