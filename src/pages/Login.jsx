import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../services/firebase";

const auth = getAuth(app);

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logeado!");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input 
        type="email" 
        placeholder="email"
        onChange={e => setEmail(e.target.value)}
      />
      <input 
        type="password" 
        placeholder="password"
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Ingresar</button>
    </div>
  );
}

export default Login;