@echo off
REM Script pour installer et démarrer le projet Ti'Coeur (Windows)

echo 🌿 Installation du projet Ti'Coeur...
echo.

REM Installation du Backend
echo 📦 Installation du Backend...
cd backend
call npm install
echo ✅ Backend prêt!
echo.

REM Installation du Frontend
echo 📦 Installation du Frontend...
cd ..\frontend
call npm install
echo ✅ Frontend prêt!
echo.

echo 🎉 Installation terminée!
echo.
echo Pour démarrer:
echo 1. Terminal 1 - Backend: cd backend ^&^& npm start
echo 2. Terminal 2 - Frontend: cd frontend ^&^& npm run dev
echo.
echo URLs:
echo 🌐 Frontend: http://localhost:5173
echo 🔌 Backend API: http://localhost:5000/api
pause
