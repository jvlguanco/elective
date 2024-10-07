-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 07, 2024 at 06:26 PM
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
(47, 'HeroVideo', 'uploads\\videos\\1728218800687.mp4');

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
(1, '448955944966879_122109641222545578', 'normal', NULL),
(2, '448955944966879_122109641420545578', 'time-restricted', '2024-10-17'),
(3, '448955944966879_122109641816545578', 'normal', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `about_home`
--
ALTER TABLE `about_home`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `about_home`
--
ALTER TABLE `about_home`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
