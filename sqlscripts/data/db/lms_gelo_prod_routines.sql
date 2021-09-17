CREATE DATABASE  IF NOT EXISTS `lms_gelo_prod` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `lms_gelo_prod`;
-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: lms_gelo_prod
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Temporary view structure for view `vw_leave_credits`
--

DROP TABLE IF EXISTS `vw_leave_credits`;
/*!50001 DROP VIEW IF EXISTS `vw_leave_credits`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_leave_credits` AS SELECT 
 1 AS `id`,
 1 AS `employeeid`,
 1 AS `employee`,
 1 AS `reference`,
 1 AS `quantity`,
 1 AS `date`,
 1 AS `year`,
 1 AS `leaveaccrualtype`,
 1 AS `isleave`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vw_leave_report`
--

DROP TABLE IF EXISTS `vw_leave_report`;
/*!50001 DROP VIEW IF EXISTS `vw_leave_report`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_leave_report` AS SELECT 
 1 AS `id`,
 1 AS `fullname`,
 1 AS `paygroupid`,
 1 AS `leavename`,
 1 AS `code`,
 1 AS `leavetypecode`,
 1 AS `dateeffective`,
 1 AS `paymodeid`,
 1 AS `paymodetype`,
 1 AS `year`,
 1 AS `quantity`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `vw_leave_credits`
--

/*!50001 DROP VIEW IF EXISTS `vw_leave_credits`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_leave_credits` AS select uuid() AS `id`,`t`.`employeeid` AS `employeeid`,concat(`e`.`lastname`,', ',`e`.`firstname`,' ',`e`.`middlename`) AS `employee`,`FN_GENERATECODEFROMID`(`t`.`ID`,`t`.`code`) AS `reference`,`t`.`quantity` AS `quantity`,`t`.`date` AS `date`,`t`.`year` AS `year`,`t`.`type` AS `leaveaccrualtype`,`t`.`isleave` AS `isleave` from ((select `la`.`id` AS `ID`,`la`.`employeeid` AS `employeeid`,'AC' AS `code`,`la`.`valueadded` AS `quantity`,`la`.`dategiven` AS `date`,year(`la`.`dategiven`) AS `year`,`at`.`name` AS `type`,0 AS `isleave` from (`leave_accruals` `la` join `accrual_types` `at` on((`at`.`id` = `la`.`leaveaccrualtypeid`))) union all select `l`.`id` AS `id`,`l`.`employeeid` AS `employeeid`,'LV' AS `LV`,`l`.`quantity` AS `quantity`,`l`.`dateeffective` AS `dateeffective`,`l`.`year` AS `year`,`lt`.`name` AS `name`,1 AS `isleave` from (`leaves` `l` join `leave_types` `lt` on((`lt`.`id` = `l`.`leavetypeid`))) where ((`l`.`status` = 2) and (`lt`.`id` = 1)) union all select `aa`.`id` AS `id`,`aa`.`employeeid` AS `employeeid`,'AD' AS `AD`,`aa`.`rate` AS `rate`,`aa`.`dateeffective` AS `dateeffective`,`aa`.`year` AS `year`,`ay`.`name` AS `name`,0 AS `0` from (`accrual_adjustments` `aa` left join `accrual_types` `ay` on((`ay`.`id` = 3)))) `t` join `employees` `e` on(((`e`.`id` = `t`.`employeeid`) and (`e`.`active` = true)))) order by `t`.`date` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_leave_report`
--

/*!50001 DROP VIEW IF EXISTS `vw_leave_report`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_leave_report` AS select uuid() AS `id`,`e`.`fullname` AS `fullname`,`e`.`paygroupid` AS `paygroupid`,`lt`.`name` AS `leavename`,`FN_GENERATECODEFROMID`(`l`.`id`,`lt`.`code`) AS `code`,`lt`.`code` AS `leavetypecode`,`l`.`dateeffective` AS `dateeffective`,`pm`.`id` AS `paymodeid`,`pm`.`name` AS `paymodetype`,`l`.`year` AS `year`,`l`.`quantity` AS `quantity` from (((`leaves` `l` join `leave_types` `lt` on((`lt`.`id` = `l`.`leavetypeid`))) join `employees` `e` on((`e`.`id` = `l`.`employeeid`))) join `payment_modes` `pm` on((`pm`.`id` = `e`.`paygroupid`))) where (`l`.`status` = 2) order by `e`.`fullname`,`l`.`dateeffective` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-17  8:18:41
