# **MYNOTESAPP — Full Stack Notes Application**

Full Stack application developed as a solution for the **Ensolvers Full Stack Implementation Exercise**.
It provides full note management with archiving, categorization, and filtering.

---

## 🚀 **Overview**

The application is split into two independent modules:

* **Backend:** REST API built with NestJS + TypeORM + PostgreSQL
* **Frontend:** SPA developed with React + Vite

It follows the required layered architecture, real database persistence, and strict separation of backend and frontend as specified in the assignment.

---

## 📦 **Technologies Used**

### 🖥 Backend

* NestJS
* Node.js
* TypeORM
* PostgreSQL
* Layered Architecture:

  * Controllers
  * Services
  * Entities
  * DTOs
  * Modules

### 🌐 Frontend

* React (Vite)
* JavaScript ES6+
* Fetch API for backend communication

---

## 🗄 **Database Setup**

### **Engine:** PostgreSQL 18

The backend uses the following default configuration:

| Parameter | Value        |
| --------- | ------------ |
| Host      | `localhost`  |
| Port      | `5432`       |
| Database  | `notes_db`   |
| User      | `notes_user` |
| Password  | `12345678`   |

### ✔ Automatic Schema Creation

The database schema is created automatically by TypeORM:

```ts
synchronize: true
```

(No migrations are used.)

---

## 🛠 **Initial Database Creation (Required)**

Since the application is designed for Windows development, PostgreSQL **must already be installed and running** before executing the project.

Create the database and user manually:

```sql
CREATE USER notes_user WITH PASSWORD '12345678';
CREATE DATABASE notes_db OWNER notes_user;
```

---

## ▶️ **How to Run the Application**

From the **project root**, execute:

```bash
./run.sh
```

This script automatically:

1. Installs backend dependencies
2. Starts the NestJS backend (`npm run start:dev`)
3. Installs frontend dependencies
4. Starts the Vite frontend (`npm run dev`)

### ⚠ Important

`run.sh` **does NOT start PostgreSQL** on Windows.
PostgreSQL must be running beforehand.

---

## 📁 **Project Structure**

```
MYNOTESAPP/
├── backend/
│   ├── src/
│   │   ├── notes/
│   │   ├── categories/
│   │   ├── app.module.ts
│   │   └── ...
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── api/
│   └── package.json
│
├── run.sh
└── README.md
```

---

## 📝 **Features**

### 🟩 Phase 1 — Required

* Create notes
* Edit notes
* Delete notes
* Archive / unarchive notes
* List active notes
* List archived notes

### 🟦 Phase 2 — Extra Points

* Create categories
* Assign categories to notes
* Filter notes by category

---

## 🔐 **Authentication**

Login is **not implemented**, as it was not required.
It can be added if needed.

---

## 🌍 **Deployment**

Not deployed.
A public URL can be added later (Vercel / Render / Railway / etc.).

---

## ✔ **Additional Notes**

* Requires **Node 18+**
* Requires **PostgreSQL 18** installed and running
* No migrations necessary
* Script compatible with Windows (Git Bash)
* For Linux/macOS, PostgreSQL must also be running beforehand
