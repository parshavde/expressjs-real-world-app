-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 22, 2019 at 06:28 PM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `foxhub`
--

-- --------------------------------------------------------

--
-- Table structure for table `bol_head`
--

CREATE TABLE `bol_head` (
  `id` int(4) NOT NULL,
  `user_id` int(4) NOT NULL,
  `carrier_name` varchar(100) DEFAULT NULL,
  `carrier_duns` varchar(100) DEFAULT NULL,
  `carrier_phone` varchar(100) DEFAULT NULL,
  `carrier_address` varchar(200) DEFAULT NULL,
  `carrier_date` datetime DEFAULT NULL,
  `consignee` varchar(100) DEFAULT NULL,
  `consignee_address` varchar(100) DEFAULT NULL,
  `consignee_phone` varchar(100) DEFAULT NULL,
  `third_party_billing` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `bol_number` varchar(100) DEFAULT NULL,
  `sid_number` varchar(100) DEFAULT NULL,
  `sac` varchar(100) DEFAULT NULL,
  `freight_bill_pro_number` varchar(100) DEFAULT NULL,
  `load_number` varchar(100) DEFAULT NULL,
  `trailer_number` varchar(100) DEFAULT NULL,
  `trailer_type` varchar(100) DEFAULT NULL,
  `special_instructions1` varchar(100) DEFAULT NULL,
  `shipper_internal_date` varchar(100) DEFAULT NULL,
  `special_instructions2` varchar(100) DEFAULT NULL,
  `cod_amount` int(12) DEFAULT NULL,
  `cod_fee` int(12) DEFAULT NULL,
  `total_amount_collected` int(12) DEFAULT NULL,
  `carrier_signature` varchar(100) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `bol_item_detail`
--

CREATE TABLE `bol_item_detail` (
  `id` int(4) NOT NULL,
  `bol_head_id` int(4) NOT NULL,
  `name` varchar(100) NOT NULL,
  `summary` varchar(200) NOT NULL,
  `item_code` varchar(100) DEFAULT NULL,
  `quantity` varchar(100) DEFAULT NULL,
  `description` text,
  `packging` varchar(100) DEFAULT NULL,
  `class` varchar(100) DEFAULT NULL,
  `hm` varchar(100) DEFAULT NULL,
  `weight` decimal(10,2) DEFAULT NULL,
  `user_id` int(4) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(4) NOT NULL,
  `company_name` varchar(100) NOT NULL,
  `phone_number` varchar(40) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `company_name`, `phone_number`, `email`, `password`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'Parshav Shah', 'test', 'parshavshah1@gmail.com', '123456', '2019-09-22 15:26:48', '2019-09-22 15:26:48', NULL),
(2, 'Parshav Shah', 'test', 'parshavshah2@gmail.com', '123456', '2019-09-22 15:39:07', '2019-09-22 15:39:07', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bol_head`
--
ALTER TABLE `bol_head`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_fk_key` (`user_id`);

--
-- Indexes for table `bol_item_detail`
--
ALTER TABLE `bol_item_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bol_head`
--
ALTER TABLE `bol_head`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bol_item_detail`
--
ALTER TABLE `bol_item_detail`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bol_head`
--
ALTER TABLE `bol_head`
  ADD CONSTRAINT `user_fk_key` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
