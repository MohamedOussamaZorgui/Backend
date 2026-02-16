const jwt = require('jsonwebtoken');

/**
 * Middleware d'authentification pour vérifier le token JWT
 */
const authMiddleware = (req, res, next) => {
    // Récupération du token dans le header Authorization
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Accès refusé. Aucun token fourni." });
    }

    try {
        // Vérification de la validité du token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Ajout des infos de l'utilisateur à la requête
        next();
    } catch (err) {
        res.status(401).json({ message: "Token invalide ou expiré." });
    }
};

/**
 * Middleware de contrôle des rôles (Role-Based Access Control)
 */
const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        // Vérifie si le rôle de l'utilisateur est autorisé pour cette route
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Accès interdit : privilèges insuffisants." });
        }
        next();
    };
};

module.exports = { authMiddleware, roleMiddleware };
