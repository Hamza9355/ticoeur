# 🗄️ Architecture Base de Données

## Schéma SQLite

### Table: `products`
```sql
CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  price REAL NOT NULL,
  image TEXT,
  ingredients TEXT,
  stock INTEGER DEFAULT 100,
  category TEXT,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
)
```

**Exemple d'enregistrement:**
```json
{
  "id": 1,
  "name": "Harmonie Douce",
  "description": "Un mélange relaxant de verveine et hibiscus",
  "price": 45.00,
  "image": "https://...",
  "ingredients": "Verveine citronnée, Hibiscus, Rose, Menthe douce",
  "stock": 100,
  "category": "Relaxation",
  "createdAt": "2026-03-04T00:00:00.000Z"
}
```

### Table: `orders`
```sql
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  customerFirstName TEXT NOT NULL,
  customerLastName TEXT NOT NULL,
  customerEmail TEXT NOT NULL,
  customerPhone TEXT,
  customerAddress TEXT,
  customerCity TEXT,
  customerZipCode TEXT,
  customerCountry TEXT,
  subtotal REAL NOT NULL,
  shipping REAL DEFAULT 0,
  tax REAL DEFAULT 0,
  total REAL NOT NULL,
  status TEXT DEFAULT 'pending',
  items TEXT NOT NULL,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
)
```

**Exemple d'enregistrement:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "customerFirstName": "Ahmed",
  "customerLastName": "Ben Ali",
  "customerEmail": "ahmed@example.com",
  "customerPhone": "+212 612-345-678",
  "customerAddress": "123 Rue Mohamed V",
  "customerCity": "Marrakech",
  "customerZipCode": "40000",
  "customerCountry": "Maroc",
  "subtotal": 135.00,
  "shipping": 0.00,
  "tax": 13.50,
  "total": 148.50,
  "status": "pending",
  "items": "[{'id': 1, 'name': 'Harmonie Douce', 'price': 45, 'quantity': 3}]",
  "createdAt": "2026-03-04T14:30:00.000Z",
  "updatedAt": "2026-03-04T14:30:00.000Z"
}
```

## 📊 Relations & Contraintes

- **Products**: Pas de limite de stock (par défaut 100)
- **Orders**: Un client peut passer plusieurs commandes
- **Items**: Stocké en JSON pour flexibilité (produits supprimés mais commandes conservées)

## 🚀 Optimisations BD

1. **Index** (pour performance):
   - `idx_product_name` sur `products.name`
   - `idx_order_email` sur `orders.customerEmail`
   - `idx_order_status` sur `orders.status`

2. **Requêtes Préparées**:
   - Protection contre les injections SQL
   - Réutilisation de curseurs

3. **Transactions**:
   - Atomicité des opérations multiples
   - Rollback automatique en cas d'erreur

## 💾 Sauvegarde & Maintenance

**Localisation BD:**
```
ticoeur-shop/ticoeur.db
```

**Backup automatique:**
```bash
# Copier le fichier ticoeur.db régulièrement
cp ticoeur.db ticoeur.db.backup.$(date +%Y%m%d)
```

**Vacuum (nettoyer):**
```javascript
// Dans le backend après certaines opérations
db.run('VACUUM')
```

## 📈 Scalabilité Futures

Pour passer de SQLite à PostgreSQL:
1. Installer `pg` package
2. Remplacer driver dans `db/init.js`
3. Ajuster les requêtes (syntaxe identique mostly compatible)
4. Connection pooling : `pg-pool`

```javascript
// Exemple migration
import pkg from 'pg'
const { Pool } = pkg

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'ticoeur_shop',
  user: 'postgres',
  password: 'password'
})
```

## 🔬 Test Requêtes

```bash
# Ouvrir la BD
sqlite3 ticoeur.db

# Requêtes utiles
SELECT * FROM products LIMIT 5;
SELECT COUNT(*) FROM orders;
SELECT SUM(total) FROM orders;
SELECT * FROM orders WHERE status='pending';
```

---

BD: SQLite | Version: 1.0 | 2026
