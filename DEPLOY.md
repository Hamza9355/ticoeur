# Guide de Déploiement - Ticoeur Shop

## 1️⃣ Déployer le Frontend sur Vercel

### Étapes :

1. Aller sur **https://vercel.com** et connectez-vous avec GitHub
2. Cliquez sur **"Add New"** → **"Project"**
3. Sélectionnez **`ticoeur`** (le repository)
4. Dans la configuration :
   - **Framework Preset** : Vite
   - **Root Directory** : laissez vide
   - **Build Command** : `cd frontend && npm run build`
   - **Output Directory** : `frontend/dist`
   - **Install Command** : `cd frontend && npm install`

5. Cliquez sur **"Environment Variables"** et ajoutez :
   ```
   VITE_API_URL = https://votre-backend-url.onrender.com/api
   ```
   *(À remplir après avoir déployé le backend)*

6. Cliquez sur **"Deploy"**

✅ Votre frontend sera disponible à : `https://ticoeur-shop.vercel.app` (ou votre nom)

---

## 2️⃣ Déployer le Backend sur Render

### Étapes :

1. Aller sur **https://render.com** et connectez-vous avec GitHub
2. Cliquez sur **"New +"** → **"Web Service"**
3. Sélectionnez votre repository GitHub `ticoeur`
4. Configurez :
   - **Name** : `ticoeur-backend`
   - **Environment** : Node
   - **Build Command** : `cd backend && npm install`
   - **Start Command** : `cd backend && npm start`
   - **Region** : Europe (fr) ou USA

5. Cliquez sur **"Environment"** et ajoutez :
   ```
   PORT = 8080
   NODE_ENV = production
   DATABASE_PATH = /var/data/ticoeur.db
   FRONTEND_URL = https://your-vercel-domain.vercel.app
   ```

6. Créez un **"Disk"** (persistent volume) :
   - **Name** : `ticoeur-data`
   - **Mount Path** : `/var/data`
   - **Size** : 1 GB

7. Cliquez sur **"Create Web Service"**

✅ Votre backend sera disponible à : `https://ticoeur-backend.onrender.com`

---

## 3️⃣ Mettre à Jour les Variables d'Environnement

### Sur Vercel (Frontend) :

Retournez sur Vercel → Votre projet → Settings → Environment Variables

Mettez à jour :
```
VITE_API_URL = https://ticoeur-backend.onrender.com/api
```

Puis redéployez (cliquez sur **"Redeploy"**)

### Sur Render (Backend) :

Sur Render → Votre service → Environment

Mettez à jour :
```
FRONTEND_URL = https://your-project.vercel.app
```

Redéployez (les changements se redéploient automatiquement)

---

## 4️⃣ Vérifier le Déploiement

✅ **Frontend** : Visitez https://your-project.vercel.app
✅ **Backend** : Visitez https://ticoeur-backend.onrender.com/api/products

Si vous voyez du JSON avec les produits, c'est bon ! 🎉

---

## Problèmes Courants

### ❌ Erreur CORS
Si vous avez une erreur CORS, vérifiez que :
- `FRONTEND_URL` est défini correctement sur Render
- `VITE_API_URL` pointe vers la bonne URL du backend

### ❌ Erreur 500 sur le backend
Vérifiez les logs sur Render :
```bash
Render → Logs → View logs
```

### ❌ La base de données n'a pas de données
Render peut redémarrer et perdre les données en temps réel. Vous devez :
1. Utiliser PostgreSQL au lieu de SQLite (recommandé)
2. Ou créer un script d'initialisation de la DB

---

## 🚀 Prochaines Étapes

- Optionnel : Configurer un domaine personnalisé
- Ajouter une vraie base de données (PostgreSQL)
- Configurer les notifications email
- Ajouter SSL/HTTPS (automatique avec Vercel & Render)
