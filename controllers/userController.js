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

// Créer un nouvel utilisateur (Admin uniquement)
const createUser = async (req, res) => {
    try {
        const { fullName, email, password, role_id } = req.body;

        // Vérifier si l'email existe déjà
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "Cet email est déjà utilisé." });
        }

        const userId = await User.createUser({ fullName, email, password, role_id });
        res.status(201).json({ message: "Utilisateur créé avec succès.", userId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la création de l'utilisateur." });
    }
};

// Modifier un utilisateur (Admin uniquement)
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { fullName, email, role_id } = req.body;

        await User.updateUser(id, { fullName, email, role_id });
        res.json({ message: "Utilisateur modifié avec succès." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la modification de l'utilisateur." });
    }
};

module.exports = { getUsers, toggleUserStatus, deleteUser, createUser, updateUser };
