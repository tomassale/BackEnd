
-- -------- USER -------- --
-- Se crea el user correspondiente a la db
-- CREATE USER dbwinehouse@localhost IDENTIFIED BY 'tomassale2003';
-- GRANT ALL ON *.* TO dbwinehouse@localhost;
-- SELECT * FROM mysql.user WHERE user LIKE 'dbwinehouse%';

-- -------- DATA BASE -------- --
-- Se crea la base de datos y se posiciona en la misma
DROP DATABASE IF EXISTS WineHouse;
CREATE DATABASE WineHouse;
USE WineHouse;
SET AUTOCOMMIT = 1;

-- -------- TABLES -------- --
-- Creacion de tablas
-- Tabla logs
CREATE TABLE `logs`(
	id_logs INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    table_logs VARCHAR(20),
    dml VARCHAR(20),
	registered_logs DATETIME,
    user VARCHAR(50),
    db VARCHAR(20),
    version VARCHAR(20)
);
-- Tablas usuarios
CREATE TABLE `user`(
	id_user INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_mail VARCHAR(50) NOT NULL,
    id_personal INT NOT NULL,
    id_address INT NOT NULL,
    id_opinion INT NULL,
    id_cart INT NOT NULL,
    id_sale VARCHAR(20) NULL
);
CREATE TABLE `personal`(
	id_personal INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    gender VARCHAR(10) NOT NULL,
	user_first_name VARCHAR(20) NOT NULL,
    user_last_name VARCHAR(30) NOT NULL,
    age INT NOT NULL
);
CREATE TABLE `account`(
    user_mail VARCHAR(50) PRIMARY KEY NOT NULL,
	user_password VARCHAR(50) NOT NULL,
    number_phone VARCHAR(20) NOT NULL,
	register_account DATETIME NOT NULL
);
CREATE TABLE `address`(
    id_address INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    locality VARCHAR(50) NOT NULL,
    postal_code VARCHAR(50) NOT NULL,
    street VARCHAR(50) NOT NULL
);
CREATE TABLE `opinion`(
	id_opinion INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	id_user INT NOT NULL,
    user_mail VARCHAR(50) NOT NULL,
    opinion VARCHAR(200) NOT NULL
); 
-- Tablas pagina
CREATE TABLE `product`(
	id_product INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    href VARCHAR(50) NOT NULL,
    wine_type VARCHAR(50) NOT NULL,
    description VARCHAR(200) NOT NULL,
    image VARCHAR(50) NOT NULL,
    price INT NOT NULL,
    stock INT NOT NULL
);
CREATE TABLE `cart`(
	id_cart INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_user INT NOT NULL,
    id_product INT NOT NULL,
    amount INT NOT NULL
);
-- Tablas ventas
CREATE TABLE `sales`(
	id_sale VARCHAR(20) PRIMARY KEY NOT NULL,
    id_user INT NOT NULL,
    date DATETIME NOT NULL,
    id_product INT NOT NULL,
    amount INT NOT NULL,
    id_order INT NOT NULL
);
CREATE TABLE `ordered`(
	id_order INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_invoice INT NOT NULL,
    order_status VARCHAR(50) NOT NULL
);
CREATE TABLE `invoice` (
    id_invoice INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    payment_method VARCHAR(50) NOT NULL,
    card_payment VARCHAR(50) NOT NULL,
    card_issuers VARCHAR(50) NOT NULL
);

-- -------- FOREIGN KEY -------- --
-- Se vinculan las tablas mediante Foreign Key
ALTER TABLE user
	ADD FOREIGN KEY FK_USER_PERSONAL (id_personal) REFERENCES personal (id_personal),
    ADD FOREIGN KEY FK_USER_ACCOUNT (user_mail) REFERENCES account (user_mail),
    ADD FOREIGN KEY FK_USER_ADDRESS (id_address) REFERENCES address (id_address),
    ADD FOREIGN KEY FK_USER_OPINION (id_opinion) REFERENCES opinion (id_opinion),
    ADD FOREIGN KEY FK_USER_CART (id_cart) REFERENCES cart (id_cart),
    ADD FOREIGN KEY FK_USER_SALE (id_sale) REFERENCES sales (id_sale);
ALTER TABLE opinion
	ADD FOREIGN KEY FK_OPINION_ACCOUNT (user_mail) REFERENCES account (user_mail),
    ADD FOREIGN KEY FK_OPINION_USER (id_user) REFERENCES user (id_user);
ALTER TABLE cart
	ADD FOREIGN KEY FK_CART_USER (id_user) REFERENCES user (id_user),
    ADD FOREIGN KEY FK_CART_PRODUCT (id_product) REFERENCES product (id_product);
ALTER TABLE sales
	ADD FOREIGN KEY FK_SALES_USER (id_user) REFERENCES user (id_user),
    ADD FOREIGN KEY FK_SALES_PRODUCT (id_product) REFERENCES product (id_product),
    ADD FOREIGN KEY FK_SALES_ORDER (id_order) REFERENCES ordered (id_order);
ALTER TABLE ordered
    ADD FOREIGN KEY FK_ORDER_INVOICE (id_invoice) REFERENCES invoice (id_invoice);


-- -------- TRIGGERS -------- --
-- Triggers before insert tablas registro logs
CREATE TRIGGER AFT_INS_user_logs
AFTER INSERT ON user
FOR EACH ROW
INSERT INTO logs VALUES (NULL, "user", "Insert", NOW(), USER(), DATABASE(), VERSION());

-- Triggers before delete tablas registro logs
CREATE TRIGGER BEF_DEL_user_logs
BEFORE DELETE ON user
FOR EACH ROW
INSERT INTO logs VALUES (NULL, "user", "Delete", NOW(), USER(), DATABASE(), VERSION());

-- Triggers before update tablas registro logs
CREATE TRIGGER BEF_UPD_user_logs
BEFORE UPDATE ON user
FOR EACH ROW
INSERT INTO logs VALUES (NULL, "user", "Update", NOW(), USER(), DATABASE(), VERSION());

CREATE TRIGGER BEF_UPD_account_logs
BEFORE UPDATE ON account
FOR EACH ROW
INSERT INTO logs VALUES (NULL, "account", "Update", NOW(), USER(), DATABASE(), VERSION());

CREATE TRIGGER AFT_INS_invoice_sales
AFTER INSERT ON invoice
FOR EACH ROW
INSERT INTO sales VALUES (NULL, id_user, NOW(), id_product, amount, id_order);


-- -------- INSERTS -------- --
-- Se insertan los datos estaticos en las tablas
INSERT INTO product (`id_product`, `name`,`href`,`wine_type`,`description`,`image`,`price`,`stock`)
VALUES (NULL, 'Dulce Dilema', '/item/Blanco', 'Blanco', 'Rojo violáceo brillante, Gran cuerpo', '/img/vinos/dulceDilema.jpg', 3100, 15),
	   (NULL, 'Malbec', '/item/Tinto', 'Tinto', 'Vivaz estructura que acentúa los taninos intensos, Aromas frutales y especiados', '/img/vinos/malbec.jpg', 800, 15),
       (NULL, 'Tukma', '/item/Tinto', 'Tinto', 'Rojo intenso con matices azulados, En boca, se reafirman los acentos aciruelados', '/img/vinos/tukma.jpg', 1000, 16),
       (NULL, 'Champagne Brut Ros', '/item/Espumoso', 'Empumosos', 'En nariz, se presenta frutado, con notas de ciruela, vainilla y anís; mientras', '/img/vinos/champagne.jpg', 5000, 21),
       (NULL, 'Saliensten', '/item/Tinto', 'Tinto', 'Elegante tono rosado y un brillo y una belleza que deslumbran', '/img/vinos/salientein.jpg', 2100, 45),
       (NULL, 'Marlo', '/item/Blanco', 'Blanco', 'Elegante tono rosado y un brillo y una belleza que deslumbran', '/img/vinos/marlo.webp', 2100, 45),
       (NULL, 'Don Marlo', '/item/Tinto', 'Tinto', 'Fresco y afrutado, Perfecto para relajarse y degustar un vino con 18 años de añejamiento', '/img/vinos/donValentin.webp', 4000, 28),
       (NULL, 'San Humberto', '/item/Tinto', 'Tinto', 'Deliciosa combinación de los mejores racimos de Glera y Pinot Noir que se cosechan en Italia', '/img/vinos/sanHumberto.webp', 1190, 75),
       (NULL, 'El Enemigo', '/item/Tinto', 'Tinto', 'Delicado aroma a frutas rojas y una elegante base de flores blancas y manzanas', '/img/vinos/elEnemigo.webp', 3500, 64),
       (NULL, 'Rutini', '/item/Tinto', 'Tinto', 'Buena acidez, Aromas complejos, Un vino perfecto para las comidas inolvidables', '/img/vinos/rutini.webp', 2100, 18),
       (NULL, 'Nicasia', '/item/Tinto', 'Tinto', 'Para personas con gustos por los tanitos finamente equilibrados', '/img/vinos/nicasia.webp', 600, 43),
       (NULL, 'Animal', '/item/Tinto', 'Tinto', 'Excelente para acompañar momentos inolvidables', '/img/vinos/animal.webp', 1700, 27);
 