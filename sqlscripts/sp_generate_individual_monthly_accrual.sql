CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_generate_individual_monthly_accrual`(IN empid INT, curyear INT, rate FLOAT, dateregular DATE, referenceid INT)
BEGIN
  SET @t_exists = 0; 
	CALL  sp_check_table_exists('temp_calendar', @t_exists);
	IF (@t_exists = 1) THEN
        DROP TEMPORARY TABLE temp_calendar;
    END IF;
    
    CREATE TEMPORARY TABLE temp_calendar(tmonth INT, tdate DATE);
    INSERT INTO temp_calendar (tmonth, tdate)
    SELECT 1, STR_TO_DATE(concat_ws('-','1','1', curyear),'%d-%m-%Y')
    UNION ALL
    SELECT 2, STR_TO_DATE(concat_ws('-','1','2', curyear),'%d-%m-%Y')
    UNION ALL
    SELECT 3, STR_TO_DATE(concat_ws('-','1','3', curyear),'%d-%m-%Y')
    UNION ALL
    SELECT 4, STR_TO_DATE(concat_ws('-','1','4', curyear),'%d-%m-%Y')
    UNION ALL
    SELECT 5, STR_TO_DATE(concat_ws('-','1','5', curyear),'%d-%m-%Y')
    UNION ALL
    SELECT 6, STR_TO_DATE(concat_ws('-','1','6', curyear),'%d-%m-%Y')
    UNION ALL
    SELECT 7, STR_TO_DATE(concat_ws('-','1','7', curyear),'%d-%m-%Y')
    UNION ALL
    SELECT 8, STR_TO_DATE(concat_ws('-','1','8', curyear),'%d-%m-%Y')
    UNION ALL
    SELECT 9, STR_TO_DATE(concat_ws('-','1','9', curyear),'%d-%m-%Y')
    UNION ALL
    SELECT 10, STR_TO_DATE(concat_ws('-','1','10', curyear),'%d-%m-%Y')
    UNION ALL
    SELECT 11, STR_TO_DATE(concat_ws('-','1','11', curyear),'%d-%m-%Y')
    UNION ALL
    SELECT 12, STR_TO_DATE(concat_ws('-','1','12', curyear),'%d-%m-%Y');

    INSERT INTO leave_accrual_queues(employeeid, dateeffective, valuetoadd, created_at, updated_at, year, posted, accrualtypeid, referenceid)
    SELECT empid, t.tdate, rate, now(), now(), curyear, 0, 1, referenceid
    FROM temp_calendar t
    WHERE t.tmonth >= month(dateregular) 
    AND NOT EXISTS (
     SELECT laq.id
	 FROM leave_accrual_queues laq
	 WHERE month(laq.dateeffective) = t.tmonth
		AND laq.referenceid = referenceid
    );
    
END