# API REST Documentation

## 🔌 Base URL
```
http://localhost:5000/api
```

## 📦 PRODUITS (Products)

### GET /products
Récupérer tous les produits avec filtrage optionnel.

**Query Parameters:**
- `search` (string) - Rechercher par nom ou description
- `category` (string) - Filtrer par catégorie
- `limit` (number) - Limite de résultats
- `offset` (number) - Décalage pour pagination

**Exemple Requête:**
```bash
curl http://localhost:5000/api/products?search=Menthe&limit=10

# ou avec fetch
fetch('http://localhost:5000/api/products?search=rose')
  .then(res => res.json())
  .then(data => console.log(data))
```

**Réponse (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Harmonie Douce",
    "price": 45.00,
    "description": "Un mélange relaxant",
    "ingredients": "Verveine, Hibiscus, Rose",
    "stock": 100,
    "category": "Relaxation",
    "createdAt": "2026-03-04T00:00:00Z"
  }
]
```

### GET /products/:id
Récupérer un produit spécifique par son ID.

**Exemple:**
```bash
curl http://localhost:5000/api/products/5
```

**Réponse (200 OK):**
```json
{
  "id": 5,
  "name": "Menthe Rafraîchissante",
  "price": 42.00,
  "description": "Menthe douce pour la fraîcheur",
  "ingredients": "Menthe douce, Citron, Pomme",
  "stock": 100,
  "category": "Énergisants",
  "createdAt": "2026-03-04T00:00:00Z"
}
```

**Erreurs:**
- `404 Not Found` - Produit inexistant

---

## 📋 COMMANDES (Orders)

### POST /orders
Créer une nouvelle commande.

**Body (JSON):**
```json
{
  "customer": {
    "firstName": "Ahmed",
    "lastName": "Ben Ali",
    "email": "ahmed@example.com",
    "phone": "+212 612-345-678",
    "address": "123 Rue Mohamed V",
    "city": "Marrakech",
    "zipCode": "40000",
    "country": "Maroc"
  },
  "items": [
    {
      "id": 1,
      "name": "Harmonie Douce",
      "price": 45.00,
      "quantity": 2
    },
    {
      "id": 5,
      "name": "Menthe Rafraîchissante",
      "price": 42.00,
      "quantity": 1
    }
  ],
  "subtotal": 132.00,
  "shipping": 0.00,
  "tax": 13.20,
  "total": 145.20
}
```

**Exemple avec fetch:**
```javascript
const orderData = {
  customer: {
    firstName: "Ahmed",
    lastName: "Ben Ali",
    email: "ahmed@example.com",
    phone: "+212...",
    address: "...",
    city: "Marrakech",
    zipCode: "40000",
    country: "Maroc"
  },
  items: [...],
  subtotal: 132,
  shipping: 0,
  tax: 13.20,
  total: 145.20
}

fetch('http://localhost:5000/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(orderData)
})
.then(res => res.json())
.then(data => console.log(data))
```

**Réponse (201 Created):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "pending",
  "message": "Commande créée avec succès"
}
```

**Erreurs:**
- `400 Bad Request` - Données incomplètes
- `500 Internal Server Error` - Erreur serveur

### GET /orders
Récupérer toutes les commandes (accès admin).

**Query Parameters:**
- `status` (string) - Filtrer: 'pending', 'completed', 'cancelled'
- `limit` (number) - Limite (défaut: 50)
- `offset` (number) - Décalage (défaut: 0)

**Exemple:**
```bash
curl http://localhost:5000/api/orders?status=pending&limit=20
```

**Réponse (200 OK):**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "_id": "550e8400-e29b-41d4-a716-446655440000",
    "customer": {
      "firstName": "Ahmed",
      "lastName": "Ben Ali",
      "email": "ahmed@example.com",
      "phone": "+212...",
      "address": "...",
      "city": "Marrakech",
      "zipCode": "40000",
      "country": "Maroc"
    },
    "items": [
      {
        "id": 1,
        "name": "Harmonie Douce",
        "price": 45,
        "quantity": 2
      }
    ],
    "subtotal": 90.00,
    "shipping": 30.00,
    "tax": 12.00,
    "total": 132.00,
    "status": "pending",
    "createdAt": "2026-03-04T14:30:00.000Z"
  }
]
```

### GET /orders/:id
Récupérer une commande spécifique.

**Exemple:**
```bash
curl http://localhost:5000/api/orders/550e8400-e29b-41d4-a716-446655440000
```

**Réponse (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "customer": { ... },
  "items": [ ... ],
  "total": 145.20,
  "status": "pending",
  "createdAt": "2026-03-04T14:30:00.000Z"
}
```

**Erreurs:**
- `404 Not Found` - Commande inexistante

### GET /orders/stats/dashboard
Statistiques du dashboard admin.

**Réponse (200 OK):**
```json
{
  "totalOrders": 42,
  "totalRevenue": 6234.50,
  "pendingOrders": 5
}
```

---

## 🔒 Sécurité API

**Headers par défaut (ajoutés automatiquement):**
```
Content-Security-Policy: ...
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Strict-Transport-Security: max-age=31536000
```

**Rate Limiting:**
- Limite: 1000 requêtes par IP / 15 minutes
- Erreur: `429 Too Many Requests`

**CORS Autorisés:**
- http://localhost:5173 (Frontend)
- http://localhost:3000
- http://localhost:5000

---

## 📊 Codes HTTP

| Code | Signification |
|------|--------------|
| 200  | OK - Succès |
| 201  | Created - Ressource créée |
| 400  | Bad Request - Données invalides |
| 404  | Not Found - Ressource inexistante |
| 429  | Too Many Requests - Rate limit dépassé |
| 500  | Internal Server Error - Erreur serveur |

---

## 🧪 Testing cURL

```bash
# Lister les produits
curl http://localhost:5000/api/products

# Produit spécifique
curl http://localhost:5000/api/products/1

# Créer une commande
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer": {"firstName": "Ahmed", ...},
    "items": [...],
    "total": 145.20
  }'

# Lister les commandes
curl http://localhost:5000/api/orders

# Statistiques
curl http://localhost:5000/api/orders/stats/dashboard
```

---

## 🔧 Endpoint Santé

```bash
curl http://localhost:5000/api/health
```

**Réponse:**
```json
{
  "status": "OK",
  "timestamp": "2026-03-04T14:30:00.000Z"
}
```

---

API Version: 1.0 | Support: 300+ clients simultanés | 2026
