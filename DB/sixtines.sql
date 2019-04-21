-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  mer. 23 jan. 2019 à 15:08
-- Version du serveur :  5.7.23
-- Version de PHP :  7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `sixtines-ok`
--

-- --------------------------------------------------------

--
-- Structure de la table `customer`
--

DROP TABLE IF EXISTS `customer`;
CREATE TABLE IF NOT EXISTS `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(45) NOT NULL,
  `password` varchar(128) NOT NULL,
  `name_shop` varchar(45) DEFAULT NULL,
  `name_manager` varchar(45) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `mail` varchar(320) DEFAULT NULL,
  `language` varchar(45) DEFAULT NULL,
  `company_name` varchar(45) DEFAULT NULL,
  `address_street_fac` varchar(100) DEFAULT NULL,
  `address_cp_fac` int(11) DEFAULT NULL,
  `address_city_fac` varchar(45) DEFAULT NULL,
  `address_country_fac` varchar(45) DEFAULT NULL,
  `tva_fac` varchar(45) DEFAULT NULL,
  `address_street_liv` varchar(100) DEFAULT NULL,
  `address_cp_liv` int(11) DEFAULT NULL,
  `address_city_liv` varchar(45) DEFAULT NULL,
  `address_country_liv` varchar(45) DEFAULT NULL,
  `sales_id` int(11) NOT NULL,
  PRIMARY KEY (`id`,`sales_id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_Customer_Sales_idx` (`sales_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `customer`
--

INSERT INTO `customer` (`id`, `login`, `password`, `name_shop`, `name_manager`, `birthday`, `phone`, `mail`, `language`, `company_name`, `address_street_fac`, `address_cp_fac`, `address_city_fac`, `address_country_fac`, `tva_fac`, `address_street_liv`, `address_cp_liv`, `address_city_liv`, `address_country_liv`, `sales_id`) VALUES
(1, 'Parachute.jump@skynet.be', '16parachute16', 'Parachute Jump', 'Mr Jean-Paul Becker', '1964-08-18', '0473656587', 'Parachute.jump@skynet.be', 'FR', 'Parachute Jump SPRL', 'Chaussée de Waterloo 579', 1050, 'Ixelles', 'Belgium', 'BE0466050554', 'Chaussée de Waterloo 579', 1050, 'Ixelles', 'Belgique', 1),
(2, 'serdar.sandurac@hotmail.com', '16happiness16', 'Happiness', '	Mr Serdar Sandurac', '1955-02-13', '0484 77 96 77', 'serdar.sandurac@hotmail.com', 'FR', 'Univers Consult SPRL', 'Avenue des Tritons 14', 1410, 'Waterloo', 'Belgique', 'BE0470812660', 'Chaussée de Bruxelles 74', 1410, 'Waterloo', 'Belgique', 1),
(3, 'tom@rolls.be', '16rolls16', 'Rolls', 'Dhr Tom Van Poucke', '1981-12-08', '	0475 85 79 86', 'tom@rolls.be', 'NL', 'Rolls Suits and Casual NV', 'Leiestraat 15', 8500, 'Kortrijk', 'Belgie', 'BE0466516055', 'Leiestraat 15', 8500, 'Kortrijk', 'Belgie', 2);

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `price_total` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `url` varchar(2083) DEFAULT NULL,
  `wished_delivery_date` date DEFAULT NULL,
  `sales_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `customer_sales_id` int(11) NOT NULL,
  PRIMARY KEY (`id`,`sales_id`,`customer_id`,`customer_sales_id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_Orders_Sales1_idx` (`sales_id`),
  KEY `fk_Orders_Customer1_idx` (`customer_id`,`customer_sales_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `orders`
--

INSERT INTO `orders` (`id`, `date`, `price_total`, `status`, `url`, `wished_delivery_date`, `sales_id`, `customer_id`, `customer_sales_id`) VALUES
(1, '2017-01-08', '1225', 'Paid', 'www.test.com', '2017-01-20', 1, 1, 1),
(2, '2019-01-06', '525', 'not paid', 'www.test.com', '2019-03-08', 2, 2, 1);

-- --------------------------------------------------------

--
-- Structure de la table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
CREATE TABLE IF NOT EXISTS `order_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quantity` int(11) DEFAULT NULL,
  `orders_id` int(11) NOT NULL,
  `orders_sales_id` int(11) NOT NULL,
  `orders_customer_id` int(11) NOT NULL,
  `orders_customer_sales_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`id`,`orders_id`,`orders_sales_id`,`orders_customer_id`,`orders_customer_sales_id`,`product_id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_Order_detail_Orders1_idx` (`orders_id`,`orders_sales_id`,`orders_customer_id`,`orders_customer_sales_id`),
  KEY `fk_Order_detail_Product1_idx` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `EAN` varchar(100) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `color` varchar(45) DEFAULT NULL,
  `image_1` varchar(255) DEFAULT NULL,
  `image_2` varchar(255) DEFAULT NULL,
  `image_3` varchar(255) DEFAULT NULL,
  `seasons_id` int(11) NOT NULL,
  PRIMARY KEY (`id`,`seasons_id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_product_seasons1_idx` (`seasons_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `product`
--

INSERT INTO `product` (`id`, `name`, `price`, `EAN`, `type`, `color`, `image_1`, `image_2`, `image_3`, `seasons_id`) VALUES
(1, 'Louise', 35, '', 'Caleçons', '', '', '', '', 1),
(2, 'Julie', 35, '', 'Caleçons', '', '', '', '', 2),
(3, 'Marion', 35, '', 'Caleçons', '', '', '', '', 3),
(4, 'Elise', 35, '', 'Caleçons', '', '', '', '', 4),
(5, 'Audrey', 35, '', 'Caleçons', '', '', '', '', 5),
(6, 'Ysa', 35, '', 'Caleçons', '', '', '', '', 6),
(7, 'Dark Blue', 35, '', 'Boxers', '', '', '', '', 7),
(8, 'Grey', 35, '', 'Boxers', '', '', '', '', 8),
(9, 'White', 35, '', 'Boxers', '', '', '', '', 9),
(10, 'Powermen', 35, '', 'Boxers', '', '', '', '', 10),
(11, 'Lilys', 35, '', 'Woman', '', '', '', '', 11),
(12, 'Green Flowers', 35, '', 'Woman', '', '', '', '', 12),
(13, 'Light Blue', 35, '', 'Woman', '', '', '', '', 13),
(14, 'Bleu dots on red', 35, '', 'Woman', '', '', '', '', 14);

-- --------------------------------------------------------

--
-- Structure de la table `sales`
--

DROP TABLE IF EXISTS `sales`;
CREATE TABLE IF NOT EXISTS `sales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `country` varchar(45) DEFAULT NULL,
  `password` varchar(128) DEFAULT NULL,
  `is_sale` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `sales`
--

INSERT INTO `sales` (`id`, `country`, `password`, `is_sale`) VALUES
(1, 'Belgium', '123456', 1),
(2, 'France', '666', 1);

-- --------------------------------------------------------

--
-- Structure de la table `seasons`
--

DROP TABLE IF EXISTS `seasons`;
CREATE TABLE IF NOT EXISTS `seasons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `seasons`
--

INSERT INTO `seasons` (`id`, `name`) VALUES
(1, 'SS19'),
(2, 'SS19'),
(3, 'SS19'),
(4, 'SS19'),
(5, 'AW19'),
(6, 'AW19'),
(7, 'SS19'),
(8, 'SS19'),
(9, 'SS19'),
(10, 'SS19'),
(11, 'SS19'),
(12, 'SS19'),
(13, 'SS19'),
(14, 'SS19');

-- --------------------------------------------------------

--
-- Structure de la table `sizes`
--

DROP TABLE IF EXISTS `sizes`;
CREATE TABLE IF NOT EXISTS `sizes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `xs` varchar(45) DEFAULT NULL,
  `s` varchar(45) DEFAULT NULL,
  `m` varchar(45) DEFAULT NULL,
  `l` varchar(45) DEFAULT NULL,
  `xl` varchar(45) DEFAULT NULL,
  `xxl` varchar(45) DEFAULT NULL,
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`id`,`product_id`),
  KEY `fk_sizes_product1_idx` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `sizes`
--

INSERT INTO `sizes` (`id`, `xs`, `s`, `m`, `l`, `xl`, `xxl`, `product_id`) VALUES
(1, '20', '50', '100', '100', '50', '20', 1),
(2, '20', '50', '100', '100', '50', '20', 2),
(3, '20', '50', '100', '100', '50', '20', 3),
(4, '20', '50', '100', '100', '50', '20', 4),
(5, '20', '50', '100', '100', '50', '20', 5),
(6, '20', '50', '100', '100', '50', '20', 6),
(7, '20', '50', '100', '100', '50', '20', 7),
(8, '20', '50', '100', '100', '50', '20', 8),
(9, '20', '50', '100', '100', '50', '20', 9),
(10, '20', '50', '100', '100', '50', '20', 10),
(11, '20', '50', '100', '100', '50', '20', 11),
(12, '20', '50', '100', '100', '50', '20', 12),
(13, '20', '50', '100', '100', '50', '20', 13),
(14, '20', '50', '100', '100', '50', '20', 14);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `fk_Customer_Sales` FOREIGN KEY (`sales_id`) REFERENCES `sales` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_Orders_Customer1` FOREIGN KEY (`customer_id`,`customer_sales_id`) REFERENCES `customer` (`id`, `sales_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Orders_Sales1` FOREIGN KEY (`sales_id`) REFERENCES `sales` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `order_detail`
--
ALTER TABLE `order_detail`
  ADD CONSTRAINT `fk_Order_detail_Orders1` FOREIGN KEY (`orders_id`,`orders_sales_id`,`orders_customer_id`,`orders_customer_sales_id`) REFERENCES `orders` (`id`, `sales_id`, `customer_id`, `customer_sales_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Order_detail_Product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `fk_product_seasons1` FOREIGN KEY (`seasons_id`) REFERENCES `seasons` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `sizes`
--
ALTER TABLE `sizes`
  ADD CONSTRAINT `fk_sizes_product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
