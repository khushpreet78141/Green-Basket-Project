# 🛒 Green Basket – Full Stack Grocery E-Commerce Application

Green Basket is a full-stack grocery shopping web application built using **React + Redux (Frontend)** and **Node.js + Express + MongoDB (Backend)**.

The platform allows users to browse products, manage cart, place orders, and enables admins to manage inventory through a protected dashboard.

---

## 🚀 Features

### 👤 User Features

- User Signup & Login (JWT Authentication)
- Persistent login session
- Browse products by categories (Fruits, Vegetables, Snacks, Beverages)
- Search products by name
- View detailed product page
- Add products to cart
- Increase / decrease product quantity
- Remove items from cart
- Enter shipping address before placing an order
- Place order with demo payment gateway
- View order history
- View individual order details

---

### 🧑‍💼 Admin Features

- Role-based access control (Admin protected routes)
- Add new products
- Edit existing products
- Delete products
- Manage product stock
- View all orders

---

## ⚙️ Technical Highlights

- RESTful API architecture
- Separate frontend and backend structure
- JWT-based authentication
- Middleware-based authorization
- Redux Toolkit for global state management
- MongoDB database integration
- Order management system
- Protected routes (frontend + backend)

---

## 🧰 Tech Stack

### Frontend
- React.js
- Redux Toolkit
- React Router
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)

---

**Backend setup**

- cd Green-Basket-Backend
- node server.js

**Frontend setup**
- cd Green-Basket-Frontend
- npm run dev

**create .env file**
MONGO_URI=your_mongodb_connection_string
PORT=3000






