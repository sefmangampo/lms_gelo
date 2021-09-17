CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `vw_leave_credits` AS
    SELECT 
        UUID() AS `id`,
        `t`.`employeeid` AS `employeeid`,
        CONCAT(`e`.`lastname`,
                ', ',
                `e`.`firstname`,
                ' ',
                `e`.`middlename`) AS `employee`,
        FN_GENERATECODEFROMID(`t`.`ID`, `t`.`code`) AS `reference`,
        `t`.`quantity` AS `quantity`,
        `t`.`date` AS `date`,
        `t`.`year` AS `year`,
        `t`.`type` AS `leaveaccrualtype`,
        `t`.`isleave` AS `isleave`
    FROM
        ((SELECT 
            `la`.`id` AS `ID`,
                `la`.`employeeid` AS `employeeid`,
                'AC' AS `code`,
                `la`.`valueadded` AS `quantity`,
                `la`.`dategiven` AS `date`,
                YEAR(`la`.`dategiven`) AS `year`,
                `at`.`name` AS `type`,
                0 AS `isleave`
        FROM
            (`leave_accruals` `la`
        JOIN `accrual_types` `at` ON ((`at`.`id` = `la`.`leaveaccrualtypeid`))) UNION ALL SELECT 
            `l`.`id` AS `id`,
                `l`.`employeeid` AS `employeeid`,
                'LV' AS `LV`,
                `l`.`quantity` AS `quantity`,
                `l`.`dateeffective` AS `dateeffective`,
                `l`.`year` AS `year`,
                `lt`.`name` AS `name`,
                1 AS `isleave`
        FROM
            (`leaves` `l`
        JOIN `leave_types` `lt` ON ((`lt`.`id` = `l`.`leavetypeid`)))
        WHERE
            ((`l`.`status` = 2) AND (`lt`.`id` = 1)) UNION ALL SELECT 
            `aa`.`id` AS `id`,
                `aa`.`employeeid` AS `employeeid`,
                'AD' AS `AD`,
                `aa`.`rate` AS `rate`,
                `aa`.`dateeffective` AS `dateeffective`,
                `aa`.`year` AS `year`,
                `ay`.`name` AS `name`,
                0 AS `0`
        FROM
            (`accrual_adjustments` `aa`
        LEFT JOIN `accrual_types` `ay` ON ((`ay`.`id` = 3)))) `t`
        JOIN `employees` `e` ON (((`e`.`id` = `t`.`employeeid`)
            AND (`e`.`active` = TRUE))))
    ORDER BY `t`.`date`