const express = require('express');
const router = express.Router();
const { getUsers, toggleUserStatus, deleteUser, createUser, updateUser } = require('../controllers/userController');
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware');
const { body, validationResult } = require('express-validator');

/**
 * Routes pour la gestion des utilisateurs (Back-Office)
 * Toutes les routes sont protégées par le middleware d'authentification JWT
 */

// Middleware de validation
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() });
    }
    next();
};

// Validations pour la création d'utilisateur
const validateCreateUser = [
    body('fullName').trim().isLength({ min: 3 }).withMessage('Le nom complet doit contenir au moins 3 caractères'),
    body('email').isEmail().withMessage('Email invalide'),
    body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit faire au moins 6 caractères'),
    body('role_id').notEmpty().withMessage('Le rôle est requis'),
    validate
];

// Validations pour la modification d'utilisateur
const validateUpdateUser = [
    body('fullName').trim().isLength({ min: 3 }).withMessage('Le nom complet doit contenir au moins 3 caractères'),
    body('email').isEmail().withMessage('Email invalide'),
    body('role_id').notEmpty().withMessage('Le rôle est requis'),
    validate
];

// Route pour récupérer la liste des utilisateurs (Accessible par Admin et Responsable)
router.get('/', authMiddleware, roleMiddleware(['Administrateur', 'Responsable']), getUsers);

// Route pour créer un utilisateur - Réservé à l'Admin
router.post('/', authMiddleware, roleMiddleware(['Administrateur']), validateCreateUser, createUser);

// Route pour modifier un utilisateur - Réservé à l'Admin
router.put('/:id', authMiddleware, roleMiddleware(['Administrateur']), validateUpdateUser, updateUser);

// Route pour mettre à jour le statut (Activé/Désactivé) - Réservé à l'Admin
router.put('/:id/status', authMiddleware, roleMiddleware(['Administrateur']), toggleUserStatus);

// Route pour supprimer un utilisateur - Réservé à l'Admin
router.delete('/:id', authMiddleware, roleMiddleware(['Administrateur']), deleteUser);

module.exports = router;
