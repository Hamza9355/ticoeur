Set-Location "c:\Users\HP\Desktop\TICOEUR\ticoeur-shop\frontend"
Write-Host "Répertoire actuel: $(Get-Location)" -ForegroundColor Cyan
Write-Host "Installation des dépendances..." -ForegroundColor Yellow
npm install
Write-Host "Démarrage du serveur Vite..." -ForegroundColor Green
npm run dev
