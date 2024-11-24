-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 24, 2024 at 08:21 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `elective`
--

-- --------------------------------------------------------

--
-- Table structure for table `about_home`
--

CREATE TABLE `about_home` (
  `id` int(11) NOT NULL,
  `message` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `about_home`
--

INSERT INTO `about_home` (`id`, `message`) VALUES
(1, 'Pamantasan ng Lungsod ng Maynila (PLM) is the first and only chartered and autonomous university funded by a city government. It was created by the Congress of the Philippines by virtue of Republic Act No. 4196 or “An Act Authorizing the City of Manila to Establish and Operate the University of City of Manila” on June 19, 1965\n\nThe university first opened its gates on July 17, 1967 to 556 first-year students at its campus in the historic Intramuros district, which served as the seat of power during the Spanish occupation. Currently, about 10,000 graduate and post-graduate students grace its halls to receive PLM’s quality education.\n\nThis has been edited during class');

-- --------------------------------------------------------

--
-- Table structure for table `admission`
--

CREATE TABLE `admission` (
  `id` varchar(15) NOT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `email` text NOT NULL,
  `status` enum('open','close') NOT NULL,
  `requirements` text NOT NULL,
  `qualifications` text NOT NULL,
  `process` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admission`
--

INSERT INTO `admission` (`id`, `name`, `description`, `email`, `status`, `requirements`, `qualifications`, `process`) VALUES
('CLAT', 'College of Law Admission Test', 'asdasd', 'Asd@gmail.com', 'open', 'asdasd', 'sadasd', 'asdsad'),
('CMAT', 'College of Medicine Admission Test', 'asdsad', 'asd@gmail.com', 'open', 'sadasd', 'sadasd', 'sadasd'),
('PLMAT', 'PLM Admission Test', 'asdasd\n\nasdasd\n\nasdsad', 'asdas@gmail.com', 'close', 'asdasdas', 'asdasd', 'asdasd');

-- --------------------------------------------------------

--
-- Table structure for table `bid_items`
--

CREATE TABLE `bid_items` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `file` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bid_items`
--

INSERT INTO `bid_items` (`id`, `title`, `file`) VALUES
(1, 'Item asd asda', 'uploads\\files\\5b38073b-6e19-4436-9d6b-13fc69a32b95.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `board`
--

CREATE TABLE `board` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `title` text NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `board`
--

INSERT INTO `board` (`id`, `name`, `email`, `title`, `status`, `image`) VALUES
(14, 'Test Name of Active Regent Edt', 'test@gmail.com', 'Test Title', 'active', 'uploads\\images\\465ce7f2-9a3f-430d-b2d0-f15e5e0a946d.png'),
(15, 'Test Name of Active Regent', 'test@gmail.com', 'Test', 'active', 'uploads\\images\\c208fa6d-4fcd-4c08-a846-cdf44c9b7005.png'),
(16, 'Test Name of Active Regent', 'test@gmail.com', 'Test', 'active', 'uploads\\images\\0da87194-8fd3-4286-8952-74f4c6dce8b0.png'),
(17, 'Test Name of Active Regent', 'test@gmail.com', 'Test', 'active', 'uploads\\images\\6d308bed-8109-44c1-8812-aa57af746bf1.png'),
(18, 'Test Name of Active Regent', 'test@gmail.com', 'Test', 'active', 'uploads\\images\\0380ac04-f73a-4a1c-b810-5cfb74d02c2b.png'),
(19, 'Test Name of Active Regent', 'test@gmail.com', 'Test', 'active', 'uploads\\images\\b16b5ab4-2897-4a6f-bdd4-dee588b05cc8.png'),
(20, 'Test', 'test@gmail.com', 'Test', 'active', 'uploads\\images\\4190ca7b-cfa7-40f5-8ee7-a829097d4eac.png'),
(21, 'Test', 'test@gmail.com', 'Test Title', 'inactive', 'uploads\\images\\e7af340e-4d7c-4c1a-8ccd-e2ee25ac2b2a.png');

-- --------------------------------------------------------

--
-- Table structure for table `career`
--

CREATE TABLE `career` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `position` text NOT NULL,
  `min_salary` int(11) NOT NULL,
  `max_salary` int(11) NOT NULL,
  `department` text NOT NULL,
  `file` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `career`
--

INSERT INTO `career` (`id`, `title`, `position`, `min_salary`, `max_salary`, `department`, `file`) VALUES
(2, 'Test Title', 'Test Postion', 10000, 15000, 'Department', 'uploads\\files\\c804cce4-0f75-40fe-8252-709881a6517e.pdf'),
(3, 'Test Title', 'Test Postion', 10000, 15000, 'Department', 'uploads\\files\\1a262248-4da8-4f64-aaff-314ef812c16c.pdf'),
(4, 'Test', 'Test', 123, 1234, 'Test', 'uploads\\files\\b61a3951-bfb1-40e4-964b-4f96aa1117a6.pdf'),
(5, 'Test', 'Test', 123, 1234, 'Test', 'uploads\\files\\c02c05f7-d340-4293-9a2e-5fdef5d5b234.pdf'),
(6, 'Test', 'Test', 123, 1234, 'Test', 'uploads\\files\\5aeaf41c-67ba-4e35-bc11-dd7688f1047e.pdf'),
(7, 'Test', 'Test', 123, 1234, 'Test', 'uploads\\files\\3e36f1aa-633a-4bfe-bbe2-44b8027bb7ca.pdf'),
(8, 'Test', 'Test', 123, 1234, 'Test', 'uploads\\files\\5033f588-0da4-4d39-a01d-75f6c1a091b9.pdf'),
(9, 'Test', 'Test', 123, 1234, 'Test', 'uploads\\files\\9c168abb-2fd3-42e8-ad74-a11504354861.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `colleges`
--

CREATE TABLE `colleges` (
  `college_id` varchar(15) NOT NULL,
  `college_name` text NOT NULL,
  `description` text NOT NULL,
  `history` text DEFAULT NULL,
  `vision` text DEFAULT NULL,
  `mission` text DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT NULL,
  `email` text NOT NULL,
  `contact_number` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `colleges`
--

INSERT INTO `colleges` (`college_id`, `college_name`, `description`, `history`, `vision`, `mission`, `status`, `email`, `contact_number`) VALUES
('ASDFSDA', 'Updated Name', 'asdasd', 'asdasd', 'asdasd', 'asdsad', 'active', 'test@gmail.com', '123456789'),
('CISTM', 'College of Information Technology and Management Systems', 'Test Desc\n\nTest Desc', 'Test History\n\nTest History', 'Vision', 'Mission', 'active', 'test@gmail.com', '123456789'),
('CS', 'College of Science', 'Test', 'Test', 'Test', 'Test', 'active', 'test@gmail.com', '09123456789');

-- --------------------------------------------------------

--
-- Table structure for table `competitive_bidding`
--

CREATE TABLE `competitive_bidding` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `budget` decimal(15,2) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `competitive_bidding`
--

INSERT INTO `competitive_bidding` (`id`, `title`, `budget`, `date`) VALUES
(1, 'Changed', 12312.11, '2024-11-18');

-- --------------------------------------------------------

--
-- Table structure for table `consolidated_updates`
--

CREATE TABLE `consolidated_updates` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `file` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `consolidated_updates`
--

INSERT INTO `consolidated_updates` (`id`, `title`, `file`) VALUES
(1, 'asdasdas', 'uploads\\files\\2a4b4b73-7ed4-4436-a31d-f2f3347294ce.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `course_id` varchar(15) NOT NULL,
  `course_name` text NOT NULL,
  `college_id` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`course_id`, `course_name`, `college_id`) VALUES
('BSCS', 'Bachelor of Science in Computer Science', 'CISTM'),
('BSIT', 'Bachelor of Science in Information Technology', 'CISTM');

-- --------------------------------------------------------

--
-- Table structure for table `dean`
--

CREATE TABLE `dean` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `title` text NOT NULL,
  `image` text NOT NULL,
  `college_id` varchar(15) NOT NULL,
  `email` text DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dean`
--

INSERT INTO `dean` (`id`, `name`, `title`, `image`, `college_id`, `email`, `status`) VALUES
(1, 'Test jmjmmj', 'Test', 'uploads\\images\\temp.png', 'CISTM', 'test@gmail.com', 'inactive'),
(2, 'asdasdas', 'sadasd', 'uploads\\images\\651a2f4d-b3b9-4fc4-a430-dfe27cc84474.png', 'CISTM', 'test@gmail.com', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `directors`
--

CREATE TABLE `directors` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `title` text NOT NULL,
  `office_id` int(11) NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `image` text NOT NULL,
  `email` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `directors`
--

INSERT INTO `directors` (`id`, `name`, `title`, `office_id`, `status`, `image`, `email`) VALUES
(9, 'Test', 'Test', 6, 'active', 'uploads\\images\\016a0b52-9453-496a-912f-fcc2eb453cff.png', 'test@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `director_offices`
--

CREATE TABLE `director_offices` (
  `id` int(11) NOT NULL,
  `office_name` text NOT NULL,
  `status` enum('active','inactive') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `director_offices`
--

INSERT INTO `director_offices` (`id`, `office_name`, `status`) VALUES
(6, 'Active Test Office', 'active'),
(8, 'Test', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `id` int(11) NOT NULL,
  `location` text NOT NULL,
  `file_path` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`id`, `location`, `file_path`) VALUES
(41, 'AboutCollage', 'uploads\\images\\1728218622954.jpg'),
(42, 'AboutCollage', 'uploads\\images\\1728218622957.jpg'),
(43, 'AboutCollage', 'uploads\\images\\1728218622959.jpg'),
(44, 'AboutCollage', 'uploads\\images\\1728218622961.jpg'),
(47, 'HeroVideo', 'uploads\\videos\\1728218800687.mp4'),
(48, 'OrganizationalChart', 'uploads\\images\\6c178cd4-9955-425d-af32-09d6ffc58946.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `management_committee`
--

CREATE TABLE `management_committee` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `title` text NOT NULL,
  `image` text NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `management_committee`
--

INSERT INTO `management_committee` (`id`, `name`, `email`, `title`, `image`, `status`) VALUES
(1, 'Committee 1', 'test@gmail.com', 'Com', 'uploads\\images\\17acfc7a-8cb6-418c-ae7e-b8f39f6ecd8d.png', 'active'),
(2, 'Committee Inactive', 'test@gmail.com', 'Test', 'uploads\\images\\5af3051c-62c7-41a1-a773-bee3c556daab.png', 'inactive');

-- --------------------------------------------------------

--
-- Table structure for table `objectives`
--

CREATE TABLE `objectives` (
  `id` int(11) NOT NULL,
  `college_id` varchar(15) NOT NULL,
  `objective` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `objectives`
--

INSERT INTO `objectives` (`id`, `college_id`, `objective`) VALUES
(40, 'CS', 'asdasd'),
(41, 'CS', 'asdasd'),
(42, 'CS', 'asdasd'),
(45, 'CISTM', 'Objective 1'),
(46, 'CISTM', 'Objective 2'),
(47, 'ASDFSDA', 'asdasd'),
(48, 'ASDFSDA', 'sadasdas'),
(49, 'ASDFSDA', 'sadasdas');

-- --------------------------------------------------------

--
-- Table structure for table `offices`
--

CREATE TABLE `offices` (
  `id` int(11) NOT NULL,
  `office_name` text NOT NULL,
  `description` text NOT NULL,
  `vision` text NOT NULL,
  `mission` text NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `org_chart` text NOT NULL,
  `email` text NOT NULL,
  `contact_number` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `offices`
--

INSERT INTO `offices` (`id`, `office_name`, `description`, `vision`, `mission`, `status`, `org_chart`, `email`, `contact_number`) VALUES
(3, 'Test Office Updated', 'This is the Description Updated', 'Vission', 'Mission', 'active', 'uploads\\images\\f917775e-8f28-4e41-aa1d-4a13ffce6429.jpg', 'test@gmail.com', '0912345678');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `post_id` text NOT NULL,
  `type` enum('highlight','normal','time-restricted') NOT NULL,
  `end_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `post_id`, `type`, `end_date`) VALUES
(27, '448955944966879_122109972662545578', 'normal', NULL),
(29, '448955944966879_122109972932545578', 'time-restricted', '2024-10-24'),
(30, '448955944966879_122109973184545578', 'highlight', NULL),
(31, '448955944966879_122112250094545578', 'normal', NULL),
(32, '448955944966879_122112253664545578', 'normal', NULL),
(33, '448955944966879_122112257018545578', 'time-restricted', '2024-11-02'),
(34, '448955944966879_122112300722545578', 'normal', NULL),
(35, '448955944966879_122112301424545578', 'normal', NULL),
(41, '448955944966879_122112336500545578', 'normal', NULL),
(42, '448955944966879_122112336596545578', 'normal', NULL),
(43, '448955944966879_122112336818545578', 'normal', NULL),
(44, '448955944966879_122112336938545578', 'normal', NULL),
(45, '448955944966879_122112337172545578', 'normal', NULL),
(46, '448955944966879_122112337322545578', 'normal', NULL),
(47, '448955944966879_122112337436545578', 'normal', NULL),
(48, '448955944966879_122112337538545578', 'normal', NULL),
(49, '448955944966879_122117930852545578', 'time-restricted', '2024-11-29');

-- --------------------------------------------------------

--
-- Table structure for table `president`
--

CREATE TABLE `president` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `image` text NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `president`
--

INSERT INTO `president` (`id`, `name`, `description`, `image`, `status`) VALUES
(13, 'Current President', 'Test\n\nTHIS HAS A LOT OF PARGRAPHS\n\nHERE IS ANOTHER PARAGRAPH', 'uploads\\images\\cf76f888-0590-4dbf-9053-602b13be0381.png', 'active'),
(16, 'Test', 'asddsaasd', 'uploads\\images\\4c1dcd2b-909c-4bf2-b3ec-11ea0e962b49.png', 'inactive'),
(17, 'New President', 'Desc', 'uploads\\images\\05bc5b5f-a78c-4197-87e0-ed17e54e5903.png', 'inactive');

-- --------------------------------------------------------

--
-- Table structure for table `procurement`
--

CREATE TABLE `procurement` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `file` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `procurement`
--

INSERT INTO `procurement` (`id`, `title`, `file`) VALUES
(1, 'asdasd', 'uploads\\files\\55ac2075-01ee-47a7-aa88-2cde66421285.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `file` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`id`, `title`, `file`) VALUES
(1, 'asdasdas', 'uploads\\files\\ab9434ee-a675-4158-bc46-eac2c2c16a98.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `support_staff`
--

CREATE TABLE `support_staff` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `title` text NOT NULL,
  `image` text NOT NULL,
  `status` enum('active','inactive') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `support_staff`
--

INSERT INTO `support_staff` (`id`, `name`, `email`, `title`, `image`, `status`) VALUES
(1, 'Test', 'test@gmail.com', 'Test', 'uploads\\images\\37f4cdd5-424a-4a32-b2fa-3aaec5a6bed1.png', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `role` enum('admin','bid_awards','career','others') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `role`) VALUES
(1, 'jvlguanco2021@plm.edu.ph', '$2y$10$imF4fOsufWrRnYYw2jTDBOzvNynU95OL1JV9BzIDvdrRYV26xcYX2', 'admin'),
(2, 'test@plm.edu.ph', '$2y$10$imF4fOsufWrRnYYw2jTDBOzvNynU95OL1JV9BzIDvdrRYV26xcYX2', 'others'),
(3, 'test2@plm.edu.ph', '$2y$10$imF4fOsufWrRnYYw2jTDBOzvNynU95OL1JV9BzIDvdrRYV26xcYX2', 'career'),
(4, 'admin@plm.edu.ph', '$2y$10$imF4fOsufWrRnYYw2jTDBOzvNynU95OL1JV9BzIDvdrRYV26xcYX2', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `about_home`
--
ALTER TABLE `about_home`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admission`
--
ALTER TABLE `admission`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bid_items`
--
ALTER TABLE `bid_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `board`
--
ALTER TABLE `board`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `career`
--
ALTER TABLE `career`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `colleges`
--
ALTER TABLE `colleges`
  ADD PRIMARY KEY (`college_id`);

--
-- Indexes for table `competitive_bidding`
--
ALTER TABLE `competitive_bidding`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `consolidated_updates`
--
ALTER TABLE `consolidated_updates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`course_id`);

--
-- Indexes for table `dean`
--
ALTER TABLE `dean`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_dean_college` (`college_id`);

--
-- Indexes for table `directors`
--
ALTER TABLE `directors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_director_office` (`office_id`);

--
-- Indexes for table `director_offices`
--
ALTER TABLE `director_offices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `management_committee`
--
ALTER TABLE `management_committee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `objectives`
--
ALTER TABLE `objectives`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_objective` (`college_id`);

--
-- Indexes for table `offices`
--
ALTER TABLE `offices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `president`
--
ALTER TABLE `president`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `procurement`
--
ALTER TABLE `procurement`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `support_staff`
--
ALTER TABLE `support_staff`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`) USING HASH;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `about_home`
--
ALTER TABLE `about_home`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `bid_items`
--
ALTER TABLE `bid_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `board`
--
ALTER TABLE `board`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `career`
--
ALTER TABLE `career`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `competitive_bidding`
--
ALTER TABLE `competitive_bidding`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `consolidated_updates`
--
ALTER TABLE `consolidated_updates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `dean`
--
ALTER TABLE `dean`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `directors`
--
ALTER TABLE `directors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `director_offices`
--
ALTER TABLE `director_offices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `management_committee`
--
ALTER TABLE `management_committee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `objectives`
--
ALTER TABLE `objectives`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `offices`
--
ALTER TABLE `offices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `president`
--
ALTER TABLE `president`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `procurement`
--
ALTER TABLE `procurement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `support_staff`
--
ALTER TABLE `support_staff`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `dean`
--
ALTER TABLE `dean`
  ADD CONSTRAINT `fk_dean_college` FOREIGN KEY (`college_id`) REFERENCES `colleges` (`college_id`) ON DELETE CASCADE;

--
-- Constraints for table `directors`
--
ALTER TABLE `directors`
  ADD CONSTRAINT `fk_director_office` FOREIGN KEY (`office_id`) REFERENCES `director_offices` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `objectives`
--
ALTER TABLE `objectives`
  ADD CONSTRAINT `fk_objective` FOREIGN KEY (`college_id`) REFERENCES `colleges` (`college_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
