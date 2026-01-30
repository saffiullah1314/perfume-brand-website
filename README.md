# ROOHRA Fragrances 💎 | Luxury Bespoke Perfumery
**A Premium MERN Stack E-Commerce & Bespoke Fragrance Solution**

[![Live Site](https://img.shields.io/badge/Live-Demo-gold?style=for-the-badge&logo=vercel)](https://roohra-fragrances.vercel.app/)

Roohra is a high-end fragrance platform built with the MERN stack, offering a seamless shopping experience for premium perfumes and a unique "Bespoke" service where users can request custom-made scents. It features a robust Admin Dashboard for order management, product inventory, and inquiry handling.

---

## 🚀 Live Demo
**Website:** [https://roohra-fragrances.vercel.app/](https://roohra-fragrances.vercel.app/)  
**Admin Access:** [Available upon request for recruiters]

---

## ✨ Key Features

### 🛍️ Client Side (Customer Experience)
- **Luxury UI/UX:** Built with Framer Motion for smooth, high-end editorial animations.
- **Dynamic Shop:** Real-time filtering by category (Men, Women, Unisex) and sub-category.
- **Bespoke Fragrance Inquiry:** A dedicated portal for users to request custom scents (Target brand, notes, intensity, etc.).
- **Live Order Tracking:** Real-time status updates using a unique Tracking ID.
- **Shopping Cart:** Persistent cart management with automatic total calculations.
- **Contact System:** Integrated with EmailJS for direct customer inquiries.

### 🛠️ Admin Side (Management Portal)
- **Order Dispatch Center:** Manage orders, update delivery statuses (Packed, Shipped, Delivered), and delete records.
- **Inventory Management:** Full CRUD operations for products, including Cloudinary-powered multi-image uploads.
- **Custom Request Dashboard:** A specialized section to review and respond to bespoke fragrance inquiries.
- **Gmail Integration:** One-click "Notify via Gmail" feature to send professional quotes and order updates directly to customers.

---

## 🛠️ Tech Stack

### Frontend
- **React.js & Vite:** Core framework for speed and modularity.
- **Tailwind CSS:** Professional utility-first styling.
- **Framer Motion:** High-end animations and transitions.
- **React Router DOM:** Navigation and "Scroll to Top" logic.
- **Context API:** Global state management for Cart and User data.

### Backend
- **Node.js & Express:** Scalable server architecture.
- **MongoDB & Mongoose:** NoSQL database for flexible data modeling.
- **Cloudinary:** Cloud-based image management for high-res perfume visuals.
- **JSON Web Token (JWT):** Secure admin authentication.
- **CORS:** Cross-Origin Resource Sharing for secure API communication.

---

## 📂 Project Structure

```text
roohra-fragrances/
├── client/           # Customer Frontend (React + Vite)
├── admin/            # Admin Dashboard (React + Vite)
├── server/           # Backend API (Node + Express)
│   ├── models/       # Mongoose Schemas (Orders, Products, Custom)
│   ├── controllers/  # Business Logic
│   ├── routes/       # Express Endpoints
│   └── middleware/   # Auth & Validation
└── README.md
