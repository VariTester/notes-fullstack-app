#!/bin/bash

echo "======================================"
echo " Iniciando MYNOTESAPP"
echo "======================================"

# -----------------------------
# BACKEND
# -----------------------------
echo "→ Preparando backend..."
cd backend

echo "→ Instalando dependencias del backend..."
npm install

echo "→ Iniciando backend NestJS..."
npm run start:dev &

# Esperar unos segundos para que el backend arranque
sleep 5

# -----------------------------
# FRONTEND
# -----------------------------
echo "→ Preparando frontend..."
cd ../frontend

echo "→ Instalando dependencias del frontend..."
npm install

echo "→ Iniciando frontend Vite..."
npm run dev
