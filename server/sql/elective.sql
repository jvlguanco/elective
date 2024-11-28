-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 28, 2024 at 03:58 PM
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
(1, 'Pamantasan ng Lungsod ng Maynila (PLM) is the first and only chartered and autonomous university funded by a city government. It was created by the Congress of the Philippines by virtue of Republic Act No. 4196 or “An Act Authorizing the City of Manila to Establish and Operate the University of City of Manila” on June 19, 1965\n\nThe university first opened its gates on July 17, 1967 to 556 first-year students at its campus in the historic Intramuros district, which served as the seat of power during the Spanish occupation. Currently, about 10,000 graduate and post-graduate students grace its halls to receive PLM’s quality education.');

-- --------------------------------------------------------

--
-- Table structure for table `academic_calendar`
--

CREATE TABLE `academic_calendar` (
  `id` int(11) NOT NULL,
  `type` enum('semestral','trimestral') NOT NULL,
  `term` enum('First Semester','Second Semester','Third Semester','Midyear Term') NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `event` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `academic_calendar`
--

INSERT INTO `academic_calendar` (`id`, `type`, `term`, `start_date`, `end_date`, `event`) VALUES
(1, 'semestral', 'First Semester', '2024-08-12', '2024-08-18', 'REGISTRATION PERIOD'),
(2, 'semestral', 'First Semester', '2024-08-19', '0000-00-00', 'START OF CLASSES'),
(3, 'semestral', 'First Semester', '2024-08-19', '2024-08-22', 'Late Registration/Add-Drop Period'),
(4, 'semestral', 'First Semester', '2024-09-18', '0000-00-00', 'Deadline for Filing of Candidacy for Graduation / Academic Honors with the College'),
(5, 'semestral', 'First Semester', '2024-10-28', '2023-12-15', 'Encoding of schedule of classes for the next school term'),
(6, 'semestral', 'First Semester', '2024-10-21', '2024-10-27', 'MIDTERM EXAMINATIONS'),
(7, 'semestral', 'First Semester', '2024-11-29', '0000-00-00', 'Last Day for Graduating Students to clear their Deficiencies'),
(8, 'semestral', 'First Semester', '2024-12-07', NULL, 'END OF CLASSES for Graduating Students'),
(9, 'semestral', 'First Semester', '2024-12-15', NULL, 'END OF CLASSES for Non Graduating Students'),
(10, 'semestral', 'First Semester', '2024-12-09', '2024-12-15', 'FINAL EXAMINATION for Graduating Students'),
(11, 'semestral', 'First Semester', '2024-12-16', '2024-12-22', 'FINAL EXAMINATION for Non Graduating Students'),
(12, 'semestral', 'First Semester', '2024-12-16', '2024-12-29', 'ENCODING OF GRADES for Graduating Students'),
(13, 'semestral', 'First Semester', '2024-12-16', '2024-12-29', 'ENCODING OF GRADES for Non Graduating Students'),
(14, 'semestral', 'First Semester', '2024-12-23', NULL, 'Christmas Break / Term Break'),
(15, 'semestral', 'First Semester', NULL, '2025-01-12', 'Last Day for Submitting Report of Grades to the Registrar\'s Office for Graduating Students'),
(16, 'semestral', 'First Semester', '2025-01-03', NULL, 'Last Day for Submitting Report of Grades to the Registrar\'s Office for Non Graduating Students'),
(17, 'semestral', 'First Semester', '2025-01-03', NULL, 'Last Day for College Faculty Meeting to Approve Candidates for Graduation'),
(18, 'semestral', 'First Semester', '2025-01-13', NULL, 'Last Day for College to submit Approved Lists of Candidates for Graduation to the Registrar\'s Office'),
(19, 'semestral', 'First Semester', NULL, NULL, 'University Foundation Anniversary'),
(20, 'semestral', 'First Semester', NULL, NULL, 'Araw ng Maynila'),
(21, 'semestral', 'First Semester', '2025-01-22', NULL, 'University Council Meeting to Approve Candidates for Graduation'),
(22, 'semestral', 'First Semester', '2025-01-31', NULL, 'Board of Regents Meeting to Confirm Candidates for Graduation'),
(23, 'semestral', 'First Semester', NULL, NULL, '57th COMMENCEMENT EXERCISES'),
(24, 'semestral', 'Second Semester', '2025-01-02', '2025-01-12', 'REGISTRATION PERIOD'),
(25, 'semestral', 'Second Semester', '2025-01-13', NULL, 'START OF CLASSES'),
(26, 'semestral', 'Second Semester', '2025-01-13', '2025-01-16', 'Late Registration/Add-Drop Period'),
(27, 'semestral', 'Second Semester', '2025-02-12', NULL, 'Deadline for Filing of Candidacy for Graduation / Academic Honors with the College'),
(28, 'semestral', 'Second Semester', '2025-03-24', '2024-05-04', 'Encoding of schedule of classes for the next school term'),
(29, 'semestral', 'Second Semester', '2025-03-17', '2024-03-23', 'MIDTERM EXAMINATIONS'),
(30, 'semestral', 'Second Semester', '2025-05-02', NULL, 'Last Day for Graduating Students to clear their Deficiencies'),
(31, 'semestral', 'Second Semester', '2025-05-11', NULL, 'END OF CLASSES for Graduating Students'),
(32, 'semestral', 'Second Semester', '2025-05-18', NULL, 'END OF CLASSES for Non Graduating Students'),
(33, 'semestral', 'Second Semester', '2025-05-12', '2025-05-18', 'FINAL EXAMINATION for Graduating Students'),
(34, 'semestral', 'Second Semester', '2025-05-19', '2025-05-25', 'FINAL EXAMINATION for Non Graduating Students'),
(35, 'semestral', 'Second Semester', '2025-05-12', '2025-05-25', 'ENCODING OF GRADES for Graduating Students'),
(36, 'semestral', 'Second Semester', '2025-05-19', '2024-06-01', 'ENCODING OF GRADES for Non Graduating Students'),
(37, 'semestral', 'Second Semester', '2025-05-26', '2025-06-06', 'Christmas Break / Term Break'),
(38, 'semestral', 'Second Semester', '2025-05-30', NULL, 'Last Day for Submitting Report of Grades to the Registrar\'s Office for Graduating Students'),
(39, 'semestral', 'Second Semester', '2025-06-06', NULL, 'Last Day for Submitting Report of Grades to the Registrar\'s Office for Non Graduating Students'),
(40, 'semestral', 'Second Semester', '2025-06-06', NULL, 'Last Day for College Faculty Meeting to Approve Candidates for Graduation'),
(41, 'semestral', 'Second Semester', '2025-06-13', NULL, 'Last Day for College to submit Approved Lists of Candidates for Graduation to the Registrar\'s Office'),
(42, 'semestral', 'Second Semester', '2025-06-19', NULL, 'University Foundation Anniversary'),
(43, 'semestral', 'Second Semester', '2025-06-24', NULL, 'Araw ng Maynila'),
(44, 'semestral', 'Second Semester', '2025-07-04', NULL, 'University Council Meeting to Approve Candidates for Graduation'),
(45, 'semestral', 'Second Semester', '2025-07-11', NULL, 'Board of Regents Meeting to Confirm Candidates for Graduation'),
(46, 'semestral', 'Second Semester', '2025-09-02', '2025-09-05', '57th COMMENCEMENT EXERCISES'),
(47, 'semestral', 'Midyear Term', '2025-06-02', '2025-06-08', 'REGISTRATION PERIOD'),
(48, 'semestral', 'Midyear Term', '2025-06-09', NULL, 'START OF CLASSES'),
(49, 'semestral', 'Midyear Term', '2025-06-09', '2025-06-12', 'Late Registration/Add-Drop Period'),
(50, 'semestral', 'Midyear Term', '2025-07-02', NULL, 'Deadline for Filing of Candidacy for Graduation / Academic Honors with the College'),
(51, 'semestral', 'Midyear Term', '2025-06-02', '2025-07-20', 'Encoding of schedule of classes for the next school term'),
(52, 'semestral', 'Midyear Term', '2025-07-26', '2025-07-28', 'MIDTERM EXAMINATIONS'),
(53, 'semestral', 'Midyear Term', '2025-07-04', NULL, 'Last Day for Graduating Students to clear their Deficiencies'),
(54, 'semestral', 'Midyear Term', '2025-07-20', NULL, 'END OF CLASSES for Graduating Students'),
(55, 'semestral', 'Midyear Term', '2025-07-20', NULL, 'END OF CLASSES for Non Graduating Students'),
(56, 'semestral', 'Midyear Term', '2025-07-21', '2025-07-23', 'FINAL EXAMINATION for Graduating Students'),
(57, 'semestral', 'Midyear Term', '2025-07-21', '2025-07-23', 'FINAL EXAMINATION for Non Graduating Students'),
(58, 'semestral', 'Midyear Term', '2025-07-24', '2025-07-29', 'ENCODING OF GRADES for Graduating Students'),
(59, 'semestral', 'Midyear Term', '2025-07-24', '2025-07-29', 'ENCODING OF GRADES for Non Graduating Students'),
(60, 'semestral', 'Midyear Term', '2025-07-24', '2025-08-10', 'Christmas Break / Term Break'),
(61, 'semestral', 'Midyear Term', '2025-08-01', NULL, 'Last Day for Submitting Report of Grades to the Registrar\'s Office for Graduating Students'),
(62, 'semestral', 'Midyear Term', '2025-08-01', NULL, 'Last Day for Submitting Report of Grades to the Registrar\'s Office for Non Graduating Students'),
(63, 'semestral', 'Midyear Term', '2025-08-08', NULL, 'Last Day for College Faculty Meeting to Approve Candidates for Graduation'),
(64, 'semestral', 'Midyear Term', '2025-08-15', NULL, 'Last Day for College to submit Approved Lists of Candidates for Graduation to the Registrar\'s Office'),
(65, 'semestral', 'Midyear Term', NULL, NULL, 'University Foundation Anniversary'),
(66, 'semestral', 'Midyear Term', NULL, NULL, 'Araw ng Maynila'),
(67, 'semestral', 'Midyear Term', '2025-09-05', NULL, 'University Council Meeting to Approve Candidates for Graduation'),
(68, 'semestral', 'Midyear Term', '2025-09-12', NULL, 'Board of Regents Meeting to Confirm Candidates for Graduation'),
(69, 'semestral', 'Midyear Term', NULL, NULL, '57th COMMENCEMENT EXERCISES'),
(70, 'semestral', 'First Semester', '2024-08-19', '2024-12-22', 'Semester Duration'),
(71, 'semestral', 'Second Semester', '2025-01-13', '2025-05-25', 'Semester Duration'),
(72, 'semestral', 'Midyear Term', '2025-06-09', '2025-07-26', 'Semester Duration'),
(73, 'trimestral', 'First Semester', '2024-08-27', '2024-12-15', 'Semester Duration'),
(74, 'trimestral', 'First Semester', '2024-08-19', '2024-08-25', 'REGISTRATION PERIOD'),
(75, 'trimestral', 'First Semester', '2024-08-27', NULL, 'START OF CLASSES'),
(76, 'trimestral', 'First Semester', '2024-08-27', '2024-08-30', 'Late Registration/Add-Drop Period'),
(77, 'trimestral', 'First Semester', '2024-09-02', NULL, 'Deadline for Filing of Candidacy for Graduation / Academic Honors with the College'),
(78, 'trimestral', 'First Semester', '2024-11-04', '2024-12-08', 'Encoding of schedule of classes for the next school term'),
(79, 'trimestral', 'First Semester', '2024-11-22', NULL, 'Last Day for Graduating Students to clear their Deficiencies'),
(80, 'trimestral', 'First Semester', '2024-12-07', NULL, 'END OF CLASSES'),
(81, 'trimestral', 'First Semester', '2024-12-09', '2024-12-15', 'FINAL EXAMINATIONS'),
(82, 'trimestral', 'First Semester', '2024-12-09', '2024-12-15', 'ENCODING OF GRADES'),
(83, 'trimestral', 'First Semester', '2024-12-16', '2025-01-05', 'Christmas Break / Term Break'),
(84, 'trimestral', 'First Semester', '2025-01-03', NULL, 'Last Day for Submitting Report of Grades to the Registrar\'s Office'),
(85, 'trimestral', 'First Semester', '2025-01-07', NULL, 'Last Day for College Faculty Meeting to Approve Candidates for Graduation'),
(86, 'trimestral', 'First Semester', '2025-01-13', NULL, 'Last Day for College to submit Approved Lists of Candidates for Graduation to the Registrar\'s Office'),
(87, 'trimestral', 'First Semester', NULL, NULL, 'University Foundation Anniversary'),
(88, 'trimestral', 'First Semester', NULL, NULL, 'Araw ng Maynila'),
(89, 'trimestral', 'First Semester', '2025-01-22', NULL, 'University Council Meeting to Approve Candidates for Graduation'),
(90, 'trimestral', 'First Semester', '2025-01-31', NULL, 'Board of Regents Meeting to Confirm Candidates for Graduation'),
(91, 'trimestral', 'First Semester', NULL, NULL, '57th COMMENCEMENT EXERCISES'),
(92, 'trimestral', 'Second Semester', '2025-01-06', '2025-04-27', 'Semester Duration'),
(93, 'trimestral', 'Second Semester', '2024-12-16', '2025-01-05', 'REGISTRATION PERIOD'),
(94, 'trimestral', 'Second Semester', '2025-01-06', NULL, 'START OF CLASSES'),
(95, 'trimestral', 'Second Semester', '2025-01-06', '2025-01-09', 'Late Registration/Add-Drop Period'),
(96, 'trimestral', 'Second Semester', '2025-02-12', NULL, 'Deadline for Filing of Candidacy for Graduation / Academic Honors with the College'),
(97, 'trimestral', 'Second Semester', '2025-03-03', '2025-04-06', 'Encoding of schedule of classes for the next school term'),
(98, 'trimestral', 'Second Semester', '2025-04-22', NULL, 'Last Day for Graduating Students to clear their Deficiencies'),
(99, 'trimestral', 'Second Semester', '2025-04-20', NULL, 'END OF CLASSES'),
(100, 'trimestral', 'Second Semester', '2025-04-21', '2025-04-27', 'FINAL EXAMINATIONS'),
(101, 'trimestral', 'Second Semester', '2025-04-21', '2025-05-04', 'ENCODING OF GRADES'),
(102, 'trimestral', 'Second Semester', '2025-04-28', '2025-05-04', 'Christmas Break / Term Break'),
(103, 'trimestral', 'Second Semester', '2025-05-09', NULL, 'Last Day for Submitting Report of Grades to the Registrar\'s Office'),
(104, 'trimestral', 'Second Semester', '2025-05-23', NULL, 'Last Day for College Faculty Meeting to Approve Candidates for Graduation'),
(105, 'trimestral', 'Second Semester', '2025-05-30', NULL, 'Last Day for College to submit Approved Lists of Candidates for Graduation to the Registrar\'s Office'),
(106, 'trimestral', 'Second Semester', '2025-06-19', NULL, 'University Foundation Anniversary'),
(107, 'trimestral', 'Second Semester', '2025-06-24', NULL, 'Araw ng Maynila'),
(108, 'trimestral', 'Second Semester', '2025-07-04', NULL, 'University Council Meeting to Approve Candidates for Graduation'),
(109, 'trimestral', 'Second Semester', '2025-07-11', NULL, 'Board of Regents Meeting to Confirm Candidates for Graduation'),
(110, 'trimestral', 'Second Semester', '2025-09-02', '2025-09-05', '57th COMMENCEMENT EXERCISES'),
(111, 'trimestral', 'Third Semester', '2025-05-05', '2025-08-17', 'Semester Duration'),
(112, 'trimestral', 'Third Semester', '2025-04-28', '2025-05-04', 'REGISTRATION PERIOD'),
(113, 'trimestral', 'Third Semester', '2025-05-05', NULL, 'START OF CLASSES'),
(114, 'trimestral', 'Third Semester', '2025-05-05', '2025-05-08', 'Late Registration/Add-Drop Period'),
(115, 'trimestral', 'Third Semester', '2025-06-04', NULL, 'Deadline for Filing of Candidacy for Graduation / Academic Honors with the College'),
(116, 'trimestral', 'Third Semester', '2025-06-03', '2025-07-20', 'Encoding of schedule of classes for the next school term'),
(117, 'trimestral', 'Third Semester', '2025-07-04', NULL, 'Last Day for Graduating Students to clear their Deficiencies'),
(118, 'trimestral', 'Third Semester', '2025-08-10', NULL, 'END OF CLASSES'),
(119, 'trimestral', 'Third Semester', '2025-08-11', '2025-08-17', 'FINAL EXAMINATIONS'),
(120, 'trimestral', 'Third Semester', '2025-08-11', '2025-08-20', 'ENCODING OF GRADES'),
(121, 'trimestral', 'Third Semester', '2025-08-18', '2025-08-24', 'Christmas Break / Term Break'),
(122, 'trimestral', 'Third Semester', '2025-08-22', NULL, 'Last Day for Submitting Report of Grades to the Registrar\'s Office'),
(123, 'trimestral', 'Third Semester', '2025-08-26', NULL, 'Last Day for College Faculty Meeting to Approve Candidates for Graduation'),
(124, 'trimestral', 'Third Semester', '2025-08-29', NULL, 'Last Day for College to submit Approved Lists of Candidates for Graduation to the Registrar\'s Office'),
(125, 'trimestral', 'Third Semester', '2025-06-19', NULL, 'University Foundation Anniversary'),
(126, 'trimestral', 'Third Semester', '2025-06-24', NULL, 'Araw ng Maynila'),
(127, 'trimestral', 'Third Semester', '2025-09-05', NULL, 'University Council Meeting to Approve Candidates for Graduation'),
(128, 'trimestral', 'Third Semester', '2025-09-12', NULL, 'Board of Regents Meeting to Confirm Candidates for Graduation'),
(129, 'trimestral', 'Third Semester', NULL, NULL, '57th COMMENCEMENT EXERCISES');

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
('CLAT', 'College of Law Admission Test', 'The PLMAT is an essential requirement for aspiring law students at PLM. It evaluates applicants\' critical thinking, analytical skills, and overall preparedness for the challenges of legal education. The exam typically includes questions related to:\n\nLogical reasoning\nReading comprehension\nBasic legal principles', 'Asd@gmail.com', 'close', '- Birth Certificate (PSA/NSO-certified)\n- Official Transcript of Records from their undergraduate degree\n- Certificate of Graduation or proof of completion of a bachelor’s degree\n- Recommendation letters attesting to the applicant\'s moral character\n- Barangay Clearance and NBI Clearance\n- Voter’s ID or proof of Manila residency (if applicable)\n- Income Tax Return (ITR) of parents or benefactor (for scholarship applicants)\n- Passport-sized photos', '- Applicants must hold a bachelor\'s degree from a recognized institution.\n- Must have a strong academic record, particularly in subjects relevant to legal studies.\n- A good moral character is required, as evidenced by recommendation letters​', '1. Online Registration\n2. Payment of Fees\n3. Examination Schedule\n4. Take the PLMAT\n5. Interview\n6. Admission Results'),
('CMAT', 'College of Medicine Admission Test', 'The filing of applications typically ends by January 31 for the following academic year, and late applications or transfers from other medical schools are generally not accepted​\n', 'asd@gmail.com', 'close', '- Birth Certificate (NSO/PSA copy).\n- Official Transcript of Records and a certificate of graduation.\n- Two letters of recommendation for good moral character.\n- Proof of Manila residency, such as a Voter’s ID or certification from COMELEC.\n- Barangay clearance and NBI clearance.\n- Parents\' or benefactor’s Income Tax Return (ITR) or Affidavit of Support.\n- Additional documents like a self-addressed stamped envelope, and ID photos.', '- Must be a natural-born Filipino citizen.\n- Must have completed all pre-medical academic requirements.\n- A General Weighted Average (GWA) of 2.50 or better is required.\n- Achieve a minimum score of 45 in the NMAT (National Medical Admission Test) within two years of the application.\n- No failures or dropped subjects in the undergraduate course.\n- No record of being dismissed or denied admission from any medical school.\n- No conviction of a crime involving moral turpitude.\n- Applicants must pass the Medical College Admission Test (MCAT) and a panel interview.', '1. Step 1: Meet the Eligibility Criteria\n2. Step 2: Prepare Required Documents\n3. Step 3: Submit Application Form\n4. Step 4: Take the MCAT\n5. Step 5: Attend the Panel Interview\n6. Step 6: Wait for Admission Results'),
('PLMAT', 'PLM Admission Test', 'The Pamantasan ng Lungsod ng Maynila (PLM) will start accepting applications (on-line) for freshmen students (undergraduate programs) for Academic Year (AY) 2024- 2025 starting September 19, 2024.', 'asdas@gmail.com', 'close', '- PSA Birth Certificate.\n- For Senior High School (SHS): Grade 11 Certificate of General Weighted Average (GWA).\n- For Alternative Learning System (ALS) completers and Accreditation & Equivalency (A&E) Passers: Certificate of Completion', '- A Grade 12 student who is currently enrolled in a Senior High School (SHS) accredited by Department of Education (DepEd) or;\n- Graduate from senior high school and has not taken any college or university units/programs prior or during the application or;\n- An Alternative Learning System (ALS) completer and Accreditation & Equivalency (A&E) passer (recommended for tertiary education) and has not yet taken any college or university units/programs prior or during the application.', '1. Visit PLM Admission Portal. (https://web1.plm.edu.ph/crs/admission/plMAT2025/)\n2. Fill out the Application Form (online).\n3. Upload required application requirements (on-line).\n6. a. PSA Birth Certificate\n7. b. Certificate of Grade 11 GWA or ALS Certicate\n4. Check email for the account credentials after submitting the application successfully.\n5. Log in to PLM Admission Portal using applicant\'s account credentials on a regular basis to check the status of the application. 6. Print in colored (single page) and upload scanned-signed test permit with ID picture (2 x 2 colored with white background).\n7. On the specified examination date, bring two (2) signed exam permits with an ID picture (2x2 colored with white background).');

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
(1, 'For hire!', 'uploads\\files\\5b38073b-6e19-4436-9d6b-13fc69a32b95.pdf'),
(2, 'PLM Erp', 'uploads\\files\\ef11a680-6e37-4376-b238-31987fafb690.pdf'),
(3, 'Procurement System', 'uploads\\files\\b7cc68b0-3e35-4ed5-8f9e-8121edb46ade.pdf'),
(4, 'PLM Entrance Hall', 'uploads\\files\\cfba8cb3-d092-46d3-8f0b-16f671c4b0c5.pdf');

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
(21, 'Test', 'test@gmail.com', 'Test Title', 'inactive', 'uploads\\images\\e7af340e-4d7c-4c1a-8ccd-e2ee25ac2b2a.png'),
(22, 'Atty. Edward S. Serapio', 'esserapio@plm.edu.ph', 'Chairman', 'active', 'uploads\\images\\0c93fe43-bf55-49f8-b688-2f7d3b26bcc9.png'),
(23, 'Atty. Domingo Y. Reyes Jr.', 'dyreyes@plm.edu.ph', 'University President and Vice-President', 'active', 'uploads\\images\\100f3c16-7b73-47b0-9f36-b71ea9d19b96.png'),
(24, 'Dr. Rita E. Riddle', 'reriddle@plm.edu.ph', 'Ex-Officio Member and Superintendent of the Division of City Schools - Manila', 'active', 'uploads\\images\\cc007bd5-832a-499c-9163-70b50e88c1e1.png'),
(25, 'Dr. Joseph Berlin P. Juanzon', 'jbpjuanzon@plm.edu.ph', 'Member and Executive Director of the Office for Graduate and Professional Studies', 'active', 'uploads\\images\\f5ba991d-3aa3-4317-88c3-7e75afc64bfd.png'),
(26, 'Ms. Wilma V. Galvante', 'wvgalvante@plm.edu.ph', 'Member', 'active', 'uploads\\images\\b75a094e-8ed3-4641-b196-5d7579cfd801.png'),
(27, 'Dr. Neri S. Pescadera', 'nspescadera@plm.edu.ph', 'Member', 'active', 'uploads\\images\\554650f6-7893-4d23-bb84-ea1ba682a3a4.png'),
(28, 'Atty. Marisol DL Anenias', 'mdlanenias@plm.edu.ph', 'Member', 'active', 'uploads\\images\\abef4794-38d3-4fdd-9c96-52f7c0af9938.png'),
(29, 'Atty Elvira Cruz', 'ecruz@plm.edu.ph', ' University and Board Secretary', 'active', 'uploads\\images\\d2841443-a5d3-41f7-bde7-165e1470810d.png');

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
(3, 'Janitor', 'Janitor', 17000, 22000, 'OVPA', 'uploads\\files\\d8df5927-0ee6-4cb7-9069-1b44296a985c.pdf'),
(10, 'Hiring Part Time Teaching Staff', 'Part Time Teaching Staff', 20000, 30000, 'College of Engineering', 'uploads\\files\\f9ce0bc9-bbd7-4198-b03c-67c2fae5c74b.pdf'),
(11, 'Hiring Part Time Teaching Staff', 'Part Time Teaching Staff', 20000, 30000, 'College of Architecture', 'uploads\\files\\c2e9083c-ef3a-47e3-925a-44f21892d5bb.pdf'),
(12, 'Hiring Part Time Teaching Staff/s', 'Part Time Teaching Staff/s', 22000, 30000, 'College of Information Technology and Management System', 'uploads\\files\\89ebdf8b-9c66-45fa-b790-40ce40ecabdb.pdf'),
(13, 'Full Time Teaching Staff/s', 'Part Time Teaching Staff/s', 22000, 30000, 'College of Architecture', 'uploads\\files\\744f805c-3975-4eda-94d2-d562dc4726cb.pdf'),
(14, 'Full Time Teaching Staff/s', 'Doctor of Medicine', 40000, 60000, 'College of Medicine', 'uploads\\files\\1a30d31d-a65e-4341-8c15-6a231751ac24.pdf');

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
('001', 'College of Architecture and Sustainable Built Environments', 'The College of Architecture and Sustainable Built Environment is an academic unit of PLM that provides quality education for the next generation of architecture and construction professionals to become leaders in the sustainable design, construction, and management of the built environment. It offers a comprehensive approach that integrates traditional architecture with a focus on environmental and social responsibility.', 'The Bachelor of Science in Architecture program was first offered at the university in 1987. The basic objective of opening this unique 5-year discipline was to extend equal opportunity to economically challenged but deserving students of Manila. This, along with Fine Arts, was initially attached to the College of Engineering and Technology, among the largest colleges on the campus even until today.\n\nThe program was eventually given its own academic unit, the College of Architecture and Urban Planning (CAUP), and was officially recognized as a separate college on January 10, 2001 by virtue of BOR Resolution No. 2272. Together with the Manila local government\'s vision to transform an urban decay city into a vibrant, world-class urban tourist destination; this thrust on urban renewal paved the way to institutionalize sustainable programs by way of a permanent home centered on urban planning and design.\n\nIn light of the industry shift to sustainable design and construction, the college was renamed as the College of Architecture and Sustainable Built Environments in January 2024 to align its goals and objectives towards sustainable development and the flexibility to offer new programs that would meet them. For many academic years this College prides itself of reaping numerous honors and citations for PLM, both in local and national arena. These achievements were a result of a strong and continuing partnership built around a team spirit nurtured by an inspired studentry and a supportive institution.', 'To become a partner of choice as an active provider of competent industry players in today’s built-environment market and be a catalyst for sustainable change in the City of Manila and beyond.', 'Create an environment mutually beneficial to students and the institution by providing opportunities of cooperation while in constant adherence to excellence in professionalism, creativity, team work, and leadership to foster their awareness on professional responsibilities towards sustainability, the socio-cultural strata, environmental values, built heritage conservation, technical research and collaboration with allied-professions in developing design leadership.', 'active', 'casbe@plm.edu.ph', '123456789'),
('CA', 'College of Accountancy', 'The College of Accountancy at Pamantasan ng Lungsod ng Maynila is dedicated to becoming a leader in accountancy education through its commitment to academic excellence, innovation, and ethical leadership. With a rigorous curriculum, impactful research, strong industry partnerships, and a culture of integrity and social responsibility, the college aims to produce competent and socially responsible accountants who will contribute significantly to national development. The continuous professional growth of faculty and staff ensures that the college remains at the cutting edge of educational and professional practices, living up to its motto: \"Excellence. Integrity. Innovation.\"', 'The College of Accountancy at Pamantasan ng Lungsod ng Maynila (PLM) is a vital academic unit that offers comprehensive programs in accountancy and taxation. The college aims to produce graduates with the knowledge and skills necessary for professional excellence in the fields of accounting and finance.\n\nPLM, established by Republic Act No. 4196 in 1965, has evolved into a premier institution providing accessible and high-quality education to students, especially the underprivileged but intellectually gifted youth of Manila. The College of Accountancy continues this tradition by equipping its students with a strong foundation in financial management, auditing, and related disciplines, ensuring they are well-prepared for licensure examinations and careers in both the public and private sectors​', '\"To be a leading institution in accountancy education, recognized for academic excellence, innovation, and ethical leadership, committed to producing competent and socially responsible accountants who will contribute significantly to national development.\"', '\"The College of Accountancy at Pamantasan ng Lungsod ng Maynila is dedicated to providing high-quality education that equips students with the knowledge, skills, and ethical grounding necessary for professional success. We aim to foster a learning environment that promotes critical thinking, innovation, and lifelong learning.', 'active', 'ca@plm.edu.ph', '123456'),
('CBA', 'College of Business Administration', 'The College of Business Administration (CBA) offers courses that focus on administering businesses and their general operations. The program involves decision making skills to organize and strategize business operations and successful entrepreneurs. Students under this college acquire business philosophy while strengthening their leadership skills, and they have a flexible curriculum that allows them to hound a diversity of careers.', 'In accordance with the Board Resolutions, the evolution of the College of Business Administration (CBA) are as follows:\n\nUnder BOR # 1817 on March 1995, the College of Business and Public Administration was established, and it was restructured into two colleges, the College of Accountancy and Economics (CAE) and the College of Management and Entrepreneurship (CME) in pursuant of BOR # 2467, dated April 2002.\n\nThe University resolved and merged the three colleges, CAE, CME and College of Tourism, Hotel and Information Management (CTHIM) and named into College of Administration, Business and Management (CABM). It was then divided into two colleges, the College of Accountancy and Finance (CAF) and College of Business and Management (CBM) under BOR # 3816 dated June 2015.\n\nPursuant to BOR # 4284 dated June 2017, the CA (BOR #3966 March 2016), PRMSG (BOR #4002 May 2016), and CBM were merged and named as College of Business and Government Management (CBGM)\n\nWith BOR # 4716, the University approved and confirmed the restructuring of the College of Business and Government Management (CBGM) into the College of Business and Management (CBM) and the School of Government (SG).\n\nBy virtue of BOR # 4736, the CBGM was named PLM School of Business, and it was renamed to PLM Business School under the BOR # 4743.\n\nPursuant to Board Resolution No. 5189 dated December 8, 2023, the reorganization of the management structure of the Pamantasan Ng Lungsod Ng Maynila has been adopted.\n\nOne of the approved restructures is the division of PLM Business School into three colleges:\na. College of Accountancy (CA)\nb. College of Tourism and Hospitality Management (CTHM)\nc. College of Business Administration (CBA)\n\nEach of the college has their respective academic disciplines, namely:\na. CA: Accountancy\nb. CTHM: Tourism and Hospitality Management\nc. CBA: Entrepreneurship, Financial Management, Human Resource Management, Operations Management, Marketing Management, Entrepreneurship, Real Estate Management', 'To be an empowered leader in business and management thought and trained through comprehensive creation, competitive business and service professionals equipped with knowledge, skills, values, and extraordinary experiences in the greater glory of God.', 'To produce value for students, business, and society through activities that lead to career success and the advancement of knowledge and by providing its learners the opportunities to distinguish their abilities to apply requisites and philosophies specific to business and to transform them into service-oriented professional with high spiritual, and ethical that contributes to the society.\nCollege Objectives', 'active', 'cba@plm.edu.ph', '123456789'),
('CE', 'College of Engineering', 'Formerly the College of Engineering and Technology, the College of Engineering is one of the Colleges of the University effective 25 January 2024 after the Management Reorganization of the Pamantasan ng Lungsod ng Maynila. At present the College of Engineering offers the following undergraduate and graduate academic programs.', 'With the conviction of providing quality education and offering technical manual skills in the field of technology, the College of Engineering was established on July 1, 1969 - six years after the late Mayor Antonio F. Villegas founded the university.\n\nOriginally under the College of Arts and Letters, the main trust of the college was to provide technical, industrial, vocational education to PLM students alongside the humanistic courses to prepare them for promoting out technology under two divisions, namely - the Division of Engineering and Technology which covered the Department of Civil, Mechanical, Electrical, Sanitary, Chemical, Naval and Industrial Engineering and the Division of Technical and Vocational Education which covered the Department of Electronics, Wood Working, Metal Works, Automotive Works, Ceramics, Graphics Arts and Teacher Education in Arts and Trades. Obtaining a degree in this college then, required the student to finish a six-year ladderized program which was later reduced to a five-year scheme during the term of former PLM President Consuelo Blanco who felt the imperative need of the engineering graduates to constitute the country\'s labor pool.\n\nToday, the College of Engineering stands committed to upholding the legacy conceived by Mayor Villegas and the late Mayor Arsenio H. Lacson by providing its present batch of Engineering students with quality education which is responsive to the needs of the time.', 'The College of Engineering will be the premier college in technological education, research and extension services.', 'Guided by this vision, we commit ourselves to:\n1. Uphold excellence through curriculum development and teaching, significant advances in knowledge, and services to the community of which we are a part.\n2. Nurture students with a technological education of the highest quality that will enable them to be professionally competent, community directed, and God centered individuals; and\n3. Develop faculty members and staff to be excellent examples in leadership and management.', 'active', 'CE@plm.edu.ph', '1234'),
('CEduc', 'College of Education', 'The College of Education was formed out of reorganization and merging of colleges that were approved by the Board of Regents on June 4, 2015. It aspires to be one of the country\'s centers of excellence in the field of Education. It is committed to produce globally empowered quality graduates who are proactive and catalysts of social transformation.\n', 'in June 2015, there was amalgamation of colleges under the leadership of President Ma. Leonora Vasquez De Jesus. From the College of Human Development, a new College of Education was formed out of reorganization. Two colleges and graduate schools with education programs were merged namely: the College of Human Development (CHD) particularly the Department of Teacher Education (DTE), College of Physical Education Recreation and Sports (COPERS), Emeritus College (EC) and Graduate School of Arts, Sciences and Education (GSASE) and that was approved by the BOR on June 4, 2015. The Mabuhay Integrated Learning Center (MILC) was also included since it caters the pre-school students.', 'One with the university’s vision, the College of Education aspires to pursue the principles of \"Karunungan, Kaunlaran, Kadakilaan.\" and be one of the nation’s centers of excellence in Teacher Education.', 'The Administration, Faculty, and Staff of the College of Education commit:\n1. to gaining recognition as an excellent pre-service teacher-training institution.\n2. to insuring a consistently higher than national average performance on the Licensure Examination for Teachers (LET).\n3. to providing students with effective and relevant instruction that will equip them with skills required of educational institution here and abroad.\n4. to contributing to research efforts that will help improve the overall quality of education in the country.\n5. to imbibing a culture of excellence, integrity and responsibility.', 'active', 'educ@plm.edu.ph', '12345'),
('CHASS', 'College of Humanities, Arts and Social Sciences', 'The College of Humanities, Arts, and Social Sciences (CHASS) emerged through the reorganization/merging of the College of Liberal Arts (CLA) and the College of Mass Communication (CMC), as recommended by the PLM University Council and approved by the Board of Regents on the latter’s special meeting on June 4, 2015. By virtue of the reorganization, the Bachelor of Science in Social Work from the College of Human Development (CHD) and the Master of Arts in Communication Management from the Graduate School of Arts, Science, and Education (GSASE) also became part of CHASS. The merging was also based on the vertical articulation prescribed by the Commission on Higher Education’s Education Reform Agenda.', 'The College of Humanities, Arts, and Social Sciences (CHASS) at Pamantasan ng Lungsod ng Maynila (PLM) is a distinguished academic unit that nurtures students in various disciplines, including communication, social work, and music performance. The college\'s programs are designed to cultivate critical thinking, creativity, and a deep understanding of human society and culture.\n\nCHASS plays a vital role in PLM\'s mission to produce socially responsible and service-oriented graduates who can contribute to national development. Its interdisciplinary approach blends theory and practice, preparing students for diverse careers in education, media, public service, and community development', 'The College of Humanities, Arts, and Social Sciences (CHASS) of Pamantasan ng Lungsod ng Maynila (PLM) envisions itself as a center of excellence that promotes humanistic education, cultural development, and social engagement. Its mission is to cultivate critical and creative thinkers who are committed to contributing to the betterment of society through the humanities, arts, and social sciences.', 'CHASS aims to develop students into socially responsible professionals who possess both intellectual rigor and a profound appreciation for cultural and social diversity. It provides an interdisciplinary academic environment where students can gain knowledge and skills to address contemporary societal issues and challenges', 'active', '12@gmail.com', '1234'),
('CISTM', 'College of Information Technology and Management Systems', 'On 8 December 2024, in a Board of Regent meeting, a proposal entitled \" Management Reorganization of the Pamantasan ng Lungsod ng Maynila was presented. Under the Academic Cluster the Bachelor of Science in Computer Science, Bachelor of Science in Information Technology and Master in Information Technology will be under the new college which is the College of Information Systems and Technology Management.', 'On 8 December 2024, in a Board of Regent meeting, a proposal entitled \" Management Reorganization of the Pamantasan ng Lungsod ng Maynila was presented. Under the Academic Cluster the Bachelor of Science in Computer Science, Bachelor of Science in Information Technology and Master in Information Technology will be under the new college which is the College of Information Systems and Technology Management.', 'The College of Information Systems and Technology Management will produce globally competent graduates that shall cater the needs of the industry in research and innovation', 'To develop and nurture students be become globally competent, innovative, and ethically responsible computing professionals engaged in life-long learning endeavors.', 'active', 'test@gmail.com', '123456789'),
('cl', 'College of Law', 'The College of Law formally opened its door in the School Year 1989-1990. Board Resolution No. 1329 dated 18 April 1989 established the College of Law and approved a curriculum for the first year level. On 02 April 1990, the Board approved a curriculum for the second to fourth year levels based on DECS Order No. 27, s. 1989 (Standard Law Curriculum). The creation of the College of Law was a testament to the social justice orientation of PLM.\nThe College adopted and implemented its new curriculum, which incorporates the latest developments and trends in the field of law.', 'The College of Law formally opened its door in the School Year 1989-1990. Board Resolution No. 1329 dated 18 April 1989 established the College of Law and approved a curriculum for the first year level. On 02 April 1990, the Board approved a curriculum for the second to fourth year levels based on DECS Order No. 27, s. 1989 (Standard Law Curriculum). The creation of the College of Law was a testament to the social justice orientation of PLM.', 'The general law program hopes to provide men and women with high legal education at the least possible cost, preparing them for the practice of law: that is geared towards public service and social justice. Towards this end, the law program is designed:\n1. To train the students to have a clear grasp of the law.\n2. To develop the student’s ability to think logically, methodically, and to express himself clearly and forcefully.\n3. To train the students for leadership in various spheres of public service.\n4. To contribute to the development of Philippine jurisprudence and legal literature.', 'Guided by the Life Purpose and inspired by the Vision, we commit ourselves to wit:\n1. To motivate and develop competent, productive and ethical professionals, leaders, and citizens of/in Manila.\n2. To conduct and sustain relevant, innovative researches and extension services for the enrichment of scholarship and community development.\n3. To develop and maintain a corps of competent, committed and ethical administrators, faculty and service personnel for the efficient and effective delivery of quality academic and administrative services.\n4. To provide, improve and maintain adequate and functional infrastructures supportive of and conducive to quality education.\n5. To promote and maintain mutually beneficial linkages and networks with institutions and agencies at the local and international levels.\n6. To engender and enhance the goodwill and support of alumni, friends, and other publics for a viable and sustainable university.', 'active', 'asddsa@gmail.com', '123'),
('cm', 'College of Medicine', 'The Pamantasan ng Lungsod ng Maynila (PLM) College of Medicine, established in 1983 and funded by the local government of Manila, is the first local institution in the Philippines offering a Doctor of Medicine degree. It provides opportunities for financially disadvantaged but academically deserving students. Renowned for developing competent and compassionate medical practitioners, the College addresses the healthcare needs of Manila, the nation, and the world. Over three decades, it has gained respect as a premier medical school. The College remains committed to academic excellence, further training, research, and community service.', 'The Pamantasan ng Lungsod ng Maynila (PLM) College of Medicine was established in June 1983 by virtue of Resolution No. 806, series of 1980, passed on December 15, 1980, by the PLM Board of Regents. From its inception, the College of Medicine aimed to offer a unique, community-based medical education designed to address the healthcare needs of Manila\'s residents, particularly those in underserved barangays, by producing primary care physicians.\nIn June 1983, the College of Medicine formally commenced operations with an inaugural class of 48 medical scholars, all from Manila. Three years later, as part of its commitment to quality medical education, the college extended its scholarship program to qualified non-Manila residents, offering substantial financial support. Notably, the College of Medicine is entirely funded by the local government of Manila and holds the distinction of being the first local educational institution in the country to offer a Doctor of Medicine degree.\nOver the years, the PLM College of Medicine has earned a reputation as one of the Philippines\' premier medical schools. It consistently ranks among the top five medical schools in the Physician Licensure Examinations conducted by the Professional Regulations Commission (PRC). Furthermore, in recognition of its excellence, the college has received Level III accreditation from the Philippine Accrediting Association of Schools, Colleges, and Universities (PAASCU).\nOur institution takes pride in its graduates, many of whom have been locally and nationally recognized for their outstanding performance and service. Even those who have not received formal accolades continue to make significant contributions as primary care physicians, medical specialists, educators, researchers, and public health advocates. They are dedicated to serving the healthcare needs of Manila, the nation, and the global community. These graduates remain steadfast in their commitment to enhancing overall health and well-being in society, making them the invaluable \"Golden Harvests\" of the PLM College of Medicine.', 'Anchored upon our University’s Vision, Mission and Objectives, we at the College of Medicine, aspire to be:\nAn excellent center committed to community-oriented medical education, training, research and service.', 'In pursuit of our vision we commit ourselves to be:\nA professional school for the education and training of medical professionals who are highly competent, globally competitive, ethical, caring and dedicated to serve the health needs of the City of Manila, the nation and the world.', 'active', 'asddsa@gmail.com', '124'),
('cn', 'College of Nursing', 'The College of Nursing at PLM was established in 1969, in response to a study highlighting the need for community-oriented healthcare in Manila. Since its inception, the college has admitted numerous nursing scholars and has consistently produced top performers in the nurse licensure examinations. The college\'s alumni have achieved significant recognition, with many placing in the top ranks of the exams over the years.\nThe College of Nursing operates with a clear organizational structure and defined roles for faculty and students. Policies cover various aspects, including faculty responsibilities, student conduct in classrooms and clinical areas, and general operational procedures. There are committees dedicated to continuing education, faculty research, student development, community service, and library resources.\nThe College of Nursing at PLM is recognized as one of the top nursing schools in the Philippines, a distinction earned through the dedication and hard work of its faculty and students. The college\'s consistent excellence in nurse licensure exams and its contribution to the field of nursing education have cemented its reputation both locally and internationally.\nEvery year, the College of Nursing admits top academic performers motivated to pursue the noble profession of nursing. Students receive clinical training at prestigious hospitals and health agencies, ensuring they are well-prepared for their careers. The college\'s leadership, composed of distinguished individuals, has played a crucial role in maintaining its high standards and guiding it to its current preeminent position.', 'In 1967, a study entitled \"Manila - Its Needs and Resources\" indicated the need to open a community-oriented college, based on its finding that despite the physical proximity to the people of the 41 Manila Health Centers, there were less community people who seek help / healthcare from them. This study confirmed the then and now current thinking of health care experts that in order to meet the health needs of the people, it is essential that health workers must go where the people are - to their homes in the community. This led to the conception of the College of Nursing at Pamantasan ng Lungsod ng Maynila (PLM).\nWhen PLM opened on July 17, 1967 many of the enrollees in the 2-year Associate Arts course were prospective nursing students. In the summer of 1969, the PLM - College of Nursing was established by the President Dr. Benito F. Reyes, and appointed Ms. Valentina Patacsil as the College Secretary. Under her guidance, twenty-nine (29) students were selected to be the first nursing scholars of the University. On July 1, 1969, Mrs. Mary Vita B. Jackson was appointed Dean of the College of Nursing - PLM. Four (4) years later, 27 of those scholars passed the Board Examination given in April 1972 with one of them placing 9th. Since then more PLM - College of Nursing graduates have distinguished themselves as perennial placers in the nurse licensure examination and a large number of its undergraduate students have reaped numerous honors for the College in various intercollegiate competitions, both academic and nonacademic. The products of the PLM - College of Nursing have also proven to be topflight and competitive nurse practitioners both in the Philippines and abroad.', 'A leader in nursing education in the ASEAN region producing globally competitive nurses with excellence, integrity and social responsibility.', '1. To be recognized by Philippines and ASEAN Academic accrediting agencies as premier nursing school known for its quality education, research and extension service.\n2. To produce nurse leaders in the fields of clinical practice, research, academe and entrepreneurship with a competitive advantage for employment opportunities.', 'active', '12@gmail.com', '1234'),
('cpt', 'College of Physical Therapy', 'An equally high-performing college of the University, the College of Physical Therapy lays the touchstone of powerful physical therapy education and training, enabling the college to remain consistently first to the highest in licensure examinations for the past twenty years. Contributing significantly to the promotion of wellness and the rehabilitation of physical disability, the college affirms the compassionate and unquestionable dedicated health care services of its graduates.', 'Through the mandate of Board Resolution No. 1636, the Pamantasan ng Lungsod ng Maynila - College of Physical Therapy (PLM CPT) opened its doors of education and training to aspiring experts in the field of health care and allied medical profession in 1993. Dr. Quintin Eala, former Dean of the PLM College of Medicine, founded the College of Physical Therapy with about 40 students. The original office was located in the former faculty room of the College of Medicine, which formerly functioned as the College\'s faculty and administration rooms. The office was eventually relocated to the Old Library Building.\nThe PLM Physical Therapy Clinic was also established to provide PT students and interns with real-world experience while simultaneously meeting the rehabilitative needs of the PLM community and PLM adopted barangays. A separate fitness and wellness center was constructed for students and varsity athletes, with an emphasis on injury prevention and sports rehabilitation..\nOn August 2008, PLM Wellness and Fitness Center, under the supervision and management of CPT was established. The said Wellness and Fitness Center caters PLM faculty members and staff’s physical and cardiopulmonary wellness, prevention, and exercise.\nOn June 2016, the College started the Master of Science in Physical Therapy program which will cater the needs of Filipino physical therapists and faculty members. It is the fourth school that offers master’s degree program in the Philippines.\nCurrently, CPT is headed by the Dean, and assisted administratively by the Associate Dean, MSPT Program Chair and BSPT Department Chair, and Internship Coordinator.', 'The PLM College of Physical Therapy will be the pre-eminent academic physical therapy program in the Philippines and South East Asia recognized for its leadership in education, clinical practice, extension services and research.', 'In training a new generation of physical therapists, we are committed to:\n1. Educate future physical therapists who are knowledgeable, globally competitive, highly employable, compassionate, research-oriented, and service-oriented and who, by virtue of critical thinking, life-long learning, and ethical values, render independent judgments concerning patient/client needs\n2. Assist community and university efforts to support the underserved populations of the Philippines in terms of extension services\n3. Promote optimal health for our patients and society by contributing to the advancement of rehabilitation science and practice through research\n4. Become recognize by local and international accrediting and licensing bodies or agencies as a premier college in physical therapy education.', 'active', 'asd@gmail.com', '123'),
('CS', 'College of Science', 'The College of Science is a diverse and dynamic academic community advancing scientific knowledge and education through its four departments: Biology, Mathematics, Physical Science, and Psychology. These departments foster collaboration, innovation, and academic excellence, promoting interdisciplinary research to address today’s complex challenges. By equipping students with essential skills, advancing scientific knowledge, and contributing to societal well-being, the college nurtures the next generation of scientists, researchers, and professionals to drive progress on a global scale.', 'On March 18, 2002, in a Board of Regents Meeting, “A Proposal to Reorganize the Different Colleges and Academic Units in line with the Restructuring Efforts of the Administration” was presented. One of the proposals was the division of the College of Arts and Sciences in three (3) independent colleges with academic disciplines namely: (a) College of Science: Physical Sciences, Biological Sciences and Mathematics; (b) College of Liberal Arts; and (c) College of Mass Communication.  On April 2, 2002, Board Resolution No. 2467 approved the college separation proposal. \nJune 4, 2015, during the Special Meeting, re-organization / merging of colleges was approved by the PLM Board of Regents as recommended by the University Council. The College of Science retained its name but with the inclusion of BS Psychology, MA Psychology and MS in Mathematics Education.  The Office of the Science Laboratory Services (SLS) was also merged into the College of Science as one of its unit/ departments.\nOn 06 April 2018, Board Resolution No. 4448, the proposed curriculum for undergraduate programs were approved: Bachelor of Science in Biology major in Cell and Molecular Biology, Bachelor of Science in Biology major in Ecology, Bachelor of Science in Biology major in Medical Biology, Bachelor of Science in Chemistry, Bachelor of Science in Mathematics, and Bachelor of Science in Psychology.', 'To make the College of Science premier college, a Center of Excellence and frontier of Knowledge in science through rigorous academic training in teaching, research, and overall scholarship that remains relevant to the demand of changing times. By responding to the challenges, needs, and on-going progress of the Filipino people, neighboring countries in Asia and the world at large. PLM will proudly display its innovative brand of leadership both globally and technologically. ', 'As a Center of Excellence, the PLM College of Science:  \n- aims to adhere to national and international standards through its multidisciplinary approach for recognition by National and International accrediting agencies; \n- aims to achieve a higher than national average performance on professional examinations; \n- aims primarily to training bright Filipino high school students from Manila in overall scholarship, science education, and research for global competitiveness and employability. \n- encourages and supports research initiatives from faculty and students that will contribute to the advancement of science. \n- aims to lead the academic community for policy and decision–making that promotes intellectual excellence, integrity and social responsibility. ', 'active', 'test@gmail.com', '09123456789'),
('CTHM', 'College of Tourism and Hospitality Management', 'The College of Tourism and Hospitality Management is a department within a university that focuses on preparing students for careers in the tourism and hospitality industries. These industries are broad and encompass a variety of businesses and services related to travel and leisure.\n\nCourses in business fundamentals, marketing, events management, and finance\nCourses specific to hospitality and tourism, such as hotel operations, restaurant management, destination management, and event planning, kitchen essentials, baking, Barista, bar and beverage.\nCourses that develop transferable skills, such as communication, critical thinking, problem-solving, and intercultural competence.\nInternships: Many programs offer internship opportunities that allow students to gain practical experience in the hospitality and tourism industries.\nThe goals of a college of tourism and hospitality management program are typically to:\nProvide students with the knowledge and skills necessary to be successful in the tourism and hospitality industries.\nPrepare students for a variety of careers in these industries, such as hotel management, restaurant management, event planning, travel agency management, and destination marketing.\nInstill in students a strong work ethic and a commitment to providing excellent customer service.\nIf you are interested in a career in the exciting and ever-growing tourism and hospitality industries, a college of tourism and hospitality management program may be a good option for you.', 'In February 2024, in a Board of Regents meeting, a proposal entitled “Reorganization of the Different Colleges and Academic Units in line with the Restructuring Efforts of the Administration” was presented. One of the concerns in the said proposal was to separate the Department of Tourism Management and the Hospitality Management from the PLMBS which is now the College of Tourism and Hospitality Management. That has 2 courses namely:\na) BS Tourism Management\nb) BS Hospitality Management', 'The Pamantasan ng Lungsod ng Maynila shall be the premier people\'s university pursuing public interest and national development of skilled individuals.', 'The Pamantasan ng Lungsod ng Maynila shall form critical-minded and service-oriented leaders and innovators in various disciplines through accessible and relevant quality education, transformative institutional research and extension services, and key linkages.', 'active', 'CTHM@plm.edu.ph', '123123'),
('gds', 'Graduate School of Law', 'The PLM\'s Graduate School of Law provides legal education to lawyers and non-lawyers who have obtained their first law degree in any college or university in the country offering either a Bachelor of Laws or Juris Doctor program.\nIt aims to attract in its fold lawyers, including judges, prosecutors, practitioners, and those employed in the government and private service.\nThe GSL boasts of its professors who are experts in their respective areas of law, intellectually vigorous, engaged, and committed to quality teaching and high levels of service to students. They come to class with extensive experience having practiced law for the public sector, businesses, private firms, and the Judiciary.', '\"On July 7, 2004, the Graduate School of Law was formally launched as the second graduate school of law in the Philippines. On July 29, 2004, the Board of Regents by virtue of BOR Resolution No. 2686 approved the offering of the graduate program of Master of Laws.\nThe Master of Laws Program (LLM) is offered by the PLM Graduate School of Law as a two-year program, trimestral terms, with strong focus on research that culminates in a thesis. Courses are delivered entirely in English using a multidisciplinary approach by distinguished Jurist and Law Practitioners.\"', 'The PLM Graduate School of Law envisions itself as the reflection of an ideal institution of intellectual and highly principled lawyers, with advanced excellent legal training, who will rise to higher callings with commitments to be of service to our country and people.\"', '\"The PLM Graduate School of Law will stress the noble mission of lawyers and judges as well. It will likewise assist in raising the high standards of the legal profession needed in the effective and efficient dispensation of justice for the good of the country, and in contributing meaningful efforts in the pursuit of global peace, and cooperation through law and universal understanding. The PLM Graduate School of Law, inspired by the legacy left by the late President Diosdado M. Macapagal, whose brilliance, integrity and devotion to public duty and service, his concern for the common people, specially the poor and under privileged desirous of achieving higher learning in the midst of economic hardship---envisions to promote and develop educational advancement, leadership and sense of patriotism among members of the Philippine Bar.\"', 'active', 'asddsa@gmail.com', '123'),
('pub', 'College of Public Administration', 'Consistent with PLM’s institutional mandate, the College of Public Administration (CPA) is committed to its fundamental philosophy to uphold the values of democracy and diversity congruent with the Filipino culture and tradition. Its primordial role as a center of higher learning is not only to provide high quality education but also to be a leading institution in the political, social and cultural realms. It fosters the ideals of liberalism, constitutional democracy, respect for the dignity and rights of every person and promote an environment of solidarity, tolerance and freedom in our campus. It is dedicated to inspiring younger generation of Filipinos to pursue their most cherish dreams to gain knowledge and skills that will transform them to be the most vibrant and effective leaders in the country and around the globe.', 'With the passing of Board Resolution No. 4642 on April 12, 2019, the PLM Board of Regents approved the proposed curriculum for the Bachelor of Government Management of the College of Business and Government Management. Eventually, the College of Business and Government Management was split into College of Business and Management and the School of Government by virtue of Board Resolution No. 4716, dated Nov. 15, 2019. The SOG became an independent college thereafter. Further, Board Resolution No. 4818, dated December 17, 2020, approved the renaming of Bachelor of Government Management into Bachelor of Public Administration. Meanwhile, pursuant to Board Resolution No. 5189 dated December 8, 2023, reorganizing the management structure of PLM, the School of Government was renamed as College of Public Administration (CPA).\nThe CPA is now being supervised by the designated Dean, assisted by the College Secretary and Chairperson of BPA, Program Director of Master of Public Administration (MPA) and the Director of the Center for Continuing Education Program for Professional Public Service. Most of the faculty members, especially those who are handling major subjects, both full-time and part-time, are vertically aligned with Public Administration. All are master’s degree holders of public administration or other related disciplines.', 'To be recognized as the center of excellence and development for public administration and good governance by providing high quality education on par with reputable institutions.', 'Provide high quality and evidence-based education to empower our students to meet the demands of the 21st century. We educate and mold men and women to become public servants equipped with holistic knowledge and imbued with profound sense of justice, dedication, honesty, morality and unwavering commitment to serve humankind.', 'active', 'test@gmail.com', '123');

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
(1, '2025 Budet', 2400000000.00, '2024-11-27'),
(2, 'PLM ERP System', 10000000.00, '2024-11-27'),
(3, 'PLM ENTRANCE HALL', 500000.00, '2024-11-27'),
(4, 'PLM Bus', 6000000.00, '2024-11-27'),
(5, 'Gusaling Villegas Building Renovation', 40000000.00, '2024-11-27');

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
(1, 'List of Students w/ Incomplete Requirements', 'uploads\\files\\2ea4ef75-bb46-4c3c-b486-f76cb95dc1d9.pdf'),
(2, 'Update from University Registrar', 'uploads\\files\\63236c56-229e-4138-9d29-4cfd1bfef4e2.pdf'),
(3, 'Mandatory Drug Testing', 'uploads\\files\\e8486e96-59e8-4545-9ee4-2421ce478ae9.pdf'),
(4, 'Faculty Monitoring', 'uploads\\files\\46c62d9a-4a39-44fa-8cf0-e845010f60cf.pdf'),
(5, '1st semester SFE', 'uploads\\files\\f4f201c9-a0f4-4413-aa7f-e662a8333c94.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `course_id` varchar(15) NOT NULL,
  `course_name` text NOT NULL,
  `college_id` varchar(15) NOT NULL,
  `is_graduate` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`course_id`, `course_name`, `college_id`, `is_graduate`) VALUES
('BECED', 'Bachelor of Early Childhood Education', 'CEduc', 0),
('BEEd', 'Bachelor of Elementary Education ', 'CEduc', 0),
('BMMP', 'Bachelor of Music in Music Performance', 'CHASS', 0),
('BPEd', 'Bachelor of Physical Education', 'CEduc', 0),
('BS', 'BS in Nursing', 'cn', 0),
('BS Bio 2', 'Bachelor of Science in Biology major in Ecology', 'CS', 0),
('BS Bio 3', 'Bachelor of Science in Biology major in Medical Biology', 'CS', 1),
('BS Chem', 'Bachelor of Science in Chemistry', 'CS', 0),
('BS Entrepreneur', 'Bachelor of Science in Entrepreneurship', 'CBA', 0),
('BS Math', 'Bachelor of Science in Mathematics', 'CS', 0),
('BS Psych', 'Bachelor of Science in Psychology', 'CS', 0),
('BSA', 'BS in Accountancy', 'CA', 0),
('BSArchi', 'BS in Architecture ', '001', 0),
('BSBA - HRM', 'Bachelor of Science in Business Administration major in Human Resource Management', 'CBA', 0),
('BSBA - OM', 'Bachelor of Science in Business Administration major in Operations Management', 'CBA', 0),
('BSBA-BE', 'Bachelor of Science in Business Administration Major in Business Economics', 'CBA', 0),
('BSBA-FM', 'Bachelor of Science in Business Administration major in Financial Management', 'CBA', 0),
('BSBA-MM', 'Bachelor of Science in Business Administration major in Marketing Management', 'CBA', 0),
('BSBio', 'Bachelor of Science in Biology major in Cell and Molecular Biology', 'CS', 0),
('BSC', 'BS Communications', 'CHASS', 0),
('BSC2', 'BS Communications with Specialization in Public Relations', 'CHASS', 0),
('BSCE-CM', 'BS in Civil Engineering with Specialization in Construction Management', 'CE', 0),
('BSCE-SE', 'BS in Civil Engineering with Specialization in Structural Engineering', 'CE', 0),
('BSChE', 'BS in Chemical Engineering', 'CE', 0),
('BSCpE', 'BS in Computer Engineering ', 'CE', 0),
('BSCS', 'Bachelor of Science in Computer Science', 'CISTM', 0),
('BSECE', 'BS in Electronics Engineering', 'CE', 0),
('BSEd-Eng', 'Bachelor of Secondary Education major in English', 'CEduc', 0),
('BSEd-Fil', 'Bachelor of Secondary Education major in Filipino', 'CEduc', 0),
('BSEd-Math', 'Bachelor of Secondary Education major in Mathematics', 'CEduc', 0),
('BSEd-Sci', ' Bachelor of Secondary Education major in Sciences', 'CEduc', 0),
('BSEd-SS', ' Bachelor of Secondary Education major in Social Studies', 'CEduc', 0),
('BSEE', 'BS in Electrical Engineering', 'CE', 0),
('BSHM', 'Bachelor of Science in Hospitality Management', 'CTHM', 0),
('BSIT', 'Bachelor of Science in Information Technology', 'CISTM', 0),
('BSME', 'BS in Mechanical Engineering', 'CE', 0),
('BSMFGE', 'BS in Manufacturing Engineering ', 'CE', 0),
('BSNED Generalis', 'Bachelor of Special Needs Education', 'CEduc', 0),
('BSPT', 'BS in Physical Therapy ', 'cpt', 0),
('BSREM-BG', 'Bachelor of Science in Real Estate Management (Business Graduate 2nd Degree)', 'CBA', 1),
('BSREM-NBG', 'Bachelor of Science in Real Estate Management (Non Business Graduate 2nd Degree)', 'CBA', 1),
('BSSW', 'BS Social Work', 'CHASS', 0),
('BSTM', 'Bachelor of Science in Tourism Management', 'CTHM', 0),
('DBA', 'Doctor of Business Administration', 'CBA', 1),
('DEM', 'Doctor of Engineering Management', 'CE', 1),
('DIT', 'Doctor in Information Technology', 'CISTM', 1),
('DM', 'Doctor of Medicine', 'cm', 1),
('DPA', 'Doctor Of Public Administration', 'pub', 1),
('EDD-EML', 'Doctor of Education major in Educational Management and Leadership ', 'CEduc', 1),
('JD', 'Juris Doctor', 'cl', 1),
('LLM', 'Master of Law', 'cl', 1),
('MACM', 'MA Communication Management', 'CHASS', 1),
('MAEd-BS', 'Master of Arts in Education major in Biological Science', 'CEduc', 1),
('MAEd-Chem', 'Master of Arts in Education major in Chemistry', 'CEduc', 1),
('MAEd-EML', 'Master of Arts in Education major in Educational Management and Leadership', 'CEduc', 1),
('MAEd-SS', 'Master of Arts in Education major in Social Sciences', 'CEduc', 1),
('MAEP', 'Master of Arts in Education - Physics', 'CEduc', 1),
('MAN', 'Master of Arts in Nursing', 'cn', 1),
('MAPSY-CP', 'Master of Arts in Psychology with Specialization in Clinical Psychology', 'CS', 1),
('MAPSY-IP', 'Master of Arts in Psychology with Specialization in Industrial Psychology', 'CS', 1),
('MASPED', 'Master Arts in Special Education with Specialization in Developmental Delays', 'CEduc', 1),
('MBA', 'Master in Business Administration ', 'CBA', 1),
('MCE', 'Master in Civil Engineering with specialization in Structural Engineering (Professional Track)', 'CE', 1),
('MCM', 'Master in Construction Management', 'CE', 1),
('MEM', 'Master in Engineering Management', 'CE', 1),
('MEM-CM', 'Master of Engineering Management with Specialization in Construction Management', 'CE', 1),
('MEng-CoE', 'Master of Engineering with Specialization in Computer Engineering', 'CE', 1),
('MEng-SE', ' Master of Engineering with Specialization in Structural Engineering ', 'CE', 1),
('MIT', 'Master of Information Technology', 'CISTM', 1),
('MPA', 'Master of Public Administration - Off-Campus', 'pub', 1),
('MPA-IN', 'Master of Public Administration - In-Campus', 'pub', 1),
('MPH', 'Masters in Public Health', 'cm', 1),
('MPT', 'Master of Physical Therapy', 'cpt', 1),
('MSCE', 'Master of Science in Civil Engineering with specialization in Structural Engineering (Academic Track)', 'CE', 1),
('MSMEd', 'Master of Science in Mathematics Education', 'CEduc', 1),
('MSPT ', 'Master of Science in Physical Therapy', 'cpt', 1),
('MSW', 'Master of Social Work', 'CHASS', 1);

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
(5, ' Arch. Jared Aaron R. Cruz', 'Acting Dean, College of Architecture and Sustainable Built Environment', 'uploads\\images\\88d7cf61-1645-43a4-a724-39f64197789d.png', '001', 'jarcruz@plm.edu.ph', 'active'),
(6, 'Prof. Luzviminda B. Landicho', 'Dean, College of Accountancy', 'uploads\\images\\5b70f712-e691-4587-8ae5-a33d6e9cb42c.png', 'CA', 'lblandicho@plm.edu.ph', 'active'),
(7, 'Engr. Bernard R. Letrero', 'Dean, College of Business Administration', 'uploads\\images\\98efbcc0-fa37-4b4b-873e-7fdc56599f00.png', 'CBA', 'brletrero@plm.edu.ph', 'active'),
(8, 'Dr. Jimmy M. Romero', 'Dean, College of Education', 'uploads\\images\\8f096a3b-a3ad-413d-91a0-00fafe6f95fa.png', 'CEduc', 'jmromero@plm.edu.ph', 'active'),
(9, ' Prof. Luningning P. Galindez', 'Acting Dean, College of Humanities, Arts and Social Sciences', 'uploads\\images\\e6fbcb6e-cdfc-4f06-aa0a-126493ecbf50.png', 'CHASS', 'lpgalindez@plm.edu.ph', 'active'),
(11, ' Dr. Khatalyn E. Mata', 'Acting Dean, College of Information Systems and Technology Management  Dean, College of Law', 'uploads\\images\\981d2eab-3450-4380-ba4c-749e4b9d9675.png', 'CISTM', 'kemata@plm.edu.ph', 'active'),
(12, 'Atty. Magelio S. Arboladura', 'Dean, College of Law', 'uploads\\images\\389fada3-c087-435f-90eb-0ae9606fa237.png', 'cl', 'msarboladura@plm.edu.ph', 'active'),
(13, 'Dr. Rose Anna R. Banal', 'Dean, College of Medicine', 'uploads\\images\\581812b4-2d18-4db6-a641-48fb477cd7de.png', 'cm', 'rarbanal@plm.edu.ph', 'active'),
(14, 'Dr. David Paul R. Ramos', ' Dean, College of Nursing', 'uploads\\images\\4d6a01dd-880d-4ee8-a05d-e6a950881c10.png', 'cn', 'dprramos@plm.edu.ph', 'active'),
(15, 'Dr. Nil Edward F. Panuelos', ' Dean, College of Physical Therapy', 'uploads\\images\\a00abde7-40bf-4a07-8c76-03b7153c7e8e.png', 'cpt', 'nefpanuelos@plm.edu.ph', 'active'),
(16, 'Dr. Aileen I. Atienza', 'Dean, College of Science', 'uploads\\images\\60ef8051-6cf7-4aca-a42c-7bb2d285fe53.png', 'CS', 'aiatienza@plm.edu.ph', 'active'),
(17, 'Prof. Jerrald Lancer O. Abril', 'Acting Dean, College of Tourism and Hospitality Management', 'uploads\\images\\3635a80e-fcf3-44c2-8993-cf277bb9080e.png', 'CTHM', 'jloabril@plm.edu.ph', 'active'),
(18, ' Justice Hector L. Hofileña', 'Dean, Graduate School of Law', 'uploads\\images\\a96b847f-6b84-439f-b76b-381a8da89d2e.png', 'gds', 'hlhofilena@plm.edu.ph', 'active'),
(19, 'Prof. Noemi C. Gocuyo', 'Acting Dean, College of Public Administration', 'uploads\\images\\bc6566bf-e4df-4c23-80d6-364e941d4bb7.png', 'pub', 'ncgocuyo@plm.edu.ph', 'active'),
(20, 'Engr. Evangeline P. Lubao', 'Acting Dean, College of Engineering', 'uploads\\images\\528f48f9-49ff-4cf0-ac54-875ef8a8d5d5.png', 'CE', 'eplubao@plm.edu.ph', 'active');

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
(10, 'Prof. April May S. Bonoan', 'In-Charge for Sports, Presidential Committee on Arts, Culture and Sports', 9, 'active', 'uploads\\images\\e0209e35-c872-4e3e-91b5-0a5f7b2ebbae.png', 'amsbonoan@plm.edu.ph'),
(11, 'Mr. Argel G. Solis', 'OIC, Internal Audit Office', 9, 'active', 'uploads\\images\\8fcc7ebe-4d7c-4e63-8fbb-fdf82087edaa.png', 'argsolis@plm.edu.ph'),
(12, ' Prof. Harold Perfecto R. Galang', 'Vice-Chair for Arts and Culture, Presidential Committee on Arts, Culture and Sports', 9, 'active', 'uploads\\images\\ac7a1716-4be0-4f36-aa93-055dbf7ebab0.png', 'hprgalang@plm.edu.ph'),
(13, ' Dr. Joseph Berlin P. Juanzon', 'Executive Director of the Office for Graduate and Professional Studies', 9, 'active', 'uploads\\images\\b73e5eb8-2c1b-4292-9146-1bdc27c7901c.png', 'jbpjuanzon@plm.edu.ph'),
(14, 'Atty. Carlo Florendo C. Castro', 'Chief, Office of the University Legal Counsel', 9, 'active', 'uploads\\images\\cb9883ad-f6fc-4594-967a-0ea207424567.png', 'ofcastro@plm.edu.ph'),
(15, 'Engr. Erwin D. Marcelo', 'Admission Officer, Admission Office', 10, 'active', 'uploads\\images\\233512ab-7026-48b7-8584-16de2a95c3a0.png', 'edmarcelo@plm.edu.ph'),
(16, ' Mr. Jesus Raymond R. Mijares', 'Chief, University Library', 10, 'active', 'uploads\\images\\763bf553-c5a7-4032-9864-69d562fa9620.png', 'jrrmijares@plm.edu.ph'),
(17, ' Prof. Liezel A. Zafra', 'Director, Center of University Extension Services', 10, 'active', 'uploads\\images\\60370a93-494c-48f5-a0af-919107a5ac9f.png', 'lazafra@plm.edu.ph'),
(18, 'Ms. Margielou B. Peralta', 'Director, Office of the Guidance and Testing Services', 10, 'active', 'uploads\\images\\db9d3772-8c96-4ebc-a97e-8379d99ebe70.png', 'mbperalta@plm.edu.ph'),
(19, 'Mr. Mark John S. Bonifacio', 'Director, Office of the National Service Training Program', 10, 'active', 'uploads\\images\\4c35ee26-659e-4d4a-8d81-1bf5e3b1c768.png', 'mjsbonifacio@plm.edu.ph'),
(20, 'Dr. Lynnette G. Cleto', 'Director, Office of Student Dev & Services', 10, 'active', 'uploads\\images\\a751c1c6-c726-4f70-bbd2-8ff9d890e5bf.png', 'lgcleto@plm.edu.ph'),
(21, 'Dr. Benedicto L. Avila', 'University Registrar', 10, 'active', 'uploads\\images\\6688e8a7-db5b-49cd-af39-ad8a294fd9b5.png', 'blavila@plm.edu.ph'),
(23, 'Ms. Emily E. Espero', 'Chief, General Services Office', 11, 'active', 'uploads\\images\\a3d9a207-cac8-482b-b290-80da611548f6.png', 'eespero@plm.edu.ph'),
(24, ' Mr. Reynaldo J. Villegas', 'Chief, Human Resource Management Office', 11, 'active', 'uploads\\images\\a7981f43-6c30-414d-89a0-4f54991bc340.png', 'rjvillegas@plm.edu.ph'),
(25, ' Prof. Mark Christopher R. Blanco', 'Chief, Information and Communications Technology Office', 11, 'active', 'uploads\\images\\c0734585-956b-4cdf-9324-7728220fdf2d.png', 'mcrblanco@plm.edu.ph'),
(26, 'Engr. Karen L. Leyson', 'Chief, Physical Facilities Management Office', 11, 'active', 'uploads\\images\\ceb507f2-61b2-4667-a75f-a47ab700a167.png', 'klleyson@plm.edu.ph'),
(27, 'Ms. Herminia D. Nuñez', 'Chief, Planning Management Office', 11, 'active', 'uploads\\images\\06d9d2ed-c47d-43e0-8473-3e110d6726c4.png', 'hdnunez@plm.edu.ph'),
(28, ' Engr. Bryan C. Gulapa', 'Chief, Property and Supplies Office', 11, 'active', 'uploads\\images\\8dfb79b5-30f9-4d13-a065-15401172a3fd.png', 'bcgulapa@plm.edu.ph'),
(29, ' Dr. Maria Ana B. Mariano', 'Chief, University Health Services', 11, 'active', 'uploads\\images\\6464b932-f750-42fb-b49e-99d90e51b56e.png', 'mabmariano@plm.edu.ph'),
(30, 'Dr. Ronaldo A. Tan', ' OIC - University Security Office', 11, 'active', 'uploads\\images\\295cc18b-a0dc-46a7-b099-9d7fb5ac3af9.png', 'ratan@plm.edu.ph'),
(31, 'Ms. Andrea E. Solomon-Malunes', 'Chief, Accounting Office', 12, 'active', 'uploads\\images\\3500a8d9-4b9b-4a7d-a7bf-e3a8fdfdb503.png', 'aesolomon@plm.edu.ph'),
(32, ' Ms. Maribeth P. Solquio', 'OIC, Budget Office', 12, 'active', 'uploads\\images\\f07614f3-3dae-4940-9acc-ee32be1f9c03.png', 'mpsolquio@plm.edu.ph'),
(33, ' Ms. Nanette E. Laurente', 'University Treasurer, Office of the University Treasurer', 12, 'active', 'uploads\\images\\04ac1af6-d6b7-499b-b715-02c3b15cdc0f.png', 'nelaurente@plm.edu.ph'),
(34, ' Mr. Gilbert S. Dador', 'OIC, Procurement Office', 12, 'active', 'uploads\\images\\226fcfa9-9640-4992-aef5-2a7383c637e5.png', 'gsdador@plm.edu.ph'),
(35, ' Ms. Dina C. Mendez', 'Acting Chief, Resource Generation Office', 12, 'active', 'uploads\\images\\6c285be3-8789-47e9-b821-85aa4b4215c9.png', 'dcmendez@plm.edu.ph');

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
(9, ' Officials reporting to the Office of the University President', 'active'),
(10, 'Officials reporting to the Vice President for Academic Services, Research & Extension', 'active'),
(11, 'Officials reporting to the Vice President for Administration', 'active'),
(12, 'Officials reporting to the Vice President for Finance', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `id` int(11) NOT NULL,
  `location` text NOT NULL,
  `file_path` text NOT NULL,
  `title` text DEFAULT NULL,
  `section` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`id`, `location`, `file_path`, `title`, `section`) VALUES
(41, 'AboutCollage', 'uploads\\images\\1728218622954.jpg', NULL, NULL),
(42, 'AboutCollage', 'uploads\\images\\1728218622957.jpg', NULL, NULL),
(43, 'AboutCollage', 'uploads\\images\\1728218622959.jpg', NULL, NULL),
(44, 'AboutCollage', 'uploads\\images\\1728218622961.jpg', NULL, NULL),
(47, 'HeroVideo', 'uploads\\videos\\1728218800687.mp4', NULL, NULL),
(48, 'OrganizationalChart', 'uploads\\images\\6c178cd4-9955-425d-af32-09d6ffc58946.jpg', NULL, NULL),
(53, 'downloads', 'uploads\\files\\3989e9a7-ecd2-4c41-a457-2ce31230d753.pdf', 'Students\' Faculty Evaluation System manual', 'I. Manuals and resource materials'),
(54, 'downloads', 'uploads\\files\\ae572115-b022-4447-a805-9c083b3d3caf.pdf', 'PLM Suicide Prevention and Postvention Protocol: A Guide for the School Community', 'I. Manuals and resource materials'),
(55, 'downloads', 'uploads\\files\\dcd9047c-4710-4dc2-95ff-ddde2d8ac573.pdf', 'University Health Services Orientation for Scholars', 'I. Manuals and resource materials'),
(56, 'downloads', 'uploads\\files\\b0623776-ac07-4ca1-a6f7-1751d26e3526.pdf', 'Professionalization Program for Public Procurement Practitioners brochure', 'I. Manuals and resource materials'),
(57, 'downloads', 'uploads\\files\\675e08f8-a816-4cfd-9719-f25c268636df.pdf', 'Scholarship application form (revised 2019)', 'II. Forms for students'),
(58, 'downloads', 'uploads\\files\\74705248-8bba-4272-acc3-8d714d8755f8.pdf', 'DOH Medical Scholarship form', 'II. Forms for students'),
(59, 'downloads', 'uploads\\files\\8cdf057b-b322-4479-af66-73b3c42d272e.pdf', 'DOH Scholar Commitment form', 'II. Forms for students'),
(60, 'downloads', 'uploads\\files\\aa88aaad-495c-47cb-a755-4a9c428e6609.pdf', 'Data Privacy consent form', 'II. Forms for students'),
(61, 'downloads', 'uploads\\files\\78b4c931-1a0b-4472-a84c-1be7424b4ec8.pdf', 'Request Form for School Credentials', 'II. Forms for students'),
(62, 'downloads', 'uploads\\files\\ba978ac5-df4c-4fbd-b2d5-93d793716710.pdf', 'Checklist of Requirements for Request for School Credentials', 'II. Forms for students'),
(63, 'downloads', 'uploads\\files\\9c102ad9-58d4-451c-89b1-2ac5025e1799.pdf', 'Philhealth members registration form (PMRF, January 2020 version)', 'II. Forms for students'),
(64, 'downloads', 'uploads\\files\\c6370879-d887-4ba2-8015-9e4fd2d4d881.pdf', 'Guidelines for applicants and new hires', 'III. Forms for faculty and administrative workers'),
(65, 'downloads', 'uploads\\files\\ecda5449-6101-4366-a19c-ddc4318c336f.pdf', 'CSC Reso No. 1700656', 'III. Forms for faculty and administrative workers'),
(66, 'downloads', 'uploads\\files\\8595bf07-b97e-4fdb-b5d8-f4bc040c479a.pdf', 'Personal Data Sheet (CS Form 212)', 'III. Forms for faculty and administrative workers'),
(67, 'downloads', 'uploads\\files\\d0584c91-19db-4cca-b70d-fc9c4e5c7348.pdf', 'Personal Data Sheet (CS Form 212) Attachment - Work Experience Sheet', 'III. Forms for faculty and administrative workers'),
(68, 'downloads', 'uploads\\files\\a00f90ee-4be9-4d10-a766-fae2b5494fc8.pdf', 'Personal Data Sheet (CS Form 212) Attachment - Revised Guide to Filling Up the Personal Data Sheet', 'III. Forms for faculty and administrative workers'),
(69, 'downloads', 'uploads\\files\\708a60a7-b995-4f77-928b-ee315ee3c172.pdf', 'Philhealth Membership Registration Form (PMRF)', 'III. Forms for faculty and administrative workers'),
(70, 'downloads', 'uploads\\files\\437475ab-94df-4df5-9660-96b64ce1ed82.pdf', 'GSIS Membership Information Sheet (MIF)', 'III. Forms for faculty and administrative workers'),
(71, 'downloads', 'uploads\\files\\d89eac01-a974-41ef-9f93-135e71e2511b.pdf', 'PAGIBIG Member\'s Data Form (MDF)', 'III. Forms for faculty and administrative workers'),
(72, 'downloads', 'uploads\\files\\b600947d-98c4-4ab5-8a24-1f9525e6df15.pdf', 'Statement of Assets, Liabilities, and Net Worth (SALN) form', 'III. Forms for faculty and administrative workers'),
(73, 'downloads', 'uploads\\files\\6e697cdd-2ffb-4228-b42d-a292719a77ec.pdf', 'Daily Time Record (DTR)', 'III. Forms for faculty and administrative workers'),
(74, 'downloads', 'uploads\\files\\17279e96-e1d5-4592-9fa5-289fd868226a.pdf', 'Certification of Assumption to Duty', 'III. Forms for faculty and administrative workers'),
(75, 'downloads', 'uploads\\files\\de732d47-7d0f-4dd0-82b3-60b92d7dd961.pdf', 'Service Report (for administrative COS workers)', 'III. Forms for faculty and administrative workers'),
(76, 'downloads', 'uploads\\files\\4e6c9ff8-53ce-4206-bab6-be1b3684a005.pdf', 'Service Report (for faculty)', 'III. Forms for faculty and administrative workers'),
(77, 'downloads', 'uploads\\files\\fabead13-dbe2-4cd5-9ab5-53967c9ca0b1.pdf', 'Staffing Pattern Form', 'III. Forms for faculty and administrative workers'),
(78, 'downloads', 'uploads\\files\\4ee9d20a-2e57-4ee1-8c8a-d51fcd5084ab.pdf', 'Coaching Journal', 'III. Forms for faculty and administrative workers'),
(79, 'downloads', 'uploads\\files\\388d6d82-5176-421e-9c52-914ea4a74d86.pdf', 'Individual Performance Contract (IPC) Targets', 'III. Forms for faculty and administrative workers'),
(80, 'downloads', 'uploads\\files\\ac0b4ac1-ca2f-4341-b8cc-ad32afd0fac9.pdf', 'Individual Performance Contract Review (IPCR) Form', 'III. Forms for faculty and administrative workers'),
(81, 'downloads', 'uploads\\files\\6da75c94-172c-40de-b1dd-b04f03f31ccc.pdf', 'Office Performance Contract (OPC) Targets', 'III. Forms for faculty and administrative workers'),
(82, 'downloads', 'uploads\\files\\75eda768-a898-4e5a-bef4-d3e9dbafc015.pdf', 'Office Performance Contract Review Form', 'III. Forms for faculty and administrative workers'),
(83, 'downloads', 'uploads\\files\\f35dcd60-4a6e-43fc-84ac-faf02b65ae7d.pdf', 'Job Description Form', 'III. Forms for faculty and administrative workers'),
(84, 'downloads', 'uploads\\files\\f8abe197-cbbb-4e9b-baac-9d8e2e85074c.pdf', 'Statement of Duties and Responsibilities', 'III. Forms for faculty and administrative workers'),
(85, 'downloads', 'uploads\\files\\3058d3f2-ed4c-4858-a670-1a84b81e8f75.pdf', 'Performance Evaluation System Form', 'III. Forms for faculty and administrative workers'),
(86, 'downloads', 'uploads\\files\\97512511-b08b-4465-9cd3-32329371178d.pdf', 'Download PLM Mobile App', 'III. Forms for faculty and administrative workers');

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
(2, 'Committee Inactive', 'test@gmail.com', 'Test', 'uploads\\images\\5af3051c-62c7-41a1-a773-bee3c556daab.png', 'inactive'),
(3, 'Dr. Ronald P. Romero', 'rpromero@plm.edu.ph', 'Vice President for Academic Affairs', 'uploads\\images\\bb7cb298-aad9-43d2-8058-29c8c63fc47c.png', 'active'),
(4, 'Dr. Ronald A. Tan', 'ratan@plm.edu.ph', 'Vice President for Administration', 'uploads\\images\\a4cc63ba-26f3-4115-92be-a85bd6052516.png', 'active'),
(5, 'Ms Luzviminda B. Landicho', 'lblandicho@plm.edu.ph', 'Vice President for Finance', 'uploads\\images\\ac88f781-25bc-4033-896c-1a6205f09347.png', 'active'),
(6, 'Dr. Dan Michael A. Cortez', 'dmacortez@plm.edu.ph', 'Vice President for Research', 'uploads\\images\\9de73220-a30e-4e49-a8a3-5b4b02193c82.png', 'active'),
(7, 'Mr. Reynaldo J. Villegas', 'rjvillegas@plm.edu.ph', 'Chief, Human Resource Management Office', 'uploads\\images\\315ba52f-9c88-40fd-8e92-d2d2adec8ad8.png', 'active'),
(8, 'Atty. Carlo Florendo Castro', 'cfcastro@plm.edu.ph', 'Chief, Office of the University Legal Counsel', 'uploads\\images\\03baecd7-009b-4fd8-80eb-de045871f34a.png', 'active'),
(9, 'Dr. Benedicto L. Avila', 'blavila@plm.edu.ph', 'University Registrar', 'uploads\\images\\88bde334-f031-4035-be74-4cfea1bce67c.png', 'active'),
(10, 'Atty. Relson P. Moral', 'rpmoral@plm.edu.ph', 'Chief Executive Staff  H', 'uploads\\images\\c5968fd8-56d4-4c82-863d-b1dc4f558ccd.png', 'active'),
(11, 'Mr. Ryan Jay SM. Cruz', 'rjsmcruz@plm.edu.ph', 'Head, Executive Assistant', 'uploads\\images\\2bff678e-7e35-4388-a15b-376346557cf6.png', 'active');

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
(51, '001', 'Guided by the college\'s vision and mission, we commit ourselves to: 1. The College is committed to educate and nurture competent future architects and built environment professionals as partners to nation building in producing excellence- oriented and morally upright students and future professionals prepared for leadership role in the industry. 2. The College is dedicated to instill the values of critical thinking and academic excellence while training future professionals to understand sustainable practices anchored to protect the built- environment, for the common welfare, and for benefit of the City of Manila. 3. To imbue upon graduates a direction towards a genuine socially- responsive and highly- innovative mindset that are well-grounded on the technical aspects, and updated on the technology and prevailing conditions 4. To provide in-depth understanding of the profession and the role of built environment professionals in the society and nation building.'),
(55, 'CA', 'Guided by the college\'s vision and mission, we commit ourselves:'),
(56, 'CA', 'Deliver a rigorous and relevant curriculum that meets the highest academic and professional standards.'),
(57, 'CA', 'Engage in impactful research and extension services that address contemporary issues in the field of accountancy.'),
(58, 'CA', 'Forge strong partnerships with industry, government, and professional organizations to enhance educational and career opportunities for our students.'),
(59, 'CA', 'Cultivate a culture of integrity, accountability, and social responsibility among our students, faculty, and staff.'),
(60, 'CA', 'Support the continuous development of our faculty and staff to ensure they remain at the forefront of educational and professional practices.\"'),
(64, 'CEduc', ' to provide effective and efficient instruction that will prepare CED students to becoming excellent teachers in the basic education level;'),
(65, 'CEduc', 'to turn out graduates who are aware of and responsive to the demands of Philippine society and of the global community;'),
(66, 'CEduc', 'to continuously work towards the betterment of the quality of life of the Filipinos by imparting practical knowledge and modeling timeless virtues'),
(67, 'CEduc', ' to encourage engagement in research that will improve quality of education in the country;'),
(68, 'CEduc', 'to participate and encourage involvement in extension activities that respond to the basic needs of the local community and of the country.'),
(73, 'CISTM', 'Karunungan graduates that are practicing professionals, occupying leadership positions in their chosen fields or allied professions, guided by the values of academic excellence and integrity;'),
(74, 'CISTM', 'Kaunlaran graduates that exhibit progressive professional career through life-long learning and'),
(75, 'CISTM', 'Kadakilaan graduates that demonstrates social and environmental responsibility through community service.'),
(76, 'CS', 'To train and acquaint clienteles with the range of the breathes and depths of sciences.'),
(77, 'CS', 'To help achieve and inculcate a sense of professionalism.'),
(78, 'CS', ' To instill and reinforce values and fine tune their interpersonal and intrapersonal relations.'),
(79, 'CS', 'To enable the stakeholders to integrate skills and knowledge with critical thinking, independent judgment and analytical power.'),
(80, 'CS', 'To acquire research skills and be able to critically evaluate and apply scientific breakthroughs; and'),
(81, 'CS', 'To strengthen a sense of service to the nation\'s capital.'),
(82, 'CHASS', '1'),
(83, 'cn', 'Developed a sensitive awareness to the changing health needs of the society as well as commitment to the alleviation of problems and to the holistic development of the Filipino citizen.'),
(84, 'cn', 'Acquired the necessary knowledge, skills and caring attitude geared towards the promotion of health, prevention of disease, maintenance and restoration of wellness, as well as facilitation of a peaceful death.'),
(85, 'cn', 'Developed a positive attitude towards research to broaden the perspective in the delivery of quality health care.'),
(86, 'cn', ' Acquired and can perform beginning professional competencies in the practice of the profession as s/he demonstrates the following key areas of responsibility:'),
(87, 'cpt', '1. To provide students with various learning opportunities in order to develop the necessary knowledge, technical and communication skills in order to perform various roles expected of a physical therapist.'),
(88, 'cpt', '2. To conduct regular assessment and evaluation of students through valid and reliable instruments'),
(89, 'cpt', '3. To encourage participation of students in local and international physical therapy organization, conferences, seminars, and workshops.'),
(90, 'cpt', '4. To promote inter-professional collaboration'),
(91, 'cpt', '5. To conduct regular faculty development activities and support faculty members in participating in continuing education'),
(92, 'cpt', '6. To strengthen existing linkages through regular revision of MOA and develop new local and international partnership with different stakeholders'),
(93, 'cpt', '7. To have a regular review, appraisal and revision of curriculum based on current national and international standards, professional and societal needs'),
(94, 'cpt', '8. To conduct regular inspections of facilities as well as review and appraise existing learning resources as to its relevance to provide recommendations accordingly'),
(95, 'cpt', '9. To provide physical therapy management to underserved Filipino through affordable services'),
(96, 'cpt', '10. To provide community-based rehabilitation through creation of MOA with nearby barangays giving students opportunities in developing a sense of social responsibility'),
(97, 'cpt', '11. To encourage the production of researches that are relevant to the profession and society needs through collaborative work of faculty and students'),
(98, 'cpt', '12. To encourage utilization of current best evidence available in the provision of care and education'),
(99, 'cpt', '13. To be a consistent top performing HEI in the licensure examination for physical therapy'),
(100, 'cl', '1. To train the students to have a clear grasp of the law.'),
(101, 'cl', '2. To develop the student’s ability to think logically, methodically, and to express himself clearly and forcefully.'),
(102, 'cl', '3. To train the students for leadership in various spheres of public service.'),
(103, 'cl', '4. To contribute to the development of Philippine jurisprudence and legal literature.'),
(104, 'cm', 'To produce excellent community-oriented medical practitioners who value human life and promote health and wellness.'),
(105, 'cm', 'To nurture the ideals of nationalism and the values of social sensitivity and responsibility, holistic care with compassion and dedication to the medical profession.'),
(106, 'cm', ' To create a culture of academic excellence and social responsibility among the administrators, faculty and staff.'),
(107, 'cm', 'To provide quality and relevant researches.'),
(108, 'cm', 'To strengthen local, national and international linkages that will contribute to quality medical education.'),
(109, 'cm', 'To provide appropriate and adequate infrastructure in support of the community-oriented medical education.'),
(110, 'cm', 'To involve the alumni association in enhancing and sustaining community-oriented medical programs.'),
(111, 'gds', 'To develop intellectual expertise in law and jurisprudence among lawyers;'),
(112, 'gds', 'To assist in improving public service by stressing the lawyers\' mission of upholding justice and truth;'),
(113, 'gds', 'To elevate the standards of the legal profession; and'),
(114, 'gds', 'To enhance the administration of justice for the welfare of the Filipino people, especially the marginalized.'),
(115, 'pub', 'To prepare the students for careers in public service;'),
(116, 'pub', 'To impart public service values, principles of accountability, transparency, ethics, respect for human rights, cultural diversity, and civic involvement;'),
(117, 'pub', ' To provide high quality education comparable to those offered by premier institutions of higher learning globally; and,'),
(118, 'pub', 'To promote good governance and strengthen constitutional democracy.'),
(119, 'CE', 'Facilitate the achievement of academic goals by regularly reviewing curricular programs, ensuring that they surpass the standards set by governing bodies.'),
(120, 'CE', 'Provide a productive environment to facilitate quality research and socially responsive extension service.'),
(121, 'CE', 'Develop dynamism among administrators, faculty, student and services personnel, embracing diversities that contribute to the growth of the college.'),
(122, 'CE', 'Strengthen our ties with our alumni and industry partners, helping us establish a distinct place in the industry.'),
(123, 'CTHM', 'To establish academic achievement, competency, collaboration and ethical values in every student in order for them to be competent individuals.'),
(124, 'CTHM', 'To improve faculty expertise while also strengthening work ethics and values through continuing faculty development programs that will contribute to the college\'s efficient and effective education.'),
(125, 'CTHM', 'To build strong industry partnerships to provide Tourism management and Hospitality Management students with hands-on training and practical knowledge, preparing and equipped them with skills for employment in tourism and hospitality management.'),
(126, 'CBA', 'Guided by the college\'s vision and mission, we commit ourselves to: To provide excellent undergraduate and graduate degree programs that will prepare students to become successful business professionals in an increasingly various and interrelated workplace. To conduct and disseminate research that improves the practice of business, providing practical learning opportunities for students, and reinforcement of strong academic reputation for purposes of student recruitment and placement. To develop a strong, inclusive family values, a diverse and well-qualified number of students, a faculty committed to high-quality research and teaching, dedicated support staff, and strong support from alumni and the business partners. To produce quality and globally competitive business professionals and entrepreneurs who are equipped with skills, knowledge and values necessary for professionals.');

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
(5, 'Accounting Office', 'The Accounting Office shall provide an information system to measure, process, and communicate financial information about the University. It shall record accounts payable and receivable, inventory, payroll, plant, property and equipment, and all other financial elements. It shall review the records of each operating unit to determine the University\'s financial position and any changes required to run the University cost- effectively. It shall be headed by the Chief Accountant.', 'To excel as a trusted steward of public funds, ensuring transparent, accurate and accountable financial management that upholds public trust and supports effective governance.', 'To deliver accounting services and support that align with the university’s commitment to academic excellence, research, and community service. We are committed to ensuring financial integrity, transparency, efficiency, and compliant with relevant rules and regulations, whether internal and/or external, thereby enabling the university to effectively utilize its resources for the benefit of students, faculty, and the broader community.', 'active', 'uploads\\images\\235ffe1f-2900-4827-b78a-cc1374efff32.png', 'budget@plm.edu.ph', '123'),
(6, 'Budget Office', 'Budget Office is responsible in the preparation of University Budget and certify availability of funds for each projects and expenses being paid.', 'To provide the best customer service to our stakeholders.', 'Provide ideal use of funds for timely and useful budget information for the University and its stakeholders', 'active', 'uploads\\images\\aacc050e-0e3f-4e4a-9169-8ae4b47ba0ff.png', 'budget@plm.edu.ph', '12321412'),
(7, 'Center of University Extension Services', 'An implementing arm of the Pamantasan ng Lungsod ng Maynila various extension programs, projects, and activities which aims to\r\n1. strengthen university-community relationship through mutual cooperation and support of planned extension programs and services;\r\n2. To  mobilize the university constituency for meaningful and responsive community service;\r\n3. To maximize the use of university resources for the improvement of urban community life;\r\n4. To provide technical, educational, social and health services to outside agencies and communities as long as these are within the capacity and resources of the university; and\r\n5. To generate financial support for university extension projects.', 'A leading university center in providing extension and other related  public services for the public interest particularly those from its adopted communities focusing on the underserved and less privileged beneficiaries in the pursuit of social and community development through its dynamically engaged stakeholders.', 'CUES is committed to carrying out public service for the public interest through planning, administering, and regulating extension programs, projects, and activities. Likewise, it establishes linkages, networking, and partnership with government and non-government institutions.', 'active', 'uploads\\images\\4a48396d-b856-489a-959a-3e84686f58fd.png', 'cues@plm.edu.ph', '123'),
(8, 'General Services Office', 'By virtue of BOR Resolution No. 4721 signed 15 November 2019, the mandate and services of the former Gymnasium Management Section (GMS) was expanded to better reflect the need to deliver excellent facilities management in a timely and cost-effective manner, in support of the University’s pursuit towards quality education, research, and extension services. As a result, the GMS was renamed as the General Services Office (GSO) – a unit under the Office of the Vice President for Administration.\r\n\r\nThe GSO is primarily responsible for the centralized reservation, development, use, and maintenance of campus facilities. The GSO is tasked to supervise and control all activities undertaken within the Rajah Sulayman Gymnasium, a premier sports center that caters to the needs of indoor Physical Education classes, athletic and recreational activities of students, faculty, and staff.\r\n\r\nAs building and equipment custodian of the University, the GSO also operates and maintains fourteen (14) activity venues or facilities.\r\n\r\nThe GMS trace its beginnings from the Physical Education (P.E.) Department which later grew into Sports, Physical Education and Recreation Department (SPERD) formed in 1981. A Director was appointed to head the Department and in some cases, College Dean also assumes its leadership in the absence of the former. Hence, the P.E./SPERD Directors, and College Deans are de facto Gymnasium Managers prior the creation of a separate Office of the Gymnasium Manager under the Vice President for Administration in 2003.', 'To deliver excellent facilities management in a timely and cost-effective manner, in support of the University’s pursuit towards quality education, research, and extension services.', 'In pursuit of quality higher education, the GSO endeavors to provide a clean, safe, and secure environment that is conducive to learning and everyone’s well-being.', 'active', 'uploads\\images\\769b21f9-1756-4c3c-a98f-d9f4933c072e.jpg', 'gso@plm.edu.ph', '123'),
(9, 'Internal Audit Office', 'The Internal Audit Office (IAO) provides independent, objective assurance and advisory services designed to add value and improve the University\'s operations.', 'To provide the University with value-added audits with objectivity, fairness and in accordance with highest professional and ethical standards.', 'To provide the University with value-added audits with objectivity, fairness and in accordance with highest professional and ethical standards.', 'active', 'uploads\\images\\ee4b3f32-f11a-4dd8-9929-49cb16598560.png', 'iao@plm.edu.ph', '123'),
(10, 'Office of Graduate and Professional Studies', 'Welcome to the Office of Graduate and Professional Studies  (OGPS), an esteemed institution dedicated to fostering excellence in advanced education and professional development. Established with a vision to be one of the leading institutions in graduate and professional studies, OGPS offers a diverse array of innovative and interdisciplinary programs tailored to meet the evolving needs of today\'s dynamic workforce. Our center is renowned for its commitment to academic rigor, practical application, and a global perspective, providing students with unparalleled opportunities for intellectual growth, career advancement, and personal enrichment. At OGPS, we pride ourselves on creating an inclusive and supportive learning environment, where students from various backgrounds engage with industry experts and thought leaders to shape their future and contribute meaningfully to their fields and communities.', '\"To Be a Global Beacon of Advanced Learning and Professional Development\"', '\"Empowering Future Leaders through Excellence in Graduate and Professional Education\"', 'active', 'uploads\\images\\9b111408-ba0b-4203-8138-b4e0a15124bd.png', 'ogps@plm.edu.ph', '123'),
(11, 'Office of Guidance and Testing Services', 'The Office of Guidance and Testing Services (OGTS) is a safe haven that focuses on promoting the wellbeing of students and other stakeholders though the care and support afforded by the professional guidance counselors.\r\n\r\nA variety of guidance counseling programs and services are made available to help individuals reach their full potential and thrive in the areas of academic, personal, social and career. The heart of all the services is counseling which is provided individually or in groups. This enables individuals to experience catharsis, self-reflection and positive change.', 'A community within PLM campus where students are provided with developmental programs which will enable them to become excellent professionals that reflect integrity and social responsibility.', 'Deliver adequate and efficient guidance counseling programs and services that center on providing care and assistance to PLM students. “We care, we help, we serve.”', 'active', 'uploads\\images\\f37b6b3b-1a49-4370-b31d-898f3a2744f3.png', 'ogts@plm.edu.ph', '123'),
(12, 'Office of NSTP', 'The ONSTP is primarily tasked to implement the provisions of Republic Act Number 9163 or the NSTP Act of 2001, its Implementing Rules and Regulations, and other pertinent laws, policies, guidelines, and issuances set forth by the university and other concerned agencies in NSTP Implementation, e.g., CHED, AFP, DND, etc.', 'The Pamantasan ng Lungsod ng Maynila – Office of the National Service Training Program shall be the university’s spearhead unit in the development of civic consciousness and defense preparedness among the students pursuing public interest and national development.', 'The Pamantasan ng Lungsod ng Maynila - Office of the National Service Training Program aims to develop and produce leaders that pursue public interest by designing and implementing a socially responsive NSTP curriculum that emphasizes citizenship training to develop service – oriented students with a high sense nationalism and socio-civic concern.', 'active', 'uploads\\images\\85f1e1c9-9090-484f-9d17-4ece933c99dd.png', 'nstp@plm.edu.ph', '123'),
(13, 'Office of Student Development Services', 'The Office of Student Development and Services (OSDS) of PLM created by Board Resolution No. 2720 is the central student services agency, which administers and coordinates student services and represent student interest to various campus groups, the faculty, the staff and the administration. It assumes administrative responsibility over all student organizations, student co-curricular, co-curricular, and cultural activities in the University, and facilitates and follows theough student needs, growth and development in the context of the students social, cultural, intellectual, and moral spheres. Moreover, the OSDS also takes responsibility in ensuring that students uphold the established regulations related to appropriate behavior expected of a PLM students as prescribed in the PLM Student Handbook.\r\n\r\nThe Office of Student Development and Services (OSDS) is authorized under Article 127 of the Code of Pamantansan ng Lungsod ng Maynila which provides:\r\n\r\n\"There should be an Office of Student Development and Services, headed by the Director of Student Development and Services, which shall coordinate the operation of units provides in the following sections and such other units concerned with student personnel services as may be placed under the Office of the President. He shall submit an annual report, and such other reports as may be required, to the President of the University.\"', 'The OSDS is committed to lead the provision of personalised student experiences that foster a sense of belongingness and empowerment through critically engaging curricular and co-curricular opportunities that would enable students to realize their potential as catalyst of positive social change.', 'The OSDS is to promote, strengthen and provide curricular and co-curricular opportunities that would ensure the well-being, success, personal and professional development of students to aide in the realization of their full potential to create positive impact to the society.', 'active', 'uploads\\images\\4fa19a46-fdd6-43f7-af49-42123f0954d5.png', 'osds@plm.edu.ph', '123'),
(14, 'Office of the University Legal Counsel', 'The OULC shall provide legal services, from drafting contracts and issuing opinions to handling disciplinary cases and representation in external litigation. It shall be headed by the University Legal Counsel (ULC).', 'To be recognized as a pillar of legal excellence, ensuring integrity and upholding justice in every facet of university governance.', 'To provide comprehensive legal services that empower the PLM community, safeguard its interests, and foster a culture of compliance and fairness. We strive to uphold the rule of law, navigate complexities with clarity, and champion the university\'s mission through proactive legal counsel and advocacy.', 'active', 'uploads\\images\\b739ec77-b5a5-4e23-8b8f-e0b119859056.png', 'oulc@plm.edu.ph', '123'),
(15, 'Office of the University Registrar', 'The Pamantasan ng Lungsod ng Maynila was established on July 17, 1967 by virtue of RA No. 4196. Thus, the creation of the University automatically went with it the creation of the Office of the Registrar which takes charge of admissions, registration, scholastic records processing and management, and the commencement exercises of the students.\r\n\r\nThe Office of the University Registrar (OUR) is an academic support unit of the University which administers operations in the areas of student academic records, graduation and other related services. It serves as the main frontline service unit of the University on curricular and academic matters. This Office issues documents such as Transcript of Records, Diploma, Certification of Grades, Course Description, Course Syllabus, Authentication/Verification and other academic records/documents.', 'To become a leader in academic record management and service delivery by leveraging cutting-edge technology, such as cloud-based systems and self-service portals. We aim to continuously improve our processes to enhance the academic experience for PLM students and graduates. By adopting best practices, exceeding service excellence benchmarks, and fostering a data-driven approach to success, we strive to set the standard for registrar services and contribute significantly to the academic achievement of our community.', 'The University Registrar\'s Office protects the accuracy, integrity, and security of student records and academic data. We offer efficient and effective academic services to students, professors, staff, and external organizations. By practicing the values of integrity, innovation, responsiveness, professionalism, and accountability, we support the academic progression of students and graduates, contributing to the university\'s mission and goals.', 'active', 'uploads\\images\\cfea9d30-9284-46d5-8cf7-3b8b11cf0d9b.png', 'our@plm.edu.ph1', '123'),
(16, 'Office of the University Secretary', 'The University Secretary (USEC) shall serve as the Secretary of the Board of Regents (BOR) and keeps such records of the University as the BOR may designate. The USEC shall be appointed by the BOR upon recommendation of the University President.\r\n\r\nThe OUSEC shall serve as the Secretariat of the BOR, manages the University\'s official mail and generally shall assist the USEC in the performance of official functions.', 'To be trusted and indispensable partner in the governance of PLM, upholding the highest standards of record-keeping and procedural integrity.', 'To provide exemplary secretarial and administrative support to the Board of Regents and the University President, ensuring the accurate documentation and secure management of all official records. We are committed to enhancing the efficiency and transparency of the University\'s governance process through diligent service and continuous improvement.', 'active', 'uploads\\images\\0504d7ba-459d-413c-9a1d-827ab3b7a8a1.png', 'ous@plm.edu.ph', '123'),
(17, 'Office of the Vice President for Research, Academic, and Extension', 'The OVPRAES shall assist the VPRAES in the performance of official functions:\r\na.) Research Facilitation\r\nb.) Extension Programs\r\nc.) Supporting Innovation\r\nd.) Collaborations and Partnerships\r\ne.) Capacity Building\r\n\r\n', 'The Office of the Vice President for Research, Academic and Extension Services vision is to become a prominent that is known for its exceptional research, academic programs, and outreach efforts. We aspire to garner recognition on a local and international scale for our contributions to knowledge and society.', 'The Office of the Vice President for Research, Academic, and Extension Services is committed to creating an active and diverse educational atmosphere that encourages innovative research, excellent education, and meaningful community involvement.', 'active', 'uploads\\images\\e0e8a978-d719-4960-b346-b36b2238d24c.jpg', 'urc@plm.edu.ph', '123'),
(18, 'Physical Facilities Management Office', 'Physical Facilities Management Office core functions involve the repair and maintenance of all the University facilities and the supervision of outsourced projects', 'The Physical Facilities Management Office shall be performing repair and maintenance of the learning environments.', 'Guided by this vision, we commit ourselves to provide a safe, conducive, well-maintained physical facilities for the University community by planning and delivering professional services that are sustainable  and supportive of academic excellence.', 'active', 'uploads\\images\\9af82367-585a-4ec0-a382-e61dc57cdac8.png', 'pfmo@plm.edu.ph', '123'),
(19, 'Planning And Management Office', 'The Planning and Management Office helps ensure that the Vision and Mission of the University are fulfilled.  The office monitors the submission of OPCR Form and schedules the review/ evaluation of the Performance Management Team before the start of the performance period.  It consolidates, reviews, validates and evaluates the initial performance assessment of the Heads of Office based on reported Office accomplishments against the success indicators and the allotted budget against the actual expenses.\r\n\r\nPMO promotes effective and efficient planning of projects and activities such that the outcomes, resource requirements, technology changes, risks and budgetary requirements are clear, and the planned programs and activities are aligned with the strategic goals and programs of the University.', 'To be a major contributor in the accomplishment of the University’s Vision and Mission.', 'To provide the proper monitoring and professional development/ training opportunities to the offices and colleges and incorporate values formation and ethical standards to help ensure the timely accomplishment of their planned programs and activities.', 'active', 'uploads\\images\\90fef8ad-7adb-465d-ab06-ad6939b8061e.png', 'pmo@plm.edu.ph', '123'),
(20, 'PLM Law Center', 'THE PLM LAW CENTER was created by PLM Board Resolution No. 2259, where the PLM Law Center is specifically mandated to:\r\n-Serve as an institute for continuing legal education\r\n-Conduct Legal research and publications\r\n-Promote barangay justice\r\n-Offer free legal aid services\r\n\r\nFUNCTIONS:\r\n- Serve as an institute for continuing legal education\r\n- Conduct Legal research and publications\r\n- Promote barangay justice\r\n- Offer free legal aid services', 'Non-partisan law and public policy center. Producing independent legal research, analysis, trainings / seminars and publication to help national and local government better serve their communities and the people.\r\n\r\nThe Center currently focuses on several core topics such as the youth, women, suffrage, overseas Filipino workers and immigration laws, public international law access to justice of informal settlers and police oversight.\r\n\r\nThe Center shall prepare law students for careers as attorneys in public service through the Legal Aid Program, a select opportunity for a small number of applicants from each class.\r\n\r\nCapitalizing on its location in the City of Manila, the Law Center shall explore emerging issues to shed light to the public and connect with government officials through consultations and other programs.', 'Bridging legal profession and public service.\r\n\r\nThe principal aim of the Center’s work is to serve as a point of resource for the government. While the Law Center has special expertise on the local government of Manila, its services aims to have a nationwide impact. The Center shall assist the local and national government in keeping its public servants abreast of the law and improve their ability to better serve the community through their in depth legal literacy.\r\n\r\nThe Center has a non-partisan identity and does not participate in advocacy on disputed policy issues.\r\n\r\nCentral to its mission is training, continuously educating skilled lawyers and future leaders in the legal profession as well as giving out relevant information through researches, symposiums and other extension services to the public. Connecting the law school to the community is a key part of the Center’s mission.', 'active', 'uploads\\images\\2da43458-2b5c-4acc-aa9f-8bc958cd890c.jpg', 'plmlc@plm.edu.ph', '123'),
(21, 'Procurement Office', 'Efficient Procurement Management\r\nImplement efficient and effective procurement processes that optimize resources, minimize procurement lead times, and ensure the timely delivery of goods, infrastructure, and services to support the operations of the organization in compliance with the 2016 Revised Implementation Rules and Regulations of RA 9184', 'A transparent, efficient and accountable University procurement system.', 'In support of the University’s life purpose, we commit ourselves to the effective implementation of procurement procedures guided by the principles of transparency, efficiency and accountability, with the aim of delivering quality services and promoting public trust and integrity in government service.', 'active', 'uploads\\images\\eb1697cc-a2dc-49f9-843f-5363c76917cd.png', 'procurement@plm.edu.ph', '123'),
(22, 'Property & Supply Office', 'The Property and Supply Office (PSO) is primarily responsible of the receiving, issuances, disposition, storage and inventory of all the properties of the University.', 'Shall be strong in integrity in safeguarding university assets and for its commitment in providing adequate resources in accordance with laws and regulations.', 'To be responsive to the needs of the different units that it serves and that operates with flexibility, reliability, timeliness and economical. It is in constant watch over the flow of supplies and equipment up to their final disposition.', 'active', 'uploads\\images\\79c80c5f-d78c-476b-bc50-344c811c9843.png', 'pso@plm.edu.ph', '123'),
(23, 'Revenue Generation Office', 'The Resource Generation Office (RGO) is in charge of the Alumni Affairs Section, Scholarship Section, Public Information Section and External Partnership Section.  One of its major functions is to explore partnerships, grants, and commercial ventures to enhance the university\'s financial portfolio.', 'The Resource Generation Office (RGO) shall assist the Office of the University President on matters of external, public concerns and to maintain and promote the good image of PLM as an institution of academic excellence with integrity and social responsibility.', 'Guided by its mandate, the Resource Generation Office (RGO) will develop and implement strategies to diversity and maximize revenue streams aligning with the university\'s goals.', 'active', 'uploads\\images\\c4bb0217-748e-4e52-8c07-31f67ace9d2e.jpg', 'rgc@plm.edu.ph', '123'),
(24, '  University Health Services', 'The UHS is mandated to provide basic health services to employees and students of the Pamantasan ng Lungsod ng Maynila.', 'A Healthy PLM Community.', 'To maintain a healthy employee and student population.', 'active', 'uploads\\images\\f2155ba4-91eb-4ad2-a289-40bff31ae10e.png', 'uhs@plm.edu.ph', '123'),
(25, 'University Library', 'The Celso Al Carunungan Memorial Library came into being to serve our students and faculty as well as the community for reading materials and researchers who needed special reference materials for their studies. The collection is composed of foreign and Filipiniana books and periodicals (journals and professional magazines), unpublished resources (theses, dissertations, and research studies), and multimedia resources. The library has been subscribing to several online databases which are accessible 24/7.', 'The University Library is committed to its vision “to be the premier academic library among local colleges and universities in the country”.', 'The University Library shall provide a comprehensive collection and excellent library services in support of the PLM vision and mission.', 'active', 'uploads\\images\\e7ce163c-0984-409b-ae72-ef8e96527a74.png', 'library@plm.edu.ph', '123'),
(26, 'University Research Center', 'URC has the following functions relative to research services:\r\na. Develop and implement a continuing program of research education for the University;\r\nb. Coordinate all research activities in the University, apart from those undertaken by the Center;\r\nc. Assists Faculty and students with request to conduct research in the University\r\nd. Establish linkages and appropriate working relationships with other units of the University, the City Government of Manila, and other research institutions here and abroad;\r\ne. Liaise with funding agencies for resource generation to support the research program of the University;\r\nf. Perform such other functions as the President may be assign.', 'A premier university center of quality and innovative researches of faculty, students and staff that geared towards the advancement of human knowledge.', 'URC takes the lead in developing and implementing relevant programs of research for the continuous development of the University and the City of Manila by facilitating the production, publication, presentation, and utilization of researches of faculty, students and staff as well as in outsourcing linkages and networks from other institutions and funding agencies.', 'active', 'uploads\\images\\4b0446c1-faab-4a37-b353-ca6213a81000.png', 'urc@plm.edu.ph', '123');

-- --------------------------------------------------------

--
-- Table structure for table `partner`
--

CREATE TABLE `partner` (
  `id` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `individuals` text DEFAULT NULL,
  `how` text DEFAULT NULL,
  `who` text DEFAULT NULL,
  `providers` text DEFAULT NULL,
  `title` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `partner`
--

INSERT INTO `partner` (`id`, `description`, `individuals`, `how`, `who`, `providers`, `title`) VALUES
(1, 'For the Academic Year 2022-2023, 24 scholarship partners provide PLM students with not only financial assistance but also training and opportunities for exposure. Out of the 24, 21 are group sponsors and three are individual providers.', '- * Ambassador and former Regent Ramon Bagatsing, Jr.\n- * Mr. Marc Gorospe\n- * Mr. Russel Tena', '- * Family annual income of Php 300,000.00 or less\n- * General Weighted Average (GWA) of not less than 2.25\n- * With no previous scholarship application nor a recipient of any scholarship grant\n- * Full-time student (from all levels) with regular load\n- * With good moral character', 'Organizations or individuals interested to provide scholarships to PLM students may contact the Office of Public Affairs (OPA) and enter into a Memorandum of Agreement subject to the Board of Regent\'s approval.\n\nInquiries and letters of intent may be addressed to:\nDina C. Mendez\nOIC, Public Affairs\nEmail: vppa@plm.edu.ph\n\nOnce the partnership is approved, the OPA contacts the University Committee on Scholarship and Office of Student Development and Services (OSDS) as Committee Secretariat about the scholarship requirements and slots for dissemination to the colleges and Information and Communications Technology (ICTO) so that students who need the financial aid could apply.\n\nThe colleges receive applications from interested students. Then it submits the applications to the OSDS, which creates a shortlist using the scholarship providers\' criteria. This list is submitted to the Committee on Scholarship, which makes the final recommendation and submits it to the OPA. The OPA then coordinates the recommended scholars to the scholarship providers for their concurrence.\n\nThe PLM College of Law maintains a scholarship program care for the deserving and qualified students in need who are residents of Manila.', '- * AMY Foundation\n- * Alfonso Yuchengco Foundation\n- * Buddhist Tzu Chi Foundation\n- * Cebuana Lhuillier Foundation\n- * Charity First Foundation\n- * Chinese Filipino Business Club\n- * DBP Foundation\n- * Evangeline Barrios Fletcher-Shepherd Scholarship Grant\n- * Fil-Am Society of Masters and Past Masters in California Masonry\n- * Gokongwei Brothers Foundation, Inc.\n- * International Container Terminal Services, Inc.\n- * Landbank North NCRBG\n- * Lingap Adhikain Foundation\n- * Luis Co Chi Kiat Foundation\n- * Manila Mt. Lebanon\n- * Master Rui Miao Foundation\n- * Megawide Foundation\n- * Megaworld Foundation\n- * Miami Foundation (Fain Foundation)\n- * PLM-Scholarship Foundation, Inc.\n- * Security Bank Foundation\n- * Simplicio Gamboa, Sr. Foundation\n- * SM Foundation', 'AY 2022-2023 Scholarship Partners');

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
(49, '448955944966879_122117930852545578', 'time-restricted', '2024-11-29'),
(53, '448955944966879_122123450930545578', 'normal', NULL);

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
(13, 'Current President', 'Atty. Domingo Reyes Jr. elected as the New President of Pamantasan ng Lungsod ng Maynila\r\nPamantasan ng Lungsod Maynila is proud to announce Atty. Domingo Reyes, Jr. as the new President of the university. Atty. Reyes is poised to lead PLM to new heights in the years to come with his impressive background and a commitment to excellence in higher education. He is a writer, professor, lecturer, speaker, consultant and PAASCU accreditor, among others, and committed to public service.\r\n\r\nPresident Reyes, known as “Sir Sonny” to many, will bring a wealth of experience to PLM, having served in various leadership roles within academia, including as a special assistant to the Chancellor at De La Salle College of St. Benilde and special assistant to the Vice Chancellor for Academics. He is also a Correspondent Lawyer and Psychologist, and has worked as a Human Resource Manager in various private companies. He understands the challenges and opportunities that universities are confronted with today.\r\n\r\nPresident Reyes received his Doctor of Philosophy in Higher Education Management, with Highest Academic Distinction, from Centro Escolar University, his Juris Doctor from Manuel L. Quezon University, and his Master of Laws from Pamantasan ng Lungsod ng Maynila. Sir Sonny is clearly one of our own. His vision for the future of PLM aligns perfectly with our institution\'s mission and values.\r\nAs President Reyes takes the helm at PLM, together with the newly appointed Board of Regents, Dr. Joseph Berlin Juanzon, Dr. Neri Pescadera, and PLM’s new Board of Regents Chairperson Atty. Edward Serapio. With incumbent Board of Regents Wilma Galvante and Rita Riddle, they will work collaboratively with students, faculty, staff, and the broader community to continue building on the university\'s proud tradition of academic excellence and innovation. Their leadership will be instrumental in advancing our commitment to fostering a diverse and inclusive campus environment that embraces the full spectrum of human potential.\r\n\r\nPresident Reyes is set to officially assume the presidency on October 31, 2023, and the entire PLM community looks forward to working closely with them as we undertake on this exciting new chapter in the university\'s history.\r\nPlease join us in extending a warm welcome to President Domingo Reyes Jr. as they take on this pivotal role. We invite you to stay tuned for future updates and announcements as we embark on this new journey together.', 'uploads\\images\\3f03b5d3-1bc0-4870-9d57-b5f7fa8bdbc8.png', 'active'),
(18, 'DR. BENITO REYES', '-', 'uploads\\images\\a50fea1b-35e1-4429-a69b-1b7094d5342f.png', 'inactive'),
(19, 'DR. CONSUELO S. BLANCO', '-', 'uploads\\images\\625b83ab-63c9-4731-875b-5bd8914f76ce.png', 'inactive'),
(20, 'HON. MAYOR RAMON BAGATSING', '-', 'uploads\\images\\40018f0f-1a81-4d4f-9af9-72dc62157da0.png', 'inactive'),
(21, ' DR. JOSE D. VILLANUEVA', '-', 'uploads\\images\\5d5b4446-7127-4c27-84eb-7d27ed2283b4.png', 'inactive'),
(22, 'DR. BENJAMIN D. TAYABAS', '-', 'uploads\\images\\689a8a07-5360-429b-aff6-d54b1ec5112a.png', 'inactive'),
(23, 'DR. VIRSELY M. DELA CRUZ', '-', 'uploads\\images\\58486991-e60a-4bda-bf94-995769d3ba94.png', 'inactive'),
(24, 'ATTY. ADEL A. TAMANO', '-', 'uploads\\images\\8aae175b-76c2-4c83-8e6f-e14399f75edd.png', 'inactive'),
(25, 'JUSTICE ARTEMIO G. TUQUERO', '-', 'uploads\\images\\2d62a3b2-a0c3-4fd5-9654-b3e24bbc7072.png', 'inactive'),
(26, ' DR. MA. LEONORA V. DE JESUS', '-', 'uploads\\images\\df5b5326-b2ed-40c0-987f-1997ac6cdac0.png', 'inactive'),
(27, 'PROF. EMMANUEL A. LEYCO', '-', 'uploads\\images\\da5afd1f-455f-465c-8491-4a34d8f09381.jpg', 'inactive');

-- --------------------------------------------------------

--
-- Table structure for table `privacy_policy`
--

CREATE TABLE `privacy_policy` (
  `id` int(11) NOT NULL,
  `policy` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `privacy_policy`
--

INSERT INTO `privacy_policy` (`id`, `policy`) VALUES
(1, 'I. Introduction\nThe Pamantasan ng Lungsod ng Maynila (PLM) recognizes its responsibilities under Republic Act No. 10173, also known as the Data Privacy Act of 2012 (DPA), with respect to the collection, use, storage, processing, disclosure, and disposal of the personal data we collect and receive from students, alumni, employees and the public who use this site, as well as those who:\na. Contact through our trunkline at 8643-2500 and direct lines;\nb. Email at ithelp@plm.edu.ph and other institutional addresses; and\nc. File applications, complaints, submit inquiries, and apply for and avail of our services.\nThe DPA imposes stricter rules for the processing of sensitive personal information and privileged information. PLM is committed in ensuring that your personal data are protected and secured. Towards this end, a Data Protection Officer (DPO) and Compliance Officers for Privacy (COPs) were designated. Should we ask you to provide certain information by which you can be identified, you can be assured that it will only be used in accordance with this Privacy Policy and in carrying out our mandate as an educational institution, subject to compliance with applicable laws and regulations on personal data privacy protection.\n\n\nPersonal data refers to all types of personal information, whether recorded in material or digital form, from which the identity of an individual is apparent or can be reasonably and directly ascertained by the entity holding the information, or when put together with other information would directly and certainly identify an individual.\nBy using this site and availing of our services, you agree to the collection and use of your personal data in accordance with this Privacy Policy. If you are a parent/guardian of an applicant or student who is a minor (below 18 years old), this Policy pertains to the personal data of your child/ward.\nII. Collection and Use of Personal Data\nPLM may collect and/or generate your personal data in various forms, which may be written records, photographic or video images, digital material and even biometric records. PLM requires information to understand your needs and provide you with the best service.\na. During application for admission\nIn filling up the admission form and other processes during the subsequent admission, we collect, among others: 1) directory information, e.g., your name, birthday, home and email addresses, contact details; 2) personal circumstances, e.g., family background, educational background, academic performance, disciplinary records, medical records; and 3) any or all information obtained through interviews, research, surveys, and/or during entrance tests or admission examinations.\nb. After enrollment and during the course of your stay with PLM\nAfter you join PLM, it may also collect additional information about you, including: 1) your academic or curricular pursuits, such as the classes you enroll in, scholastic performance, attendance, etc.; 2) co-curricular matters you may engage in, such as service learning, outreach activities, internship or apprenticeship compliance; 3) your extra-curricular activities, such as membership in student organizations, leadership positions, and participation and attendance in seminars, competitions, programs, outreach activities, and study tours; 4) any disciplinary incident that you may be involved in, including accompanying sanctions; and 5) medical, counselling and other services that require confidentiality. There will also be times when PLM will acquire other forms of data like pictures or videos of activities you participate in, via official documentation of such activities, or through recordings from closed-circuit security television cameras installed within the campus.\nc. After graduation\nAs part of PLM’s alumni tracking, registration to the alumni registry system may also require information about your current contact details and employment in the industry.\nd. While employed\nPLM collects and processes information that are related to official duties and functions as a government employee, in compliance with Civil Service Commission, Commission on Audit and Commission on Higher Education requirements. PLM may also collect, process and store personal and sensitive personal information as mandated by laws, rules and regulations.\ne. After employment\nPLM collects and processes information that are related to official duties and functions.\nf. Unsolicited Information\nThere may be instances when personal information is sent to or received by PLM even without prior request. In such cases, PLM will determine if it may legitimately keep such information. If it is not related to any legitimate interest, PLM will immediately dispose of the information in a way that will safeguard your privacy. Otherwise, it will be treated in the same manner as information you provide PLM.\nIf you provide personal data of other individuals (e.g., person to contact in the event of an emergency), you are requested to certify that you have obtained the consent of such individuals before providing their personal data.\nTo the extent permitted or required by law, PLM will use your personal data to pursue its legitimate interests, including a variety of academic, administrative, research, historical, and statistical purposes, to perform contractual obligations to you, to comply with legal obligations, to protect your vitally important interests, including life and health, or for the performance of tasks that PLM carries out in the public interest (e.g., public order, public safety, etc.).\nIII. Data Storage, Retention and Disposal\nYour personal data is stored and transmitted securely in a variety of paper and electronic formats, including databases that are shared between PLM’s different colleges or offices. Access to your personal data is limited to PLM personnel who have a legitimate interest in them for the purpose of carrying out their contractual duties. Rest assured that the use of your personal data will not be excessive.\nUnless otherwise provided by law or by appropriate policies, PLM will keep your relevant personal data for as long as necessary, including historical and statistical purposes. Consistent with the provisions of the law, such as those issued by the National Archives of the Philippines, and/or a PLM policy, all affected records will be retained and securely disposed of after such period securely that would prevent further processing, unauthorized access, or disclosure to any other party or the public, or prejudice your interests.\nIV. Data Sharing\nThere will be circumstances that we may, with your consent and/or pursuant to the applicable rules and regulations under the DPA, disclose your personal data to third parties as part of our regular academic operations and for the provision of our services.\nV. Information Control and Limitation\nYou may request for a copy of any personal data we hold about you, and have it corrected or revised if inaccurate or incomplete. If you wish to request for a copy of your personal data, have it corrected, please reach out through our contact information found below. We will promptly respond to your request and execute the corresponding corrections of any information found to be incorrect or incomplete. You may also communicate should you intend to withdraw the consent that you will grant or has previously granted.\nVI. Security\nAny information you communicate to us is protected. We have implemented reasonable physical, organizational, and technical measures and controls to safeguard the confidentiality, integrity, and availability of your personal data. Such technologies are designed to prevent unauthorized users from accessing our systems.\nNevertheless, while we use various means and methods to protect your personal data, keep in mind that no method of transmission over the Internet or method of electronic storage will guarantee full or absolute security.\nVII. Log Data\nWe collect information that your browser sends whenever you visit our site. This Log Data may include information such as your computer’s Internet Protocol (IP) address, browser type, browser version, the pages of our site that you visit, the time and date of your visit, time spent on those pages, and other statistics.\nVIII. Use of cookies\nOur site uses cookies not to collect personally identifiable information about you but to ease navigation through the site.\nIX. Links to other websites\nOur site may contain links to other websites of interest. Once you have used these links to leave our site, you should note that we do not have any control over any other website. Therefore, we cannot be held responsible for the protection and privacy of any personal information which you provide while visiting such sites.\nX. Changes to this Privacy Policy\nOur services may continue to evolve and enhance to enable new features and services and to implement technological advances. As a result, this Privacy Policy may change occasionally which you should check periodically, which provisions will take effect immediately upon posting. Your continued use of PLM’s services after such amendments or revisions were posted will constitute your acknowledgement, acceptance, and adherence to the modified Privacy Policy.\nXI. Contact us\nIf you have any concern or wish to exercise any of your rights, please contact us through:\n\nContact: Data Protection Officer\nTelephone Number: (+63 2) 8643-2500 loc. 64\nEmail address: dpo@plm.edu.ph\nOffice address: 3/F GEE Building, Pamantasan ng Lungsod ng Maynila Campus\nGen. Luna corner Muralla Streets, Intramuros, Manila, Philippines\nXII. User’s Consent\nI have read and understood the PLM Privacy Policy and express my consent thereto. In the same manner, I hereby express my consent for PLM to collect, record, organize, update or modify, retrieve, consult, use, consolidate, block, erase or destruct my personal data as part of my information. I hereby affirm my right to: a) be informed, b) object to processing, c) access, d) rectify, suspend or withdraw my personal data, e) damages, and f) data portability pursuant to the provisions of the DPA and its corresponding Implementing Rules and Regulations.');

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
(1, '3rd Quarter Plan', 'uploads\\files\\55ac2075-01ee-47a7-aa88-2cde66421285.pdf'),
(2, '4th Quarter Plan', 'uploads\\files\\75da1948-613d-49cb-ad10-9f204a0299bd.pdf'),
(3, 'Mid-Year plan', 'uploads\\files\\1c599198-0cad-4d26-948f-b3eb1c72de9d.pdf'),
(4, 'A.Y 2025 - 2026 1st Quarter Plan', 'uploads\\files\\c9168de1-f2c6-4685-913e-4c567ed70713.pdf');

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
(1, 'PLM Erp', 'uploads\\files\\ab9434ee-a675-4158-bc46-eac2c2c16a98.pdf'),
(2, 'PLM Entrance Hall', 'uploads\\files\\7d453bcf-678e-4ddb-9309-a5b1c9a1f8e1.pdf'),
(3, 'OUR Office Renovation', 'uploads\\files\\ed43516c-c9f6-45f1-9261-c56d335df0ea.pdf'),
(4, 'Gusaling Villegas Renovation', 'uploads\\files\\a55787d3-0d6d-402c-9de4-d22ac7d9e8da.pdf'),
(5, 'Additional Computer Laboratories', 'uploads\\files\\7d5e6d87-818c-4f5c-8704-3b1ad38479f9.pdf');

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
(2, 'Atty. Relson P. Moral', 'rpmoral@plm.edu.ph', 'Chief Executive Staff', 'uploads\\images\\992ce8e7-c2ba-4ee7-80fe-8c1b6f6fc59f.png', 'active'),
(3, ' Mr. Ryan Jay SM. Cruz', 'rjsmcruz@plm.edu.ph', ' Head, Executive Assistant', 'uploads\\images\\f9dfd04b-2ee9-4b05-9ac7-f34c0c1bd1dc.png', 'active'),
(4, 'Ms. Lainna P. Ko', 'lpangyarihanko@plm.edu.ph', 'Executive Assistant', 'uploads\\images\\324dffb0-aaa3-4a66-ab02-d9815324924e.png', 'active');

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
-- Indexes for table `academic_calendar`
--
ALTER TABLE `academic_calendar`
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
-- Indexes for table `partner`
--
ALTER TABLE `partner`
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
-- Indexes for table `privacy_policy`
--
ALTER TABLE `privacy_policy`
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
-- AUTO_INCREMENT for table `academic_calendar`
--
ALTER TABLE `academic_calendar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=133;

--
-- AUTO_INCREMENT for table `bid_items`
--
ALTER TABLE `bid_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `board`
--
ALTER TABLE `board`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `career`
--
ALTER TABLE `career`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `competitive_bidding`
--
ALTER TABLE `competitive_bidding`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `consolidated_updates`
--
ALTER TABLE `consolidated_updates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `dean`
--
ALTER TABLE `dean`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `directors`
--
ALTER TABLE `directors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `director_offices`
--
ALTER TABLE `director_offices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT for table `management_committee`
--
ALTER TABLE `management_committee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `objectives`
--
ALTER TABLE `objectives`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;

--
-- AUTO_INCREMENT for table `offices`
--
ALTER TABLE `offices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `partner`
--
ALTER TABLE `partner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `president`
--
ALTER TABLE `president`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `privacy_policy`
--
ALTER TABLE `privacy_policy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `procurement`
--
ALTER TABLE `procurement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `support_staff`
--
ALTER TABLE `support_staff`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
