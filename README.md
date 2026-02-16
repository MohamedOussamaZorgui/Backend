# 🚀 MedManager - Backend API (Node.js/Express)

Cette API assure la gestion des données, l'authentification sécurisée et le contrôle d'accès pour l'application MedManager.

---

## 🏗️ Architecture du Code (MVC)

Le backend est structuré de manière modulaire :
-   **`config/`** : Configuration de la base de données MySQL (Pool de connexion).
-   **`controllers/`** : Logique métier (traitement des requêtes, appels aux modèles).
-   **`models/`** : Intéraction avec la base de données via des classes ES6.
-   **`routes/`** : Définition des points d'entrée (Endpoints) de l'API.
-   **`middlewares/`** : Sécurité, vérification JWT et validation des rôles.

---

## 🔐 Sécurité & Authentification

-   **JWT (JSON Web Tokens)** : Utilisé pour sécuriser les échanges entre le client et le serveur. Chaque requête protégée doit inclure le token dans le header `Authorization: Bearer <token>`.
-   **Bcryptjs** : Hachage à sens unique des mots de passe en base de données avec un "Salt" de 10 rounds.
-   **RBAC (Role-Based Access Control)** : Les routes sensibles (suppression, modification de statut) sont restreintes au rôle `Administrateur`.

---

## 🔑 Comptes de Test

| Rôle | Email | Mot de passe |
| :--- | :--- | :--- |
| **Administrateur** | `admin@medmanager.com` | `admin123` |
| **Patient** | `patient@test.com` | `password123` |

---

## ⚙️ Installation

1. Accédez au dossier :
   ```bash
   cd Backend
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Configurez votre fichier `.env` (voir `.env.example`) :
   ```env
   PORT=5001
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=root
   DB_NAME=medical_db
   JWT_SECRET=votre_cle_secrete
   ```

---

## 🏃 Lancement

```bash
# Mode développement avec auto-restart (nodemon)
npm run dev

# Mode production
npm start
```

---

## 📊 Endpoints Principaux

-   `POST /api/auth/register` : Inscription d'un nouvel utilisateur.
-   `POST /api/auth/login` : Connexion et génération du Token JWT.
-   `GET /api/users` : Récupération des utilisateurs (Admin/Responsable uniquement).
-   `PUT /api/users/:id/status` : Activation/Désactivation d'un compte (Admin uniquement).
