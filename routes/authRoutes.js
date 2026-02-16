const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { body, validationResult } = require('express-validator');

/**
 * Middleware de validation des erreurs (Express-validator)
 */
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Validations pour l'inscription
const validateRegister = [
    body('fullName').notEmpty().withMessage('Le nom complet est requis'),
    body('email').isEmail().withMessage('Email invalide'),
    body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit faire au moins 6 caractères'),
    body('role_id').notEmpty().withMessage('Le rôle est requis'),
    validate
];

// Validations pour la connexion
const validateLogin = [
    body('email').isEmail().withMessage('Email invalide'),
    body('password').notEmpty().withMessage('Le mot de passe est requis'),
    validate
];

// Routes d'authentification
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

module.exports = router;
