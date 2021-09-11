CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_check_table_exists`(IN table_name VARCHAR(100), OUT table_exists BOOLEAN)
BEGIN
DECLARE CONTINUE HANDLER FOR SQLSTATE '42S02' SET @err = 1;
    SET @err = 0;
    SET @table_name = table_name;
    SET @sql_query = CONCAT('SELECT 1 FROM ',@table_name);
    PREPARE stmt1 FROM @sql_query;
    IF (@err = 1) THEN
        SET @table_exists = 0;
    ELSE
        SET @table_exists = 1;
        DEALLOCATE PREPARE stmt1;
    END IF;
    
    SET table_exists = @table_exists;
END