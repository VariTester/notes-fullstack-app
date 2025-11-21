#!/bin/bash

echo "======================================"
echo " Starting MYNOTESAPP"
echo "======================================"

echo "⚠ Asegúrate de que PostgreSQL 18 esté corriendo antes de ejecutar este script."
echo "   Host: localhost"
echo "   Port: 5432"
echo "   User: notes_user"
echo "   Password: 12345678"
echo "   Database: notes_db"
echo ""

# -----------------------------
# BACKEND
# -----------------------------
echo "→ Preparing backend..."
cd backend

echo "→ Installing backend dependencies..."
npm install

echo "→ Starting NestJS backend..."
npm run start:dev &

sleep 5

# -----------------------------
# FRONTEND
# -----------------------------
echo "→ Preparing frontend..."
cd ../frontend

echo "→ Installing frontend dependencies..."
npm install

echo "→ Starting Vite frontend..."
npm run dev
