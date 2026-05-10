# 🌍 Traveloop — Personalized Travel Planning Made Easy

> **⚠️ Work in Progress** — This project is currently under active development by our team. The current version is a demo/registration build. Full features are being rolled out soon!

---

## ✈️ About Traveloop

**Traveloop** is a personalized, intelligent, and collaborative travel planning platform that transforms the way individuals plan and experience travel. It empowers users to dream, design, and organize trips with ease — combining flexibility, interactivity, and community.

> Built for the **Odoo Hackathon** — making travel planning as exciting as the trip itself.

---

## 🚀 Features

| Screen | Description |
|---|---|
| 🔐 Login / Signup | Secure authentication with email & password |
| 🏠 Dashboard | Central hub with upcoming trips & destination inspiration |
| ➕ Create Trip | Initiate multi-city trips with dates and descriptions |
| 🗂️ My Trips | Manage all your trips — view, edit, delete |
| 🗺️ Itinerary Builder | Add stops, dates, and activities interactively |
| 📅 Itinerary View | Day-wise visual timeline of your full trip |
| 🔍 City Search | Discover cities with cost index & popularity data |
| 🎯 Activity Search | Browse activities by type, cost, and duration |
| 💰 Budget Tracker | Cost breakdowns with pie/bar charts per category |
| 🎒 Packing Checklist | Per-trip checklist categorized by clothing, docs, electronics |
| 🌐 Public Itinerary | Shareable read-only trip view with Copy Trip option |
| 👤 User Profile | Edit profile info, preferences, and saved destinations |
| 📝 Trip Notes | Add day-specific notes, reminders, and journal entries |
| 📊 Admin Dashboard *(optional)* | Analytics on users, trips, popular cities, and engagement |

---

## 🗂️ Project Structure

```
Traveloop/
│
├── frontend/
│   ├── activity_search.html     # Browse & add activities to trips
│   ├── billing.html             # Trip budget & cost breakdown
│   ├── community_tab.html       # Public itineraries & community feed
│   ├── itinerary_view.html      # Day-wise itinerary visualization
│   ├── notes.html               # Trip notes & journal
│   ├── panel.html               # Main dashboard / home screen
│   ├── register.html            # Login & signup screen
│   ├── userpanel.html           # User profile & settings
│   ├── auth.js                  # Auth logic (login, signup, session)
│   ├── notes.js                 # Notes CRUD operations
│   ├── panel.js                 # Dashboard UI logic
│   └── style.css                # Global styles
│
├── backend/
│   ├── server.js                # Express server entry point
│   ├── package.json             # Node.js dependencies
│   ├── .env                     # Environment variables (not committed)
│   │
│   ├── config/
│   │   └── db.js                # Database connection (MongoDB/MySQL)
│   │
│   ├── routes/
│   │   ├── authRoutes.js        # /api/auth — register, login, logout
│   │   ├── notesRoutes.js       # /api/notes — CRUD for trip notes
│   │   ├── tripRoutes.js        # /api/trips — trip management
│   │   └── billingRoutes.js     # /api/billing — cost & budget data
│   │
│   ├── controllers/
│   │   ├── authController.js    # Auth business logic
│   │   ├── notesController.js   # Notes business logic
│   │   ├── tripController.js    # Trip business logic
│   │   └── billingController.js # Budget business logic
│   │
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Note.js              # Note schema
│   │   ├── Trip.js              # Trip schema (stops, activities, dates)
│   │   └── Bill.js              # Billing/expense schema
│   │
│   └── middleware/
│       └── authMiddleware.js    # JWT authentication guard
│
└── README.md
```

---

## 🛠️ Tech Stack

**Frontend**
- HTML5, CSS3, Vanilla JavaScript
- Responsive design for desktop & mobile

**Backend**
- Node.js + Express.js
- RESTful API architecture
- JWT-based authentication

**Database**
- Relational database (MySQL / PostgreSQL) for structured travel data
- Supports complex queries: itineraries, stops, activities, expenses

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn
- A running database instance (MySQL / PostgreSQL / MongoDB)

### Installation

```bash
# Clone the repository
git clone https://github.com/ayushmauryacloudx/Traveloop.git
cd Traveloop

# Install backend dependencies
cd backend
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your DB credentials and JWT secret
```

### Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=traveloop
JWT_SECRET=your_jwt_secret_key
```

### Running the App

```bash
# Start the backend server
cd backend
npm start

# Open frontend
# Simply open frontend/panel.html in your browser
# or serve via a local server (e.g. Live Server in VS Code)
```

---

## 🗺️ Mockup / Design Reference

View the full UI mockup on Excalidraw:
👉 [Traveloop Mockup](https://link.excalidraw.com/l/65VNwvy7c4X/22o30WE3bE4)

---
## 👥 Team

| Role | Name |
|------|------|
| 👑 Team Leader | Ayush Maurya |
| 🧑‍💻 Member | Rahul Maurya |
| 🧑‍💻 Member | Prince Kumar |
| 🧑‍💻 Member | Priyanshu Tripathi |

Built with ❤️ for the **Odoo Hackathon** by Team Traveloop.

> 🚧 **This project is actively under development.** The current build serves as a demo and registration prototype. Core features including itinerary builder, budget tracker, and community tab are being actively developed. Stay tuned!

---

## 📄 License

This project is developed for hackathon purposes. All rights reserved by Team Traveloop.
