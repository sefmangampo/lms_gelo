CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_process_accrual_queues`(IN yearTarget INT)
BEGIN

DECLARE n DATETIME DEFAULT now();

	SET @t_exists = 0; 
	CALL  sp_check_table_exists('temp_table_process_accruals_queues', @t_exists);
	IF (@t_exists = 1) THEN
        DROP TEMPORARY TABLE temp_table_process_accruals_queues;
    END IF;
CREATE TEMPORARY TABLE temp_table_process_accruals_queues(id INT, employeeid INT, dateeffective DATE, valueToAdd FLOAT, Remarks VARCHAR(200), systemgenerated BOOLEAN, created_at DATETIME, updated_at DATETIME, leavetypeid INT, year INT, accrualTypeId INT);

INSERT INTO temp_table_process_accruals_queues(id, employeeid, dateeffective, valueToAdd, Remarks, systemgenerated, created_at, updated_at, leavetypeid, year, accrualTypeId)
SELECT  laq.id, laq.employeeid, laq.dateeffective, laq.valuetoadd, 'From Accrual Queue', 1, n, n, laq.leavetypeid, laq.year, laq.accrualtypeid
FROM leave_accrual_queues laq
WHERE laq.year = yearTarget
	AND ifnull(laq.posted, false) = false 
    AND laq.dateeffective < n
	AND NOT EXISTS 
    (
    SELECT la.id 
    FROM leave_accruals la
    WHERE la.year = yearTarget
		AND la.issystemgenerated
		AND la.referenceid = laq.id
		AND la.employeeid = laq.employeeid
    );


 INSERT INTO leave_accruals(employeeid, dategiven, valueadded, remarks, issystemgenerated, created_at, updated_at, leavetypeid, leaveaccrualtypeid, year, referenceid)
SELECT employeeid, dateeffective, valueToAdd, Remarks, systemgenerated, created_at, updated_at, leavetypeid,  accrualTypeId, year, id
FROM temp_table_process_accruals_queues t;

UPDATE leave_accrual_queues laq
INNER JOIN temp_table_process_accruals_queues t ON t.id = laq.id
SET laq.posted = true;

 SELECT ROW_COUNT() AS 'Result';
END