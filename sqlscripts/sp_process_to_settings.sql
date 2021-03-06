CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_process_to_settings`()
BEGIN
DECLARE today DATETIME DEFAULT now();
	DECLARE thisYear INT DEFAULT YEAR(today);

     INSERT INTO leave_accrual_settings(employeeid, isregular, rate, year, isyearly, active, created_at, updated_at, dateeffective)
	 SELECT e.id, 1, CASE WHEN year(e.dateanniversary) < thisYear THEN 5 ELSE (5/12) END, thisYear, CASE WHEN year(e.dateanniversary) < thisYear THEN TRUE ELSE FALSE END, TRUE, now(), now(), cast(e.dateanniversary as DATETIME)
	 FROM employees e
	 WHERE e.active = true
		AND e.dateanniversary < today
		AND NOT EXISTS (
			SELECT las.id 
			FROM leave_accrual_settings las
			WHERE las.active = true
				AND las.employeeid = e.id
				AND las.isyearly = CASE WHEN year(e.dateanniversary) < thisYear THEN TRUE ELSE FALSE  END
	  );

 SELECT ROW_COUNT() AS 'Result';

END