import { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../services/firebase";

export const AuthContext = createContext();

const auth = getAuth(app);
const db = getFirestore(app);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const ref = doc(db, "usuarios", firebaseUser.uid);
          const snap = await getDoc(ref);

          const extraData = snap.exists() ? snap.data() : {};

          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            role: extraData.role || "cliente",
          });
        } catch (error) {
          console.error("Error obteniendo usuario:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}