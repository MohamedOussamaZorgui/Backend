const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Chargement des variables d'environnement (.env)
dotenv.config();

const app = express();

/**
 * Middlewares de base
 */
app.use(cors()); // Autorise les requêtes cross-origin pour le développement
app.use(express.json()); // Permet de lire les fichiers JSON dans le corps des requêtes

// Route de test pour vérifier si l'API fonctionne
app.get('/', (req, res) => {
    res.json({ message: "API de gestion médicale opérationnelle" });
});

/**
 * Déclenchement des routes de l'API
 */
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Définition du port (5001 par défaut pour éviter le conflit sur macOS)
const PORT = process.env.PORT || 5001;

// Lancement du serveur sur le port défini
app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port : ${PORT}`);
});
