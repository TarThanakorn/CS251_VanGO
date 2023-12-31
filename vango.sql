-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 29, 2023 at 01:44 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vango`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `UID` int(10) UNSIGNED ZEROFILL NOT NULL,
  `Username` varchar(30) NOT NULL,
  `Password` varchar(100) DEFAULT NULL,
  `JoinDate` datetime DEFAULT current_timestamp(),
  `LastLogin` datetime DEFAULT NULL,
  `Status` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`UID`, `Username`, `Password`, `JoinDate`, `LastLogin`, `Status`) VALUES
(0000000001, 'admin', '$2a$12$mpbfQtVA5zpSDlq6ZbSWuOpdjoiCVmFKg0KFdAnnz.3X.PyWBGVhW', '2023-04-25 13:02:17', '2023-05-26 17:07:55', 1),
(0000000002, 'seller', '$2b$10$6s41AxN84691etGykDzNC.NXVGxHW3csU3cpuUcPpj0.pjioXIBX6', '2023-05-01 20:11:05', '2023-05-21 23:30:56', 2),
(0000000003, 'driver', '$2b$10$hCcQHVo8XCxZ84zTCG42buW/SONWJRNdnkAJT7I5CJJ14LAv.ndEG', '2023-05-01 20:12:48', '2023-05-26 17:18:25', 3),
(0000000004, 'user', '$2b$10$qCgy1yC.FbYH64hTBwmRd.m8tLllBQSgq6f2zyUOhszJy56pue10a', '2023-05-01 20:14:50', '2023-05-26 17:07:27', 1),
(0000000005, 'test', '$2b$10$RIIo7WtARD4Zjh6y.dtg5.DtljygAHVMWDRXpnItDkjlfnn8by/uS', '2023-05-27 00:27:11', '2023-05-27 00:38:42', 1);

-- --------------------------------------------------------

--
-- Table structure for table `data`
--

CREATE TABLE `data` (
  `UID` int(10) UNSIGNED ZEROFILL NOT NULL,
  `FName` varchar(30) DEFAULT NULL,
  `LName` varchar(30) DEFAULT NULL,
  `Birthday` date DEFAULT NULL,
  `Gender` varchar(1) DEFAULT '-',
  `ProfilePic` varchar(100) DEFAULT './profile.png',
  `EmpID` varchar(10) DEFAULT NULL,
  `LicPlate` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `data`
--

INSERT INTO `data` (`UID`, `FName`, `LName`, `Birthday`, `Gender`, `ProfilePic`, `EmpID`, `LicPlate`) VALUES
(0000000001, 'Admins', 'Account', '2023-01-01', 'M', './1.png', NULL, NULL),
(0000000002, 'Seller', 'Account', '2023-01-01', '-', './profile.png', '0', NULL),
(0000000003, 'Driver', 'Account', '2023-01-01', '-', './profile.png', '1', 'กข 1234'),
(0000000004, 'User', 'Acoount', '2023-01-01', 'M', './profile.png', NULL, NULL),
(0000000005, NULL, NULL, NULL, '-', './profile.png', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `route`
--

CREATE TABLE `route` (
  `RouteID` int(10) UNSIGNED ZEROFILL NOT NULL,
  `RStatus` int(1) NOT NULL DEFAULT 1,
  `REnter` int(1) NOT NULL,
  `RExit` int(1) NOT NULL,
  `RDate` varchar(30) NOT NULL,
  `RTime` varchar(5) NOT NULL,
  `RPrice` int(3) NOT NULL,
  `SeatInf` varchar(200) NOT NULL DEFAULT '{"s1":"0", "s2":"0", "s3":"0", "s4":"0", "s5":"0", "s6":"0", "s7":"0", "s8":"0", "s9":"0", "s10":"0", "s11":"0", "s12":"0", "s13":"0", "s14":"0"}'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `route`
--

INSERT INTO `route` (`RouteID`, `RStatus`, `REnter`, `RExit`, `RDate`, `RTime`, `RPrice`, `SeatInf`) VALUES
(0000000001, 4, 1, 2, '3 พฤษภาคม 2566', '18:00', 20, '{\"s1\":\"1\",\"s2\":\"1\",\"s3\":\"1\",\"s4\":\"1\",\"s5\":\"0\",\"s6\":\"0\",\"s7\":\"0\",\"s8\":\"0\",\"s9\":\"0\",\"s10\":\"0\",\"s11\":\"0\",\"s12\":\"0\",\"s13\":\"0\",\"s14\":\"0\"}'),
(0000000002, 3, 2, 3, '12 พฤษภาคม 2566', '16:00', 25, '{\"s1\":\"0\",\"s2\":\"1\",\"s3\":\"0\",\"s4\":\"0\",\"s5\":\"0\",\"s6\":\"0\",\"s7\":\"0\",\"s8\":\"0\",\"s9\":\"0\",\"s10\":\"0\",\"s11\":\"1\",\"s12\":\"0\",\"s13\":\"1\",\"s14\":\"0\"}'),
(0000000003, 2, 1, 4, '23 พฤษภาคม 2566', '14:30', 42, '{\"s1\":\"1\",\"s2\":\"1\",\"s3\":\"0\",\"s4\":\"1\",\"s5\":\"0\",\"s6\":\"1\",\"s7\":\"1\",\"s8\":\"1\",\"s9\":\"1\",\"s10\":\"0\",\"s11\":\"0\",\"s12\":\"0\",\"s13\":\"0\",\"s14\":\"0\"}'),
(0000000005, 1, 4, 1, '25 พฤษภาคม 2566', '08:10', 45, '{\"s1\":\"0\", \"s2\":\"0\", \"s3\":\"0\", \"s4\":\"0\", \"s5\":\"0\", \"s6\":\"0\", \"s7\":\"0\", \"s8\":\"0\", \"s9\":\"0\", \"s10\":\"0\", \"s11\":\"0\", \"s12\":\"0\", \"s13\":\"0\", \"s14\":\"0\"}'),
(0000000006, 1, 1, 4, '26 พฤษภาคม 2566', '19:20', 40, '{\"s1\":\"0\",\"s2\":\"0\",\"s3\":\"0\",\"s4\":\"0\",\"s5\":\"0\",\"s6\":\"1\",\"s7\":\"1\",\"s8\":\"0\",\"s9\":\"0\",\"s10\":\"0\",\"s11\":\"0\",\"s12\":\"0\",\"s13\":\"0\",\"s14\":\"0\"}');

-- --------------------------------------------------------

--
-- Table structure for table `tel`
--

CREATE TABLE `tel` (
  `UID` int(10) NOT NULL,
  `Tel` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tel`
--

INSERT INTO `tel` (`UID`, `Tel`) VALUES
(1, '0851659889'),
(2, NULL),
(3, NULL),
(4, NULL),
(5, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ticket`
--

CREATE TABLE `ticket` (
  `TID` int(10) UNSIGNED ZEROFILL NOT NULL,
  `TSeat` varchar(100) NOT NULL,
  `TStatus` int(1) NOT NULL DEFAULT 1,
  `UID` int(1) UNSIGNED ZEROFILL NOT NULL,
  `RouteID` int(1) UNSIGNED ZEROFILL NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `ticket`
--

INSERT INTO `ticket` (`TID`, `TSeat`, `TStatus`, `UID`, `RouteID`) VALUES
(0000000003, '2', 1, 1, 2),
(0000000004, '1', 1, 1, 1),
(0000000005, '11,13', 1, 1, 2),
(0000000006, '3', 1, 1, 1),
(0000000007, '1,4,7', 1, 1, 3),
(0000000008, '4', 1, 1, 1),
(0000000009, '2,6,8,9', 1, 1, 3),
(0000000010, '6,7', 1, 1, 6),
(0000000011, '2', 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `van`
--

CREATE TABLE `van` (
  `VID` varchar(10) NOT NULL,
  `UID` varchar(10) NOT NULL,
  `VSeatCount` int(2) NOT NULL,
  `RouteID` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `van`
--

INSERT INTO `van` (`VID`, `UID`, `VSeatCount`, `RouteID`) VALUES
('0000000001', '0000000003', 14, '0000000001');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`UID`);

--
-- Indexes for table `data`
--
ALTER TABLE `data`
  ADD PRIMARY KEY (`UID`);

--
-- Indexes for table `route`
--
ALTER TABLE `route`
  ADD PRIMARY KEY (`RouteID`);

--
-- Indexes for table `tel`
--
ALTER TABLE `tel`
  ADD PRIMARY KEY (`UID`);

--
-- Indexes for table `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`TID`);

--
-- Indexes for table `van`
--
ALTER TABLE `van`
  ADD PRIMARY KEY (`VID`,`UID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `UID` int(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `data`
--
ALTER TABLE `data`
  MODIFY `UID` int(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `route`
--
ALTER TABLE `route`
  MODIFY `RouteID` int(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tel`
--
ALTER TABLE `tel`
  MODIFY `UID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `ticket`
--
ALTER TABLE `ticket`
  MODIFY `TID` int(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
