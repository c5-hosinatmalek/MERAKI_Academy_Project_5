DROP DATABASE Data_Pirates;
CREATE DATABASE Data_Pirates;

USE Data_Pirates;

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    role VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE users(
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    country VARCHAR(255),
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE permissions(
    id INT AUTO_INCREMENT NOT NULL,
    permission VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE roles_permissions(
    id INT AUTO_INCREMENT NOT NULL,
    role_id INT,
    permission_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (permission_id) REFERENCES permissions(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE categories(
    id INT AUTO_INCREMENT NOT NULL,
    category VARCHAR(255),
    picUrl VARCHAR(255),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE sub_categories(
    id INT AUTO_INCREMENT NOT NULL,
    sub_category VARCHAR(255),
    picUrl VARCHAR(255),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE Products(
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR (255),
    category_id INT,
    sub_category INT,
    product_name VARCHAR(255),
    product_type VARCHAR(255),
    price VARCHAR(255),
    description TEXT,
    picUrl VARCHAR(255),
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (sub_category) REFERENCES sub_categories(id),
    Store_Quantity INT,
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE pic(
    id INT AUTO_INCREMENT NOT NULL,
    url VARCHAR(255),
    name VARCHAR(255),
    product_Id int,
    FOREIGN KEY (product_id) REFERENCES products(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE sold(
    id INT AUTO_INCREMENT NOT NULL,
    sold INT,
    product_Id int,
    FOREIGN KEY (product_id) REFERENCES products(id),
    PRIMARY KEY (id)
);

CREATE TABLE cart (
    id INT AUTO_INCREMENT NOT NULL,
    product_id int,
    FOREIGN KEY (product_id) REFERENCES products(id),
    user_id int, FOREIGN KEY (user_id) REFERENCES users (id),
    quantity int,
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);