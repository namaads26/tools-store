import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { carrito, eliminar, total } = useContext(CartContext);

  return (
    <div>
      <h2>Carrito</h2>

      {carrito.map(p => (
        <div key={p.id}>
          {p.nombre} - ${p.precio}
          <button onClick={() => eliminar(p.id)}>X</button>
        </div>
      ))}

      <h3>Total: ${total}</h3>
    </div>
  );
}

export default Cart;