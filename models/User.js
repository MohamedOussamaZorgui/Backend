const db = require('../config/db');
const bcrypt = require('bcryptjs');

/**
 * Modèle User gérant les interactions avec la table 'users'
 */
class User {
    /**
     * Enregistre un nouvel utilisateur
     */
    static async register(data) {
        const { fullName, email, password, role_id } = data;
        // Hachage du mot de passe pour la sécurité
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const [result] = await db.execute(
            'INSERT INTO users (fullName, email, passwordHash, role_id) VALUES (?, ?, ?, ?)',
            [fullName, email, passwordHash, role_id]
        );
        return result.insertId;
    }

    /**
     * Recherche un utilisateur par son email
     */
    static async findByEmail(email) {
        const [rows] = await db.execute(
            'SELECT u.*, r.name as role_name FROM users u LEFT JOIN roles r ON u.role_id = r.id WHERE u.email = ?',
            [email]
        );
        return rows[0];
    }

    /**
     * Vérifie si le mot de passe est correct
     */
    static async verifyPassword(rawPassword, hashedPassword) {
        return await bcrypt.compare(rawPassword, hashedPassword);
    }

    /**
     * Récupère tous les utilisateurs pour le back-office
     */
    static async fetchAll() {
        const [rows] = await db.execute(
            'SELECT u.id, u.fullName, u.email, u.isActive, u.createdAt, r.name as role FROM users u LEFT JOIN roles r ON u.role_id = r.id'
        );
        return rows;
    }

    /**
     * Met à jour le statut d'activation d'un compte
     */
    static async updateStatus(id, isActive) {
        return await db.execute('UPDATE users SET isActive = ? WHERE id = ?', [isActive, id]);
    }

    /**
     * Met à jour les informations de profil
     */
    static async updateProfile(id, data) {
        const { fullName, email } = data;
        return await db.execute('UPDATE users SET fullName = ?, email = ? WHERE id = ?', [fullName, email, id]);
    }

    /**
     * Met à jour un utilisateur (Admin uniquement - inclut le rôle)
     */
    static async updateUser(id, data) {
        const { fullName, email, role_id } = data;
        return await db.execute('UPDATE users SET fullName = ?, email = ?, role_id = ? WHERE id = ?', [fullName, email, role_id, id]);
    }

    /**
     * Crée un utilisateur (Admin uniquement)
     */
    static async createUser(data) {
        const { fullName, email, password, role_id } = data;
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const [result] = await db.execute(
            'INSERT INTO users (fullName, email, passwordHash, role_id, isActive) VALUES (?, ?, ?, ?, 1)',
            [fullName, email, passwordHash, role_id]
        );
        return result.insertId;
    }

    /**
     * Change le mot de passe d'un utilisateur
     */
    static async changePassword(id, newPassword) {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(newPassword, salt);
        return await db.execute('UPDATE users SET passwordHash = ? WHERE id = ?', [passwordHash, id]);
    }

    /**
     * Supprime un utilisateur de la base
     */
    static async delete(id) {
        return await db.execute('DELETE FROM users WHERE id = ?', [id]);
    }
}

module.exports = User;
