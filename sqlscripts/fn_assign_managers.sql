CREATE DEFINER=`root`@`localhost` PROCEDURE `fn_assign_managers`()
BEGIN

-- select e1.id, e1.fullname, e1.manager, e1.teamleader, e1.managerid, e1.ombmtmid, e2.fullname, e2.firstname, e2.lastname
UPDATE employees e1
LEFT OUTER JOIN employees e2 ON e1.manager = concat(e2.firstname, ' ', e2.lastname)
	SET e1.managerid = e2.id
WHERE e1.manager != ''
	AND Ifnull(e1.managerid,0) = 0 
    AND e2.employmentstatusid = 5;
    
UPDATE employees e1
LEFT OUTER JOIN employees e2 ON e1.teamleader = concat(e2.firstname, ' ', e2.lastname)
	SET e1.ombmtmid = e2.id
WHERE e1.teamleader != ''
	AND Ifnull(e1.ombmtmid,0) = 0 
    AND e2.employmentstatusid = 5;
    
UPDATE employees e1
LEFT OUTER JOIN employees e2 ON e1.manager = concat(e2.firstname, ' ', e2.lastname)
	SET e1.managerid = e2.id
WHERE e1.manager != ''
	AND Ifnull(e1.managerid,0) = 0; 
    
UPDATE employees e1
LEFT OUTER JOIN employees e2 ON e1.teamleader = concat(e2.firstname, ' ', e2.lastname)
	SET e1.ombmtmid = e2.id
WHERE e1.teamleader != ''
	AND Ifnull(e1.ombmtmid,0) = 0 ;

END