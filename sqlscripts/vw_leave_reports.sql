CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `vw_leave_report` AS
    SELECT 
        UUID() AS `id`,
        `e`.`fullname` AS `fullname`,
        `e`.`paygroupid` AS `paygroupid`,
        `lt`.`name` AS `leavename`,
        FN_GENERATECODEFROMID(`l`.`id`, `lt`.`code`) AS `code`,
        `lt`.`code` AS `leavetypecode`,
        `l`.`dateeffective` AS `dateeffective`,
        `pm`.`id` AS `paymodeid`,
        `pm`.`name` AS `paymodetype`,
        `l`.`year` AS `year`,
        `l`.`quantity` AS `quantity`
    FROM
        (((`leaves` `l`
        JOIN `leave_types` `lt` ON ((`lt`.`id` = `l`.`leavetypeid`)))
        JOIN `employees` `e` ON ((`e`.`id` = `l`.`employeeid`)))
        JOIN `payment_modes` `pm` ON ((`pm`.`id` = `e`.`paygroupid`)))
    WHERE
        (`l`.`status` = 2)
    ORDER BY `e`.`fullname` , `l`.`dateeffective`