# **MYNOTESAPP — Full Stack Notes Application**

Full Stack application developed as a solution for the **Ensolvers Full Stack Implementation Exercise**.
It provides note management with support for archiving, categorization, and filtering.

---

## 🚀 **Overview**

The application is divided into two independent modules:

* **Backend:** REST API built with NestJS + TypeORM + PostgreSQL
* **Frontend:** SPA developed with React + Vite

The project follows the required layered architecture, real persistence, and frontend/backend separation as requested in the assignment.

---

## 📦 **Technologies Used**

### 🖥 Backend

* NestJS
* Node.js
* TypeORM (ORM)
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

## 🗄 **Database**

**Engine:** PostgreSQL
**Default configuration:**

| Parameter | Value        |
| --------- | ------------ |
| Host      | localhost    |
| Port      | 5432         |
| Database  | `notes_db`   |
| User      | `notes_user` |
| Password  | `12345678`   |

The schema is generated automatically when the backend starts using:

```ts
synchronize: true
```

*(Migrations are not used.)*

---

## ▶️ **How to Run the Application**

From the **project root**, execute:

```bash
./run.sh
```

This script automatically performs:

1. Backend dependency installation
2. Startup of the NestJS server
3. Frontend dependency installation
4. Startup of the Vite development server

No additional configuration is required.

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
* View active notes
* View archived notes

### 🟦 Phase 2 — Extra Points

* Create categories
* Assign categories to notes
* Filter notes by category

---

## 🔐 **Login**

Not implemented in this version.
*(Can be added if required.)*

---

## 🌍 **Live Deploy**

Not applicable.
*(A URL can be added if deployed on Heroku / Vercel.)*

---

## ✔ **Additional Notes**

* Requires **Node 18+**
* Requires **PostgreSQL 15+**
* No migrations used — TypeORM handles schema creation
* Compatible with Linux / macOS through the `run.sh` script
