# 🔧 DÉPANNAGE & SOLUTIONS

Guide de résolution des problèmes courants

---

## 🚨 PROBLÈME: "Port 5000 déjà utilisé"

### Erreur:
```
Error: listen EADDRINUSE 0.0.0.0:5000
```

### Solutions:

**Option 1: Changer le port**
```bash
# Éditez backend/.env
PORT=5001

# Puis relancez
npm start
```

**Option 2: Arrêter le processus existant**

Windows:
```bash
netstat -ano | findstr :5000
taskkill /PID XXXX /F
```

Linux/Mac:
```bash
lsof -i :5000
kill -9 PID
```

---

## 🚨 PROBLÈME: "Module not found"

### Erreur:
```
Cannot find module 'react' / Cannot find module 'express'
```

### Solution:

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

Si ça persiste:
```bash
# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
```

---

## 🚨 PROBLÈME: "CORS Error"

### Erreur:
```
Access to XMLHttpRequest blocked by CORS policy
```

### Causes:
- Backend non accessible
- Frontend et backend sur ports différents
- CORS pas configuré

### Solutions:

1. Vérifiez que le backend tourne:
```bash
curl http://localhost:5000/api/health
```

2. Vérifiez le port dans `.env`:
```
Frontend: http://localhost:5173
Backend: http://localhost:5000
```

3. Vérifiez CORS dans `backend/src/server.js`:
```javascript
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}))
```

Ajoutez votre URL si besoin

---

## 🚨 PROBLÈME: "Produits ne s'affichent pas"

### Solution 1: Vérifier la BD
```bash
# Testez l'API directement
curl http://localhost:5000/api/products
```

Si vide: la BD n'a pas été créée

### Solution 2: Recréer la BD
```bash
# Supprimez l'ancien
rm ticoeur.db (ou delete ticoeur.db)

# Relancez le backend
npm start
```

La BD se recréera automatiquement

### Solution 3: Vérifier la route API
Ouvrez `frontend/.env`:
```
VITE_API_URL=http://localhost:5000/api
```

Assurez-vous que c'est correct.

---

## 🚨 PROBLÈME: "Base de données vide"

### Cause:
`backend/src/db/init.js` ne s'est pas complété

### Solution:

```bash
# Supprimez la BD
rm ticoeur.db

# Arrêtez le backend (Ctrl+C)

# Relancez
npm start
```

Vous devriez voir au démarrage:
```
✅ 20 produits ont été insérés
✅ Base de données initialisée
```

Si ce n'est pas affiché, il y a un problème d'import

---

## 🚨 PROBLÈME: "Frontend ne charge pas"

### Erreur:
```
Failed to fetch http://localhost:5173
```

### Solutions:

1. Vérifiez que Vite tourne:
```bash
cd frontend
npm run dev
```

Vous devriez voir:
```
VITE v5.0.0 ready in 500 ms
➜ Local: http://localhost:5173/
```

2. Essayez un autre port:
Éditez `frontend/vite.config.js`:
```javascript
server: {
  port: 3000  // Changez ici
}
```

3. Nettoyez le cache navigateur:
- Ctrl+Shift+Del (ou Cmd+Shift+Del)
- Purger cache
- Recharger

---

## 🚨 PROBLÈME: "Images ne s'affichent pas"

### Cause:
Les images ne sont pas au bon endroit

### Solution:

Placez les fichiers ici:
```
frontend/public/assets/images/
├── logo.svg (ou .jpg)
├── product1.jpg
├── product2.jpg
└── ...
```

Puis utilisez dans le code:
```javascript
<img src="/assets/images/logo.svg" alt="Logo" />
```

Notez le `/` au début!

---

## 🚨 PROBLÈME: "Vidéo ne s'affiche pas"

### Cause:
Vidéo au mauvais endroit ou pas elle ne se charge

### Solution:

1. Vérifiez l'emplacmeent:
```
frontend/public/assets/videos/
└── pub.mp4
```

2. Chemin correct dans le code:
```javascript
<video src="/assets/videos/pub.mp4" />
```

3. Vérifiez le format:
- MP4 est le plus compatible
- Assurez-vous qu'elle est valide

4. Test de streaming:
Visitez directement:
```
http://localhost:5173/assets/videos/pub.mp4
```

Si elle ne s'affiche pas, elle n'est pas au bon endroit

---

## 🚨 PROBLÈME: "Panier vide après rechargement"

### Cause:
localStorage n'est pas activé

### Solution:

Ouvrez la console (F12) et vérifiez:
```javascript
// La commande devrait retourner un objet
localStorage
```

Si c'est vide, le localStorage n'est pas dispo.

Options:
1. Activez le localStorage dans les paramètres
2. Utilisez un autre navigateur
3. Pas en incognito

---

## 🚨 PROBLÈME: "Erreur 429 - Too Many Requests"

### Cause:
Vous avez dépassé le rate limit (1000 req/15min par IP)

### Solution:

**Option 1: Attendre**
Attendez 15 minutes

**Option 2: Changer le limit**
Éditez `backend/src/server.js`:
```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10000  // Augmentez ce nombre
})
```

---

## 🚨 PROBLÈME: "Commande ne s'enregistre pas"

### Causes possibles:

1. **Backend non accessible**
```bash
curl http://localhost:5000/api/orders
```

2. **Données incomplètes**
Vérifiez que le formulaire est bien rempli

3. **BD pleine** (improbable)
Vérifiez l'espace disque

### Solution:

Vérifiez les logs du backend (Terminal):
```
[2026-03-04 14:30] POST /api/orders
Error: ... (détail erreur)
```

---

## 🚨 PROBLÈME: "Site lent"

### Optimisations:

1. **Cache le navigateur:**
```bash
# Frontend
npm run build
# Utilisez les fichiers de dist/
```

2. **Compression:**
Le backend compresse déjà tout

3. **Images optimisées:**
Convertissez en WebP si possible

4. **Vérifiez la RAM:**
```bash
# Vue du processus Node
ps aux | grep node
```

---

## ✅ CHECKLIST DE DÉPANNAGE

- [ ] Vérifiez que npm est installé: `npm -v`
- [ ] Vérifiez que Node 18+: `node --version`
- [ ] Ports 5000 et 5173 sont libres
- [ ] Pas d'antivirus bloquant les ports
- [ ] Connexion internet active
- [ ] Pas d'erreur TypeScript (compilateurs)
- [ ] Pas de cache navigateur conflit
- [ ] Fichiers de assets aux bons emplacements

---

## 🔍 COMMANDES DE DEBUG

### Voir les processus Node:
```bash
# Windows
tasklist | find "node"

# Linux/Mac
ps aux | grep node
```

### Voir les logs en détail:
```bash
# Backend
npm start 2>&1 | tee logs.txt

# Puis consultez logs.txt
```

### Tester l'API directement:
```bash
curl -v http://localhost:5000/api/health

# Voir tous les headers de réponse
```

### Vérifier la BD:
```bash
sqlite3 ticoeur.db

# Dans sqlite3:
SELECT COUNT(*) FROM products;
SELECT * FROM orders;

# Quittez avec .quit
```

---

## 📞 SI TOUT ÉCHOUE

1. **Réinstall complet:**
```bash
# Supprimez node_modules
rm -rf node_modules
rm -rf backend/node_modules
rm -rf frontend/node_modules

# Réinstallez
npm install # frontier
cd backend && npm install
cd ../frontend && npm install

# Relancez everything
```

2. **Nettoyer la BD:**
```bash
rm ticoeur.db
# Relancez backend pour la recréer
```

3. **Cache navigateur:**
- Ctrl+Shift+Del
- Sélectionner "All time"
- Purger

4. **Utiliser un autre navigateur**
Pour éliminer les conflits

---

## 🎯 CONSEIL FINAL

Si vous avez une erreur:

1. **Lisez le message complet** (scroll possible)
2. **Cherchez le mot-clé** (port, module, CORS,etc)
3. **Consultez ce guide** (Ctrl+F)
4. **Google l'error** (copier-coller direct)
5. **Stack Overflow** ou GitHub issues

99% des problèmes ont une solution en ligne!

---

**Document créé: 2026**
**Dernière mise à jour: Maintenant**

Besoin d'aide? Consultez [INDEX.md](INDEX.md) pour accéder à l'ensemble de la documentation.
