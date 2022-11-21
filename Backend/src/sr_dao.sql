-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 18, 2022 at 06:42 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sr_dao`
--

-- --------------------------------------------------------

--
-- Table structure for table `guarding_details`
--

CREATE TABLE `guarding_details` (
  `walletAddress` varchar(255) NOT NULL,
  `userAddressMM` varchar(255) NOT NULL,
  `spAddress` varchar(255) NOT NULL,
  `fee` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `guarding_details`
--

INSERT INTO `guarding_details` (`walletAddress`, `userAddressMM`, `spAddress`, `fee`) VALUES
('0x9140a5f347ed608256a4aaf268d8f48bd630100b', '0xCce0886d48BeeDa8ba9f136C74493CE0AD799Bf6', '0xb2fb886eb402848b772469a34a7180747c7f7934', 0.1),
('0x9140a5f347ed608256a4aaf268d8f48bd630100b', '0xcce0886d48beeda8ba9f136c74493ce0ad799bf6', '0xf9901cc6bbc8518088b2c8350fcd0635a23b250e', 0.1),
('0x9140a5f347ed608256a4aaf268d8f48bd630100b', '0xcce0886d48beeda8ba9f136c74493ce0ad799bf6', '0xf9901cc6bbc8518088b2c8350fcd0635a23b250e', 0.1),
('0x9140a5f347ed608256a4aaf268d8f48bd630100b', '0xcce0886d48beeda8ba9f136c74493ce0ad799bf6', '0xf9901cc6bbc8518088b2c8350fcd0635a23b250e', 0.1),
('0x9140a5f347ed608256a4aaf268d8f48bd630100b', '0xcce0886d48beeda8ba9f136c74493ce0ad799bf6', '0xf9901cc6bbc8518088b2c8350fcd0635a23b250e', 0.1);

-- --------------------------------------------------------

--
-- Table structure for table `user_request`
--

CREATE TABLE `user_request` (
  `enrollReqId` int(11) NOT NULL,
  `spAddress` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `fee` double NOT NULL,
  `walletAddress` varchar(255) NOT NULL,
  `userAddressMM` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_request`
--

INSERT INTO `user_request` (`enrollReqId`, `spAddress`, `type`, `fee`, `walletAddress`, `userAddressMM`, `status`) VALUES
(37, '0xf9901cc6bbc8518088b2c8350fcd0635a23b250e', 'enroll', 0.1, '0x9140a5f347ed608256a4aaf268d8f48bd630100b', '0xCce0886d48BeeDa8ba9f136C74493CE0AD799Bf6', 'pending');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `guarding_details`
--
ALTER TABLE `guarding_details`
  ADD KEY `address` (`walletAddress`,`spAddress`) USING BTREE;

--
-- Indexes for table `user_request`
--
ALTER TABLE `user_request`
  ADD PRIMARY KEY (`enrollReqId`),
  ADD UNIQUE KEY `address` (`spAddress`,`walletAddress`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user_request`
--
ALTER TABLE `user_request`
  MODIFY `enrollReqId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
