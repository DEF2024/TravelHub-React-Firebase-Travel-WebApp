import { doc, getDoc, getDocs, orderBy, query, serverTimestamp, setDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export async function createUserProfile(user, name, platformRole = "student", university = "") {
  const validStaffRoles = ["cms-admin"];
  const requestedRole = validStaffRoles.includes(platformRole) ? platformRole : "student";
  const isAdmin = requestedRole === "cms-admin";
  await setDoc(doc(db, "users", user.uid), {
    name: name ?? user.displayName ?? user.email?.split("@")[0] ?? "Traveler",
    email: user.email ?? "",
    photoURL: user.photoURL ?? "",
    university: String(university ?? "").trim(),
    role: isAdmin ? "admin" : "student",
    platformRole: requestedRole,
    requestedRole,
    roleApproved: true,
    createdAt: serverTimestamp(),
  }, { merge: true });
}

export async function ensureUserProfile(user) {
  const profile = await getUserProfile(user.uid);
  if (profile) return profile;
  await createUserProfile(user);
  const repairedProfile = await getUserProfile(user.uid);
  return repairedProfile ?? {
    id: user.uid,
    name: user.displayName ?? user.email?.split("@")[0] ?? "Traveler",
    email: user.email ?? "",
    photoURL: user.photoURL ?? "",
    role: "student",
  };
}

export async function getUserProfile(uid) {
  const snapshot = await getDoc(doc(db, "users", uid));
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
}

export async function listUsers() {
  const snapshot = await getDocs(query(collection(db, "users"), orderBy("name")));
  return snapshot.docs.map((user) => ({ id: user.id, ...user.data() }));
}
