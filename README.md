# 🌍 TravelHub – React Firebase Travel WebApp

A modern and responsive travel management WebApp built as a professional student project using **React, Firebase, and Animate UI**.

TravelHub allows users to explore destinations, create travel plans, manage itineraries, save destinations, and use a personalized dashboard. An Admin CMS provides tools to manage travel destinations and content.

---

## ✨ Features

### 🌎 Travel Discovery

* Explore travel destinations
* Destination details
* Search destinations
* Category filtering
* Featured destinations
* Travel information and tips
* Accessibility information

### 🔐 Authentication

* User registration
* User login
* Logout
* Firebase Authentication
* Protected user dashboard
* User profile

### ✈️ Trip Planner

* Create, edit, and delete personal trips
* Add published or custom destinations to a trip
* Set travel dates and trip notes
* Create, edit, and delete dated itinerary activities
* Save destinations to a personal profile

### ⚙️ Admin CMS

* Admin dashboard with Firestore record counts
* Add, edit, publish, and delete destinations
* Manage destination categories
* Set destination categories, featured status, image, and accessibility details
* View registered users and trips

### 🧭 Separate Portals

TravelHub provides two role-aware workspaces behind Firebase Authentication:

* **Traveler portal** (`/dashboard`) includes a personal trip summary, upcoming
  itinerary links, saved-destination count, and shortcuts to discovery and trip
  planning. Its sidebar links to trips and saved destinations.
* **Admin CMS portal** (`/admin`) includes destination/category/user/trip
  summary counts and shortcuts to the admin workspaces. The **Trips & Users**
  page (`/admin/trips`) has tabs for student trips and registered accounts,
  plus read-only itinerary inspection. Its sidebar links to CMS overview,
  destination management, and Trips & Users.
* Both portals share a top bar with the signed-in profile and role, while
  the account menu provides explicit portal switching. Admin CMS is only
  enabled for profiles marked `role: "admin"`; other users see it as staff-only.
  Firestore security rules must separately enforce data access.

### ✨ Modern UI

* React component-based architecture
* Responsive design
* Tailwind CSS
* Animate UI components
* Motion-based interactions
* Loading states
* Dialogs and notifications
* Mobile-friendly navigation

---

## 🛠️ Tech Stack

| Technology              | Purpose                       |
| ----------------------- | ----------------------------- |
| React                   | Frontend WebApp               |
| Vite                    | Development & build tool      |
| React Router            | Page navigation               |
| Firebase Authentication | Login & registration          |
| Cloud Firestore         | Database                      |
| Firebase Storage        | Image/file storage (optional) |
| Tailwind CSS            | UI styling                    |
| Animate UI              | Animated React components     |
| Motion                  | UI animations                 |
| Git & GitHub            | Version control               |

---

## 📁 Project Structure

```text
travelhub/
│
├── public/
│   └── assets/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── PortalLayout.jsx
│   │   ├── DestinationCard.jsx
│   │   ├── SearchBar.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Destinations.jsx
│   │   ├── DestinationDetails.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Trips.jsx
│   │   ├── Itinerary.jsx
│   │   ├── Profile.jsx
│   │   │
│   │   └── admin/
│   │       ├── AdminDashboard.jsx
│   │       ├── TripsUsers.jsx
│   │       ├── TripDetails.jsx
│   │       ├── DestinationsCMS.jsx
│   │       └── Users.jsx
│   │
│   ├── firebase/
│   │   └── firebaseConfig.js
│   │
│   ├── hooks/
│   │   └── useAuth.js
│   │
│   ├── services/
│   │   ├── authService.js
│   │   └── destinationService.js
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .gitignore
├── package.json
└── README.md
```

---

## 🔥 Firebase Database

### Users

```text
users/{uid}
```

Example:

```text
{
  name: "Student Name",
  email: "student@example.com",
  photoURL: "",
  role: "student",
  createdAt: timestamp
}
```

### Destinations

```text
destinations/{destinationId}
```

Example:

```text
{
  name: "Munnar",
  slug: "munnar",
  region: "Kerala",
  categories: ["Nature", "Hill"],
  description: "Tea gardens and misty viewpoints.",
  imageUrl: "https://example.com/munnar.jpg",
  bestSeason: "Sep to Mar",
  accessibility: ["wheelchair", "parking"],
  featured: false,
  published: true
}
```

### Trips

```text
trips/{tripId}
```

Example:

```text
{
  ownerId: "USER_ID",
  title: "Kerala Trip",
  destinationNames: ["Munnar"],
  startDate: "2026-10-10",
  endDate: "2026-10-15",
  notes: "",
  createdAt: timestamp
}
```

### Itinerary

```text
trips/{tripId}/itinerary/{itemId}
```

Example:

```text
{
  date: "2026-10-11",
  activity: "Visit Tea Museum",
  notes: "Morning visit",
  createdAt: timestamp
}
```

### Destination and category documents

Destination records are stored in `destinations/{destinationId}`. The CMS uses
these fields:

```text
{
  name: "Munnar",
  slug: "munnar",
  region: "Kerala",
  categories: ["Nature", "Hill"],
  description: "Tea gardens and misty viewpoints.",
  imageUrl: "https://example.com/munnar.jpg",
  bestSeason: "Sep to Mar",
  accessibility: ["wheelchair", "parking"],
  featured: false,
  published: true
}
```

Category documents are stored in `categories/{categoryId}` with a `name` field.
Accessibility values accepted by the frontend are `wheelchair`,
`accessibleToilets`, `visualSignage`, `communicationSupport`, and `parking`.

User-created trips are stored in `trips/{tripId}` and contain an `ownerId`,
`title`, `destinationNames`, `startDate`, `endDate`, and `notes`. Daily activity
documents are stored below `trips/{tripId}/itinerary/{itemId}`. Saved places are
stored below `users/{uid}/savedDestinations/{destinationId}`.

---

## 🔐 Authentication Flow

```text
Register as Student / Traveler
   ↓
Firebase Authentication
   ↓
Create Firestore Profile (role: "student")
   ↓
Sign in and choose platform role
   ├── Student / Traveler ──→ Traveler Portal
   ├── Faculty / Admin ─────→ CMS Portal (authorized staff only)
   └── CMS Admin ───────────→ CMS Portal (authorized staff only)
```

The role choice at sign-in selects the intended portal; it does not grant
permissions. Student accounts are checked against their Firestore profile.
Faculty/Admin and CMS Admin currently use the same `role: "admin"` profile and
permissions. Admin profiles must be provisioned by an administrator. A role
mismatch is rejected and the session is signed out.

---

## 🛡️ Security

Firebase Security Rules should be used to control access to Firestore data.
This project does not include Firebase rules or CLI deployment configuration.
Configure and test production rules in the Firebase Console before enabling
client-side writes. The UI's protected routes are not a replacement for database
security rules.

Example concept:

```text
Public
 ├── Read destinations
 │
Authenticated User
 ├── Read own profile
 ├── Create own trips
 ├── Update own trips
 └── Manage own saved destinations
 │
Admin
 ├── Create destinations
 ├── Update destinations
 ├── Delete destinations
 └── Manage CMS content
```

> Never place Firebase Admin SDK credentials or service-account private keys inside the React frontend.

---

## 🎨 Animate UI

Animate UI is used to create modern animated React interfaces.

Potential components/interactions:

* Animated navigation
* Destination card animations
* Dialogs
* Accordions
* Tabs
* Loading animations
* Page transitions
* Dashboard cards
* Toast notifications
* Hover/focus interactions

Animations should improve usability without making important actions difficult to access.

---

## 📱 Responsive Design

TravelHub is designed for:

* 💻 Desktop
* 🖥️ Large screens
* 📱 Mobile
* 📲 Tablet

Mobile navigation changes to a compact menu and destination cards become a single-column layout.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/travelhub.git
```

### 2. Open the project

```bash
cd travelhub
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure Firebase

Create a Firebase project and enable:

* Authentication
* Email/Password authentication
* Cloud Firestore
* Storage (optional)

Configure the Firebase web app values in
[`travelhub/src/firebase/firebaseConfig.js`](./travelhub/src/firebase/firebaseConfig.js).
These are client-side Firebase settings; never put Firebase Admin SDK credentials
or service-account private keys in the frontend.

New registrations automatically create a `users/{uid}` Firestore profile with
`role: "student"`. Existing profiles with `role: "user"` continue to work as
traveler accounts. Sign-in reads the signed-in user's profile, so Firestore rules
must allow an authenticated user to read their own `users/{uid}` document.

To grant the first Faculty/Admin or CMS Admin access:

1. Register a normal account in the app.
2. Find that account's UID in Firebase Authentication.
3. In the Firestore console, create or update `users/{uid}` for that account and
   set `role` to `admin` (also include its `name` and `email` fields).
4. Configure Firestore security rules to limit that profile update to a trusted
   administrator; never allow users to assign themselves the `admin` role.

Do not let the browser client assign admin roles. Admin screens check the
Firestore user profile; configure database security rules separately to enforce
the same permissions on Firestore requests.

### 5. Start the development server

```bash
npm run dev
```

Run these commands from the `travelhub/` directory.

Open the local development URL shown by Vite.

---

## 📌 Main Routes

```text
/
├── /destinations
├── /destinations/:id
├── /login
├── /register
├── /dashboard
├── /trips
├── /trips/:tripId
├── /profile
│
├── /admin
├── /admin/destinations
├── /admin/trips
├── /admin/users
└── /admin/trips/:tripId
```

The traveler and CMS routes use separate portal sidebars and dashboards.
`/admin/trips/:tripId` is a read-only itinerary view for CMS staff. The
`/admin/users` route provides the full registered-user list.

---

## 🧩 Project Wireframe

```text
HOME
 │
 ├── Search Destinations
 │
 ├── Featured Destinations
 │
 └── Categories
       │
       ▼
DESTINATION
 │
 ├── Details
 ├── Travel Information
 ├── Accessibility
 ├── Save
 └── Add to Trip
       │
       ▼
LOGIN / REGISTER
       │
       ▼
USER DASHBOARD
 │
 ├── My Trips
 ├── Saved Destinations
 ├── Create Trip
 ├── Itinerary
 └── Profile
```

---

## 🎯 Learning Objectives

This project helps students learn:

1. React fundamentals
2. Component-based development
3. React Router
4. Firebase Authentication
5. Firestore database
6. CRUD operations
7. Protected routes
8. CMS development
9. Responsive UI design
10. Modern animation
11. Git & GitHub workflow
12. Deployment
13. Accessibility-aware development
14. Basic application security

---

## 📅 Development Roadmap

### Week 1 — UI & React

* Create wireframes
* Build React structure
* Create reusable components
* Implement routing
* Build responsive layouts

### Week 2 — Firebase

* Create Firebase project
* Configure Authentication
* Build Login/Register
* Create Firestore collections
* Connect React with Firebase

### Week 3 — WebApp & CMS

* Destination CRUD
* User Dashboard
* Trip Planner
* Itinerary management
* Search and filtering
* Protected routes

### Week 4 — Final Development

* Animate UI
* Mobile testing
* Accessibility testing
* Firebase Security Rules
* Error handling
* Deployment
* GitHub documentation
* Final presentation

---

## 🌟 Future Improvements

Possible future features:

* Google Maps integration
* Weather information
* AI travel recommendations
* Hotel search
* Transport information
* Expense/budget tracker
* Multi-language support
* Offline/PWA support
* Push notifications
* Collaborative group trips
* Reviews and ratings
* Advanced accessibility features

---

## 📚 Official Documentation

* Animate UI: https://animate-ui.com/docs
* Firebase: https://firebase.google.com/docs
* Firebase Authentication: https://firebase.google.com/docs/auth
* Cloud Firestore: https://firebase.google.com/docs/firestore
* React: https://react.dev/
* Vite: https://vite.dev/
* Tailwind CSS: https://tailwindcss.com/

---

## 👨‍💻 Student Project

**Project:** TravelHub
**Type:** Professional Travel WebApp
**Frontend:** React
**Database:** Firebase Firestore
**Authentication:** Firebase Authentication
**UI:** Tailwind CSS + Animate UI
**Version Control:** GitHub

---

## 📄 License

This project is intended for educational and student project purposes. Add an appropriate open-source license if you plan to publish or distribute the code.
