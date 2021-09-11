CREATE DEFINER=`root`@`localhost` FUNCTION `fn_generateCodeFromID`(ID INT, Header VARCHAR(10)) RETURNS varchar(20) CHARSET utf8mb4
    DETERMINISTIC
BEGIN
	DECLARE newcode VARCHAR(20);
    DECLARE basenumber INT;
    
    SET baseNumber = 10000000 + ID;
    SET newcode =  cast(basenumber as char(20));
    SET newcode = substr(newcode,2);
	SET newcode = concat(upper(Header),'-', newcode);
    
    
RETURN (newcode);
END