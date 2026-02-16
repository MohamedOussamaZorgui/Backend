const User = require('../models/User');

/**
 * Contrôleur gérant la gestion des utilisateurs (Back-Office)
 */

// Récupérer tous les utilisateurs (pour Admin et Responsable)
const getUsers = async (req, res) => {
    try {
        const users = await User.fetchAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs." });
    }
};

// Activer ou désactiver un compte utilisateur
const toggleUserStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { isActive } = req.body;
        await User.updateStatus(id, isActive);
        res.json({ message: "Statut de l'utilisateur mis à jour avec succès." });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour du statut." });
    }
};

// Supprimer un utilisateur définitivement
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.delete(id);
        res.json({ message: "Utilisateur supprimé avec succès." });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur." });
    }
};

module.exports = { getUsers, toggleUserStatus, deleteUser };
