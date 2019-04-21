-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Jeu 03 Janvier 2019 à 14:20
-- Version du serveur :  5.7.24-0ubuntu0.18.04.1
-- Version de PHP :  7.2.10-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `Sixtines2`
--

-- --------------------------------------------------------

--
-- Structure de la table `Customer`
--

CREATE TABLE `Customer` (
  `id` int(11) NOT NULL,
  `login` varchar(45) NOT NULL,
  `password` varchar(128) NOT NULL,
  `name_shop` varchar(45) DEFAULT NULL,
  `name_manager` varchar(45) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `mail` varchar(320) DEFAULT NULL,
  `language` varchar(45) DEFAULT NULL,
  `address_street_fac` varchar(100) DEFAULT NULL,
  `address_cp_fac` int(11) DEFAULT NULL,
  `address_city_fac` varchar(45) DEFAULT NULL,
  `address_country_fac` varchar(45) DEFAULT NULL,
  `tva_fac` varchar(45) DEFAULT NULL,
  `address_street_liv` varchar(100) DEFAULT NULL,
  `address_cp_liv` int(11) DEFAULT NULL,
  `address_city_liv` varchar(45) DEFAULT NULL,
  `address_country_liv` varchar(45) DEFAULT NULL,
  `Sales_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `Customer`
--

INSERT INTO `Customer` (`id`, `login`, `password`, `name_shop`, `name_manager`, `birthday`, `phone`, `mail`, `language`, `address_street_fac`, `address_cp_fac`, `address_city_fac`, `address_country_fac`, `tva_fac`, `address_street_liv`, `address_cp_liv`, `address_city_liv`, `address_country_liv`, `Sales_id`) VALUES
(3, 'dylan99', '123456', 'Dylan Clothes', 'Dylan Lefevre', '1979-03-17', '0478556677', 'dylan@dylanclothes.com', 'French', 'Rue des victoires, 88', 1200, 'Woluwé-Saint-Lambert', 'Belgium', 'BE00953245857', 'Rue des victoires, 88', 1200, 'Woluwé-Saint-Lambert', 'Belgium', 1);

-- --------------------------------------------------------

--
-- Structure de la table `Orders`
--

CREATE TABLE `Orders` (
  `id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `price_total` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `url` varchar(2083) DEFAULT NULL,
  `Sales_id` int(11) NOT NULL,
  `Customer_id` int(11) NOT NULL,
  `Customer_Sales_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `Orders`
--

INSERT INTO `Orders` (`id`, `date`, `price_total`, `status`, `url`, `Sales_id`, `Customer_id`, `Customer_Sales_id`) VALUES
(1, '2019-01-02', '75', 'Paid', 'www.lienfacture.com', 1, 3, 1);

-- --------------------------------------------------------

--
-- Structure de la table `Order_detail`
--

CREATE TABLE `Order_detail` (
  `id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `Orders_id` int(11) NOT NULL,
  `Orders_Sales_id` int(11) NOT NULL,
  `Orders_Customer_id` int(11) NOT NULL,
  `Orders_Customer_Sales_id` int(11) NOT NULL,
  `Product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `Order_detail`
--

INSERT INTO `Order_detail` (`id`, `quantity`, `Orders_id`, `Orders_Sales_id`, `Orders_Customer_id`, `Orders_Customer_Sales_id`, `Product_id`) VALUES
(1, 4, 1, 1, 3, 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `Product`
--

CREATE TABLE `Product` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `size` varchar(15) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `EAN` varchar(100) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `color` varchar(45) DEFAULT NULL,
  `image_1` varchar(45) DEFAULT NULL,
  `image_2` varchar(45) DEFAULT NULL,
  `image_3` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `Product`
--

INSERT INTO `Product` (`id`, `name`, `size`, `price`, `EAN`, `type`, `color`, `image_1`, `image_2`, `image_3`) VALUES
(1, 'Elise', 'XXL', 35, '50933244587331505', 'Caleçons', 'Rouge', 'http://www.lienimage1.com', 'http://www.lienimage2.com', 'http://www.lienimage3.com');

-- --------------------------------------------------------

--
-- Structure de la table `Sales`
--

CREATE TABLE `Sales` (
  `id` int(11) NOT NULL,
  `country` varchar(45) DEFAULT NULL,
  `password` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `Sales`
--

INSERT INTO `Sales` (`id`, `country`, `password`) VALUES
(1, 'Belgium', '123456');

-- --------------------------------------------------------

--
-- Structure de la table `Stock`
--

CREATE TABLE `Stock` (
  `id` int(11) NOT NULL,
  `season` varchar(45) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `Product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `Stock`
--

INSERT INTO `Stock` (`id`, `season`, `quantity`, `Product_id`) VALUES
(1, 'Hiver2019', 14, 1);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `Customer`
--
ALTER TABLE `Customer`
  ADD PRIMARY KEY (`id`,`Sales_id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `fk_Customer_Sales_idx` (`Sales_id`);

--
-- Index pour la table `Orders`
--
ALTER TABLE `Orders`
  ADD PRIMARY KEY (`id`,`Sales_id`,`Customer_id`,`Customer_Sales_id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `fk_Orders_Sales1_idx` (`Sales_id`),
  ADD KEY `fk_Orders_Customer1_idx` (`Customer_id`,`Customer_Sales_id`);

--
-- Index pour la table `Order_detail`
--
ALTER TABLE `Order_detail`
  ADD PRIMARY KEY (`id`,`Orders_id`,`Orders_Sales_id`,`Orders_Customer_id`,`Orders_Customer_Sales_id`,`Product_id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `fk_Order_detail_Orders1_idx` (`Orders_id`,`Orders_Sales_id`,`Orders_Customer_id`,`Orders_Customer_Sales_id`),
  ADD KEY `fk_Order_detail_Product1_idx` (`Product_id`);

--
-- Index pour la table `Product`
--
ALTER TABLE `Product`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Index pour la table `Sales`
--
ALTER TABLE `Sales`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Index pour la table `Stock`
--
ALTER TABLE `Stock`
  ADD PRIMARY KEY (`id`,`Product_id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `fk_Stock_Product1_idx` (`Product_id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `Customer`
--
ALTER TABLE `Customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT pour la table `Orders`
--
ALTER TABLE `Orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `Order_detail`
--
ALTER TABLE `Order_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `Product`
--
ALTER TABLE `Product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `Sales`
--
ALTER TABLE `Sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pour la table `Stock`
--
ALTER TABLE `Stock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `Customer`
--
ALTER TABLE `Customer`
  ADD CONSTRAINT `fk_Customer_Sales` FOREIGN KEY (`Sales_id`) REFERENCES `Sales` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `Orders`
--
ALTER TABLE `Orders`
  ADD CONSTRAINT `fk_Orders_Customer1` FOREIGN KEY (`Customer_id`,`Customer_Sales_id`) REFERENCES `Customer` (`id`, `Sales_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Orders_Sales1` FOREIGN KEY (`Sales_id`) REFERENCES `Sales` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `Order_detail`
--
ALTER TABLE `Order_detail`
  ADD CONSTRAINT `fk_Order_detail_Orders1` FOREIGN KEY (`Orders_id`,`Orders_Sales_id`,`Orders_Customer_id`,`Orders_Customer_Sales_id`) REFERENCES `Orders` (`id`, `Sales_id`, `Customer_id`, `Customer_Sales_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Order_detail_Product1` FOREIGN KEY (`Product_id`) REFERENCES `Product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `Stock`
--
ALTER TABLE `Stock`
  ADD CONSTRAINT `fk_Stock_Product1` FOREIGN KEY (`Product_id`) REFERENCES `Product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
