# 🚀 TaskFlow – Smart Task Management Dashboard

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React.js-blue?style=for-the-badge&logo=react"/>
  <img src="https://img.shields.io/badge/Backend-Spring%20Boot-green?style=for-the-badge&logo=springboot"/>
  <img src="https://img.shields.io/badge/Database-MySQL-orange?style=for-the-badge&logo=mysql"/>
  <img src="https://img.shields.io/badge/API-REST-black?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Auth-JWT-red?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge"/>
</p>

---

## 📌 Overview

**TaskFlow** is a full-stack task management application designed to help users efficiently organize, track, and manage daily tasks. It provides a clean UI, secure authentication, and real-time updates for a seamless productivity experience.

---

## 🔥 Features

* 🔐 Secure Authentication using JWT
* 📝 Create, Read, Update, Delete (CRUD) tasks
* 📊 Dashboard with task statistics
* 📅 Task scheduling and deadline tracking
* 🔍 Filter and search tasks
* ⚡ Real-time UI updates
* 🌐 RESTful API integration
* 🎯 Clean and responsive UI

---

## 🛠️ Tech Stack

### 💻 Frontend

* ⚛️ React.js
* 🎨 CSS / Tailwind CSS
* 🔗 Axios

### ⚙️ Backend

* ☕ Java
* 🌱 Spring Boot
* 🔐 JWT Authentication
* 🔄 REST APIs

### 🗄️ Database

* 🐬 MySQL

### 🔧 Tools

* 🧰 Git & GitHub
* 📮 Postman
* 💻 VS Code

---

## 📂 Project Structure

taskflow/
│
├── backend/        # Spring Boot Backend
├── frontend/       # React Frontend
└── README.md

---

## ⚡ Getting Started

### 1️⃣ Clone the Repository

git clone https://github.com/ThirumuruganR02/taskflow.git
cd taskflow

---

### ▶️ Run Backend

cd backend
mvn spring-boot:run

📍 Backend runs at:
http://localhost:8080

---

### ▶️ Run Frontend

cd frontend
npm install
npm run dev

📍 Frontend runs at:
http://localhost:5173

---

## 🔐 Authentication Flow

User → Login → Receive JWT → Store Token → Send with API Requests

Example Header:
Authorization: Bearer <your-token>

---

## 📡 API Endpoints

### 🔑 Auth

POST /api/auth/register → Register user
POST /api/auth/login → Login & get token

---

### 📝 Tasks

GET /api/tasks → Get all tasks
POST /api/tasks → Create new task
PUT /api/tasks/{id} → Update task
DELETE /api/tasks/{id} → Delete task

---

## 📊 Key Highlights

* 🔐 Secure JWT-based authentication
* ⚡ Fast and scalable REST APIs
* 🔄 Seamless frontend-backend integration
* 📈 Improved productivity with task tracking
* 🧠 Clean architecture for scalability

---

## 🚀 Future Enhancements

* 📱 Mobile responsiveness improvements
* 🔔 Notifications & reminders
* 🏷️ Task categories & tags
* ☁️ Cloud deployment (AWS / Render)
* 📊 Advanced analytics dashboard

---

## 👨‍💻 Author

**Thirumurugan R**

📧 [thirumurugan.ramse@gmail.com](mailto:thirumurugan.ramse@gmail.com)
🔗 GitHub: https://github.com/ThirumuruganR02

---

## ⭐ Show Your Support

If you like this project:

* ⭐ Star the repo
* 🍴 Fork it
* 📢 Share it

---

## 💡 Inspiration

Built to improve productivity and demonstrate full-stack development skills with real-world application design.
