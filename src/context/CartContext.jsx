import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  const agregar = (producto) => {
    setCarrito(prev => [...prev, producto]);
  };

  const eliminar = (id) => {
    setCarrito(prev => prev.filter(p => p.id !== id));
  };

  const total = carrito.reduce((acc, p) => acc + p.precio, 0);

  return (
    <CartContext.Provider value={{ carrito, agregar, eliminar, total }}>
      {children}
    </CartContext.Provider>
  );
}