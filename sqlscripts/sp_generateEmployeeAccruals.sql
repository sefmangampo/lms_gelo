CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_generateEmployeeAccruals`(IN yearTarget INT)
BEGIN
SET @t_exists = 0; 
	CALL  sp_check_table_exists('temp_table_generate_employee_accruals', @t_exists);
	IF (@t_exists = 1) THEN
        DROP TEMPORARY TABLE temp_table_generate_employee_accruals;
    END IF;

	CREATE TEMPORARY TABLE temp_table_generate_employee_accruals(id INT, date_regular DATE, employee_id INT, rate FLOAT, year INT, is_yearly INT, accrualtypeid INT);
    
	INSERT INTO temp_table_generate_employee_accruals(id, date_regular, employee_id, rate, year, is_yearly)
	 SELECT las.id, e.dateregular, las.employeeid, las.rate, las.year, las.isyearly 
     FROM leave_accrual_settings las 
		INNER JOIN employees e ON e.id = las.employeeid
		WHERE las.active = 1 AND las.isregular = 1 
			AND las.year = yearTarget AND las.isyearly = 1
	 AND NOT EXISTS (
	SELECT id from leave_accrual_queues laq
    WHERE laq.referenceid = las.id
    );

	SET @dateEffective = makedate(yearTarget,1);
    
    SELECT id INTO @referenceid 
	FROM accrual_types la
	WHERE name = 'Yearly Credit';

	INSERT INTO leave_accrual_queues(employeeid, dateeffective, valuetoadd, created_at, updated_at, leavetypeid, year, posted, accrualtypeid, referenceid)
	SELECT t.employee_id, @dateEffective, t.rate, now(), now(), 1, yearTarget, false, @referenceid, t.id
    FROM temp_table_generate_employee_accruals t;
    
    SELECT row_count() as 'Result';
END