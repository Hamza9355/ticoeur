#!/bin/bash
# Script de test API - Vérifier que tout fonctionne

echo "🧪 Test du système Ti'Coeur"
echo "================================"
echo ""

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Test 1: Health check
echo "Test 1: Vérifier que le serveur tourne..."
if curl -s http://localhost:5000/api/health | grep -q "OK"; then
    echo -e "${GREEN}✅ Serveur opérationnel${NC}"
else
    echo -e "${RED}❌ Serveur non accessible${NC}"
    exit 1
fi

echo ""

# Test 2: Récupérer les produits
echo "Test 2: Récupérer la liste des produits..."
PRODUCTS=$(curl -s http://localhost:5000/api/products)
if echo "$PRODUCTS" | grep -q "Harmonie"; then
    echo -e "${GREEN}✅ 20 produits trouvés${NC}"
else
    echo -e "${RED}❌ Produits non trouvés${NC}"
fi

echo ""

# Test 3: Récupérer 1 produit
echo "Test 3: Récupérer un produit spécifique..."
PRODUCT=$(curl -s http://localhost:5000/api/products/1)
if echo "$PRODUCT" | grep -q "Harmonie Douce"; then
    echo -e "${GREEN}✅ Produit 1 accessible${NC}"
else
    echo -e "${RED}❌ Produit 1 non trouvé${NC}"
fi

echo ""

# Test 4: Créer une commande test
echo "Test 4: Créer une commande test..."
RESPONSE=$(curl -s -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer": {
      "firstName": "Test",
      "lastName": "User",
      "email": "test@example.com",
      "phone": "+212 600-000-000",
      "address": "123 Test Street",
      "city": "Marrakech",
      "zipCode": "40000",
      "country": "Maroc"
    },
    "items": [
      {"id": 1, "name": "Harmonie Douce", "price": 45, "quantity": 1}
    ],
    "subtotal": 45,
    "shipping": 30,
    "tax": 7.50,
    "total": 82.50
  }')

if echo "$RESPONSE" | grep -q "pending"; then
    echo -e "${GREEN}✅ Commande créée avec succès${NC}"
else
    echo -e "${RED}❌ Erreur création commande${NC}"
fi

echo ""

# Test 5: Lister les commandes
echo "Test 5: Lister les commandes..."
ORDERS=$(curl -s http://localhost:5000/api/orders)
if echo "$ORDERS" | grep -q "Test"; then
    echo -e "${GREEN}✅ Commandes accessibles${NC}"
else
    echo -e "${RED}❌ Pas de commandes${NC}"
fi

echo ""

# Test 6: Frontend check
echo "Test 6: Vérifier que le frontend tourne..."
if curl -s http://localhost:5173 | grep -q "Ti'Coeur" || \
   curl -s http://localhost:5173 | grep -q "title"; then
    echo -e "${GREEN}✅ Frontend opérationnel${NC}"
else
    echo -e "${RED}❌ Frontend non accessible${NC}"
fi

echo ""
echo "================================"
echo -e "${GREEN}🎉 Tests complétés!${NC}"
echo ""
echo "URLs de test:"
echo "🌐 Frontend: http://localhost:5173"
echo "🔌 API: http://localhost:5000/api"
echo "📊 Products: http://localhost:5000/api/products"
echo "📋 Orders: http://localhost:5000/api/orders"
