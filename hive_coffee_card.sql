-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Jan 11, 2023 at 09:11 PM
-- Server version: 8.0.29
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

-- --------------------------------------------------------

--
-- Table structure for table `stamp`
--

CREATE TABLE `stamp` (
  `stamp_id` int NOT NULL,
  `stamp_total` int DEFAULT NULL,
  `stamp_datetime` datetime(6) NOT NULL,
  `user_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `stamp`
--

INSERT INTO `stamp` (`stamp_id`, `stamp_total`, `stamp_datetime`, `user_id`) VALUES
(1, 6, '2023-01-11 21:03:20.000000', 1),
(2, NULL, '2022-11-04 09:22:26.553573', 4),
(3, NULL, '2022-11-04 12:30:20.444444', 5),
(4, 5, '2022-11-04 08:36:26.553444', 3),
(5, 7, '2022-11-04 10:28:31.454553', 6),
(6, 9, '2022-11-04 13:36:36.445553', 7),
(7, 8, '2022-11-04 07:27:26.295553', 8),
(8, 4, '2022-11-04 10:18:31.444434', 9),
(9, 0, '2022-12-16 00:00:00.000000', 2),
(10, 8, '2022-02-17 10:30:20.308456', 10);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int NOT NULL,
  `user_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_email` varchar(50) NOT NULL,
  `user_password` varchar(400) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_role` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `user_email`, `user_password`, `user_role`) VALUES
(1, 'Loletta', 'loltta@gmail.com', '', 'customer'),
(2, 'Tonje ', 'tonje@yahoo.com', '', 'customer'),
(3, 'Justina Onyeukwu', 'justina@gmail.com', '', 'customer'),
(4, 'Sofia Kensington', 'sofia@hive.com', 'sofia', 'admin'),
(5, 'Steve Phil', 'teve@hive.com', '', 'admin'),
(6, 'Joan Kawumba', 'joankawumba@gmail.com', '', 'customer'),
(7, 'lishin liang', 'lishin23@hotmail.com', '', 'customer'),
(8, 'crsyto panda', 'panda123@yahoo.com', '', 'customer'),
(9, 'Dan Daniel', 'dadyera@gmail.com', '', 'customer'),
(10, 'mcklyer elvis', 'mcklyer45@outlook.com', '', 'customer');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `stamp`
--
ALTER TABLE `stamp`
  ADD PRIMARY KEY (`stamp_id`),
  ADD KEY `user_id` (`user_id`);

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
  MODIFY `stamp_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `stamp`
--
ALTER TABLE `stamp`
  ADD CONSTRAINT `stamp_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
