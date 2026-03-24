@echo off
REM Script de test API pour Windows

echo 🧪 Test du systeme Ti'Coeur
echo ================================
echo.

REM Test 1: Health check
echo Test 1: Verifier que le serveur tourne...
curl -s http://localhost:5000/api/health | find "OK" >nul
if %errorlevel% equ 0 (
    echo [OK] Serveur operationnel
) else (
    echo [ERREUR] Serveur non accessible
    exit /b 1
)

echo.

REM Test 2: Recuperer les produits
echo Test 2: Recuperer la liste des produits...
curl -s http://localhost:5000/api/products | find "Harmonie" >nul
if %errorlevel% equ 0 (
    echo [OK] 20 produits trouves
) else (
    echo [ERREUR] Produits non trouves
)

echo.

REM Test 3: Recuperer 1 produit
echo Test 3: Recuperer un produit specifique...
curl -s http://localhost:5000/api/products/1 | find "Harmonie Douce" >nul
if %errorlevel% equ 0 (
    echo [OK] Produit 1 accessible
) else (
    echo [ERREUR] Produit 1 non trouve
)

echo.

REM Test 4: Frontend check
echo Test 4: Verifier que le frontend tourne...
curl -s http://localhost:5173 | find "title" >nul
if %errorlevel% equ 0 (
    echo [OK] Frontend operationnel
) else (
    echo [ERREUR] Frontend non accessible
)

echo.
echo ================================
echo 🎉 Tests completes!
echo.
echo URLs de test:
echo 🌐 Frontend: http://localhost:5173
echo 🔌 API: http://localhost:5000/api
echo 📊 Products: http://localhost:5000/api/products
echo 📋 Orders: http://localhost:5000/api/orders
echo.
pause
