CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_generateEmployeeAccruals`(IN yearTarget INT)
BEGIN
	
    DECLARE yearEffective DATE;

SET @t_exists = 0; 
	CALL  sp_check_table_exists('temp_table_generate_employee_accruals', @t_exists);
	IF (@t_exists = 1) THEN
        DROP TEMPORARY TABLE temp_table_generate_employee_accruals;
    END IF;

	CREATE TEMPORARY TABLE temp_table_generate_employee_accruals(id INT, date_regular DATE, employee_id INT, rate FLOAT, year INT, is_yearly INT, accrualtypeid INT);
    
	INSERT INTO temp_table_generate_employee_accruals(id, date_regular, employee_id, rate, year, is_yearly)
	 SELECT las.id, e.dateanniversary, las.employeeid, las.rate, las.year, las.isyearly 
     FROM leave_accrual_settings las 
		INNER JOIN employees e ON e.id = las.employeeid
		WHERE las.active = 1
			AND las.year = yearTarget
            AND year(e.dateanniversary) <= yearTarget
	 AND NOT EXISTS (
	SELECT id from leave_accrual_queues laq
    WHERE laq.referenceid = las.id
    );


    SET yearEffective = makedate(yearTarget, 1);

     INSERT INTO leave_accrual_queues(employeeid, dateeffective, valuetoadd, created_at, updated_at, posted, accrualtypeid, referenceid, year)
	SELECT  t.employee_id, 
    CASE WHEN t.is_yearly = TRUE THEN yearEffective ELSE t.date_regular END,
    CASE WHEN t.is_yearly = TRUE THEN t.rate ELSE round((5/12) * (13 - month(t.date_regular)),3) END,
    now(), now(), false, CASE WHEN t.is_yearly = TRUE THEN 2 ELSE 1 END , t.id, t.year
    FROM temp_table_generate_employee_accruals t
  -- INNER JOIN employees e on e.id = t.employee_id
    ;
    
    SELECT row_count() as 'Result';
END