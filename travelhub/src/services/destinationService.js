import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const USERS = "users";
const DESTINATIONS = "destinations";
const TRIPS = "trips";
const CATEGORIES = "categories";
const text = (value) => String(value ?? "").trim();

export async function listDestinations({ includeUnpublished = false } = {}) {
  const destinationsQuery = includeUnpublished
    ? query(collection(db, DESTINATIONS))
    : query(collection(db, DESTINATIONS), where("published", "==", true));
  const snapshot = await getDocs(destinationsQuery);
  return snapshot.docs.map((destination) => {
    const data = destination.data();
    return {
      id: destination.id,
      ...data,
      region: data.region ?? data.state ?? data.city ?? "",
      categories: Array.isArray(data.categories) ? data.categories : data.category ? [data.category] : [],
      imageUrl: data.imageUrl ?? data.image ?? "",
      bestSeason: data.bestSeason ?? data.season ?? "",
      accessibility: Array.isArray(data.accessibility) ? data.accessibility : [],
      published: data.published === true,
    };
  }).sort((first, second) => first.name.localeCompare(second.name));
}

export async function saveDestination(destination, destinationId) {
  const destinationData = {
    name: text(destination.name),
    slug: text(destination.name).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    region: text(destination.region),
    categories: destination.categories ?? [],
    description: text(destination.description),
    imageUrl: text(destination.imageUrl),
    bestSeason: text(destination.bestSeason),
    accessibility: destination.accessibility ?? [],
    featured: Boolean(destination.featured),
    published: Boolean(destination.published),
    updatedAt: serverTimestamp(),
  };

  if (destinationId) {
    await updateDoc(doc(db, DESTINATIONS, destinationId), destinationData);
    return destinationId;
  }

  const reference = await addDoc(collection(db, DESTINATIONS), {
    ...destinationData,
    createdAt: serverTimestamp(),
  });
  return reference.id;
}

export async function deleteDestination(destinationId) {
  await deleteDoc(doc(db, DESTINATIONS, destinationId));
}

export async function listCategories() {
  const snapshot = await getDocs(query(collection(db, CATEGORIES), orderBy("name")));
  return snapshot.docs.map((category) => ({ id: category.id, ...category.data() }));
}

export async function saveCategory(name, categoryId) {
  const normalizedName = text(name);
  const id = categoryId ?? normalizedName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  await setDoc(doc(db, CATEGORIES, id), {
    name: normalizedName,
    updatedAt: serverTimestamp(),
    ...(categoryId ? {} : { createdAt: serverTimestamp() }),
  }, { merge: true });
}

export async function renameCategory(categoryId, oldName, newName) {
  const normalizedName = text(newName);
  const assignedDestinations = await getDocs(query(
    collection(db, DESTINATIONS),
    where("categories", "array-contains", oldName),
  ));
  if (assignedDestinations.size > 499) {
    throw new Error("This category is used by too many destinations to rename in one operation.");
  }

  const batch = writeBatch(db);
  assignedDestinations.docs.forEach((destination) => {
    const destinationCategories = destination.data().categories ?? [];
    batch.update(destination.ref, {
      categories: destinationCategories.map((category) => category === oldName ? normalizedName : category),
      updatedAt: serverTimestamp(),
    });
  });
  batch.set(doc(db, CATEGORIES, categoryId), { name: normalizedName, updatedAt: serverTimestamp() }, { merge: true });
  await batch.commit();
}

export async function deleteCategory(categoryId) {
  await deleteDoc(doc(db, CATEGORIES, categoryId));
}

export async function listUserTrips(uid) {
  const [ownerIdSnapshot, userIdSnapshot] = await Promise.all([
    getDocs(query(collection(db, TRIPS), where("ownerId", "==", uid))),
    getDocs(query(collection(db, TRIPS), where("userId", "==", uid))),
  ]);
  const tripsById = new Map(
    [...ownerIdSnapshot.docs, ...userIdSnapshot.docs].map((trip) => [trip.id, { id: trip.id, ...trip.data() }]),
  );
  return [...tripsById.values()].sort((first, second) => first.startDate.localeCompare(second.startDate));
}

export async function listAllTrips() {
  const snapshot = await getDocs(collection(db, TRIPS));
  return snapshot.docs.map((trip) => ({ id: trip.id, ...trip.data() }))
    .sort((first, second) => first.startDate.localeCompare(second.startDate));
}

export async function getTrip(tripId) {
  const snapshot = await getDoc(doc(db, TRIPS, tripId));
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
}

export async function createTrip(uid, trip) {
  const reference = await addDoc(collection(db, TRIPS), {
    ownerId: uid,
    title: text(trip.title),
    destinationNames: trip.destinationNames,
    startDate: trip.startDate,
    endDate: trip.endDate,
    notes: text(trip.notes),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return reference.id;
}

export async function updateTrip(tripId, trip) {
  await updateDoc(doc(db, TRIPS, tripId), {
    title: text(trip.title),
    destinationNames: trip.destinationNames,
    startDate: trip.startDate,
    endDate: trip.endDate,
    notes: text(trip.notes),
    updatedAt: serverTimestamp(),
  });
}

export async function deleteTrip(tripId) {
  const itinerarySnapshot = await getDocs(collection(db, TRIPS, tripId, "itinerary"));
  for (let index = 0; index < itinerarySnapshot.docs.length; index += 400) {
    const batch = writeBatch(db);
    itinerarySnapshot.docs.slice(index, index + 400).forEach((item) => batch.delete(item.ref));
    await batch.commit();
  }
  await deleteDoc(doc(db, TRIPS, tripId));
}

export async function listItineraryItems(tripId) {
  const snapshot = await getDocs(query(collection(db, TRIPS, tripId, "itinerary"), orderBy("date")));
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
}

export async function createItineraryItem(tripId, item) {
  const reference = await addDoc(collection(db, TRIPS, tripId, "itinerary"), {
    date: item.date,
    activity: text(item.activity),
    notes: text(item.notes),
    createdAt: serverTimestamp(),
  });
  return reference.id;
}

export async function updateItineraryItem(tripId, itemId, item) {
  await updateDoc(doc(db, TRIPS, tripId, "itinerary", itemId), {
    date: item.date,
    activity: text(item.activity),
    notes: text(item.notes),
    updatedAt: serverTimestamp(),
  });
}

export async function deleteItineraryItem(tripId, itemId) {
  await deleteDoc(doc(db, TRIPS, tripId, "itinerary", itemId));
}

export async function listSavedDestinations(uid) {
  const snapshot = await getDocs(collection(db, USERS, uid, "savedDestinations"));
  return snapshot.docs.map((saved) => ({ id: saved.id, ...saved.data() }));
}

export async function setDestinationSaved(uid, destination, saved) {
  const reference = doc(db, USERS, uid, "savedDestinations", destination.id);
  if (saved) {
    await setDoc(reference, {
      destinationId: destination.id,
      name: destination.name,
      region: destination.region,
      imageUrl: destination.imageUrl ?? destination.image ?? "",
      createdAt: serverTimestamp(),
    });
  } else {
    await deleteDoc(reference);
  }
}
