-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 05, 2022 at 02:23 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hive_coffee_card`
--
CREATE DATABASE IF NOT EXISTS `hive_coffee_card` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `hive_coffee_card`;

-- --------------------------------------------------------

--
-- Table structure for table `stamp`
--

CREATE TABLE `stamp` (
  `stamp_id` int(10) NOT NULL,
  `stamp_total` int(9) NOT NULL,
  `stamp_datetime` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `stamp`
--

INSERT INTO `stamp` (`stamp_id`, `stamp_total`, `stamp_datetime`) VALUES
(1, 0, '0000-00-00 00:00:00.000000');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(10) NOT NULL,
  `user_name` varchar(30) NOT NULL,
  `user_email` varchar(50) NOT NULL,
  `user_role` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `user_email`, `user_role`) VALUES
(1, 'Loletta', 'loltta@gmail.com', 'customer'),
(2, 'Tonje ', 'tonje@yahoo.com', 'customer'),
(3, 'Justina Onyeukwu', 'justina@gmail.com', 'customer'),
(4, 'Sofia Kensington', 'sofia@hive.com', 'admin'),
(5, 'Steve Phil', 'teve@hive.com', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `stamp`
--
ALTER TABLE `stamp`
  ADD PRIMARY KEY (`stamp_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `stamp`
--
ALTER TABLE `stamp`
  MODIFY `stamp_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;