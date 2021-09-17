CREATE DEFINER=`root`@`localhost` PROCEDURE `assign_fn_tl_manager_to_employees`()
BEGIN

	SET @t_exists = 0; 
	CALL  sp_check_table_exists('temp_assign_fn_tl_manager_to_employees', @t_exists);
	IF (@t_exists = 1) THEN
        DROP TEMPORARY TABLE temp_assign_fn_tl_manager_to_employees;
    END IF;

CREATE TEMPORARY TABLE temp_assign_fn_tl_manager_to_employees(id INT, firstname VARCHAR(50), middlename VARCHAR(50), lastname VARCHAR(50), fullname VARCHAR(50),
hassuffix BOOLEAN, suffix VARCHAR(10), tempmiddlename VARCHAR(50), tempfirstname VARCHAR(50)
);

 UPDATE employees SET fullname = concat(lastname,', ', firstname,' ', middlename) WHERE id > 0;
 
 UPDATE employees SET hassuffix = TRUE, suffix = 'III', firstname = LEFT(firstname,char_length(firstname)-4)
 WHERE firstname LIKE '%iii%' AND id > 0;
 
  UPDATE employees SET hassuffix = TRUE, suffix = 'JR.', firstname = LEFT(firstname,char_length(firstname)-4)
 WHERE firstname LIKE '%jr.' AND id > 0;
 
 INSERT INTO temp_assign_fn_tl_manager_to_employees(id, firstname, lastname, middlename, fullname, hassuffix, suffix, tempmiddlename, tempfirstname)
  SELECT id, firstname,lastname,middlename, fullname, hassuffix, suffix, fn_SPLIT_STR(firstname,'.',2) AS 'middlename', fn_SPLIT_STR(firstname,'.',1) AS 'newfirstname'
 from employees 
 WHERE  firstname LIKE '%jr.%' ;
 
 UPDATE employees e 
 INNER JOIN temp_assign_fn_tl_manager_to_employees t ON t.id = e.id
 SET e.middlename = t.tempmiddlename, e.hassuffix = TRUE, e.suffix = 'JR.', e.firstname =  fn_SPLIT_STR(tempfirstname, ' ',1 );
 
 UPDATE employees SET hassuffix = TRUE, suffix = 'JR.', firstname = LEFT(firstname,char_length(firstname)-2)
 where  firstname LIKE '%jr%' ;
 
END