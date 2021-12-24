CREATE DATABASE storize;

CREATE TABLE users (
  id SERIAL NOT NULL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  name VARCHAR(50) NOT NULL,
  phone VARCHAR(15) NOT NULL
);

CREATE TABLE products (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  price INT NOT NULL,
  description VARCHAR(255) NOT NULL
);

CREATE TABLE receipts (
  id SERIAL NOT NULL PRIMARY KEY,
  userId INT NOT NULL REFERENCES users (id),
  purchaseDate DATE NOT NULL
);

CREATE TABLE orders (
  id SERIAL NOT NULL PRIMARY KEY,
  receiptId INT NOT NULL REFERENCES receipts (id),
  productId INT NOT NULL REFERENCES products (id),
  quantity INT NOT NULL
);