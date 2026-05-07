# 📧 Configuration du Service d'Envoi d'Emails - TICOEUR

## Présentation

L'application TICOEUR envoie désormais automatiquement une **confirmation de commande** au client après que sa commande soit passée. L'email contient :
- 🧣 Une confirmation professionnelle avec le logo TICOEUR
- 📋 Détails complets de la commande
- 💰 Récapitulatif des prix (Articles, Frais de livraison, Taxes)
- 📍 Adresse de livraison
- 📞 Informations de contact du client

---

## 🔐 Configuration Gmail (Important!)

### Étape 1 : Activer la Vérification en Deux Étapes

1. Allez à **https://myaccount.google.com/security**
2. Cliquez sur **"Vérification en deux étapes"**
3. Suivez les instructions pour l'activer

### Étape 2 : Générer un Mot de Passe d'Application

1. Allez à **https://myaccount.google.com/apppasswords**
2. Si vous n'êtes pas automatiquement redirigé, sélectionnez :
   - **Application** : "Mail"
   - **Appareil** : "Windows Computer" (ou votre système)
3. Google générera un mot de passe spécial de **16 caractères**
4. **Copiez ce mot de passe** (sans espaces)

### Étape 3 : Configurer les Variables d'Environnement

Dans le fichier `backend/.env`, remplacez :

```env
GMAIL_EMAIL=your-email@gmail.com
GMAIL_PASSWORD=your-app-password-here
```

Par vos véritables identifiants :

```env
GMAIL_EMAIL=votre-email@gmail.com
GMAIL_PASSWORD=abcd efgh ijkl mnop
```

> ⚠️ **IMPORTANT** : Utilisez le **Mot de Passe d'Application** généré par Google, pas votre mot de passe Gmail normal.

---

## 🚀 Utilisation

### Processus Automatique

1. Le client remplit le formulaire de paiement
2. Il clique sur "Valider la commande"
3. **Automatiquement** :
   - La commande est enregistrée en base de données
   - Un email de confirmation est envoyé à l'adresse fournie
   - Un message de succès s'affiche au client

### Template d'Email

L'email automatiquement généré inclut :

```
📧 Sujet: 🧣 Confirmation de commande TICOEUR - #ABC12345

✅ Message de bienvenue
📊 Numéro de commande unique
📅 Date et heure de la commande
📋 Tableau détaillé des produits
💳 Calcul complet (sous-total, frais, taxes, total)
📍 Récapitulatif l'adresse de livraison
💬 Message de remerciement
```

---

## ✅ Vérification

Pour tester le service :

1. Naviguez vers le panier
2. Remplissez le formulaire de paiement
3. Vérifiez votre boîte mail (et le dossier Spam)
4. Vous devriez recevoir la confirmation dans les secondes

### Si vous ne recevez pas l'email :

1. **Vérifiez le dossier Spam/Junk**
2. **Vérifiez la console du serveur** pour les erreurs :
   ```
   [EMAIL] Confirmation envoyée à client@example.com
   ```
3. **Vérifiez vos identifiants Gmail** dans `.env`
4. **Assurez-vous que la Vérification en Deux Étapes est activée**

---

## 📂 Fichiers Modifiés/Créés

```
backend/
├── .env (mise à jour: ajout des variables Gmail)
├── .env.example (nouveau: instructions de configuration)
├── package.json (mise à jour: ajout de nodemailer)
├── src/
│   ├── server.js (mise à jour: chargement dotenv)
│   ├── services/
│   │   └── emailService.js (nouveau: service d'envoi d'emails)
│   └── routes/
│       └── orders.js (mise à jour: appel du service d'email)
```

---

## 🔧 Configuration Avancée

### Personnaliser l'Email

Pour modifier le template d'email, éditez le fichier `backend/src/services/emailService.js`.

Vous pouvez changer :
- ✏️ Les couleurs (actuellement marron `#8B4513`)
- 🎨 Le logo et les icônes
- 📝 Les textes et messages
- 📐 La structure HTML

### Ajouter un Email Admin

Pour recevoir une copie de chaque commande, modifiez `emailService.js` :

```javascript
// Ajouter après l'email du client
await transporter.sendMail({
  from: process.env.GMAIL_EMAIL,
  to: process.env.ADMIN_EMAIL, // À ajouter dans .env
  subject: `Nouvelle commande: #${order.id.substring(0, 8).toUpperCase()}`,
  html: generateOrderConfirmationHTML(order)
})
```

---

## 🛡️ Sécurité

- ✅ Les identifiants Gmail sont dans `.env` (non dans le code)
- ✅ Utilisez un "App Password" Google, pas votre mot de passe principal
- ✅ Ne committez jamais `.env` dans Git
- ✅ L'envoi d'email est asynchrone (ne bloque pas la réponse)

---

## 📞 Support

Si vous avez des problèmes :

1. Vérifiez les logs du serveur : `npm run dev`
2. Vérifiez votre configuration Gmail
3. Testez avec une adresse email valide
4. Assurez-vous que le serveur backend tourne correctement

---

**Dernière mise à jour** : Mai 2024
