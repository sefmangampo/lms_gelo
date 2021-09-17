CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_leave_credits`(paygroupid INT, startdate DATE, enddate DATE, nameofreport VARCHAR(100), isavereport BOOLEAN)
BEGIN
	 SET startdate = ifnull(startdate,now());
    SET enddate = ifnull(enddate,now());

	SELECT v.fullname, v.paygroupid, v.leavename, v.code, v.leavetypecode, v.dateeffective, v.dateeffective as 'dateuntil', v.paymodetype, v.year, concat(cast(v.quantity AS CHAR), ' day') as `quantity`
	FROM lms_gelo_prod.vw_leave_report v
	WHERE (v.paygroupid = paygroupid OR paygroupid = 0)
    AND (v.dateeffective BETWEEN startdate AND enddate)
    
    UNION ALL 
    
    SELECT  e.fullname, e.paygroupid, 'Undertime', FN_GENERATECODEFROMID(u.id, 'UT'), 'UT', u.fromhours, u.tohours,  pm.name, u.year,  concat(cast(u.hours AS CHAR), ' hours')
	FROM undertimes u
		INNER JOIN employees e ON e.id = u.employeeid
		INNER JOIN payment_modes pm ON pm.id = e.paygroupid
		WHERE (e.paygroupid = paygroupid OR paygroupid = 0)
	AND u.date  BETWEEN startdate AND enddate;
    
    
END