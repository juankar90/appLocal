-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-04-2016 a las 18:12:28
-- Versión del servidor: 10.1.10-MariaDB
-- Versión de PHP: 5.6.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `miapp`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensualidad`
--

CREATE TABLE `mensualidad` (
  `id` int(5) NOT NULL,
  `persona` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `importe` int(3) NOT NULL,
  `fecha` date NOT NULL,
  `pagado` varchar(2) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `mensualidad`
--

INSERT INTO `mensualidad` (`id`, `persona`, `importe`, `fecha`, `pagado`) VALUES
(1, 'j.carlosparamo@gmail.com', 35, '2015-03-29', 'si'),
(3, 'jose@', 35, '2016-04-13', 'no'),
(4, 'j.carlosparamo@gmail.com', 355, '2016-04-30', 'si'),
(5, 'jose@', 25, '2016-04-29', 'si'),
(6, 'j.carlosparamo@gmail.com', 5, '2016-04-30', 'si'),
(7, 'j.carlosparamo@gmail.com', 55, '2016-04-28', 'si');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `multas`
--

CREATE TABLE `multas` (
  `id` int(4) NOT NULL,
  `persona` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  `concepto` varchar(15) COLLATE utf8_spanish_ci DEFAULT NULL,
  `mas_info` varchar(250) COLLATE utf8_spanish_ci DEFAULT NULL,
  `cantidad` int(2) DEFAULT NULL,
  `fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `multas`
--

INSERT INTO `multas` (`id`, `persona`, `concepto`, `mas_info`, `cantidad`, `fecha`) VALUES
(1, 'jose@', 'limpieza', NULL, 2, '2016-04-15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `multas-delete`
--

CREATE TABLE `multas-delete` (
  `id` int(4) NOT NULL,
  `persona` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  `concepto` varchar(15) COLLATE utf8_spanish_ci DEFAULT NULL,
  `mas_info` varchar(250) COLLATE utf8_spanish_ci DEFAULT NULL,
  `cantidad` int(2) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `fecha_borrado` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `multas-delete`
--

INSERT INTO `multas-delete` (`id`, `persona`, `concepto`, `mas_info`, `cantidad`, `fecha`, `fecha_borrado`) VALUES
(4, 'aaa', 'limpieza', NULL, 2, '2016-04-13', '2016-04-21 17:36:28'),
(5, 'aaa', 'limpieza', NULL, 4, '2016-04-19', '2016-04-21 17:45:16');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pago-multas`
--

CREATE TABLE `pago-multas` (
  `id` int(5) NOT NULL,
  `persona` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `importe` int(3) NOT NULL,
  `fecha` date NOT NULL,
  `concepto` varchar(15) COLLATE utf8_spanish_ci NOT NULL,
  `mas_info` varchar(250) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `pago-multas`
--

INSERT INTO `pago-multas` (`id`, `persona`, `importe`, `fecha`, `concepto`, `mas_info`) VALUES
(1, 'aaa', 9, '2016-04-29', 'no limpiar', NULL),
(2, 'j.carlosparamo@gmail.com', 6, '2016-04-29', 'otro', 'mi concepto'),
(3, 'aaa', 3, '2016-04-29', 'pago tardÃ­o', NULL),
(4, 'aaa', 1, '2016-04-29', 'otro', 'aaaaa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `nombre` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `password` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `chocopuntos` int(2) NOT NULL,
  `tipo` varchar(5) COLLATE utf8_spanish_ci NOT NULL DEFAULT 'user',
  `debe` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`nombre`, `email`, `password`, `chocopuntos`, `tipo`, `debe`) VALUES
('admin', 'aaa', 'aaa', 12, 'admin', 30),
('Juan Carlos', 'j.carlosparamo@gmail.com', '120190', 0, 'user', 0),
('Jose', 'jose@', '12345', 8, 'user', 20);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `mensualidad`
--
ALTER TABLE `mensualidad`
  ADD PRIMARY KEY (`id`),
  ADD KEY `persona` (`persona`);

--
-- Indices de la tabla `multas`
--
ALTER TABLE `multas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `persona` (`persona`);

--
-- Indices de la tabla `multas-delete`
--
ALTER TABLE `multas-delete`
  ADD PRIMARY KEY (`id`),
  ADD KEY `persona` (`persona`);

--
-- Indices de la tabla `pago-multas`
--
ALTER TABLE `pago-multas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `persona` (`persona`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `mensualidad`
--
ALTER TABLE `mensualidad`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `multas`
--
ALTER TABLE `multas`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `multas-delete`
--
ALTER TABLE `multas-delete`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `pago-multas`
--
ALTER TABLE `pago-multas`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `mensualidad`
--
ALTER TABLE `mensualidad`
  ADD CONSTRAINT `mensualidad_ibfk_1` FOREIGN KEY (`persona`) REFERENCES `persona` (`email`),
  ADD CONSTRAINT `mensualidad_ibfk_2` FOREIGN KEY (`persona`) REFERENCES `persona` (`email`);

--
-- Filtros para la tabla `multas`
--
ALTER TABLE `multas`
  ADD CONSTRAINT `multas_ibfk_1` FOREIGN KEY (`persona`) REFERENCES `persona` (`email`);

--
-- Filtros para la tabla `pago-multas`
--
ALTER TABLE `pago-multas`
  ADD CONSTRAINT `pago-multas_ibfk_1` FOREIGN KEY (`persona`) REFERENCES `persona` (`email`) ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
