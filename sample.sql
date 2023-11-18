-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 18, 2023 at 10:40 AM
-- Server version: 11.0.3-MariaDB-log
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sample`
--

-- --------------------------------------------------------

--
-- Table structure for table `accesshistory`
--

CREATE TABLE `accesshistory` (
  `id` varchar(191) NOT NULL,
  `device` varchar(191) NOT NULL,
  `url` varchar(191) NOT NULL DEFAULT '/',
  `ip` varchar(191) DEFAULT NULL,
  `accessTime` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `timeToLeave` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `providerType` varchar(191) NOT NULL,
  `providerId` varchar(191) NOT NULL,
  `providerAccountId` varchar(191) NOT NULL,
  `refreshToken` varchar(191) DEFAULT NULL,
  `accessToken` varchar(191) DEFAULT NULL,
  `accessTokenExpires` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `imageId` varchar(191) DEFAULT NULL,
  `roleId` varchar(191) NOT NULL,
  `publish` varchar(191) NOT NULL DEFAULT 'publish',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `email`, `password`, `name`, `imageId`, `roleId`, `publish`, `createdAt`, `updatedAt`) VALUES
('clozjqlzu0002u64c63u441lm', 'admin@admin.com', '$2b$10$ARX30ahhIDOtUmzquTilN.bqtKkRnIjZZIBEFmjKDT/dAcoBITBrK', 'Admin', NULL, 'clozjqlv50000u64co8d05k8m', 'publish', '2023-11-15 09:14:52.495', '2023-11-15 09:14:52.495');

-- --------------------------------------------------------

--
-- Table structure for table `adminhistory`
--

CREATE TABLE `adminhistory` (
  `id` int(11) NOT NULL,
  `status` varchar(191) NOT NULL,
  `action` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `tableName` varchar(191) DEFAULT NULL,
  `data` text DEFAULT NULL,
  `adminId` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `adminhistory`
--

INSERT INTO `adminhistory` (`id`, `status`, `action`, `title`, `tableName`, `data`, `adminId`, `createdAt`, `updatedAt`) VALUES
(1, 'success', 'Đăng nhập', 'Đăng nhập mới tại trang quản trị', NULL, NULL, 'clozjqlzu0002u64c63u441lm', '2023-11-15 09:15:06.398', '2023-11-15 09:15:06.398'),
(2, 'error', 'Cập nhập', 'chỉnh sửa dữ liệu bảng role', 'role', NULL, 'clozjqlzu0002u64c63u441lm', '2023-11-16 07:41:38.967', '2023-11-16 07:41:38.967'),
(3, 'success', 'Cập nhập', 'chỉnh sửa dữ liệu bảng role', 'role', '{\n  \"name\": \"Administrator\",\n  \"permissions\": {\n    \"create\": [\n      {\n        \"permissionKey\": \"browse\",\n        \"permissionTableName\": \"admin\"\n      },\n      {\n        \"permissionKey\": \"browse\",\n        \"permissionTableName\": \"role\"\n      },\n      {\n        \"permissionKey\": \"create\",\n        \"permissionTableName\": \"admin\"\n      },\n      {\n        \"permissionKey\": \"create\",\n        \"permissionTableName\": \"role\"\n      },\n      {\n        \"permissionKey\": \"delete\",\n        \"permissionTableName\": \"admin\"\n      },\n      {\n        \"permissionKey\": \"delete\",\n        \"permissionTableName\": \"role\"\n      },\n      {\n        \"permissionKey\": \"edit\",\n        \"permissionTableName\": \"admin\"\n      },\n      {\n        \"permissionKey\": \"edit\",\n        \"permissionTableName\": \"role\"\n      },\n      {\n        \"permissionKey\": \"image\",\n        \"permissionTableName\": \"admin\"\n      },\n      {\n        \"permissionKey\": \"image\",\n        \"permissionTableName\": \"role\"\n      },\n      {\n        \"permissionKey\": \"browse\",\n        \"permissionTableName\": \"setting\"\n      },\n      {\n        \"permissionKey\": \"create\",\n        \"permissionTableName\": \"setting\"\n      },\n      {\n        \"permissionKey\": \"edit\",\n        \"permissionTableName\": \"setting\"\n      },\n      {\n        \"permissionKey\": \"delete\",\n        \"permissionTableName\": \"setting\"\n      },\n      {\n        \"permissionKey\": \"image\",\n        \"permissionTableName\": \"setting\"\n      }\n    ]\n  }\n}', 'clozjqlzu0002u64c63u441lm', '2023-11-16 08:40:52.427', '2023-11-16 08:40:52.427'),
(4, 'success', 'Cập nhập', 'Chỉnh sửa các trường dữ liệu cài đặt', 'setting', NULL, 'clozjqlzu0002u64c63u441lm', '2023-11-16 10:33:55.934', '2023-11-16 10:33:55.934'),
(5, 'success', 'Cập nhập', 'chỉnh sửa dữ liệu bảng role', 'role', '{\n  \"name\": \"Administrator\",\n  \"permissions\": {\n    \"create\": [\n      {\n        \"permissionKey\": \"browse\",\n        \"permissionTableName\": \"admin\"\n      },\n      {\n        \"permissionKey\": \"create\",\n        \"permissionTableName\": \"admin\"\n      },\n      {\n        \"permissionKey\": \"edit\",\n        \"permissionTableName\": \"admin\"\n      },\n      {\n        \"permissionKey\": \"delete\",\n        \"permissionTableName\": \"admin\"\n      },\n      {\n        \"permissionKey\": \"image\",\n        \"permissionTableName\": \"admin\"\n      },\n      {\n        \"permissionKey\": \"browse\",\n        \"permissionTableName\": \"role\"\n      },\n      {\n        \"permissionKey\": \"create\",\n        \"permissionTableName\": \"role\"\n      },\n      {\n        \"permissionKey\": \"edit\",\n        \"permissionTableName\": \"role\"\n      },\n      {\n        \"permissionKey\": \"delete\",\n        \"permissionTableName\": \"role\"\n      },\n      {\n        \"permissionKey\": \"image\",\n        \"permissionTableName\": \"role\"\n      },\n      {\n        \"permissionKey\": \"browse\",\n        \"permissionTableName\": \"setting\"\n      },\n      {\n        \"permissionKey\": \"create\",\n        \"permissionTableName\": \"setting\"\n      },\n      {\n        \"permissionKey\": \"edit\",\n        \"permissionTableName\": \"setting\"\n      },\n      {\n        \"permissionKey\": \"delete\",\n        \"permissionTableName\": \"setting\"\n      },\n      {\n        \"permissionKey\": \"image\",\n        \"permissionTableName\": \"setting\"\n      },\n      {\n        \"permissionKey\": \"browse\",\n        \"permissionTableName\": \"groupScene\"\n      },\n      {\n        \"permissionKey\": \"create\",\n        \"permissionTableName\": \"groupScene\"\n      },\n      {\n        \"permissionKey\": \"edit\",\n        \"permissionTableName\": \"groupScene\"\n      },\n      {\n        \"permissionKey\": \"delete\",\n        \"permissionTableName\": \"groupScene\"\n      },\n      {\n        \"permissionKey\": \"image\",\n        \"permissionTableName\": \"groupScene\"\n      },\n      {\n        \"permissionKey\": \"browse\",\n        \"permissionTableName\": \"scene\"\n      },\n      {\n        \"permissionKey\": \"create\",\n        \"permissionTableName\": \"scene\"\n      },\n      {\n        \"permissionKey\": \"edit\",\n        \"permissionTableName\": \"scene\"\n      },\n      {\n        \"permissionKey\": \"delete\",\n        \"permissionTableName\": \"scene\"\n      },\n      {\n        \"permissionKey\": \"image\",\n        \"permissionTableName\": \"scene\"\n      },\n      {\n        \"permissionKey\": \"browse\",\n        \"permissionTableName\": \"linkHotspot\"\n      },\n      {\n        \"permissionKey\": \"create\",\n        \"permissionTableName\": \"linkHotspot\"\n      },\n      {\n        \"permissionKey\": \"edit\",\n        \"permissionTableName\": \"linkHotspot\"\n      },\n      {\n        \"permissionKey\": \"delete\",\n        \"permissionTableName\": \"linkHotspot\"\n      },\n      {\n        \"permissionKey\": \"image\",\n        \"permissionTableName\": \"linkHotspot\"\n      },\n      {\n        \"permissionKey\": \"browse\",\n        \"permissionTableName\": \"infoHotspot\"\n      },\n      {\n        \"permissionKey\": \"create\",\n        \"permissionTableName\": \"infoHotspot\"\n      },\n      {\n        \"permissionKey\": \"edit\",\n        \"permissionTableName\": \"infoHotspot\"\n      },\n      {\n        \"permissionKey\": \"delete\",\n        \"permissionTableName\": \"infoHotspot\"\n      },\n      {\n        \"permissionKey\": \"image\",\n        \"permissionTableName\": \"infoHotspot\"\n      }\n    ]\n  }\n}', 'clozjqlzu0002u64c63u441lm', '2023-11-18 02:08:36.497', '2023-11-18 02:08:36.497');

-- --------------------------------------------------------

--
-- Table structure for table `file`
--

CREATE TABLE `file` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `mime` varchar(191) NOT NULL,
  `caption` varchar(191) DEFAULT NULL,
  `url` varchar(191) NOT NULL,
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `naturalHeight` int(11) DEFAULT NULL,
  `naturalWidth` int(11) DEFAULT NULL,
  `size` double NOT NULL,
  `tableName` varchar(191) NOT NULL,
  `adminId` varchar(191) NOT NULL,
  `folderFileId` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `file`
--

INSERT INTO `file` (`id`, `name`, `mime`, `caption`, `url`, `width`, `height`, `naturalHeight`, `naturalWidth`, `size`, `tableName`, `adminId`, `folderFileId`, `createdAt`, `updatedAt`) VALUES
('clp3wlsru0003u6ikwwbc0byj', 'sáº£nh chÃ­nh.jpg', 'image/jpeg', NULL, '/storage/scene/0beb087b-93cb-4c84-9c0e-7c928759704c.jpg', NULL, NULL, 5982, 11964, 38465663, 'scene', 'clozjqlzu0002u64c63u441lm', 'clp3vypcq0001u6ikdc5nfmtw', '2023-11-18 10:26:07.649', '2023-11-18 10:26:07.649'),
('clp3wlss00005u6iksf0fw2w4', '6.jpg', 'image/jpeg', NULL, '/storage/scene/f38ec1b6-f820-49d5-9d52-36e839841a2f.jpg', NULL, NULL, 6006, 12012, 25541433, 'scene', 'clozjqlzu0002u64c63u441lm', 'clp3vypcq0001u6ikdc5nfmtw', '2023-11-18 10:26:07.649', '2023-11-18 10:26:07.649'),
('clp3wlss10007u6ikhkwp66jc', '5.jpg', 'image/jpeg', NULL, '/storage/scene/2f40744b-e884-4da8-b42e-8d6bd7788c57.jpg', NULL, NULL, 6106, 12212, 26309041, 'scene', 'clozjqlzu0002u64c63u441lm', 'clp3vypcq0001u6ikdc5nfmtw', '2023-11-18 10:26:07.649', '2023-11-18 10:26:07.649'),
('clp3wlss20009u6iks1gs4tw5', '4.jpg', 'image/jpeg', NULL, '/storage/scene/5619bb0d-2da1-4220-9ea6-60cd50c020bb.jpg', NULL, NULL, 6078, 12156, 29501949, 'scene', 'clozjqlzu0002u64c63u441lm', 'clp3vypcq0001u6ikdc5nfmtw', '2023-11-18 10:26:07.649', '2023-11-18 10:26:07.649'),
('clp3wlss3000bu6ikhkrumbvk', '3.jpg', 'image/jpeg', NULL, '/storage/scene/74475896-416c-43ba-b8a0-26cc1ba2c2ac.jpg', NULL, NULL, 6060, 12120, 26336000, 'scene', 'clozjqlzu0002u64c63u441lm', 'clp3vypcq0001u6ikdc5nfmtw', '2023-11-18 10:26:07.649', '2023-11-18 10:26:07.649'),
('clp3wlss5000du6ik8nfht9ee', '2.jpg', 'image/jpeg', NULL, '/storage/scene/93b93200-f7f9-40d1-ab5b-78eded1b794f.jpg', NULL, NULL, 6064, 12128, 36048525, 'scene', 'clozjqlzu0002u64c63u441lm', 'clp3vypcq0001u6ikdc5nfmtw', '2023-11-18 10:26:07.649', '2023-11-18 10:26:07.649'),
('clp3wlss5000fu6ikz9o8p6hn', '1.jpg', 'image/jpeg', NULL, '/storage/scene/68217b6f-2f7c-46a6-a0b3-c014265935ec.jpg', NULL, NULL, 6022, 12042, 36045485, 'scene', 'clozjqlzu0002u64c63u441lm', 'clp3vypcq0001u6ikdc5nfmtw', '2023-11-18 10:26:07.649', '2023-11-18 10:26:07.649'),
('clp3wlss6000hu6iktdhzyq8s', 'Sáº¢nh chá» 1.jpg', 'image/jpeg', NULL, '/storage/scene/8bdbaaae-7044-49d3-9862-c078222367c3.jpg', NULL, NULL, 6019, 12038, 37338135, 'scene', 'clozjqlzu0002u64c63u441lm', 'clp3vypcq0001u6ikdc5nfmtw', '2023-11-18 10:26:07.649', '2023-11-18 10:26:07.649'),
('clp3wlss6000ju6ik2le2nox5', 'Sáº£nh 2.jpg', 'image/jpeg', NULL, '/storage/scene/4552cb2b-a2f1-4e64-a179-211e70e63bab.jpg', NULL, NULL, 5980, 12068, 24482568, 'scene', 'clozjqlzu0002u64c63u441lm', 'clp3vypcq0001u6ikdc5nfmtw', '2023-11-18 10:26:07.649', '2023-11-18 10:26:07.649'),
('clp3wlss7000lu6ikhhuo67rb', 'nhÃ  hÃ ng 2.jpg', 'image/jpeg', NULL, '/storage/scene/343491e8-d2e4-4451-8244-c5f6092df4b5.jpg', NULL, NULL, 5980, 12024, 25176563, 'scene', 'clozjqlzu0002u64c63u441lm', 'clp3vypcq0001u6ikdc5nfmtw', '2023-11-18 10:26:07.649', '2023-11-18 10:26:07.649'),
('clp3wlss7000nu6ik3t5h7609', 'Sáº£nh phÃ²ng há»p 2 .jpg', 'image/jpeg', NULL, '/storage/scene/37519d43-5a4c-4881-bbb1-a08acb2c3798.jpg', NULL, NULL, 5980, 11960, 22042180, 'scene', 'clozjqlzu0002u64c63u441lm', 'clp3vypcq0001u6ikdc5nfmtw', '2023-11-18 10:26:07.649', '2023-11-18 10:26:07.649'),
('clp3wlss7000pu6iktvre82pj', 'NhÃ  hÃ ng.jpg', 'image/jpeg', NULL, '/storage/scene/2bb30ee9-c20c-4820-a964-d9174f61a26d.jpg', NULL, NULL, 6052, 12104, 25360511, 'scene', 'clozjqlzu0002u64c63u441lm', 'clp3vypcq0001u6ikdc5nfmtw', '2023-11-18 10:26:07.649', '2023-11-18 10:26:07.649'),
('clp3wlss7000ru6ikolgqv8me', 'PhÃ²ng há»p 1.2.jpg', 'image/jpeg', NULL, '/storage/scene/977e7bde-b776-4bdb-8ba7-4a84a0f10f91.jpg', NULL, NULL, 6006, 12014, 25741147, 'scene', 'clozjqlzu0002u64c63u441lm', 'clp3vypcq0001u6ikdc5nfmtw', '2023-11-18 10:26:07.649', '2023-11-18 10:26:07.649'),
('clp3wlss7000tu6ikw1vvtl76', 'PhÃ²ng há»p 1.1.jpg', 'image/jpeg', NULL, '/storage/scene/6ab686cf-6a16-4ace-b378-9f8c7c4b69ed.jpg', NULL, NULL, 6022, 12044, 25919081, 'scene', 'clozjqlzu0002u64c63u441lm', 'clp3vypcq0001u6ikdc5nfmtw', '2023-11-18 10:26:07.649', '2023-11-18 10:26:07.649'),
('clp3wlss8000vu6ika4u28k33', 'PhÃ²ng ngá»§ 1.2.jpg', 'image/jpeg', NULL, '/storage/scene/878a479f-7f54-49ef-b059-abf70ad28325.jpg', NULL, NULL, 6042, 12084, 28049741, 'scene', 'clozjqlzu0002u64c63u441lm', 'clp3vypcq0001u6ikdc5nfmtw', '2023-11-18 10:26:07.649', '2023-11-18 10:26:07.649'),
('clp3wlss8000xu6iks2huatfr', 'Sáº£nh phÃ²ng há»p.jpg', 'image/jpeg', NULL, '/storage/scene/da3e3ee4-9aba-4646-9ab7-f85b567464fa.jpg', NULL, NULL, 5991, 11984, 22465542, 'scene', 'clozjqlzu0002u64c63u441lm', 'clp3vypcq0001u6ikdc5nfmtw', '2023-11-18 10:26:07.649', '2023-11-18 10:26:07.649'),
('clp3wlss8000zu6iklsh0jecg', 'Sáº£nh nhÃ  hÃ ng.jpg', 'image/jpeg', NULL, '/storage/scene/d2e9ebed-bbeb-4a80-a4d0-ed45ec6fdb6d.jpg', NULL, NULL, 6011, 12020, 23873910, 'scene', 'clozjqlzu0002u64c63u441lm', 'clp3vypcq0001u6ikdc5nfmtw', '2023-11-18 10:26:07.649', '2023-11-18 10:26:07.649');

-- --------------------------------------------------------

--
-- Table structure for table `folderfile`
--

CREATE TABLE `folderfile` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `tableName` varchar(191) NOT NULL,
  `adminId` varchar(191) NOT NULL,
  `parentId` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `folderfile`
--

INSERT INTO `folderfile` (`id`, `name`, `tableName`, `adminId`, `parentId`, `createdAt`, `updatedAt`) VALUES
('clp3vypcq0001u6ikdc5nfmtw', 'Điểm chụp', 'scene', 'clozjqlzu0002u64c63u441lm', NULL, '2023-11-18 10:08:10.195', '2023-11-18 10:08:10.195');

-- --------------------------------------------------------

--
-- Table structure for table `groupscene`
--

CREATE TABLE `groupscene` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `sort` int(11) DEFAULT NULL,
  `publish` varchar(191) NOT NULL DEFAULT 'publish',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `groupsetting`
--

CREATE TABLE `groupsetting` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `label` varchar(191) DEFAULT NULL,
  `sort` int(11) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `groupsetting`
--

INSERT INTO `groupsetting` (`id`, `name`, `label`, `sort`, `createdAt`, `updatedAt`) VALUES
('00cb5d9a-f2b1-4d03-a245-199e3571bcb1', 'Admin', NULL, 2, '2023-11-16 10:33:55.900', '2023-11-16 10:33:55.900'),
('d1eff184-7503-450f-97ab-3abf6caf2bb0', 'Site', NULL, 1, '2023-11-16 10:33:55.900', '2023-11-16 10:33:55.900');

-- --------------------------------------------------------

--
-- Table structure for table `infohotspot`
--

CREATE TABLE `infohotspot` (
  `id` varchar(191) NOT NULL,
  `yaw` double NOT NULL,
  `pitch` double NOT NULL,
  `direction` varchar(191) DEFAULT NULL,
  `title` varchar(191) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(191) DEFAULT NULL,
  `type` varchar(191) DEFAULT NULL,
  `video` varchar(191) DEFAULT NULL,
  `sceneId` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `linkhotspot`
--

CREATE TABLE `linkhotspot` (
  `id` varchar(191) NOT NULL,
  `yaw` double NOT NULL,
  `pitch` double NOT NULL,
  `direction` varchar(191) DEFAULT NULL,
  `target` varchar(191) NOT NULL,
  `type` varchar(191) DEFAULT NULL,
  `sceneId` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permission`
--

CREATE TABLE `permission` (
  `key` varchar(191) NOT NULL,
  `tableName` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permission`
--

INSERT INTO `permission` (`key`, `tableName`, `createdAt`, `updatedAt`) VALUES
('browse', 'admin', '2023-11-15 09:14:52.131', '2023-11-15 09:14:52.131'),
('browse', 'groupScene', '2023-11-18 02:08:35.879', '2023-11-18 02:08:35.879'),
('browse', 'infoHotspot', '2023-11-18 02:08:35.879', '2023-11-18 02:08:35.879'),
('browse', 'linkHotspot', '2023-11-18 02:08:35.879', '2023-11-18 02:08:35.879'),
('browse', 'role', '2023-11-15 09:14:52.131', '2023-11-15 09:14:52.131'),
('browse', 'scene', '2023-11-18 02:08:35.879', '2023-11-18 02:08:35.879'),
('browse', 'setting', '2023-11-16 08:40:52.064', '2023-11-16 08:40:52.064'),
('create', 'admin', '2023-11-15 09:14:52.131', '2023-11-15 09:14:52.131'),
('create', 'groupScene', '2023-11-18 02:08:35.879', '2023-11-18 02:08:35.879'),
('create', 'infoHotspot', '2023-11-18 02:08:35.879', '2023-11-18 02:08:35.879'),
('create', 'linkHotspot', '2023-11-18 02:08:35.879', '2023-11-18 02:08:35.879'),
('create', 'role', '2023-11-15 09:14:52.131', '2023-11-15 09:14:52.131'),
('create', 'scene', '2023-11-18 02:08:35.879', '2023-11-18 02:08:35.879'),
('create', 'setting', '2023-11-16 08:40:52.064', '2023-11-16 08:40:52.064'),
('delete', 'admin', '2023-11-15 09:14:52.131', '2023-11-15 09:14:52.131'),
('delete', 'groupScene', '2023-11-18 02:08:35.879', '2023-11-18 02:08:35.879'),
('delete', 'infoHotspot', '2023-11-18 02:08:35.879', '2023-11-18 02:08:35.879'),
('delete', 'linkHotspot', '2023-11-18 02:08:35.879', '2023-11-18 02:08:35.879'),
('delete', 'role', '2023-11-15 09:14:52.131', '2023-11-15 09:14:52.131'),
('delete', 'scene', '2023-11-18 02:08:35.879', '2023-11-18 02:08:35.879'),
('delete', 'setting', '2023-11-16 08:40:52.064', '2023-11-16 08:40:52.064'),
('edit', 'admin', '2023-11-15 09:14:52.131', '2023-11-15 09:14:52.131'),
('edit', 'groupScene', '2023-11-18 02:08:35.879', '2023-11-18 02:08:35.879'),
('edit', 'infoHotspot', '2023-11-18 02:08:35.879', '2023-11-18 02:08:35.879'),
('edit', 'linkHotspot', '2023-11-18 02:08:35.879', '2023-11-18 02:08:35.879'),
('edit', 'role', '2023-11-15 09:14:52.131', '2023-11-15 09:14:52.131'),
('edit', 'scene', '2023-11-18 02:08:35.879', '2023-11-18 02:08:35.879'),
('edit', 'setting', '2023-11-16 08:40:52.064', '2023-11-16 08:40:52.064'),
('image', 'admin', '2023-11-15 09:14:52.131', '2023-11-15 09:14:52.131'),
('image', 'groupScene', '2023-11-18 02:08:35.879', '2023-11-18 02:08:35.879'),
('image', 'infoHotspot', '2023-11-18 02:08:35.879', '2023-11-18 02:08:35.879'),
('image', 'linkHotspot', '2023-11-18 02:08:35.879', '2023-11-18 02:08:35.879'),
('image', 'role', '2023-11-15 09:14:52.131', '2023-11-15 09:14:52.131'),
('image', 'scene', '2023-11-18 02:08:35.879', '2023-11-18 02:08:35.879'),
('image', 'setting', '2023-11-16 08:40:52.064', '2023-11-16 08:40:52.064');

-- --------------------------------------------------------

--
-- Table structure for table `permissionsonroles`
--

CREATE TABLE `permissionsonroles` (
  `roleId` varchar(191) NOT NULL,
  `permissionKey` varchar(191) NOT NULL,
  `permissionTableName` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissionsonroles`
--

INSERT INTO `permissionsonroles` (`roleId`, `permissionKey`, `permissionTableName`, `createdAt`, `updatedAt`) VALUES
('clozjqlv50000u64co8d05k8m', 'browse', 'admin', '2023-11-18 02:08:36.421', '2023-11-18 02:08:36.421'),
('clozjqlv50000u64co8d05k8m', 'browse', 'groupScene', '2023-11-18 02:08:36.421', '2023-11-18 02:08:36.421'),
('clozjqlv50000u64co8d05k8m', 'browse', 'infoHotspot', '2023-11-18 02:08:36.421', '2023-11-18 02:08:36.421'),
('clozjqlv50000u64co8d05k8m', 'browse', 'linkHotspot', '2023-11-18 02:08:36.421', '2023-11-18 02:08:36.421'),
('clozjqlv50000u64co8d05k8m', 'browse', 'role', '2023-11-18 02:08:36.421', '2023-11-18 02:08:36.421'),
('clozjqlv50000u64co8d05k8m', 'browse', 'scene', '2023-11-18 02:08:36.421', '2023-11-18 02:08:36.421'),
('clozjqlv50000u64co8d05k8m', 'browse', 'setting', '2023-11-18 02:08:36.421', '2023-11-18 02:08:36.421'),
('clozjqlv50000u64co8d05k8m', 'create', 'admin', '2023-11-18 02:08:36.421', '2023-11-18 02:08:36.421'),
('clozjqlv50000u64co8d05k8m', 'create', 'groupScene', '2023-11-18 02:08:36.421', '2023-11-18 02:08:36.421'),
('clozjqlv50000u64co8d05k8m', 'create', 'infoHotspot', '2023-11-18 02:08:36.421', '2023-11-18 02:08:36.421'),
('clozjqlv50000u64co8d05k8m', 'create', 'linkHotspot', '2023-11-18 02:08:36.421', '2023-11-18 02:08:36.421'),
('clozjqlv50000u64co8d05k8m', 'create', 'role', '2023-11-18 02:08:36.421', '2023-11-18 02:08:36.421'),
('clozjqlv50000u64co8d05k8m', 'create', 'scene', '2023-11-18 02:08:36.421', '2023-11-18 02:08:36.421'),
('clozjqlv50000u64co8d05k8m', 'create', 'setting', '2023-11-18 02:08:36.421', '2023-11-18 02:08:36.421'),
('clozjqlv50000u64co8d05k8m', 'delete', 'admin', '2023-11-18 02:08:36.421', '2023-11-18 02:08:36.421'),
('clozjqlv50000u64co8d05k8m', 'delete', 'groupScene', '2023-11-18 02:08:36.421', '2023-11-18 02:08:36.421'),
('clozjqlv50000u64co8d05k8m', 'delete', 'infoHotspot', '2023-11-18 02:08:36.421', '2023-11-18 02:08:36.421'),
('clozjqlv50000u64co8d05k8m', 'delete', 'linkHotspot', '2023-11-18 02:08:36.421', '2023-11-18 02:08:36.421'),
('clozjqlv50000u64co8d05k8m', 'delete', 'role', '2023-11-18 02:08:36.421', '2023-11-18 02:08:36.421'),
('clozjqlv50000u64co8d05k8m', 'delete', 'scene', '2023-11-18 02:08:36.421', '2023-11-18 02:08:36.421'),
('clozjqlv50000u64co8d05k8m', 'delete', 'setting', '2023-11-18 02:08:36.421', '2023-11-18 02:08:36.421'),
('clozjqlv50000u64co8d05k8m', 'edit', 'admin', '2023-11-18 02:08:36.421', '2023-11-18 02:08:36.421'),
('clozjqlv50000u64co8d05k8m', 'edit', 'groupScene', '2023-11-18 02:08:36.421', '2023-11-18 02:08:36.421'),
('clozjqlv50000u64co8d05k8m', 'edit', 'infoHotspot', '2023-11-18 02:08:36.421', '2023-11-18 02:08:36.421'),
('clozjqlv50000u64co8d05k8m', 'edit', 'linkHotspot', '2023-11-18 02:08:36.421', '2023-11-18 02:08:36.421'),
('clozjqlv50000u64co8d05k8m', 'edit', 'role', '2023-11-18 02:08:36.421', '2023-11-18 02:08:36.421'),
('clozjqlv50000u64co8d05k8m', 'edit', 'scene', '2023-11-18 02:08:36.421', '2023-11-18 02:08:36.421'),
('clozjqlv50000u64co8d05k8m', 'edit', 'setting', '2023-11-18 02:08:36.421', '2023-11-18 02:08:36.421'),
('clozjqlv50000u64co8d05k8m', 'image', 'admin', '2023-11-18 02:08:36.421', '2023-11-18 02:08:36.421'),
('clozjqlv50000u64co8d05k8m', 'image', 'groupScene', '2023-11-18 02:08:36.421', '2023-11-18 02:08:36.421'),
('clozjqlv50000u64co8d05k8m', 'image', 'infoHotspot', '2023-11-18 02:08:36.421', '2023-11-18 02:08:36.421'),
('clozjqlv50000u64co8d05k8m', 'image', 'linkHotspot', '2023-11-18 02:08:36.421', '2023-11-18 02:08:36.421'),
('clozjqlv50000u64co8d05k8m', 'image', 'role', '2023-11-18 02:08:36.421', '2023-11-18 02:08:36.421'),
('clozjqlv50000u64co8d05k8m', 'image', 'scene', '2023-11-18 02:08:36.421', '2023-11-18 02:08:36.421'),
('clozjqlv50000u64co8d05k8m', 'image', 'setting', '2023-11-18 02:08:36.421', '2023-11-18 02:08:36.421');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
('clozjqlv50000u64co8d05k8m', 'Administrator', '2023-11-15 09:14:52.337', '2023-11-18 02:08:36.421');

-- --------------------------------------------------------

--
-- Table structure for table `scene`
--

CREATE TABLE `scene` (
  `id` varchar(191) NOT NULL,
  `url` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `levels` varchar(191) NOT NULL,
  `faceSize` int(11) NOT NULL,
  `initialViewParameters` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `sort` int(11) DEFAULT NULL,
  `imageId` varchar(191) DEFAULT NULL,
  `audioId` varchar(191) DEFAULT NULL,
  `groupId` varchar(191) DEFAULT NULL,
  `publish` varchar(191) NOT NULL DEFAULT 'publish',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

CREATE TABLE `session` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `expires` datetime(3) NOT NULL,
  `sessionToken` varchar(191) NOT NULL,
  `accessToken` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `setting`
--

CREATE TABLE `setting` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `label` varchar(191) DEFAULT NULL,
  `type` varchar(191) NOT NULL,
  `details` varchar(191) DEFAULT NULL,
  `value` text DEFAULT NULL,
  `col` int(11) DEFAULT NULL,
  `sort` int(11) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `groupId` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `setting`
--

INSERT INTO `setting` (`id`, `name`, `label`, `type`, `details`, `value`, `col`, `sort`, `createdAt`, `updatedAt`, `groupId`) VALUES
('057d7df7-b790-4ee0-834d-d20688033f6a', 'preview mode', 'Chế độ xem trước', 'bool', NULL, NULL, NULL, 4, '2023-11-16 10:33:55.900', '2023-11-16 10:33:55.900', '00cb5d9a-f2b1-4d03-a245-199e3571bcb1'),
('38b89ef4-4998-471b-926a-6d4979ec0eb0', 'site logo', 'logo', 'file', '{\"multiple\":false,\"onlyTable\":true,\"fileTypes\":[\"image\"]}', NULL, NULL, 3, '2023-11-16 10:33:55.900', '2023-11-16 10:33:55.900', 'd1eff184-7503-450f-97ab-3abf6caf2bb0'),
('3c5a41ef-cba6-425b-a57c-02b8f1a8e1a2', 'admin logo', 'logo trang quản trị', 'file', '{\"multiple\":false,\"onlyTable\":true,\"fileTypes\":[\"image\"]}', NULL, NULL, 3, '2023-11-16 10:33:55.900', '2023-11-16 10:33:55.900', '00cb5d9a-f2b1-4d03-a245-199e3571bcb1'),
('76fba90d-1b94-4c47-a239-26691cf86d57', 'main audio', 'Nhạc nền', 'file', '{\"multiple\":false,\"onlyTable\":true,\"fileTypes\":[\"audio\"]}', NULL, 4, 7, '2023-11-16 10:33:55.900', '2023-11-16 10:33:55.900', 'd1eff184-7503-450f-97ab-3abf6caf2bb0'),
('785418b9-0e9c-424a-944f-fba241cd9a99', 'banner', 'Banner', 'file', '{\"multiple\":false,\"onlyTable\":true,\"fileTypes\":[\"image\"]}', NULL, 4, 5, '2023-11-16 10:33:55.900', '2023-11-16 10:33:55.900', 'd1eff184-7503-450f-97ab-3abf6caf2bb0'),
('9a85cecd-31e0-4fd8-9231-8b6c75c2cdbb', 'admin description', 'Mô tả trang quản trị', 'string', NULL, NULL, NULL, 2, '2023-11-16 10:33:55.900', '2023-11-16 10:33:55.900', '00cb5d9a-f2b1-4d03-a245-199e3571bcb1'),
('a48047d7-6a00-45ae-a9e8-2487c7ce822a', 'site title', 'Tiêu đề', 'string', NULL, NULL, NULL, 1, '2023-11-16 10:33:55.900', '2023-11-16 10:33:55.900', 'd1eff184-7503-450f-97ab-3abf6caf2bb0'),
('a57b6831-6bb6-4c09-947c-f70628226e34', 'admin title', 'Tiêu đề trang quản trị', 'string', NULL, NULL, NULL, 1, '2023-11-16 10:33:55.900', '2023-11-16 10:33:55.900', '00cb5d9a-f2b1-4d03-a245-199e3571bcb1'),
('b3911b00-be1e-458c-a8e0-3193c0f1f338', 'site description', 'Mô tả', 'string', NULL, NULL, NULL, 2, '2023-11-16 10:33:55.900', '2023-11-16 10:33:55.900', 'd1eff184-7503-450f-97ab-3abf6caf2bb0'),
('e5f612f4-17a4-42c6-bf83-c33197ba9d4c', 'site favicon', 'Favicon', 'file', '{\"multiple\":false,\"onlyTable\":true,\"fileTypes\":[\"image\"]}', NULL, NULL, 4, '2023-11-16 10:33:55.900', '2023-11-16 10:33:55.900', 'd1eff184-7503-450f-97ab-3abf6caf2bb0'),
('ef703ac7-125f-44ed-898c-6062b995f826', 'so do', 'Sơ đồ', 'file', '{\"multiple\":false,\"onlyTable\":true,\"fileTypes\":[\"image\"]}', NULL, 4, 6, '2023-11-16 10:33:55.900', '2023-11-16 10:33:55.900', 'd1eff184-7503-450f-97ab-3abf6caf2bb0');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `emailVerified` datetime(3) DEFAULT NULL,
  `image` varchar(191) DEFAULT NULL,
  `password` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `verificationrequest`
--

CREATE TABLE `verificationrequest` (
  `id` varchar(191) NOT NULL,
  `identifier` varchar(191) NOT NULL,
  `token` varchar(191) NOT NULL,
  `expires` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('5b3a59ce-8d59-4145-8cd4-a8c67f231730', 'e1279230a5f8063d092d347214514b0e42746e1975642b022c3983cb6a018653', '2023-11-18 01:56:12.185', '20231118015611_', NULL, NULL, '2023-11-18 01:56:11.970', 1),
('8cd14288-26ed-4521-8724-b4c8ce2d23b8', '2771b4dafc5e8ca3e721246c906702fecd83dbe4f5d3f6f1007715e63d147b04', '2023-11-14 07:11:54.679', '20231114071154_', NULL, NULL, '2023-11-14 07:11:54.059', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accesshistory`
--
ALTER TABLE `accesshistory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Account_providerId_providerAccountId_key` (`providerId`,`providerAccountId`),
  ADD KEY `Account_userId_fkey` (`userId`);

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Admin_email_key` (`email`),
  ADD KEY `Admin_imageId_fkey` (`imageId`),
  ADD KEY `Admin_roleId_fkey` (`roleId`);

--
-- Indexes for table `adminhistory`
--
ALTER TABLE `adminhistory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `AdminHistory_adminId_fkey` (`adminId`);

--
-- Indexes for table `file`
--
ALTER TABLE `file`
  ADD PRIMARY KEY (`id`),
  ADD KEY `File_adminId_fkey` (`adminId`),
  ADD KEY `File_folderFileId_fkey` (`folderFileId`);

--
-- Indexes for table `folderfile`
--
ALTER TABLE `folderfile`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FolderFile_adminId_fkey` (`adminId`),
  ADD KEY `FolderFile_parentId_fkey` (`parentId`);

--
-- Indexes for table `groupscene`
--
ALTER TABLE `groupscene`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groupsetting`
--
ALTER TABLE `groupsetting`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `infohotspot`
--
ALTER TABLE `infohotspot`
  ADD PRIMARY KEY (`id`),
  ADD KEY `InfoHotspot_sceneId_fkey` (`sceneId`);

--
-- Indexes for table `linkhotspot`
--
ALTER TABLE `linkhotspot`
  ADD PRIMARY KEY (`id`),
  ADD KEY `LinkHotspot_sceneId_fkey` (`sceneId`);

--
-- Indexes for table `permission`
--
ALTER TABLE `permission`
  ADD PRIMARY KEY (`key`,`tableName`);

--
-- Indexes for table `permissionsonroles`
--
ALTER TABLE `permissionsonroles`
  ADD PRIMARY KEY (`roleId`,`permissionKey`,`permissionTableName`),
  ADD KEY `PermissionsOnRoles_permissionKey_permissionTableName_fkey` (`permissionKey`,`permissionTableName`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `scene`
--
ALTER TABLE `scene`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Scene_slug_key` (`slug`),
  ADD KEY `Scene_imageId_fkey` (`imageId`),
  ADD KEY `Scene_audioId_fkey` (`audioId`),
  ADD KEY `Scene_groupId_fkey` (`groupId`);

--
-- Indexes for table `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Session_sessionToken_key` (`sessionToken`),
  ADD UNIQUE KEY `Session_accessToken_key` (`accessToken`),
  ADD KEY `Session_userId_fkey` (`userId`);

--
-- Indexes for table `setting`
--
ALTER TABLE `setting`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Setting_name_key` (`name`),
  ADD KEY `Setting_groupId_fkey` (`groupId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Indexes for table `verificationrequest`
--
ALTER TABLE `verificationrequest`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `VerificationRequest_token_key` (`token`),
  ADD UNIQUE KEY `VerificationRequest_identifier_token_key` (`identifier`,`token`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adminhistory`
--
ALTER TABLE `adminhistory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `account`
--
ALTER TABLE `account`
  ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `Admin_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `file` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Admin_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `adminhistory`
--
ALTER TABLE `adminhistory`
  ADD CONSTRAINT `AdminHistory_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admin` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `file`
--
ALTER TABLE `file`
  ADD CONSTRAINT `File_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admin` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `File_folderFileId_fkey` FOREIGN KEY (`folderFileId`) REFERENCES `folderfile` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `folderfile`
--
ALTER TABLE `folderfile`
  ADD CONSTRAINT `FolderFile_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admin` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FolderFile_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `folderfile` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `infohotspot`
--
ALTER TABLE `infohotspot`
  ADD CONSTRAINT `InfoHotspot_sceneId_fkey` FOREIGN KEY (`sceneId`) REFERENCES `scene` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `linkhotspot`
--
ALTER TABLE `linkhotspot`
  ADD CONSTRAINT `LinkHotspot_sceneId_fkey` FOREIGN KEY (`sceneId`) REFERENCES `scene` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `permissionsonroles`
--
ALTER TABLE `permissionsonroles`
  ADD CONSTRAINT `PermissionsOnRoles_permissionKey_permissionTableName_fkey` FOREIGN KEY (`permissionKey`,`permissionTableName`) REFERENCES `permission` (`key`, `tableName`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `PermissionsOnRoles_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `scene`
--
ALTER TABLE `scene`
  ADD CONSTRAINT `Scene_audioId_fkey` FOREIGN KEY (`audioId`) REFERENCES `file` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Scene_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `groupscene` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Scene_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `file` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `session`
--
ALTER TABLE `session`
  ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `setting`
--
ALTER TABLE `setting`
  ADD CONSTRAINT `Setting_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `groupsetting` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
