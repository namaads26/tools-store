import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Admin() {
  const { user } = useContext(AuthContext);

  if (!user) return <h1>No autorizado</h1>;

  return <h1>Panel Admin</h1>;
}

export default Admin;