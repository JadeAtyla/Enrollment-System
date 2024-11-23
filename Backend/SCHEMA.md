DROP DATABASE IF EXISTS `enrollment_system`;
CREATE DATABASE IF NOT EXISTS `enrollment_system`;
USE `enrollment_system`;

CREATE TABLE IF NOT EXISTS `User` (
  `id` int UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `first_name` varchar(55),
  `last_name` varchar(55),
  `middle_name` varchar(55),
  `suffix` varchar(55),
  `email` varchar(55),
  `contact_number` varchar(55),
  `username` varchar(55) UNIQUE NOT NULL COMMENT 'Student will use their student number for username. Registrar, Admin and Department has different format for username',
  `password` varchar(55) NOT NULL,
  `role_id` int UNSIGNED NOT NULL
) AUTO_INCREMENT=10000;

CREATE TABLE IF NOT EXISTS `Program` (
  `id` int UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `abbreviation` varchar(55) NOT NULL,
  `description` text NOT NULL
) AUTO_INCREMENT=10000;

CREATE TABLE IF NOT EXISTS `Address` (
  `id` int UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `street` varchar(55),
  `barangay` varchar(55),
  `city` varchar(55) NOT NULL,
  `province` varchar(55) NOT NULL
) AUTO_INCREMENT=10000;

CREATE TABLE IF NOT EXISTS `Student` (
  `id` bigint PRIMARY KEY NOT NULL,
  `first_name` varchar(55) NOT NULL,
  `last_name` varchar(55) NOT NULL,
  `middle_name` varchar(55),
  `suffix` varchar(55),
  `year_level` int,
  `section` int,
  `program_id` int UNSIGNED NOT NULL,
  `address_id` int UNSIGNED,
  `old_or_new` ENUM ('OLD', 'NEW') NOT NULL DEFAULT 'Old',
  `classification` ENUM ('REGULAR', 'IRREGULAR', 'TRANSFEREE', 'RETURNEE', 'NEW_STUDENT') NOT NULL DEFAULT 'Regular',
  `birth_date` date,
  `gender` ENUM ('MALE', 'FEMALE', 'PREFER_NOT_TO_SAY') NOT NULL DEFAULT 'PREFER_NOT_TO_SAY',
  `contact_number` varchar(55),
  `email` varchar(55)
);

CREATE TABLE IF NOT EXISTS `Schedule` (
  `id` int UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `course_code` varchar(55) NOT NULL,
  `instructor_id` int UNSIGNED NOT NULL,
  `from_time` time,
  `to_time` time,
  `category` ENUM ('LAB', 'LEC'),
  `day` ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'),
  `room` varchar(55)
) AUTO_INCREMENT=10000;

CREATE TABLE IF NOT EXISTS `Instructor` (
  `id` int UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `first_name` varchar(55) NOT NULL,
  `last_name` varchar(55) NOT NULL,
  `middle_name` varchar(55),
  `suffix` varchar(55),
  `email` varchar(55),
  `contact_number` varchar(55)
) AUTO_INCREMENT=10000;

CREATE TABLE IF NOT EXISTS `Course` (
  `code` varchar(55) PRIMARY KEY NOT NULL,
  `title` varchar(55) NOT NULL,
  `lab_units` int,
  `lec_units` int,
  `total_units` int,
  `year_level` int NOT NULL,
  `semester` int NOT NULL
) AUTO_INCREMENT=10000;

CREATE TABLE IF NOT EXISTS `Pre_Requisite` (
  `id` int UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `pre_requisite` varchar(55) NOT NULL,
  `course_code` varchar(55) NOT NULL
) AUTO_INCREMENT=10000;

CREATE TABLE IF NOT EXISTS `Enrollment` (
  `id` int UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `course_code` varchar(55) NOT NULL,
  `student_id` bigint NOT NULL,
  `enrollment_date` timestamp NOT NULL,
  `status` ENUM ('ENROLLED', 'WAITLISTED') NOT NULL,
  `school_year` date NOT NULL,
  `checked_by` int UNSIGNED COMMENT 'Role must be Department',
  `released_by` int UNSIGNED COMMENT 'Role must be Registrar'
) AUTO_INCREMENT=10000;

CREATE TABLE IF NOT EXISTS `Grade` (
  `id` int UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `student_id` bigint NOT NULL,
  `course_code` varchar(55) NOT NULL,
  `grade` decimal(5,2) COMMENT '1.00 to 5.00 scale',
  `instructor_id` int UNSIGNED NOT NULL,
  `remarks` ENUM ('PASSED', 'FAILED', 'INCOMPOLETE', 'UNCONDITIONAL_FAILURE', 'NOT_GRADED_YET') DEFAULT 'Not_Graded_Yet'
) AUTO_INCREMENT=10000;

CREATE TABLE IF NOT EXISTS `Permission` (
  `id` int UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `name` varchar(55) NOT NULL,
  `description` text NOT NULL
) AUTO_INCREMENT=10000;

CREATE TABLE IF NOT EXISTS `Role` (
  `id` int UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL ,
  `role` ENUM ('ADMIN', 'REGISTRAR', 'DEPARTMENT', 'STUDENT') NOT NULL COMMENT 'Registrar, Admin, Department and Student',
  `description` text NOT NULL
) AUTO_INCREMENT=10000;

CREATE TABLE IF NOT EXISTS `Role_Permission` (
  `id` int UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `permission_id` int UNSIGNED NOT NULL,
  `role_id` int UNSIGNED NOT NULL
) AUTO_INCREMENT=10000;

CREATE TABLE IF NOT EXISTS `Curriculum` (
  `id` int UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `course_code` varchar(55) NOT NULL,
  `program_id` int UNSIGNED NOT NULL,
  `school_year` varchar(55) NOT NULL
) AUTO_INCREMENT=10000;

CREATE UNIQUE INDEX `Schedule_index_0` ON `Schedule` (`course_code`, `instructor_id`, `category`, `day`, `from_time`, `to_time`);

CREATE UNIQUE INDEX `Enrollment_index_1` ON `Enrollment` (`course_code`, `student_id`);

CREATE UNIQUE INDEX `Grade_index_2` ON `Grade` (`student_id`, `course_code`);

CREATE UNIQUE INDEX `Role_Permission_index_3` ON `Role_Permission` (`permission_id`, `role_id`);

CREATE UNIQUE INDEX `Curriculum_index_4` ON `Curriculum` (`course_code`, `program_id`);

ALTER TABLE `User` ADD FOREIGN KEY (`role_id`) REFERENCES `Role` (`id`);

ALTER TABLE `Student` ADD FOREIGN KEY (`program_id`) REFERENCES `Program` (`id`);

ALTER TABLE `Student` ADD FOREIGN KEY (`address_id`) REFERENCES `Address` (`id`);

ALTER TABLE `Schedule` ADD FOREIGN KEY (`course_code`) REFERENCES `Course` (`code`);

ALTER TABLE `Schedule` ADD FOREIGN KEY (`instructor_id`) REFERENCES `Instructor` (`id`);

ALTER TABLE `Pre_Requisite` ADD FOREIGN KEY (`pre_requisite`) REFERENCES `Course` (`code`);

ALTER TABLE `Pre_Requisite` ADD FOREIGN KEY (`course_code`) REFERENCES `Course` (`code`);

ALTER TABLE `Enrollment` ADD FOREIGN KEY (`course_code`) REFERENCES `Course` (`code`);

ALTER TABLE `Enrollment` ADD FOREIGN KEY (`student_id`) REFERENCES `Student` (`id`);

ALTER TABLE `Enrollment` ADD FOREIGN KEY (`checked_by`) REFERENCES `User` (`id`);

ALTER TABLE `Enrollment` ADD FOREIGN KEY (`released_by`) REFERENCES `User` (`id`);

ALTER TABLE `Grade` ADD FOREIGN KEY (`student_id`) REFERENCES `Student` (`id`);

ALTER TABLE `Grade` ADD FOREIGN KEY (`course_code`) REFERENCES `Course` (`code`);

ALTER TABLE `Grade` ADD FOREIGN KEY (`instructor_id`) REFERENCES `Instructor` (`id`);

ALTER TABLE `Role_Permission` ADD FOREIGN KEY (`permission_id`) REFERENCES `Permission` (`id`);

ALTER TABLE `Role_Permission` ADD FOREIGN KEY (`role_id`) REFERENCES `Role` (`id`);

ALTER TABLE `Curriculum` ADD FOREIGN KEY (`course_code`) REFERENCES `Course` (`code`);

ALTER TABLE `Curriculum` ADD FOREIGN KEY (`program_id`) REFERENCES `Program` (`id`);