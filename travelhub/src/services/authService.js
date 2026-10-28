import { doc, getDoc, getDocs, orderBy, query, serverTimestamp, setDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export async function createUserProfile(user, name) {
  await setDoc(doc(db, "users", user.uid), {
    name,
    email: user.email ?? "",
    photoURL: user.photoURL ?? "",
    role: "student",
    createdAt: serverTimestamp(),
  });
}

export async function getUserProfile(uid) {
  const snapshot = await getDoc(doc(db, "users", uid));
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
}

export async function listUsers() {
  const snapshot = await getDocs(query(collection(db, "users"), orderBy("name")));
  return snapshot.docs.map((user) => ({ id: user.id, ...user.data() }));
}
