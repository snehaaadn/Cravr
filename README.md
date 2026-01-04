# Cravr 🍔

Cravr is a full-stack food delivery application designed to provide a seamless experience for users to browse restaurants, view menus, manage their carts, and place orders. The project utilizes a modern tech stack with a responsive frontend and a secure, scalable backend.

---

## 🚀 Features

- **User Authentication**: Secure sign-up and login using JWT.
- **Restaurant Browsing**: View a list of restaurants and their details.
- **Menu & Dishes**: Browse categorized menus and detailed dish information.
- **Cart Management**: Add, remove, and update items in the shopping cart.
- **Order Processing**: Place orders and track their status.
- **Location Services**: Interactive maps for setting delivery addresses.
- **Responsive UI**: Optimized for both desktop and mobile devices.

---

## 🌐 Deployment

The application is fully deployed with separate frontend and backend hosting.

### 🔗 Live Links

LIVE DEMO: https://cravr.vercel.app/

## 🧩 Deployment Stack

- Frontend Hosting: Vercel

- Backend Hosting: Render / Railway

- Database: MongoDB Atlas

Environment Variables securely configured on hosting platforms

---

## 🌍 Location & Geocoding

Cravr uses OpenCage Geocoding API to provide accurate and user-friendly location services.

- Convert user-selected map coordinates into readable addresses

- Auto-detect delivery location

- Improve delivery accuracy and user experience

---

## 🎁 Cravr Points (Reward System)

Cravr includes a loyalty-based reward system called Cravr Points to enhance user engagement.

- Users earn points on every successful order

- Points can be redeemed for discounts on future orders

- Real-time point updates after checkout

- Encourages repeat orders and customer retention

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **GeoCoding**: OpenCage
- **Authentication**: JSON Web Tokens (JWT) & BcryptJS

---

## 📂 Project Structure

```
Cravr/
├── Backend/         # Server-side logic, API routes, and database models
└── Frontend/        # Client-side React application and assets
```

## ⚙️ Installation & Setup
Follow these steps to run the project locally. You will need to set up both the backend and frontend in separate terminals.

### 1️⃣ Backend Setup
- Navigate to the backend directory and install dependencies:

```
cd Cravr/Backend
npm install

```

- Create a .env file in the Backend directory:
```
MONGO_ATLAS_URI=your_mongodb_connection_string
PORT=6000
JWTSECRETKEY=your_secure_random_string
OPENCAGE_API_KEY=your_opencage_key

```

- Start the Server
```
npm run dev
```
- The backend server will run at:
```
http://localhost:6000

```
### 2️⃣ Frontend Setup
- Open a new terminal, navigate to the frontend directory, and install dependencies:
```
cd Cravr/Frontend
npm install

```

- Create a .env file in the Frontend directory:
```
VITE_API_BASE=http://localhost:6000/api

```

- Start the Application
```
npm run dev
```
- The frontend application will run at:
```
http://localhost:5173
(or the port specified by Vite)
```

### 🔗 API Endpoints
The backend exposes the following key API routes:

- **Auth**: /api/users (Register, Login, Profile)

- **Restaurants**: /api/restaurants (List, Details)

- **Dishes**: /api/dishes (Menu items)

- **Cart**: /api/users/cart (Manage cart items)

- **Orders**: /api/orders (Place and view orders)

## ✍️ Authors
- **Sneha**
- **Tushar**

