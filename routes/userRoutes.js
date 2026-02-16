const express = require('express');
const router = express.Router();
const { getUsers, toggleUserStatus, deleteUser, createUser, updateUser } = require('../controllers/userController');
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware');

/**
 * Routes pour la gestion des utilisateurs (Back-Office)
 * Toutes les routes sont protégées par le middleware d'authentification JWT
 */

// Route pour récupérer la liste des utilisateurs (Accessible par Admin et Responsable)
router.get('/', authMiddleware, roleMiddleware(['Administrateur', 'Responsable']), getUsers);

// Route pour créer un utilisateur - Réservé à l'Admin
router.post('/', authMiddleware, roleMiddleware(['Administrateur']), createUser);

// Route pour modifier un utilisateur - Réservé à l'Admin
router.put('/:id', authMiddleware, roleMiddleware(['Administrateur']), updateUser);

// Route pour mettre à jour le statut (Activé/Désactivé) - Réservé à l'Admin
router.put('/:id/status', authMiddleware, roleMiddleware(['Administrateur']), toggleUserStatus);

// Route pour supprimer un utilisateur - Réservé à l'Admin
router.delete('/:id', authMiddleware, roleMiddleware(['Administrateur']), deleteUser);

module.exports = router;
