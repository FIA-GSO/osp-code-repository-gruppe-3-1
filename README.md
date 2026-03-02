# Anmeldetool Marketplace – Testdaten & Setup

## 1. Test-Accounts

| E-Mail                     | Rolle   | Passwort     |
|-----------------------------|--------|-------------|
| info@firma-mueller.de       | USER   | Start123!   |
| kontakt@techsolutions.de    | USER   | Start123!   |
| feser@gso-koeln.de          | LEHRER | Start123!   |
| admin@gso-koeln.de          | ADMIN  | Start123!   |
| helper@gso-koeln.de         | HELPER | Start123!   |



---

Zum testen, im Backend eine .env anlegen und dort folgende Daten eintragen:
```
DB_USER=root
DB_PASSWORD=*passwort*
DB_HOST=localhost
DB_NAME=anmeldetoolmarketplace
DB_PORT=3306

MAIL_PORT = 4000
```
und MySQL script ausführen

## 2. MySQL Schema & Testdaten

```sql
-- =====================================================
-- DATABASE SCHEMA: Anmeldetool Marketplace (FINAL)
-- =====================================================

CREATE DATABASE IF NOT EXISTS anmeldetoolmarketplace;
USE anmeldetoolmarketplace;

-- -------------------------
-- 1) ROLE
-- -------------------------
CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255) NULL
) ENGINE=InnoDB;

-- -------------------------
-- 2) USERS (user ist reserviert!)
-- -------------------------
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NULL,
    contact_person VARCHAR(255) NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- -------------------------
-- 3) USER_ROLE (N:M)
-- -------------------------
CREATE TABLE user_role (
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    CONSTRAINT fk_user_role_user
        FOREIGN KEY (user_id)
        REFERENCES user(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_user_role_role
        FOREIGN KEY (role_id)
        REFERENCES role(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- -------------------------
-- 4) EVENT
-- -------------------------
CREATE TABLE event (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    event_date DATE NOT NULL,
    registration_locked BOOLEAN NOT NULL DEFAULT FALSE
) ENGINE=InnoDB;

-- -------------------------
-- 5) STATUS
-- -------------------------
CREATE TABLE status (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- -------------------------
-- 6) REGISTRATION
-- -------------------------
CREATE TABLE registration (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    status_id INT NOT NULL,
    with_lecture BOOLEAN NOT NULL DEFAULT FALSE,
    remarks TEXT NULL,
    tables_needed INT NULL,
    chairs_needed INT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_registration_user
        FOREIGN KEY (user_id)
        REFERENCES user(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_registration_event
        FOREIGN KEY (event_id)
        REFERENCES event(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_registration_status
        FOREIGN KEY (status_id)
        REFERENCES status(id)
) ENGINE=InnoDB;

-- -------------------------
-- 7) LECTURE
-- -------------------------
CREATE TABLE lecture (
    id INT AUTO_INCREMENT PRIMARY KEY,
    registration_id INT NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    speaker VARCHAR(255) NOT NULL,
    required_tech TEXT NULL,
    preferred_time VARCHAR(100) NULL,
    CONSTRAINT fk_lecture_registration
        FOREIGN KEY (registration_id)
        REFERENCES registration(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- =====================================================
-- TESTDATEN
-- =====================================================

-- ROLE
INSERT INTO role (id, name, description) VALUES
(1, 'user', 'Ausbildungsbetrieb'),
(2, 'teacher', 'Lehrer / Organisation'),
(3, 'admin', 'Administrator'),
(4, 'helper', 'Helper');


-- USERS
INSERT INTO user (id, email, password_hash, company_name, contact_person, active) VALUES
(1, 'info@firma-mueller.de', 'scrypt:32768:8:1$NjwB4pz6G3icZhxX$c3826eb8ac6a18f8e795db7cfe2912ed620988701c3a5466f372f09731a13089d8c13520ce9bdb0d23641d6e5b13473935e4ced889221972e0a56c1a25661c1f', 'Müller GmbH', 'Max Müller', TRUE),
(2, 'kontakt@techsolutions.de', 'scrypt:32768:8:1$NjwB4pz6G3icZhxX$c3826eb8ac6a18f8e795db7cfe2912ed620988701c3a5466f372f09731a13089d8c13520ce9bdb0d23641d6e5b13473935e4ced889221972e0a56c1a25661c1f', 'TechSolutions AG', 'Lisa Becker', TRUE),
(3, 'feser@gso-koeln.de', 'scrypt:32768:8:1$NjwB4pz6G3icZhxX$c3826eb8ac6a18f8e795db7cfe2912ed620988701c3a5466f372f09731a13089d8c13520ce9bdb0d23641d6e5b13473935e4ced889221972e0a56c1a25661c1f', "Lehrer", NULL, TRUE),
(4, 'admin@gso-koeln.de', 'scrypt:32768:8:1$NjwB4pz6G3icZhxX$c3826eb8ac6a18f8e795db7cfe2912ed620988701c3a5466f372f09731a13089d8c13520ce9bdb0d23641d6e5b13473935e4ced889221972e0a56c1a25661c1f', "Admin", NULL, TRUE),
(5, 'helper@gso-koeln.de', 'scrypt:32768:8:1$NjwB4pz6G3icZhxX$c3826eb8ac6a18f8e795db7cfe2912ed620988701c3a5466f372f09731a13089d8c13520ce9bdb0d23641d6e5b13473935e4ced889221972e0a56c1a25661c1f', "Helper", NULL, TRUE);

-- USER_ROLE
INSERT INTO user_role (user_id, role_id) VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 3),
(5, 4);

-- EVENT
INSERT INTO event (id, name, event_date, registration_locked) VALUES
(1, 'Tag der Ausbildung 2026', '2026-03-15', FALSE),
(2, 'Karrieretag IT 2026', '2026-06-10', TRUE);

-- STATUS
INSERT INTO status (id, name) VALUES
(1, 'eingereicht'),
(2, 'bestätigt'),
(3, 'abgelehnt');

-- REGISTRATION
INSERT INTO registration (id, user_id, event_id, status_id, with_lecture, remarks, tables_needed, chairs_needed) VALUES
(1, 1, 1, 1, FALSE, 'Benötigen Stromanschluss', 2, 4),
(2, 2, 1, 2, TRUE, 'Vortrag im IT-Bereich', NULL, NULL),
(3, 1, 2, 3, FALSE, 'Zu spät angemeldet', 1, 2);

-- LECTURE
INSERT INTO lecture (registration_id, title, description, speaker, required_tech, preferred_time) VALUES
(2, 'IT Vortrag', 'Ein Vortrag über IT', 'Lisa Becker', 'Beamer, Laptop', '10:00 Uhr');

```



[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/ekD6YLNP)
