// ─── src/context/AuthContext.jsx ─────────────────────────────
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null); // { uid, email, username, createdAt, photoBase64 }
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async (user) => {
    if (!user) {
      setCurrentUser(null);
      return;
    }
    try {
      const profileDoc = await getDoc(doc(db, "users", user.uid));
      const data = profileDoc.exists() ? profileDoc.data() : {};
      setCurrentUser({
        uid: user.uid,
        email: user.email,
        username: data.username || null,
        createdAt: data.createdAt || null,
        photoBase64: data.photoBase64 || null,
      });
    } catch (err) {
      console.error("Failed to load user profile:", err);
      setCurrentUser({ uid: user.uid, email: user.email, username: null, createdAt: null, photoBase64: null });
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      await loadProfile(user);
      setLoading(false);
    });
    return unsubscribe;
  }, [loadProfile]);

  // Call this after updating Firestore (e.g. new profile photo) to refresh
  // currentUser without waiting for a full page reload.
  const refreshProfile = useCallback(() => loadProfile(firebaseUser), [firebaseUser, loadProfile]);

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ currentUser, loading, logout, refreshProfile }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}