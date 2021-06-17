-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 04, 2021 at 05:47 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.4.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `homework`
--

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE `classes` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `code` char(6) DEFAULT NULL,
  `date_start` date DEFAULT NULL,
  `date_end` date DEFAULT NULL,
  `description` tinytext DEFAULT NULL,
  `photo` tinytext DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`id`, `name`, `code`, `date_start`, `date_end`, `description`, `photo`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('1eb8624f-c190-44bb-89ff-b04618bec9b3', 'kelas Fisika', 'KF', '1999-12-02', '1999-11-12', NULL, '64680922dcd25975043054d0ef506fb4.jpg', '2021-04-04 12:34:30', '2021-04-04 12:35:27', NULL),
('2d5fe1a9-2209-4116-b55a-3f79859d12fd', 'kelas Fisika', 'KF', '1999-12-02', '1999-11-12', NULL, '9e8ba6ff4d8b1346ed000380953b0edc.jpg', '2021-04-04 11:43:20', '2021-04-04 12:00:54', '2021-04-04 12:09:28'),
('d15dd1c2-058a-4cc1-b56c-0242034140e5', 'kelas Kimia', 'KK', '1999-12-02', '1999-11-12', NULL, '8bbed681866f42fc139c9a18736ace79.jpg', '2021-04-04 14:27:07', '2021-04-04 14:27:07', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `join_classes`
--

CREATE TABLE `join_classes` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `class_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `users_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `role` enum('student','tutor','spv') DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `join_classes`
--

INSERT INTO `join_classes` (`id`, `class_id`, `users_id`, `role`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('27b30daa-6268-41cb-8bd3-9988ca58aba8', '1eb8624f-c190-44bb-89ff-b04618bec9b3', '5c995c6d-e6e5-44f8-bfdd-b6455197cbfa', 'student', '2021-04-04 15:06:30', '2021-04-04 15:06:30', NULL),
('5fa457bf-6420-423c-a607-f51d5329635c', '1eb8624f-c190-44bb-89ff-b04618bec9b3', '5c995c6d-e6e5-44f8-bfdd-b6455197cbfa', 'student', '2021-04-04 14:47:09', '2021-04-04 14:47:09', NULL),
('8171dae6-5f74-4aee-8752-3c34f5308238', '1eb8624f-c190-44bb-89ff-b04618bec9b3', '33cba63c-c2e7-4051-90c8-abde1707fd3b', '', '2021-04-04 14:47:09', '2021-04-04 14:47:09', NULL),
('c32c05bf-be09-4780-9a81-cebf16a04118', '1eb8624f-c190-44bb-89ff-b04618bec9b3', '33cba63c-c2e7-4051-90c8-abde1707fd3b', '', '2021-04-04 15:06:30', '2021-04-04 15:06:30', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `materials`
--

CREATE TABLE `materials` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `schedule_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `file` tinytext DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `materials`
--

INSERT INTO `materials` (`id`, `schedule_id`, `name`, `file`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('13520691-b1b1-4d0e-94c7-10767441f991', NULL, 'slide3 new', '6e8fc4a66cbd929dcdeed3244cdaf73f.jpg', '2021-04-04 14:02:00', '2021-04-04 14:03:14', '2021-04-04 14:03:47'),
('3567fe3f-0d8d-4171-b531-55a4205f7f24', NULL, 'slide', NULL, '2021-04-04 14:01:14', '2021-04-04 14:01:14', NULL),
('3b5e6d20-1ac6-48e3-bb04-bbb9ae7df1d9', NULL, 'slide3 hhh', '22e2f84f098013ccddc6e73496a12fd4.jpg', '2021-04-04 14:02:55', '2021-04-04 14:02:55', NULL),
('f0c4369c-4984-449c-8d66-32a0d413cd7c', NULL, 'slide2', 'e1daca963000b2c3b15dfd8d65ad359a.jpg', '2021-04-04 14:01:39', '2021-04-04 14:01:39', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `presences`
--

CREATE TABLE `presences` (
  `join_class_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `schedule_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `created_at` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `presences`
--

INSERT INTO `presences` (`join_class_id`, `schedule_id`, `created_at`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('c32c05bf-be09-4780-9a81-cebf16a04118', NULL, 30, '2021-04-04 15:33:21', '2021-04-04 15:33:21', NULL),
('27b30daa-6268-41cb-8bd3-9988ca58aba8', NULL, 37, '2021-04-04 15:33:21', '2021-04-04 15:33:21', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

CREATE TABLE `schedules` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `class_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `code` char(6) DEFAULT NULL,
  `start` datetime DEFAULT NULL,
  `end` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `schedules`
--

INSERT INTO `schedules` (`id`, `class_id`, `name`, `code`, `start`, `end`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('07941cae-af8e-4b5e-993a-e65cc8fac0d2', '1eb8624f-c190-44bb-89ff-b04618bec9b3', 'pagi senin baru', 'P14', '2001-12-02 00:00:00', '2001-12-02 00:00:00', '2021-04-04 13:16:28', '2021-04-04 13:25:06', '2021-04-04 13:25:15'),
('ce6cc836-950e-4611-b65c-8d61d481ed51', '1eb8624f-c190-44bb-89ff-b04618bec9b3', 'pagi rabu', 'P1', '1991-12-13 00:00:00', '1991-12-13 00:00:00', '2021-04-04 13:15:28', '2021-04-04 14:57:08', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20210402125017-create-users.js'),
('20210402134018-create-materials.js'),
('20210402134039-create-classes.js'),
('20210402134039-create-join-classes.js'),
('20210402134039-create-presences.js'),
('20210402134039-create-schedules.js');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `place_birth` varchar(50) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` text DEFAULT NULL,
  `phone` char(12) DEFAULT NULL,
  `last_study` varchar(20) DEFAULT NULL,
  `institution` varchar(50) DEFAULT NULL,
  `current_job` varchar(50) DEFAULT NULL,
  `sosmed` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `place_birth`, `birthdate`, `email`, `password`, `phone`, `last_study`, `institution`, `current_job`, `sosmed`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('33cba63c-c2e7-4051-90c8-abde1707fd3b', 'Alexa', 'Jakarta', '1991-12-09', 'alexa@gmail.com', '$2b$08$m9aGpPZwYjGzqryxv9DKCO3bfQrnVW3ZUYSkaVRcZqbr.tWDYb22S', '(083)161-162', 'SMA', 'SMA TARAKANITA', 'student', NULL, '2021-04-03 13:43:45', '2021-04-03 13:43:45', NULL),
('5c995c6d-e6e5-44f8-bfdd-b6455197cbfa', 'Ghany Abdillah Ersa', 'Jakarta', '0000-00-00', 'ghanyersa24@gmail.com', '$2b$08$WMCXSIyTPXha638nh6UkPONTYdT5b6xWDGhMCwTimdCc0tLUBvZGK', '082164028264', NULL, NULL, NULL, NULL, '2021-04-04 07:34:52', '2021-04-04 07:34:52', NULL),
('6e28eded-8270-46e6-a96c-e1656d6cffc2', 'Ghany Abdillah', 'Jakarta', '0000-00-00', 'ghanyersa25@gmail.com', '$2b$08$vn6C/qwhE.9BAB9znuhe9OPWxIBqDdpmpXYHFwGsCx3pSyGmj1Jvm', '082164028265', NULL, NULL, NULL, NULL, '2021-04-04 07:35:47', '2021-04-04 07:35:47', '2021-04-04 07:39:28'),
('d7931618-d1d9-4b3b-9e2a-a6f0a79fe6e7', 'Irfan Prasetyo', 'Jakarta', '1991-11-23', 'ghanyersa25@gmail.com', '$2b$08$fyx7lJhIHk.JWwOHuc5BFuAxGIa2crePbtGG/rKX3dHj3.k11wZWi', '082164028265', 'SMA', NULL, 'Student', 'fb', '2021-04-04 07:41:20', '2021-04-04 09:16:02', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `join_classes`
--
ALTER TABLE `join_classes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `materials`
--
ALTER TABLE `materials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
