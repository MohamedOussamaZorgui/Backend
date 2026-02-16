const User = require('../models/User');
const jwt = require('jsonwebtoken');

/**
 * Contrôleur gérant l'authentification (Inscription/Connexion)
 */

// Inscription d'un nouvel utilisateur
const register = async (req, res) => {
    try {
        const { fullName, email, password, role_id } = req.body;

        // Vérification si l'email existe déjà
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "Cet email est déjà utilisé." });
        }

        // Création de l'utilisateur
        await User.register({ fullName, email, password, role_id });
        res.status(201).json({ message: "Utilisateur créé avec succès !" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de l'inscription." });
    }
};

// Connexion de l'utilisateur
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Recherche de l'utilisateur
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(400).json({ message: "Identifiants invalides." });
        }

        // Vérification du mot de passe haché
        const isMatch = await User.verifyPassword(password, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ message: "Identifiants invalides." });
        }

        // Vérification si le compte est actif
        if (!user.isActive) {
            return res.status(403).json({ message: "Votre compte est désactivé. Veuillez contacter l'administrateur." });
        }

        // Génération du Token JWT (expire dans 2h)
        const token = jwt.sign(
            { id: user.id, role: user.role_name },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                role: user.role_name
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la connexion." });
    }
};

module.exports = { register, login };
