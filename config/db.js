const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

// Chargement des variables d'environnement
dotenv.config();

/**
 * Configuration du pool de connexion MySQL
 */
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root', // Mot de passe par défaut pour MAMP
    database: process.env.DB_NAME || 'medical_db',
    port: process.env.DB_PORT || 8889, // Port par défaut pour MAMP
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test de la connexion à la base de données
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Connecté à MySQL avec succès !');
        connection.release();
    } catch (err) {
        console.error('❌ Erreur de connexion MySQL :', err.message);
        console.log('Conseil : Vérifiez que votre serveur MySQL est lancé et que la base "medical_db" existe.');
    }
})();

module.exports = pool;
