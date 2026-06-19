-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 12. Jun 2026 um 19:05
-- Server-Version: 10.4.32-MariaDB
-- PHP-Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `blox`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `highscores`
--

CREATE TABLE `highscores` (
  `id` int(10) NOT NULL,
  `Punktezahl` int(100) NOT NULL,
  `Player` varchar(250) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Datum` date NOT NULL,
  `playerid` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `highscores`
--

INSERT INTO `highscores` (`id`, `Punktezahl`, `Player`, `Datum`, `playerid`) VALUES
(1, 1000, 'Bloxspieler', '2026-06-12', 1),
(2, 400, 'testo', '2026-06-12', 2);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `player`
--

CREATE TABLE `player` (
  `id` int(10) NOT NULL,
  `Benutzername` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Vorname` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Nachname` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Email` varchar(250) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Passwort` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Rolle` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `player`
--

INSERT INTO `player` (`id`, `Benutzername`, `Vorname`, `Nachname`, `Email`, `Passwort`, `Rolle`) VALUES
(1, 'Bloxspieler', 'Michael', 'Souhrada', 'if24b039@technikum-wien.at', '$2y$10$Wcd8BjD9uDbHWKwCQgGdVeaeYrXToN1kCRgLBFI5GNZMmpngU8V5O', 'admin'),
(2, 'testo', 'test', 'testo', 'test@mail.com', '$2y$10$TFSHsF/NLGEuUeAXN4c.Fu.ftiv3f1DeX76gU7h1VKbQ2Hsic3iu.', 'guest');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `highscores`
--
ALTER TABLE `highscores`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `player`
--
ALTER TABLE `player`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `highscores`
--
ALTER TABLE `highscores`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT für Tabelle `player`
--
ALTER TABLE `player`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
