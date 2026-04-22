import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Shop() {
  const { agregar } = useContext(CartContext);

  const productos = [
    { id: 1, nombre: "Web Pro", precio: 500 },
    { id: 2, nombre: "Ads Pro", precio: 300 }
  ];

  return (
    <div>
      <h1>Tienda</h1>

      {productos.map(p => (
        <div key={p.id}>
          <h2>{p.nombre}</h2>
          <p>${p.precio}</p>
          <button onClick={() => agregar(p)}>
            Agregar al carrito
          </button>
        </div>
      ))}
    </div>
  );
}

export default Shop;