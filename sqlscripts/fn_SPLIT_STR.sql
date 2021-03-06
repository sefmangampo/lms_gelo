CREATE DEFINER=`root`@`localhost` FUNCTION `fn_SPLIT_STR`(x VARCHAR(255), delim VARCHAR(12), pos INT) RETURNS varchar(255) CHARSET utf8mb4
    DETERMINISTIC
BEGIN
   RETURN REPLACE(SUBSTRING(SUBSTRING_INDEX(x, delim, pos),
       LENGTH(SUBSTRING_INDEX(x, delim, pos -1)) + 1),
       delim, '');
END