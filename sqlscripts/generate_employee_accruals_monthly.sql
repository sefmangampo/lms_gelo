CREATE DEFINER=`root`@`localhost` PROCEDURE `generate_employee_accruals_monthly`(IN yearTarget INT)
BEGIN
DECLARE done BOOLEAN DEFAULT 0;	
    DECLARE empid INT;
    DECLARE dateregular DATE;
    DECLARE referenceid INT;
    
    DECLARE exit_loop BOOLEAN;
    
    DECLARE emp_cursor CURSOR FOR
    SELECT id, date_regular, employee_id
    FROM temp_table_generate_employee_accruals_monthly t;
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET exit_loop = TRUE;
    
	SET @t_exists = 0; 
	CALL  sp_check_table_exists('temp_table_generate_employee_accruals_monthly', @t_exists);
	IF (@t_exists = 1) THEN
        DROP TEMPORARY TABLE temp_table_generate_employee_accruals_monthly;
    END IF;
    
    CREATE TEMPORARY TABLE temp_table_generate_employee_accruals_monthly(id INT, date_regular DATE, employee_id INT, rate FLOAT, year INT);
	
    INSERT INTO temp_table_generate_employee_accruals_monthly(id, date_regular, employee_id, rate, year)
    SELECT las.id,  e.dateanniversary, las.employeeid, las.rate, las.year
	FROM leave_accrual_settings las 
		LEFT JOIN leave_accrual_queues laq ON laq.referenceid = las.id
		INNER JOIN employees e ON e.id = las.employeeid
		WHERE las.active = 1 
			AND las.year = yearTarget AND las.isyearly = 0
		GROUP BY las.id, e.dateanniversary, las.employeeid, las.rate, las.year, las.isyearly;
            
	-- sp_generate_individual_monthly_accrual`(IN empid INT, curyear INT, rate FLOAT, dateregular DATE, referenceid INT)

	OPEN emp_cursor;
    
    emp_loop: LOOP
		FETCH emp_cursor INTO referenceid, dateregular, empid;
        
        
		IF exit_loop THEN
			CLOSE emp_cursor;
            LEAVE emp_loop;
        END IF;

        CALL sp_generate_individual_monthly_accrual(empid, yearTarget, (5/12), dateregular, referenceid);
	END LOOP emp_loop;
END