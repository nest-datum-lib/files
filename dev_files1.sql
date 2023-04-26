-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 26, 2023 at 07:34 AM
-- Server version: 8.0.32-0ubuntu0.22.04.2
-- PHP Version: 8.1.2-1ubuntu2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dev_files1`
--

-- --------------------------------------------------------

--
-- Table structure for table `access`
--

CREATE TABLE `access` (
  `id` varchar(36) NOT NULL,
  `userId` varchar(255) NOT NULL DEFAULT '',
  `accessStatusId` varchar(255) NOT NULL DEFAULT '',
  `envKey` varchar(255) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL DEFAULT '',
  `isDeleted` tinyint NOT NULL DEFAULT '0',
  `isNotDelete` tinyint NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `access_access_access_option`
--

CREATE TABLE `access_access_access_option` (
  `id` varchar(36) NOT NULL,
  `parentId` varchar(255) NOT NULL DEFAULT '',
  `content` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `accessAccessOptionId` varchar(255) NOT NULL,
  `accessId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `access_access_option`
--

CREATE TABLE `access_access_option` (
  `id` varchar(36) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `accessOptionId` varchar(255) NOT NULL,
  `accessId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `access_option`
--

CREATE TABLE `access_option` (
  `id` varchar(36) NOT NULL,
  `userId` varchar(255) NOT NULL DEFAULT '',
  `dataTypeId` varchar(255) NOT NULL DEFAULT '',
  `envKey` varchar(255) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL DEFAULT '',
  `defaultValue` varchar(255) NOT NULL DEFAULT '',
  `regex` varchar(255) NOT NULL DEFAULT '',
  `isRequired` tinyint NOT NULL DEFAULT '0',
  `isMultiline` tinyint NOT NULL DEFAULT '0',
  `isNotDelete` tinyint NOT NULL DEFAULT '0',
  `isDeleted` tinyint NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `access_status`
--

CREATE TABLE `access_status` (
  `id` varchar(36) NOT NULL,
  `userId` varchar(255) NOT NULL DEFAULT '',
  `envKey` varchar(255) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL DEFAULT '',
  `isNotDelete` tinyint NOT NULL DEFAULT '0',
  `isDeleted` tinyint NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `access_status`
--

INSERT INTO `access_status` (`id`, `userId`, `envKey`, `name`, `description`, `isNotDelete`, `isDeleted`, `createdAt`, `updatedAt`) VALUES
('e5b4b081-57c4-4428-b633-e1a7af191ec1', '', 'SSO_USER_ADMIN_HAPP_ACCESSSTATUSSERVICE_ACTIVE', 'Active', 'Access is active.', 1, 0, '2023-04-11 01:34:44', '2023-04-11 01:34:44');

-- --------------------------------------------------------

--
-- Table structure for table `file`
--

CREATE TABLE `file` (
  `id` varchar(36) NOT NULL,
  `userId` varchar(255) NOT NULL DEFAULT '',
  `systemId` varchar(255) NOT NULL DEFAULT '',
  `parentId` varchar(255) NOT NULL DEFAULT '',
  `path` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL DEFAULT '',
  `type` varchar(255) NOT NULL,
  `size` int NOT NULL,
  `isNotDelete` tinyint NOT NULL DEFAULT '0',
  `isDeleted` tinyint NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `file`
--

INSERT INTO `file` (`id`, `userId`, `systemId`, `parentId`, `path`, `name`, `description`, `type`, `size`, `isNotDelete`, `isDeleted`, `createdAt`, `updatedAt`) VALUES
('4ee63088-a2ac-4b4b-873e-b98ef31095af', 'happ-sso-user-admin', 'files-system-email-views', 'files-folder-email-views', '/email-views/recovery.ejs', 'recovery.ejs', '', 'ejs', 428, 0, 0, '2023-04-20 04:03:23', '2023-04-20 04:03:23'),
('7bc93bb0-c464-4d36-ade0-3edf2c89c0a0', 'happ-sso-user-admin', 'files-system-email-views', 'files-folder-email-views', '/email-views/registry.ejs', 'registry.ejs', '', 'ejs', 300, 0, 0, '2023-04-20 04:05:34', '2023-04-20 04:05:34');

-- --------------------------------------------------------

--
-- Table structure for table `folder`
--

CREATE TABLE `folder` (
  `id` varchar(36) NOT NULL,
  `userId` varchar(255) NOT NULL DEFAULT '',
  `systemId` varchar(255) NOT NULL DEFAULT '',
  `parentId` varchar(255) NOT NULL DEFAULT '',
  `path` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL DEFAULT '',
  `isNotDelete` tinyint NOT NULL DEFAULT '0',
  `isDeleted` tinyint NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `type` varchar(255) NOT NULL DEFAULT 'folder',
  `size` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `folder`
--

INSERT INTO `folder` (`id`, `userId`, `systemId`, `parentId`, `path`, `name`, `description`, `isNotDelete`, `isDeleted`, `createdAt`, `updatedAt`, `type`, `size`) VALUES
('files-folder-avatara', 'happ-sso-user-admin', 'files-system-avatars', '', '/avatars', 'avatars', 'User avatars folder.', 1, 0, '2023-04-11 19:05:12', '2023-04-13 03:19:41', 'folder', 0),
('files-folder-cv', 'happ-sso-user-admin', 'files-system-cv', '', '/cv', 'cv', 'CV folder.', 1, 0, '2023-04-11 19:05:12', '2023-04-13 03:19:41', 'folder', 0),
('files-folder-cv-lensa', 'happ-sso-user-admin', 'files-system-cv-lensa', '', '/cv-lensa', 'cv-lensa', 'CV lensa folder.', 1, 0, '2023-04-11 19:05:12', '2023-04-13 03:19:41', 'folder', 0),
('files-folder-email-views', 'happ-sso-user-admin', 'files-system-email-views', '', '/email-views', 'email-views', 'Email views folder.', 1, 0, '2023-04-11 19:05:12', '2023-04-20 04:02:33', 'folder', 0),
('files-folder-root', 'happ-sso-user-admin', 'files-system-default', '', '/', 'root', 'Root folder.', 1, 0, '2023-04-11 19:05:12', '2023-04-19 04:00:59', 'folder', 0);

-- --------------------------------------------------------

--
-- Table structure for table `provider`
--

CREATE TABLE `provider` (
  `id` varchar(36) NOT NULL,
  `userId` varchar(255) NOT NULL DEFAULT '',
  `providerStatusId` varchar(255) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL DEFAULT '',
  `isDeleted` tinyint NOT NULL DEFAULT '0',
  `isNotDelete` tinyint NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `envKey` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `provider`
--

INSERT INTO `provider` (`id`, `userId`, `providerStatusId`, `name`, `description`, `isDeleted`, `isNotDelete`, `createdAt`, `updatedAt`, `envKey`) VALUES
('012c48bf-4857-4ea8-90fe-291fc9af47c2', 'sso-user-admin', '9d0337b6-dfe7-4668-80ff-7744c9393760', 'Local', 'Local storage.', 0, 1, '2023-04-11 07:50:06', '2023-04-13 07:14:15', 'SSO_USER_ADMIN_HAPP_PROVIDERSERVICE_LOCAL');

-- --------------------------------------------------------

--
-- Table structure for table `provider_option`
--

CREATE TABLE `provider_option` (
  `id` varchar(36) NOT NULL,
  `userId` varchar(255) NOT NULL DEFAULT '',
  `dataTypeId` varchar(255) NOT NULL DEFAULT '',
  `envKey` varchar(255) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL DEFAULT '',
  `defaultValue` varchar(255) NOT NULL DEFAULT '',
  `regex` varchar(255) NOT NULL DEFAULT '',
  `isRequired` tinyint NOT NULL DEFAULT '0',
  `isMultiline` tinyint NOT NULL DEFAULT '0',
  `isNotDelete` tinyint NOT NULL DEFAULT '0',
  `isDeleted` tinyint NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `provider_provider_option`
--

CREATE TABLE `provider_provider_option` (
  `id` varchar(36) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `providerOptionId` varchar(255) NOT NULL,
  `providerId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `provider_provider_provider_option`
--

CREATE TABLE `provider_provider_provider_option` (
  `id` varchar(36) NOT NULL,
  `parentId` varchar(255) NOT NULL DEFAULT '',
  `content` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `providerProviderOptionId` varchar(255) NOT NULL,
  `providerId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `provider_status`
--

CREATE TABLE `provider_status` (
  `id` varchar(36) NOT NULL,
  `userId` varchar(255) NOT NULL DEFAULT '',
  `envKey` varchar(255) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL DEFAULT '',
  `isNotDelete` tinyint NOT NULL DEFAULT '0',
  `isDeleted` tinyint NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `provider_status`
--

INSERT INTO `provider_status` (`id`, `userId`, `envKey`, `name`, `description`, `isNotDelete`, `isDeleted`, `createdAt`, `updatedAt`) VALUES
('9d0337b6-dfe7-4668-80ff-7744c9393760', 'sso-user-admin', 'SSO_USER_ADMIN_HAPP_PROVIDERSTATUSSERVICE_ACTIVE', 'Active', 'Provider is active.', 1, 0, '2023-04-11 07:02:55', '2023-04-11 07:02:55');

-- --------------------------------------------------------

--
-- Table structure for table `role_access`
--

CREATE TABLE `role_access` (
  `id` varchar(36) NOT NULL,
  `userId` varchar(255) NOT NULL DEFAULT '',
  `roleId` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `accessId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `setting`
--

CREATE TABLE `setting` (
  `id` varchar(36) NOT NULL,
  `userId` varchar(255) NOT NULL DEFAULT '',
  `dataTypeId` varchar(255) NOT NULL DEFAULT '',
  `envKey` varchar(255) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL DEFAULT '',
  `value` varchar(255) NOT NULL DEFAULT '',
  `regex` varchar(255) NOT NULL DEFAULT '',
  `isDeleted` tinyint NOT NULL DEFAULT '0',
  `isNotDelete` tinyint NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `system`
--

CREATE TABLE `system` (
  `id` varchar(36) NOT NULL,
  `providerId` varchar(255) NOT NULL DEFAULT '',
  `userId` varchar(255) NOT NULL DEFAULT '',
  `systemStatusId` varchar(255) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL DEFAULT '',
  `isDeleted` tinyint NOT NULL DEFAULT '0',
  `isNotDelete` tinyint NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `envKey` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `system`
--

INSERT INTO `system` (`id`, `providerId`, `userId`, `systemStatusId`, `name`, `description`, `isDeleted`, `isNotDelete`, `createdAt`, `updatedAt`, `envKey`) VALUES
('files-system-avatars', '012c48bf-4857-4ea8-90fe-291fc9af47c2', 'happ-sso-user-admin', '6a7871eb-869b-43b9-b4cc-542a6033da18', 'Avatars', 'User avatars.', 0, 1, '2023-04-11 07:52:23', '2023-04-19 08:08:24', 'SSO_USER_ADMIN_HAPP_SYSTEMSERVICE_AVATARS'),
('files-system-cv', '012c48bf-4857-4ea8-90fe-291fc9af47c2', 'happ-sso-user-admin', '6a7871eb-869b-43b9-b4cc-542a6033da18', 'CV', 'CV files.', 0, 1, '2023-04-11 07:53:21', '2023-04-19 08:09:02', 'SSO_USER_ADMIN_HAPP_SYSTEMSERVICE_CV'),
('files-system-cv-lensa', '012c48bf-4857-4ea8-90fe-291fc9af47c2', 'happ-sso-user-admin', '6a7871eb-869b-43b9-b4cc-542a6033da18', 'CV lensa', 'CV files from lensa API.', 0, 1, '2023-04-11 07:53:53', '2023-04-19 08:09:12', 'SSO_USER_ADMIN_HAPP_SYSTEMSERVICE_CV_LENSA'),
('files-system-default', '012c48bf-4857-4ea8-90fe-291fc9af47c2', 'sso-user-admin', '6a7871eb-869b-43b9-b4cc-542a6033da18', 'Default', 'Default filesystem.', 0, 1, '2023-04-11 07:51:46', '2023-04-11 19:01:29', 'SSO_USER_ADMIN_HAPP_SYSTEMSERVICE_DEFAULT'),
('files-system-email-views', '012c48bf-4857-4ea8-90fe-291fc9af47c2', 'happ-sso-user-admin', '6a7871eb-869b-43b9-b4cc-542a6033da18', 'Email views', 'Email views.', 0, 1, '2023-04-11 07:52:50', '2023-04-19 08:08:52', 'SSO_USER_ADMIN_HAPP_SYSTEMSERVICE_EMAIL_VIEWS');

-- --------------------------------------------------------

--
-- Table structure for table `system_option`
--

CREATE TABLE `system_option` (
  `id` varchar(36) NOT NULL,
  `userId` varchar(255) NOT NULL DEFAULT '',
  `dataTypeId` varchar(255) NOT NULL DEFAULT '',
  `envKey` varchar(255) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL DEFAULT '',
  `defaultValue` varchar(255) NOT NULL DEFAULT '',
  `regex` varchar(255) NOT NULL DEFAULT '',
  `isRequired` tinyint NOT NULL DEFAULT '0',
  `isMultiline` tinyint NOT NULL DEFAULT '0',
  `isNotDelete` tinyint NOT NULL DEFAULT '0',
  `isDeleted` tinyint NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `system_option`
--

INSERT INTO `system_option` (`id`, `userId`, `dataTypeId`, `envKey`, `name`, `description`, `defaultValue`, `regex`, `isRequired`, `isMultiline`, `isNotDelete`, `isDeleted`, `createdAt`, `updatedAt`) VALUES
('files-system-option-root', 'happ-sso-user-admin', 'happ-data-type-text', 'SSO_USER_ADMIN_HAPP_SYSTEMOPTIONSERVICE_ROOT_PATH', 'Root path', 'Path to system folder.', '/', '', 1, 0, 1, 0, '2023-04-11 07:51:14', '2023-04-19 08:07:35');

-- --------------------------------------------------------

--
-- Table structure for table `system_status`
--

CREATE TABLE `system_status` (
  `id` varchar(36) NOT NULL,
  `userId` varchar(255) NOT NULL DEFAULT '',
  `envKey` varchar(255) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL DEFAULT '',
  `isNotDelete` tinyint NOT NULL DEFAULT '0',
  `isDeleted` tinyint NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `system_status`
--

INSERT INTO `system_status` (`id`, `userId`, `envKey`, `name`, `description`, `isNotDelete`, `isDeleted`, `createdAt`, `updatedAt`) VALUES
('6a7871eb-869b-43b9-b4cc-542a6033da18', 'sso-user-admin', 'SSO_USER_ADMIN_HAPP_SYSTEMSTATUSSERVICE_ACTIVE', 'Active', 'System is active', 1, 0, '2023-04-11 06:32:38', '2023-04-11 06:32:38');

-- --------------------------------------------------------

--
-- Table structure for table `system_system_option`
--

CREATE TABLE `system_system_option` (
  `id` varchar(36) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `systemOptionId` varchar(255) NOT NULL,
  `systemId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `system_system_option`
--

INSERT INTO `system_system_option` (`id`, `createdAt`, `updatedAt`, `systemOptionId`, `systemId`) VALUES
('393df461-b4ac-449a-90e2-5617aa297a74', '2023-04-11 07:57:07', '2023-04-11 07:57:07', 'files-system-option-root', 'files-system-email-views'),
('66a3e2ef-868a-429b-9378-a0b6e90827f3', '2023-04-11 07:57:12', '2023-04-11 07:57:12', 'files-system-option-root', 'files-system-cv'),
('77f61182-73cd-434c-b408-e5917fba436d', '2023-04-11 07:54:15', '2023-04-11 07:54:15', 'files-system-option-root', 'files-system-avatars'),
('a754d5a0-0a2f-450f-99a4-7a2f8d0f4591', '2023-04-11 07:54:11', '2023-04-11 07:54:11', 'files-system-option-root', 'files-system-default'),
('c08c05f7-65ec-489c-93b6-36b1b6daa4ba', '2023-04-11 07:57:15', '2023-04-11 07:57:15', 'files-system-option-root', 'files-system-cv-lensa');

-- --------------------------------------------------------

--
-- Table structure for table `system_system_system_option`
--

CREATE TABLE `system_system_system_option` (
  `id` varchar(36) NOT NULL,
  `parentId` varchar(255) NOT NULL DEFAULT '',
  `content` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `systemSystemOptionId` varchar(255) NOT NULL,
  `systemId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `system_system_system_option`
--

INSERT INTO `system_system_system_option` (`id`, `parentId`, `content`, `createdAt`, `updatedAt`, `systemSystemOptionId`, `systemId`) VALUES
('322ec156-665f-4825-909c-ed39626001b9', '', '/', '2023-04-11 19:01:29', '2023-04-11 19:01:29', 'a754d5a0-0a2f-450f-99a4-7a2f8d0f4591', 'files-system-default'),
('56ba64e5-ba64-47d6-858f-7771cbffe905', '', '/cv-lensa', '2023-04-19 08:09:12', '2023-04-19 08:09:12', 'c08c05f7-65ec-489c-93b6-36b1b6daa4ba', 'files-system-cv-lensa'),
('62a2087e-7555-4bb1-9797-76c17d9f249f', '', '/email-views', '2023-04-19 08:08:52', '2023-04-19 08:08:52', '393df461-b4ac-449a-90e2-5617aa297a74', 'files-system-email-views'),
('67d9a818-1f28-4153-b46b-0768306717ef', '', '/avatars', '2023-04-19 08:08:24', '2023-04-19 08:08:24', '77f61182-73cd-434c-b408-e5917fba436d', 'files-system-avatars'),
('d2067dd9-91f9-40fe-848c-f2de4df04d72', '', '/cv', '2023-04-19 08:09:02', '2023-04-19 08:09:02', '66a3e2ef-868a-429b-9378-a0b6e90827f3', 'files-system-cv');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `access`
--
ALTER TABLE `access`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_8a974ab8bdb6b87311cd79cb8b` (`name`),
  ADD KEY `IDX_6e34c980647d3db8ea3455046c` (`userId`),
  ADD KEY `IDX_9924ca5b0815b1505571f85afe` (`accessStatusId`);

--
-- Indexes for table `access_access_access_option`
--
ALTER TABLE `access_access_access_option`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_dee3f68f696ee64eb107566564c` (`accessAccessOptionId`),
  ADD KEY `FK_cc0a1470c7887114cd5f1d5f649` (`accessId`);

--
-- Indexes for table `access_access_option`
--
ALTER TABLE `access_access_option`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_bc68ede697b180abc5164199af6` (`accessOptionId`),
  ADD KEY `FK_a709edfd6f1c6b8d2f42888919d` (`accessId`);

--
-- Indexes for table `access_option`
--
ALTER TABLE `access_option`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_553f54ca8e7902a29cf508dfdc` (`name`),
  ADD KEY `IDX_ec42c16012cc0f0021303d443b` (`userId`),
  ADD KEY `IDX_51e8a2059f75c6614d87a1864c` (`dataTypeId`),
  ADD KEY `IDX_e053f77c195c18bfcebfa3e9a0` (`description`);

--
-- Indexes for table `access_status`
--
ALTER TABLE `access_status`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_7f6e5c92d0ce9fe1f8c1230463` (`name`),
  ADD KEY `IDX_dad99c714d3523b0eb4006f745` (`userId`),
  ADD KEY `IDX_5f13bfcb9ac8fb2086db4d3f42` (`description`);

--
-- Indexes for table `file`
--
ALTER TABLE `file`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_068984316f2b10a398fcdef59c` (`path`),
  ADD KEY `IDX_b2d8e683f020f61115edea206b` (`userId`),
  ADD KEY `IDX_df16ff3255e6dfc777b086949b` (`name`),
  ADD KEY `IDX_ced777e40ab9e6bbccb0025a10` (`description`),
  ADD KEY `FK_bca558e8253177004f8a5cb1821` (`systemId`),
  ADD KEY `FK_a6b3b927fe2ad2bda57fc63f6b2` (`parentId`);

--
-- Indexes for table `folder`
--
ALTER TABLE `folder`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_5fdc1afff14d2ffa34471076dc` (`path`),
  ADD KEY `IDX_a0ef64d088bc677d66b9231e90` (`userId`),
  ADD KEY `IDX_9ee3bd0f189fb242d488c0dfa3` (`parentId`),
  ADD KEY `IDX_6c1d94a58a2bd91753e7be9d9d` (`name`),
  ADD KEY `IDX_5831a01b83485cd23ea7f3f54b` (`description`),
  ADD KEY `FK_fb0a098a1f175f272fb995273db` (`systemId`);

--
-- Indexes for table `provider`
--
ALTER TABLE `provider`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_39c1a7b4cdd7cfb27b9ee9e500` (`name`),
  ADD KEY `IDX_da1c78142007c621b5498c818c` (`userId`),
  ADD KEY `IDX_31ddadf1f67685c2ec7ee6ba6d` (`description`);

--
-- Indexes for table `provider_option`
--
ALTER TABLE `provider_option`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_6b8da74477e26d8f51d3f2cb53` (`name`),
  ADD KEY `IDX_e2c095fc35c01cf87d966b5837` (`userId`),
  ADD KEY `IDX_dacb1bcb1dbb9463d1ec3279f4` (`dataTypeId`),
  ADD KEY `IDX_6103159f3c9f6b697a1c19613d` (`description`);

--
-- Indexes for table `provider_provider_option`
--
ALTER TABLE `provider_provider_option`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_b560a1c353f9badd29c29a89deb` (`providerOptionId`),
  ADD KEY `FK_2cdfb06fc36ba6dd88aff5516dd` (`providerId`);

--
-- Indexes for table `provider_provider_provider_option`
--
ALTER TABLE `provider_provider_provider_option`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_601e716ada00dc11148d9dfe342` (`providerProviderOptionId`),
  ADD KEY `FK_bb3d5f7abff24863144a55a17e3` (`providerId`);

--
-- Indexes for table `provider_status`
--
ALTER TABLE `provider_status`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_31b23afc95598be1f925e53d35` (`name`),
  ADD KEY `IDX_3d02dd7c54ed28a13602fec5dc` (`userId`),
  ADD KEY `IDX_dbf8a7a7d2adea4934115c28c8` (`description`);

--
-- Indexes for table `role_access`
--
ALTER TABLE `role_access`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_d49b4a1ea909dd305982da6b749` (`accessId`);

--
-- Indexes for table `setting`
--
ALTER TABLE `setting`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_27923d152bbf82683ab795d547` (`name`),
  ADD KEY `IDX_bbcafb8c4c78d890f75caa632d` (`userId`),
  ADD KEY `IDX_31ef7f56e7110672954fa867f3` (`dataTypeId`),
  ADD KEY `IDX_cacc7786f61a20ca63628fd877` (`description`);

--
-- Indexes for table `system`
--
ALTER TABLE `system`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_74996724856c168c26b99bd21c` (`name`),
  ADD KEY `IDX_beedfca580588f0ae37da4c95c` (`userId`),
  ADD KEY `IDX_1064e6c1f11b887cc6a63f16b5` (`description`),
  ADD KEY `FK_181f18c74b1f7cb276e2ddb0e01` (`providerId`);

--
-- Indexes for table `system_option`
--
ALTER TABLE `system_option`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_79c4ca95682d00c1007cc64d04` (`name`),
  ADD KEY `IDX_eec578ec19e8de67a27882d0d3` (`userId`),
  ADD KEY `IDX_28fe24e296b38578578cd7cf79` (`dataTypeId`),
  ADD KEY `IDX_2adb249207d475fce8f6c8e140` (`description`);

--
-- Indexes for table `system_status`
--
ALTER TABLE `system_status`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_b85db84471dbad257c45a7b094` (`name`),
  ADD KEY `IDX_d40cf7cd55dd4915b134400cd0` (`userId`),
  ADD KEY `IDX_94d1755296411db03121566e35` (`description`);

--
-- Indexes for table `system_system_option`
--
ALTER TABLE `system_system_option`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_ff265b440f943266071eca3dcc5` (`systemOptionId`),
  ADD KEY `FK_628166f176f3fb9ff1285aca75f` (`systemId`);

--
-- Indexes for table `system_system_system_option`
--
ALTER TABLE `system_system_system_option`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_f776d8ddfcdbaf2fa9fae0ae69a` (`systemSystemOptionId`),
  ADD KEY `FK_37755f4fdc3f483c0517df37537` (`systemId`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `access_access_access_option`
--
ALTER TABLE `access_access_access_option`
  ADD CONSTRAINT `FK_cc0a1470c7887114cd5f1d5f649` FOREIGN KEY (`accessId`) REFERENCES `access` (`id`),
  ADD CONSTRAINT `FK_dee3f68f696ee64eb107566564c` FOREIGN KEY (`accessAccessOptionId`) REFERENCES `access_access_option` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `access_access_option`
--
ALTER TABLE `access_access_option`
  ADD CONSTRAINT `FK_a709edfd6f1c6b8d2f42888919d` FOREIGN KEY (`accessId`) REFERENCES `access` (`id`),
  ADD CONSTRAINT `FK_bc68ede697b180abc5164199af6` FOREIGN KEY (`accessOptionId`) REFERENCES `access_option` (`id`);

--
-- Constraints for table `file`
--
ALTER TABLE `file`
  ADD CONSTRAINT `FK_a6b3b927fe2ad2bda57fc63f6b2` FOREIGN KEY (`parentId`) REFERENCES `folder` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_bca558e8253177004f8a5cb1821` FOREIGN KEY (`systemId`) REFERENCES `system` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `folder`
--
ALTER TABLE `folder`
  ADD CONSTRAINT `FK_fb0a098a1f175f272fb995273db` FOREIGN KEY (`systemId`) REFERENCES `system` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `provider_provider_option`
--
ALTER TABLE `provider_provider_option`
  ADD CONSTRAINT `FK_2cdfb06fc36ba6dd88aff5516dd` FOREIGN KEY (`providerId`) REFERENCES `provider` (`id`),
  ADD CONSTRAINT `FK_b560a1c353f9badd29c29a89deb` FOREIGN KEY (`providerOptionId`) REFERENCES `provider_option` (`id`);

--
-- Constraints for table `provider_provider_provider_option`
--
ALTER TABLE `provider_provider_provider_option`
  ADD CONSTRAINT `FK_601e716ada00dc11148d9dfe342` FOREIGN KEY (`providerProviderOptionId`) REFERENCES `provider_provider_option` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_bb3d5f7abff24863144a55a17e3` FOREIGN KEY (`providerId`) REFERENCES `provider` (`id`);

--
-- Constraints for table `role_access`
--
ALTER TABLE `role_access`
  ADD CONSTRAINT `FK_d49b4a1ea909dd305982da6b749` FOREIGN KEY (`accessId`) REFERENCES `access` (`id`);

--
-- Constraints for table `system`
--
ALTER TABLE `system`
  ADD CONSTRAINT `FK_181f18c74b1f7cb276e2ddb0e01` FOREIGN KEY (`providerId`) REFERENCES `provider` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `system_system_option`
--
ALTER TABLE `system_system_option`
  ADD CONSTRAINT `FK_628166f176f3fb9ff1285aca75f` FOREIGN KEY (`systemId`) REFERENCES `system` (`id`),
  ADD CONSTRAINT `FK_ff265b440f943266071eca3dcc5` FOREIGN KEY (`systemOptionId`) REFERENCES `system_option` (`id`);

--
-- Constraints for table `system_system_system_option`
--
ALTER TABLE `system_system_system_option`
  ADD CONSTRAINT `FK_37755f4fdc3f483c0517df37537` FOREIGN KEY (`systemId`) REFERENCES `system` (`id`),
  ADD CONSTRAINT `FK_f776d8ddfcdbaf2fa9fae0ae69a` FOREIGN KEY (`systemSystemOptionId`) REFERENCES `system_system_option` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
