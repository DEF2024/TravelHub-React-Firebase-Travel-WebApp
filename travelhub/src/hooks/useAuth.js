import { createContext, createElement, useContext, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import { ensureUserProfile } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let unsubscribeProfile = null;
    let profileTimeout = null;
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      unsubscribeProfile?.();
      unsubscribeProfile = null;
      window.clearTimeout(profileTimeout);
      setLoading(true);
      setError("");
      setUser(currentUser);
      setProfile(null);

      if (!currentUser) {
        setLoading(false);
        return;
      }

      unsubscribeProfile = onSnapshot(
        doc(db, "users", currentUser.uid),
        (snapshot) => {
          window.clearTimeout(profileTimeout);
          if (snapshot.exists()) {
            setProfile({ id: snapshot.id, ...snapshot.data() });
            setLoading(false);
            setError("");
            return;
          }

          const fallbackProfile = {
            id: currentUser.uid,
            name: currentUser.displayName ?? currentUser.email?.split("@")[0] ?? "Traveler",
            email: currentUser.email ?? "",
            photoURL: currentUser.photoURL ?? "",
            role: "student",
          };
          setProfile(fallbackProfile);
          setLoading(false);
          ensureUserProfile(currentUser).catch((profileError) => {
            console.warn("Unable to repair the missing account profile document.", profileError);
          });
        },
        (profileError) => {
          window.clearTimeout(profileTimeout);
          console.error("Unable to load the signed-in user's profile.", profileError);
          setProfile({
            id: currentUser.uid,
            name: currentUser.displayName ?? currentUser.email?.split("@")[0] ?? "Traveler",
            email: currentUser.email ?? "",
            photoURL: currentUser.photoURL ?? "",
            role: "student",
          });
          setError("");
          setLoading(false);
        },
      );
      profileTimeout = window.setTimeout(() => {
        setProfile((currentProfile) => currentProfile ?? {
          id: currentUser.uid,
          name: currentUser.displayName ?? currentUser.email?.split("@")[0] ?? "Traveler",
          email: currentUser.email ?? "",
          photoURL: currentUser.photoURL ?? "",
          role: "student",
        });
        setLoading(false);
      }, 8000);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeProfile?.();
      window.clearTimeout(profileTimeout);
    };
  }, []);

  const value = useMemo(() => ({
    user,
    profile,
    loading,
    error,
    isAdmin: profile?.role === "admin",
  }), [user, profile, loading, error]);

  return createElement(AuthContext.Provider, { value }, children);
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider.");
  return context;
}
