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

* Create a new trip
* Add destinations
* Set travel dates
* Create daily itineraries
* Add activities and notes
* Edit and manage trips
* Save destinations

### ⚙️ Admin CMS

* Admin dashboard
* Add destinations
* Edit destinations
* Delete destinations
* Manage categories
* View users/trips
* Featured destination management

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
│   │       ├── DestinationsCMS.jsx
│   │       └── Users.jsx
│   │
│   ├── firebase/
│   │   └── firebaseConfig.js
│   │
│   ├── hooks/
│   │
│   ├── services/
│   │   ├── authService.js
│   │   └── destinationService.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
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
  role: "user",
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
  state: "Kerala",
  city: "Munnar",
  category: "Nature",
  description: "Beautiful hill destination",
  imageUrl: "",
  featured: true,
  accessibilityInfo: ""
}
```

### Trips

```text
trips/{tripId}
```

Example:

```text
{
  userId: "USER_ID",
  title: "Kerala Trip",
  startDate: "2026-10-10",
  endDate: "2026-10-15",
  status: "upcoming",
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
  destinationId: "DESTINATION_ID",
  activity: "Visit Tea Museum",
  notes: "Morning visit",
  order: 1
}
```

---

## 🔐 Authentication Flow

```text
Register
   ↓
Firebase Authentication
   ↓
Create User Profile
   ↓
Firestore
   ↓
Login
   ↓
Protected Dashboard
   ↓
Trips / Saved Destinations / Profile
```

---

## 🛡️ Security

Firebase Security Rules should be used to control access to Firestore data.

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

Create a `.env` file:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 5. Start development server

```bash
npm run dev
```

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
├── /trips/:id
├── /profile
│
└── /admin
    ├── /admin/destinations
    ├── /admin/users
    └── /admin/trips
```

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
