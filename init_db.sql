-- Création de la base de données
CREATE DATABASE IF NOT EXISTS medical_db;
USE medical_db;

-- Table des rôles
CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- Insertion des rôles par défaut
INSERT IGNORE INTO roles (id, name) VALUES 
(1, 'Administrateur'),
(2, 'Docteur'),
(3, 'Patient'),
(4, 'Responsable');

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullName VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    passwordHash VARCHAR(255) NOT NULL,
    role_id INT,
    isActive TINYINT(1) DEFAULT 1,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- Insertion des comptes de test (MDP hachés avec Bcrypt)
-- Admin: admin@medmanager.com / admin123
-- Patient: patient@test.com / password123
INSERT IGNORE INTO users (fullName, email, passwordHash, role_id, isActive) VALUES 
('Admin MedManager', 'admin@medmanager.com', '$2b$10$4mf/WrFFQqGRdivezy56..ZMzu9a7/ogzVVcg0/ih8WCnUJPNCyz.', 1, 1),
('Jean Patient', 'patient@test.com', '$2b$10$Sm0DpeGqbOTRlYRChhOi5OE6T8bRZ7KJK.aBwVPW/7bzJE8Toycbq', 3, 1);
