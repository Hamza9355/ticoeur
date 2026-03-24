# 🧪 Exemples de Requêtes API

Utilisez ces commandes pour tester votre API

## 1️⃣ Vérifier que le serveur tourne

```bash
curl http://localhost:5000/api/health
```

**Réponse attendue:**
```json
{
  "status": "OK",
  "timestamp": "2026-03-04T14:30:00.000Z"
}
```

---

## 2️⃣ Récupérer tous les produits

```bash
curl http://localhost:5000/api/products
```

**Ou avec recherche:**
```bash
curl "http://localhost:5000/api/products?search=Menthe"
```

**Réponse: Array de 20 produits**

---

## 3️⃣ Récupérer un produit spécifique

```bash
curl http://localhost:5000/api/products/1
```

**Réponse:**
```json
{
  "id": 1,
  "name": "Harmonie Douce",
  "price": 45.00,
  "description": "Un mélange relaxant",
  "ingredients": "Verveine citronnée, Hibiscus, Rose, Menthe douce",
  "stock": 100,
  "category": "Relaxation",
  "createdAt": "2026-03-04T00:00:00Z"
}
```

---

## 4️⃣ Créer une commande (POST)

```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
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
  }'
```

**Réponse (201 Created):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "pending",
  "message": "Commande créée avec succès"
}
```

---

## 5️⃣ Récupérer toutes les commandes

```bash
curl http://localhost:5000/api/orders
```

**Ou avec filtrage par statut:**
```bash
curl "http://localhost:5000/api/orders?status=pending"
```

---

## 6️⃣ Récupérer une commande spécifique

```bash
curl http://localhost:5000/api/orders/550e8400-e29b-41d4-a716-446655440000
```

---

## 7️⃣ Statistiques Dashboard

```bash
curl http://localhost:5000/api/orders/stats/dashboard
```

**Réponse:**
```json
{
  "totalOrders": 42,
  "totalRevenue": 6234.50,
  "pendingOrders": 5
}
```

---

## 🔍 Avec Headers personnalisés

```bash
curl -H "Accept: application/json" \
     -H "Content-Type: application/json" \
     https://localhost:5000/api/products
```

---

## 📊 Avec PowerShell (Windows)

```powershell
# Récupérer les produits
Invoke-WebRequest -Uri "http://localhost:5000/api/products" | ConvertFrom-Json

# Créer une commande
$body = @{
    customer = @{
        firstName = "Ahmed"
        lastNdame = "Ben Ali"
        email = "ahmed@example.com"
    }
    items = @(
        @{
            id = 1
            name = "Harmonie Douce"
            price = 45
            quantity = 2
        }
    )
    total = 99
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/orders" `
                  -Method POST `
                  -Body $body `
                  -ContentType "application/json"
```

---

## 🐍 Avec Python

```python
import requests

# Récupérer produits
response = requests.get('http://localhost:5000/api/products')
products = response.json()
print(f"Trouvé {len(products)} produits")

# Créer commande
order = {
    "customer": {
        "firstName": "Ahmed",
        "lastName": "Ben Ali",
        "email": "ahmed@example.com"
    },
    "items": [
        {"id": 1, "name": "Harmonie Douce", "price": 45, "quantity": 2}
    ],
    "total": 99
}

response = requests.post('http://localhost:5000/api/orders', json=order)
print(response.json())
```

---

## 🟦 Avec JavaScript/Node.js

```javascript
// Récupérer produits
fetch('http://localhost:5000/api/products')
  .then(res => res.json())
  .then(products => console.log(`${products.length} produits trouvés`))

// Créer commande
const orderData = {
  customer: {
    firstName: "Ahmed",
    lastName: "Ben Ali",
    email: "ahmed@example.com"
  },
  items: [
    { id: 1, name: "Harmonie Douce", price: 45, quantity: 2 }
  ],
  total: 99
}

fetch('http://localhost:5000/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(orderData)
})
.then(res => res.json())
.then(data => console.log('Commande créée:', data))
```

---

## ✅ Checklist de Test

- [ ] Health check retourne "OK"
- [ ] GET /products retourne 20 items
- [ ] GET /products/1 retourne "Harmonie Douce"
- [ ] POST /orders avec données valides
- [ ] GET /orders retourne les commandes créées
- [ ] GET /orders/:id retourne une commande spécifique
- [ ] GET /orders/stats/dashboard retourne stats

---

## 🐛 Troubleshooting

**"Connection refused"**
→ Vérifiez que le backend tourne sur port 5000

**"404 Not Found"**
→ Vérifiez l'URL de l'endpoint

**"CORS error"**
→ Vérifiez que le domain est dans la whitelist

**"Rate limit exceeded"**
→ Attendez 15 minutes ou changez le IP

---

**Heureux de tester! 🎉**
