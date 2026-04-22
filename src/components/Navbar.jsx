import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const { user } = useContext(AuthContext);

{user ? <p>Hola {user.email}</p> : <p>No logeado</p>}