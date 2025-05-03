# Warehouse Management System - Backend

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)

## 📝 Description
Backend API for warehouse inventory management with:
- JWT authentication
- Role-based access control (Admin/Staff)
- Product CRUD operations
- Rate limiting for security

## ✨ Key Features
- **Authentication**:
  - Login with email/password
  - Bcrypt password hashing
  - JWT token with refresh mechanism
- **Authorization**:
  - Admin: Full CRUD access
  - Staff: Read/Create only
- **Products**:
  - Create, Read, Update, Delete products
  - Input validation
- **Security**:
  - Rate limiting (5 attempts/15min)
  - Helmet middleware
  - CORS protection

## 🚀 Tech Stack
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT + bcryptjs
- **API Docs**: Swagger/OpenAPI 3.0

## 📂 Project Structure
warehouse-backend/
├── src/
│ ├── config/ # Database config
│ │ └── db.js
│ ├── controllers/ # Business logic
│ │ ├── authController.js
│ │ └── productController.js
│ ├── middlewares/ # Custom middlewares
│ │ ├── validators/
│ │ │  └── auth.js
│ │ ├── auth.js
│ │ ├── authorization.js
│ │ ├── error.js
│ │ └── rateLimit.js
│ ├── models/ # Database models
│ │ ├── productModel.js
│ │ └── userModel.js
│ ├── routes/ # API routes
│ │ ├── authRoutes.js
│ │ └── productRoutes.js
│ ├── utils/ # Helpers
│ │ ├── auth.js
│ │ └── redis.js
│ └── app.js # Main app
├── .gitignore
├── package-lock.json
├── package.json
├── server.js
└── swagger.yaml # API documentation

## 🛠️ Installation
1. Clone repo:
   ```bash
   git clone https://github.com/RizkiWahyudie/warehouse-management.git
   cd warehouse-backend
2. npm install
3. add .env
4. run npm run dev

## 📚 API Documentation
- **Access Swagger UI after running the app:**:
  - [Login with email/password](http://localhost:5050/api-docs)
