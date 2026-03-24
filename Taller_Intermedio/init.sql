CREATE DATABASE IF NOT EXISTS inventory_db;
USE inventory_db;

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    quantity INT NOT NULL DEFAULT 0,
    price DECIMAL(10,0) NOT NULL,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Datos de ejemplo
INSERT INTO products (name, description, quantity, price, category) VALUES
('Laptop Dell XPS', 'Laptop de alto rendimiento', 5, 1299.99, 'Electrónicos'),
('Mouse Logitech', 'Mouse inalámbrico', 25, 29.99, 'Electrónicos'),
('Caja de cartón', 'Caja resistente 30x30x30cm', 100, 2.50, 'Empaque'),
('Paleta de madera', 'Paleta estándar EUR', 10, 15.00, 'Empaque');